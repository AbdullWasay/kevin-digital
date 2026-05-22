(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const gradient1 = document.body.dataset.gradient1;
  const gradient2 = document.body.dataset.gradient2;
  if (!gradient1 || !gradient2) return;

  const glow = document.createElement("div");
  glow.className = "custom-cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  glow.style.backgroundImage = `url(${gradient2}), url(${gradient1})`;

  const pointer = document.createElement("div");
  pointer.className = "custom-cursor-pointer";
  pointer.setAttribute("aria-hidden", "true");
  pointer.innerHTML =
    '<svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M1 1V17.5L4.2 13.8L7.2 19.5L9.5 18.3L6.5 12.6H12.5L1 1Z" fill="currentColor" stroke="white" stroke-width="1.2" stroke-linejoin="round"/></svg>';

  document.body.appendChild(glow);
  document.body.appendChild(pointer);
  document.body.classList.add("has-custom-cursor");

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let gx = mx;
  let gy = my;
  let hover = false;
  let raf = 0;

  function setHover(target) {
    hover = !!target?.closest(
      "a, button, [role='button'], input, textarea, select, label, .cursor-hover"
    );
    glow.classList.toggle("is-hover", hover);
    pointer.classList.toggle("is-hover", hover);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    pointer.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    setHover(e.target);
  }

  function loop() {
    gx += (mx - gx) * 0.1;
    gy += (my - gy) * 0.1;
    const scale = hover ? 1.15 : 1;
    glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${scale})`;
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("mousemove", onMove);
  raf = requestAnimationFrame(loop);
})();
