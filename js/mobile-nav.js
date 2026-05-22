(function () {
  var toggle = document.getElementById("site-nav-toggle");
  var nav = document.getElementById("site-nav");
  var backdrop = document.getElementById("site-nav-backdrop");
  if (!toggle || !nav) return;

  var mq = window.matchMedia("(min-width: 1024px)");

  function isDesktop() {
    return mq.matches;
  }

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
  }

  function close() {
    setOpen(false);
  }

  function open() {
    if (isDesktop()) return;
    setOpen(true);
  }

  toggle.addEventListener("click", function () {
    if (isDesktop()) return;
    setOpen(!document.body.classList.contains("nav-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", close);
  }

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      close();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  mq.addEventListener("change", function () {
    if (isDesktop()) close();
  });

  window.addEventListener("resize", function () {
    if (isDesktop()) close();
  });
})();
