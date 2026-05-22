(function () {
  function getStackTopPx() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--site-header-height"
    );
    var height = parseFloat(raw) || 80;
    return height + (window.innerWidth < 640 ? 0 : 12);
  }

  function isStuck(el, stackTop) {
    return el.getBoundingClientRect().top <= stackTop + 8;
  }

  function initStack(stackEl) {
    const items = Array.from(stackEl.querySelectorAll(".stack-cards__item"));
    if (items.length === 0) return;

    function applyLayout() {
      const stackTop = getStackTopPx();
      const mobile = window.innerWidth < 640;

      items.forEach((item, index) => {
        item.style.zIndex = String(50 + index);
        if (index < items.length - 1) {
          item.style.marginBottom = mobile ? "1.25rem" : "24px";
        }
        item.style.top = mobile ? "" : stackTop + "px";
      });

      return stackTop;
    }

    function update() {
      const stackTop = applyLayout();

      if (window.innerWidth < 640) {
        items.forEach((item) => {
          item.classList.remove("stack-cards__item--covered");
        });
        return;
      }

      const next = items.map((item, index) => {
        if (!isStuck(item, stackTop)) return false;
        return items.slice(index + 1).some((above) => isStuck(above, stackTop));
      });

      items.forEach((item, index) => {
        item.classList.toggle("stack-cards__item--covered", next[index]);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  document.querySelectorAll("[data-sticky-stack]").forEach(initStack);
})();
