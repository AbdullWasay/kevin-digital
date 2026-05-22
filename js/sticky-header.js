(function () {
  var header = document.getElementById("site-header");
  var spacer = document.getElementById("site-header-spacer");
  if (!header) return;

  var SCROLL_RANGE = 160;
  var ticking = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function syncHeaderHeight() {
    header.style.setProperty("--nav-p", "0");
    var height = header.offsetHeight;
    document.documentElement.style.setProperty("--site-header-height", height + "px");
    if (spacer) spacer.style.height = height + "px";
    updateNavMorph();
  }

  function updateNavMorph() {
    var raw = Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE));
    var p = easeOutCubic(raw);
    header.style.setProperty("--nav-p", String(p));
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateNavMorph();
      ticking = false;
    });
  }

  syncHeaderHeight();
  updateNavMorph();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", syncHeaderHeight);
  window.addEventListener("load", syncHeaderHeight);
})();
