(function () {
  var modal = document.getElementById("video-modal");
  var iframe = document.getElementById("video-modal-iframe");
  var titleEl = document.getElementById("video-modal-title");
  if (!modal || !iframe || !titleEl) return;

  var triggers = document.querySelectorAll("[data-video-open]");
  var closeEls = document.querySelectorAll("[data-video-close]");
  var lastFocus = null;
  var mobile = window.matchMedia("(max-width: 1023px)");

  function embedUrl(id) {
    return "https://drive.google.com/file/d/" + id + "/preview?usp=embed";
  }

  function open(id, title) {
    iframe.src = embedUrl(id);
    titleEl.textContent = title || "Video";

    if (mobile.matches) {
      modal.classList.add("video-modal--mobile");
    }

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");

    lastFocus = document.activeElement;
    modal.querySelector(".video-modal__close").focus();
  }

  function close() {
    iframe.src = "";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("video-modal--mobile");
    document.body.classList.remove("video-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-video-id");
      var title = btn.getAttribute("data-video-title");
      if (id) open(id, title);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
