(function () {
  var modal = document.getElementById("video-modal");
  var player = document.getElementById("video-modal-player");
  var iframe = document.getElementById("video-modal-iframe");
  var video = document.getElementById("video-modal-video");
  var playHit = document.getElementById("video-modal-play-hit");
  var titleEl = document.getElementById("video-modal-title");
  if (!modal || !player || !iframe || !video || !titleEl) return;

  var MOBILE_QUERY = window.matchMedia("(max-width: 1023px)");
  var triggers = document.querySelectorAll("[data-video-open]");
  var closeEls = document.querySelectorAll("[data-video-close]");
  var lastFocus = null;
  var wantsPlay = false;

  function isMobile() {
    return MOBILE_QUERY.matches;
  }

  function setPlayHitVisible(on) {
    if (!playHit || !isMobile()) return;
    playHit.hidden = !on;
  }

  function attemptPlay() {
    if (!isMobile() || video.hidden) return;
    var promise = video.play();
    if (promise && promise.catch) {
      promise.catch(function () {
        setPlayHitVisible(true);
      });
    }
  }

  function resetPlayers() {
    wantsPlay = false;
    setPlayHitVisible(false);
    iframe.src = "";
    iframe.hidden = true;
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    video.hidden = true;
  }

  function openNative(src, poster) {
    iframe.hidden = true;
    iframe.src = "";

    video.hidden = false;
    if (poster) video.poster = poster;
    else video.removeAttribute("poster");

    wantsPlay = isMobile();
    setPlayHitVisible(false);
    video.src = src;
    video.load();
  }

  function open(id, title, poster, fileSrc) {
    if (!fileSrc) return;

    titleEl.textContent = title || "Video";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");
    lastFocus = document.activeElement;

    openNative(fileSrc, poster || "");

    if (!isMobile()) {
      modal.querySelector(".video-modal__close").focus();
    }
  }

  function close() {
    resetPlayers();
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("video-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onVideoCanPlay() {
    if (wantsPlay) attemptPlay();
  }

  function onVideoPlaying() {
    wantsPlay = false;
    setPlayHitVisible(false);
  }

  function onVideoPause() {
    if (!video.hidden && !video.ended) setPlayHitVisible(true);
  }

  function onVideoError() {
    setPlayHitVisible(true);
  }

  if (playHit) {
    playHit.addEventListener("click", function () {
      wantsPlay = true;
      setPlayHitVisible(false);
      attemptPlay();
    });
  }

  video.addEventListener("canplay", onVideoCanPlay);
  video.addEventListener("playing", onVideoPlaying);
  video.addEventListener("pause", onVideoPause);
  video.addEventListener("error", onVideoError);

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-video-title");
      var poster = btn.getAttribute("data-video-poster");
      var fileSrc = btn.getAttribute("data-video-src");
      if (fileSrc) open(null, title, poster, fileSrc);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
