/**
 * Welcome sequence
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $ } = window.BFM;

  function setupWelcomeSequence() {
    const section = $("#welcome");
    if (!section) return;
    const first = $('[data-welcome-step="1"]', section);
    const second = $('[data-welcome-step="2"]', section);
    const third = $('[data-welcome-step="3"]', section);
    const videoScene = $("[data-welcome-video-scene]", section);
    const video = $("[data-welcome-video]", section);
    if (!first || !second || !third || !videoScene || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scheduled = false;
    let videoObjectUrl = "";
    let playbackFrame = 0;
    let playRequest = null;
    let useSeekFallback = false;
    let fallbackTimestamp = 0;
    let maxVideoProgress = 0;
    let previousProgress = 0;
    let targetTime = 0;

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const range = (value, start, end) => clamp01((value - start) / (end - start));

    const stopPlayback = () => {
      if (playbackFrame) window.cancelAnimationFrame(playbackFrame);
      playbackFrame = 0;
      video.pause();
    };

    const monitorPlayback = (timestamp) => {
      playbackFrame = 0;
      if (reducedMotion.matches) {
        video.pause();
        return;
      }

      const remaining = targetTime - video.currentTime;
      if (remaining <= 0.045) {
        video.pause();
        return;
      }

      if (useSeekFallback) {
        if (timestamp - fallbackTimestamp >= 34) {
          const step = Math.min(remaining, Math.max(0.04, remaining * 0.18));
          video.currentTime = Math.min(targetTime, video.currentTime + step);
          fallbackTimestamp = timestamp;
        }
      } else {
        video.playbackRate = Math.min(5.5, Math.max(1, 0.9 + remaining * 1.1));
        if (video.paused && !playRequest) {
          playRequest = video.play();
          playRequest?.then(() => {
            playRequest = null;
          }).catch(() => {
            playRequest = null;
            useSeekFallback = true;
          });
        }
      }

      playbackFrame = window.requestAnimationFrame(monitorPlayback);
    };

    const requestPlayback = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const lastFrame = Math.max(0, video.duration - 0.04);
      targetTime = Math.min(lastFrame, video.duration * maxVideoProgress);
      if (targetTime - video.currentTime > 0.045 && !playbackFrame) {
        playbackFrame = window.requestAnimationFrame(monitorPlayback);
      }
    };

    const resetPlayback = () => {
      stopPlayback();
      maxVideoProgress = 0;
      targetTime = 0;
      useSeekFallback = false;
      fallbackTimestamp = 0;
      if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime > 0.015) {
        video.currentTime = 0;
      }
    };

    const render = () => {
      scheduled = false;
      if (reducedMotion.matches) {
        stopPlayback();
        first.removeAttribute("style");
        second.removeAttribute("style");
        third.removeAttribute("style");
        videoScene.removeAttribute("style");
        return;
      }

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp01(-rect.top / distance);
      const firstOpacity = 1 - range(progress, 0.12, 0.3);
      const secondIn = range(progress, 0.24, 0.4);
      const secondOut = 1 - range(progress, 0.5, 0.64);
      const secondOpacity = Math.min(secondIn, secondOut);
      const thirdIn = range(progress, 0.6, 0.74);
      const thirdOut = 1 - range(progress, 0.94, 1);
      const thirdOpacity = Math.min(thirdIn, thirdOut);
      const sceneIn = range(progress, 0.5, 0.64);
      const sceneOut = 1 - range(progress, 0.94, 1);
      const sceneOpacity = Math.min(sceneIn, sceneOut);
      const videoProgress = range(progress, 0.54, 0.94);
      const movingUp = progress < previousProgress - 0.001;

      if (movingUp && progress <= 0.48) {
        resetPlayback();
      } else {
        maxVideoProgress = Math.max(maxVideoProgress, videoProgress);
        requestPlayback();
      }
      previousProgress = progress;

      first.style.opacity = firstOpacity.toFixed(3);
      first.style.transform = `translateY(${-24 * (1 - firstOpacity)}px) scale(${(0.985 + firstOpacity * 0.015).toFixed(3)})`;
      second.style.opacity = secondOpacity.toFixed(3);
      second.style.transform = `translateY(${(28 * (1 - secondIn) - 18 * (1 - secondOut)).toFixed(1)}px) scale(${(0.97 + secondOpacity * 0.03).toFixed(3)})`;
      third.style.opacity = thirdOpacity.toFixed(3);
      third.style.transform = `translateY(${(28 * (1 - thirdIn) - 18 * (1 - thirdOut)).toFixed(1)}px) scale(${(0.97 + thirdOpacity * 0.03).toFixed(3)})`;
      videoScene.style.setProperty("--scene-opacity", sceneOpacity.toFixed(3));
      videoScene.style.setProperty("--video-progress", maxVideoProgress.toFixed(3));
    };

    const requestRender = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener?.("change", requestRender);
    video.muted = true;
    video.playsInline = true;
    video.pause();
    video.addEventListener("loadedmetadata", () => {
      requestPlayback();
      requestRender();
    });
    video.addEventListener("durationchange", requestPlayback);
    video.addEventListener("canplay", requestRender);
    video.addEventListener("error", () => videoScene.classList.add("is-video-unavailable"));
    const loadVideo = async () => {
      const source = video.dataset.src;
      if (!source) return;
      if (window.location.protocol === "file:") {
        video.src = source;
        video.load();
        return;
      }
      try {
        const response = await window.fetch(source, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        videoObjectUrl = window.URL.createObjectURL(await response.blob());
        video.src = videoObjectUrl;
      } catch {
        video.src = source;
      }
      video.load();
    };
    window.addEventListener("pagehide", () => {
      stopPlayback();
      if (videoObjectUrl) window.URL.revokeObjectURL(videoObjectUrl);
    }, { once: true });
    render();
    loadVideo();
  }

  window.BFM.setupWelcomeSequence = setupWelcomeSequence;
})();
