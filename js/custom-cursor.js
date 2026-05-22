(function () {
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  var glow = document.getElementById("custom-cursor-glow");
  var pointer = document.getElementById("custom-cursor-pointer");
  if (!glow || !pointer) return;

  document.body.classList.add("has-custom-cursor");
  glow.classList.add("is-active");
  pointer.classList.add("is-active");

  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var gx = mx;
  var gy = my;
  var hover = false;

  function centerTransform(x, y, scale) {
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

  function setHover(target) {
    if (!target || !target.closest) return;
    hover = !!target.closest(
      "a, button, [role='button'], input, textarea, select, label, .cursor-hover"
    );
    glow.classList.toggle("is-hover", hover);
    pointer.classList.toggle("is-hover", hover);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    pointer.style.transform = centerTransform(mx, my, hover ? 1.1 : 1);
    setHover(e.target);
  }

  function loop() {
    gx += (mx - gx) * 0.15;
    gy += (my - gy) * 0.15;
    glow.style.transform = centerTransform(gx, gy, hover ? 1.08 : 1);
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
