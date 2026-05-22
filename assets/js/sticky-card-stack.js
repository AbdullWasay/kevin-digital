(function () {
  const STACK_TOP_PX = 100;

  function isStuck(el) {
    return el.getBoundingClientRect().top <= STACK_TOP_PX + 8;
  }

  function initStack(stackEl) {
    const items = Array.from(stackEl.querySelectorAll(".stack-cards__item"));
    if (items.length === 0) return;

    items.forEach((item, index) => {
      item.style.top = STACK_TOP_PX + "px";
      item.style.zIndex = String(50 + index);
      if (index < items.length - 1) {
        item.style.marginBottom = "24px";
      }
    });

    function update() {
      const next = items.map((item, index) => {
        if (!isStuck(item)) return false;
        return items.slice(index + 1).some((above) => isStuck(above));
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
