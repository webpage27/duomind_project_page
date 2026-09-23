(() => {
  "use strict";

  const montage = document.querySelector("[data-montage]");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rolloutVideos = Array.from(document.querySelectorAll(".rollout-tile video, .task-video-card video"));

  function syncMontagePlayback() {
    if (!montage) {
      return;
    }

    if (motionQuery.matches) {
      montage.pause();
      return;
    }

    montage.play().catch(() => {
      // Native controls remain available if autoplay requires a user gesture.
    });
  }

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", syncMontagePlayback);
  }

  rolloutVideos.forEach((video) => {
    video.addEventListener("play", () => {
      if (montage) {
        montage.pause();
      }
      rolloutVideos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });

  syncMontagePlayback();
})();
