(function () {
  var DESKTOP_MIN = 1024;

  function isDesktopStack() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  function getStackTopPx() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--site-header-height"
    );
    var height = parseFloat(raw) || 80;
    return height + 12;
  }

  function isStuck(el, stackTop) {
    return el.getBoundingClientRect().top <= stackTop + 8;
  }

  function initStack(stackEl) {
    var items = Array.from(stackEl.querySelectorAll(".stack-cards__item"));
    if (items.length === 0) return;

    function clearInlineLayout() {
      items.forEach(function (item) {
        item.style.zIndex = "";
        item.style.marginBottom = "";
        item.style.top = "";
      });
    }

    function applyLayout() {
      if (!isDesktopStack()) {
        clearInlineLayout();
        return 0;
      }

      var stackTop = getStackTopPx();
      items.forEach(function (item, index) {
        item.style.zIndex = String(50 + index);
        if (index < items.length - 1) {
          item.style.marginBottom = "24px";
        }
        item.style.top = stackTop + "px";
      });

      return stackTop;
    }

    function update() {
      if (!isDesktopStack()) {
        items.forEach(function (item) {
          item.classList.remove("stack-cards__item--covered");
        });
        clearInlineLayout();
        return;
      }

      var stackTop = applyLayout();
      var next = items.map(function (item, index) {
        if (!isStuck(item, stackTop)) return false;
        return items.slice(index + 1).some(function (above) {
          return isStuck(above, stackTop);
        });
      });

      items.forEach(function (item, index) {
        item.classList.toggle("stack-cards__item--covered", next[index]);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  document.querySelectorAll("[data-sticky-stack]").forEach(initStack);
})();
