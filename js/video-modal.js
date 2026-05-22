(function () {
  var modal = document.getElementById("video-modal");
  var iframe = document.getElementById("video-modal-iframe");
  var titleEl = document.getElementById("video-modal-title");
  if (!modal || !iframe || !titleEl) return;

  var triggers = document.querySelectorAll("[data-video-open]");
  var closeEls = document.querySelectorAll("[data-video-close]");
  var lastFocus = null;

  function embedUrl(fileId) {
    return "https://drive.google.com/file/d/" + fileId + "/preview";
  }

  function openModal(fileId, title) {
    lastFocus = document.activeElement;
    iframe.src = embedUrl(fileId);
    titleEl.textContent = title || "Video";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("video-modal-open");
    var closeBtn = modal.querySelector(".video-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    iframe.src = "";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
    document.body.classList.remove("video-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var fileId = btn.getAttribute("data-video-id");
      var title = btn.getAttribute("data-video-title");
      if (fileId) openModal(fileId, title);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
