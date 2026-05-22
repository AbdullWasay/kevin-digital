(function () {
  var splash = document.getElementById("splash");
  if (!splash) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var LOGO_IN_MS = 80;
  var HOLD_MS = 1400;
  var EXIT_MS = 900;

  function finish() {
    document.body.classList.add("splash-done");
    document.body.classList.remove("splash-active");
    splash.classList.add("is-exiting");
    splash.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      splash.remove();
    }, EXIT_MS + 100);
  }

  if (reduced) {
    finish();
    return;
  }

  window.setTimeout(function () {
    splash.classList.add("is-logo-in");
  }, LOGO_IN_MS);

  window.setTimeout(finish, LOGO_IN_MS + HOLD_MS);
})();
