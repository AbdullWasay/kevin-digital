(function () {
  var modal = document.getElementById("video-modal");
  var iframe = document.getElementById("video-modal-iframe");
  var titleEl = document.getElementById("video-modal-title");
  var playBtn = document.getElementById("video-modal-play");
  var overlay = document.getElementById("video-modal-overlay");
  var posterEl = document.getElementById("video-modal-poster");
  if (!modal || !iframe || !titleEl || !playBtn || !overlay || !posterEl) return;

  var triggers = document.querySelectorAll("[data-video-open]");
  var closeEls = document.querySelectorAll("[data-video-close]");
  var lastFocus = null;
  var fileId = null;
  var mobile = window.matchMedia("(max-width: 1023px)");

  function isMobile() {
    return mobile.matches;
  }

  function embedUrl(id) {
    return "https://drive.google.com/file/d/" + id + "/preview?usp=embed&autoplay=1";
  }

  function showPoster(src) {
    if (src) {
      posterEl.src = src;
      posterEl.hidden = false;
    } else {
      posterEl.removeAttribute("src");
      posterEl.hidden = true;
    }
  }

  function showPlayOverlay() {
    overlay.hidden = false;
    playBtn.hidden = false;
    modal.classList.remove("is-playing");
  }

  function hidePlayOverlay() {
    overlay.hidden = true;
    playBtn.hidden = true;
  }

  function reset() {
    fileId = null;
    iframe.src = "";
    iframe.hidden = true;
    showPoster("");
    hidePlayOverlay();
    modal.classList.remove("video-modal--mobile", "is-playing");
  }

  function startVideo() {
    if (!fileId) return;
    hidePlayOverlay();
    posterEl.hidden = true;
    iframe.hidden = false;
    iframe.src = embedUrl(fileId);
    modal.classList.add("is-playing");
  }

  function open(id, title, poster) {
    reset();
    fileId = id;
    titleEl.textContent = title || "Video";
    showPoster(poster);
    showPlayOverlay();

    if (isMobile()) {
      modal.classList.add("video-modal--mobile");
    }

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");

    lastFocus = document.activeElement;
    modal.querySelector(".video-modal__close").focus();
  }

  function close() {
    reset();
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("video-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  playBtn.addEventListener("click", startVideo);

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-video-id");
      var title = btn.getAttribute("data-video-title");
      var poster = btn.getAttribute("data-video-poster");
      if (id) open(id, title, poster);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
