(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var glow = document.getElementById("custom-cursor-glow");
  var pointer = document.getElementById("custom-cursor-pointer");
  if (!glow || !pointer) return;

  var lens = pointer.querySelector(".custom-cursor-pointer__lens");
  var dot = pointer.querySelector(".custom-cursor-pointer__dot");
  if (!lens || !dot) return;

  var CIRCLE_OFFSET_X = -4;
  var CIRCLE_OFFSET_Y = -4;
  var LENS_HOVER_SELECTOR =
    "a, button, [role='button'], img, input, textarea, select, label, .cursor-hover";

  document.body.classList.add("has-custom-cursor");

  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var gx = mx;
  var gy = my;
  var lensHover = false;

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

  function circlePos(x, y) {
    return { x: x + CIRCLE_OFFSET_X, y: y + CIRCLE_OFFSET_Y };
  }

  function placeCursor(x, y) {
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
  }

  function isLensTarget(target) {
    if (!target || !target.closest) return false;
    if (target.closest(".splash, #splash")) return false;
    return !!target.closest(LENS_HOVER_SELECTOR);
  }

  function setHover(target) {
    if (!target || !target.closest) return;

    lensHover = isLensTarget(target);
    pointer.classList.toggle("is-lens-hover", lensHover);
    glow.classList.toggle("is-hover", lensHover);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    var c = circlePos(mx, my);
    placeCursor(c.x, c.y);
    setHover(e.target);
  }

  var LAG = 0.045;

  function loop() {
    var c = circlePos(mx, my);
    gx += (c.x - gx) * LAG;
    gy += (c.y - gy) * LAG;
    var scale = lensHover ? 1.12 : 1;
    glow.style.transform = glowTransform(gx, gy, scale);
    requestAnimationFrame(loop);
  }

  placeCursor(
    circlePos(mx, my).x,
    circlePos(mx, my).y
  );

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
