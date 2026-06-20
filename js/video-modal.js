(function () {
  var modal = document.getElementById("video-modal");
  var iframe = document.getElementById("video-modal-iframe");
  var titleEl = document.getElementById("video-modal-title");
  var playBtn = document.getElementById("video-modal-play");
  var expandBtn = document.getElementById("video-modal-expand");
  var overlay = document.getElementById("video-modal-overlay");
  var loadingEl = document.getElementById("video-modal-loading");
  var posterEl = document.getElementById("video-modal-poster");
  var frameWrap = modal ? modal.querySelector(".video-modal__frame-wrap") : null;
  if (!modal || !iframe || !titleEl || !playBtn || !overlay || !loadingEl || !posterEl || !frameWrap) return;

  var triggers = document.querySelectorAll("[data-video-open]");
  var closeEls = document.querySelectorAll("[data-video-close]");
  var lastFocus = null;
  var pendingFileId = null;

  var mobileQuery = window.matchMedia("(max-width: 1023px)");
  var coarsePointerQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

  function isMobile() {
    return mobileQuery.matches || coarsePointerQuery.matches;
  }

  function embedUrl(fileId) {
    return "https://drive.google.com/file/d/" + fileId + "/preview?usp=embed&autoplay=1";
  }

  function isFrameFullscreen() {
    var active = document.fullscreenElement || document.webkitFullscreenElement;
    return active === frameWrap;
  }

  function updateExpandButton() {
    if (!expandBtn) return;
    var expanded = isFrameFullscreen();
    expandBtn.setAttribute("aria-pressed", expanded ? "true" : "false");
    expandBtn.setAttribute("aria-label", expanded ? expandBtn.getAttribute("data-label-exit") || "Exit fullscreen" : expandBtn.getAttribute("data-label-enter") || "Enter fullscreen");
    expandBtn.classList.toggle("is-active", expanded);
  }

  function enterFrameFullscreen() {
    if (frameWrap.requestFullscreen) {
      return frameWrap.requestFullscreen();
    }
    if (frameWrap.webkitRequestFullscreen) {
      frameWrap.webkitRequestFullscreen();
      return Promise.resolve();
    }
    return Promise.reject();
  }

  function exitFrameFullscreen() {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    }
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      return Promise.resolve();
    }
    return Promise.resolve();
  }

  function toggleFrameFullscreen() {
    if (isFrameFullscreen()) {
      return exitFrameFullscreen();
    }
    return enterFrameFullscreen();
  }

  function showOverlay() {
    overlay.hidden = false;
    frameWrap.classList.remove("is-playing");
    modal.classList.remove("is-playing");
  }

  function hideOverlay() {
    overlay.hidden = true;
    frameWrap.classList.add("is-playing");
    modal.classList.add("is-playing");
  }

  function showPlayState() {
    overlay.classList.remove("is-loading");
    playBtn.hidden = false;
    loadingEl.hidden = true;
    loadingEl.setAttribute("aria-hidden", "true");
  }

  function showLoadingState() {
    overlay.classList.add("is-loading");
    playBtn.hidden = true;
    loadingEl.hidden = false;
    loadingEl.setAttribute("aria-hidden", "false");
  }

  function setPoster(src) {
    if (src) {
      posterEl.src = src;
      posterEl.hidden = false;
    } else {
      posterEl.removeAttribute("src");
      posterEl.hidden = true;
    }
  }

  function resetPlayer() {
    iframe.src = "";
    iframe.hidden = true;
    if (expandBtn) expandBtn.hidden = true;
  }

  function startPlayback() {
    if (!pendingFileId) return;

    showLoadingState();
    showOverlay();
    iframe.hidden = false;
    iframe.src = embedUrl(pendingFileId);
  }

  function onIframeReady() {
    posterEl.hidden = true;
    hideOverlay();
    if (expandBtn && isMobile()) expandBtn.hidden = false;
  }

  function openModal(fileId, title, poster) {
    lastFocus = document.activeElement;
    pendingFileId = fileId;
    resetPlayer();
    titleEl.textContent = title || "Video";
    setPoster(poster);
    modal.classList.toggle("video-modal--mobile", isMobile());

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("video-modal-open");

    if (isMobile()) {
      overlay.hidden = true;
      iframe.hidden = false;
      iframe.src = embedUrl(fileId);
    } else {
      showPlayState();
      showOverlay();
    }

    updateExpandButton();
    var closeBtn = modal.querySelector(".video-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (modal.hidden) return;

    if (isFrameFullscreen()) {
      exitFrameFullscreen();
    }

    pendingFileId = null;
    resetPlayer();
    setPoster("");
    showPlayState();
    showOverlay();
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open", "video-modal--mobile", "is-playing");
    frameWrap.classList.remove("is-playing");
    document.body.classList.remove("video-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  iframe.addEventListener("load", function () {
    if (iframe.src && modal.classList.contains("is-open")) {
      onIframeReady();
    }
  });

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      toggleFrameFullscreen().catch(function () {});
    });
  }

  document.addEventListener("fullscreenchange", updateExpandButton);
  document.addEventListener("webkitfullscreenchange", updateExpandButton);

  playBtn.addEventListener("click", startPlayback);

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var fileId = btn.getAttribute("data-video-id");
      var title = btn.getAttribute("data-video-title");
      var poster = btn.getAttribute("data-video-poster");
      if (fileId) openModal(fileId, title, poster);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      if (isFrameFullscreen()) {
        exitFrameFullscreen();
        return;
      }
      closeModal();
    }
  });
})();
