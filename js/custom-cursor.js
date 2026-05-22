(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var glow = document.getElementById("custom-cursor-glow");
  var pointer = document.getElementById("custom-cursor-pointer");
  if (!glow || !pointer) return;

  var lensZoom = pointer.querySelector(".custom-cursor-pointer__lens-zoom");
  var LENS_SIZE = 48;
  var MAGNIFY = 1.75;
  var NAV_SELECTOR = "[data-cursor-nav] a, .site-header .site-nav a";
  var HOVER_SELECTOR =
    "a, button, [role='button'], input, textarea, select, label, .cursor-hover";

  document.body.classList.add("has-custom-cursor");

  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var gx = mx;
  var gy = my;
  var hover = false;
  var navHover = false;
  var activeNavLink = null;

  function glowTransform(x, y, scale) {
    return (
      "translate3d(" +
      x +
      "px, " +
      y +
      "px, 0) translate(-50%, -50%) scale(" +
      scale +
      ")"
    );
  }

  function pointerTransform(x, y) {
    return "translate3d(" + x + "px, " + y + "px, 0)";
  }

  function updateMagnifier(link, x, y) {
    if (!lensZoom || !link) return;

    var cs = window.getComputedStyle(link);
    var rect = link.getBoundingClientRect();
    var localX = x - rect.left;
    var localY = y - rect.top;

    lensZoom.textContent = link.textContent;
    lensZoom.style.fontFamily = cs.fontFamily;
    lensZoom.style.fontSize = cs.fontSize;
    lensZoom.style.fontWeight = cs.fontWeight;
    lensZoom.style.letterSpacing = cs.letterSpacing;
    lensZoom.style.textTransform = cs.textTransform;
    lensZoom.style.color = "#ffffff";
    lensZoom.style.lineHeight = cs.lineHeight;

    lensZoom.style.transform = "scale(" + MAGNIFY + ")";
    lensZoom.style.left = LENS_SIZE / 2 - localX * MAGNIFY + "px";
    lensZoom.style.top = LENS_SIZE / 2 - localY * MAGNIFY + "px";
  }

  function clearMagnifier() {
    activeNavLink = null;
    if (lensZoom) lensZoom.textContent = "";
  }

  function setHover(target) {
    if (!target || !target.closest) return;

    var link = target.closest(NAV_SELECTOR);
    navHover = !!link;
    hover = !!target.closest(HOVER_SELECTOR);

    if (link) {
      activeNavLink = link;
      updateMagnifier(link, mx, my);
    } else {
      clearMagnifier();
    }

    pointer.classList.toggle("is-nav-hover", navHover);
    pointer.classList.toggle("is-hover", hover && !navHover);
    glow.classList.toggle("is-hover", hover);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    pointer.style.transform = pointerTransform(mx, my);

    if (activeNavLink) {
      updateMagnifier(activeNavLink, mx, my);
    }

    setHover(e.target);
  }

  var LAG = 0.045;

  function loop() {
    gx += (mx - gx) * LAG;
    gy += (my - gy) * LAG;
    var scale = hover ? 1.12 : 1;
    glow.style.transform = glowTransform(gx, gy, scale);
    requestAnimationFrame(loop);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener(
    "mouseover",
    function (e) {
      setHover(e.target);
    },
    { passive: true }
  );
  loop();
})();
