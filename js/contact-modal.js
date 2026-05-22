(function () {
  var modal = document.getElementById("contact-modal");
  if (!modal) return;

  var form = document.getElementById("contact-form");
  var triggers = document.querySelectorAll("[data-contact-open]");
  var closeEls = modal.querySelectorAll("[data-contact-close]");
  var lastFocus = null;
  var closeTimer = null;
  var SUCCESS_MS = 2000;

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    var toggle = document.getElementById("site-nav-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    var backdrop = document.getElementById("site-nav-backdrop");
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.setAttribute("aria-hidden", "true");
    }
  }

  function resetForm() {
    if (!form) return;
    form.classList.remove("is-sent");
    form.reset();
  }

  function openModal() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    resetForm();
    closeMobileNav();
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("contact-modal-open");
    var firstField = form && form.querySelector("input, textarea");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
    document.body.classList.remove("contact-modal-open");
    resetForm();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
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

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("is-sent");
      closeTimer = window.setTimeout(closeModal, SUCCESS_MS);
    });
  }
})();
