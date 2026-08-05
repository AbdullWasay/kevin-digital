(function () {
  var list = document.querySelector("[data-kpi-list]");
  if (!list) return;

  var items = Array.from(list.querySelectorAll("[data-kpi]"));
  if (items.length === 0) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ENTER_RATIO = 0.28;
  var EXIT_RATIO = 0.12;
  var stateByItem = new WeakMap();

  function getState(item) {
    var state = stateByItem.get(item);
    if (!state) {
      state = { active: false, rafId: 0, timeoutId: 0 };
      stateByItem.set(item, state);
    }
    return state;
  }

  function formatValue(value, unit, suffix, decimals) {
    if (unit === "M") {
      if (value < 0.05) return "";
      return value.toFixed(decimals) + unit + suffix;
    }
    if (unit === "k" || unit === "K") {
      if (value < 1) return "";
      return Math.round(value) + unit + suffix;
    }
    if (value < 1) return "";
    return Math.round(value) + suffix;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function cancelMotion(item) {
    var state = getState(item);
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
      state.timeoutId = 0;
    }
  }

  function resetItem(item) {
    cancelMotion(item);
    var state = getState(item);
    state.active = false;

    item.classList.remove("is-visible");
    item.style.transitionDelay = "";
    item.style.removeProperty("--kpi-fill");

    var valueEl = item.querySelector(".kpi-item__value");
    if (valueEl) {
      valueEl.textContent = "";
      valueEl.classList.remove("is-done");
    }

    var fill = item.querySelector(".kpi-progress-row__fill");
    if (fill) {
      fill.style.transitionDelay = "";
    }
  }

  function animateCount(item) {
    var valueEl = item.querySelector(".kpi-item__value");
    if (!valueEl) return;

    var state = getState(item);
    var target = parseFloat(item.getAttribute("data-value")) || 0;
    var unit = item.getAttribute("data-unit") || "";
    var suffix = item.getAttribute("data-suffix") || "";
    var fillPct = parseFloat(item.getAttribute("data-fill")) || 75;
    var decimals = unit === "M" || String(target).indexOf(".") >= 0 ? 1 : 0;
    var duration = 1400;
    var start = null;

    cancelMotion(item);

    if (reduced) {
      valueEl.textContent = formatValue(target, unit, suffix, decimals);
      item.style.setProperty("--kpi-fill", fillPct + "%");
      return;
    }

    function frame(ts) {
      if (!state.active) return;

      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = easeOutCubic(t);
      var current = target * eased;
      valueEl.textContent = formatValue(current, unit, suffix, decimals);

      if (t < 1) {
        state.rafId = requestAnimationFrame(frame);
      } else {
        state.rafId = 0;
        valueEl.textContent = formatValue(target, unit, suffix, decimals);
        valueEl.classList.add("is-done");
      }
    }

    state.rafId = requestAnimationFrame(frame);
  }

  function revealItem(item, index) {
    var state = getState(item);
    if (state.active) return;
    state.active = true;

    var fillPct = parseFloat(item.getAttribute("data-fill")) || 75;
    item.style.transitionDelay = index * 0.14 + "s";
    item.style.setProperty("--kpi-fill", fillPct + "%");

    var fill = item.querySelector(".kpi-progress-row__fill");
    if (fill) {
      fill.style.transitionDelay = 0.35 + index * 0.12 + "s";
    }

    item.classList.add("is-visible");

    state.timeoutId = window.setTimeout(function () {
      state.timeoutId = 0;
      if (state.active) animateCount(item);
    }, index * 140 + 320);
  }

  if (reduced) {
    items.forEach(function (item, i) {
      revealItem(item, i);
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var item = entry.target;
        var index = items.indexOf(item);
        var ratio = entry.intersectionRatio;
        var state = getState(item);

        if (ratio >= ENTER_RATIO && !state.active) {
          revealItem(item, index);
          return;
        }

        if (ratio <= EXIT_RATIO && state.active) {
          resetItem(item);
        }
      });
    },
    {
      threshold: [0, EXIT_RATIO, ENTER_RATIO, 0.5, 0.75],
      rootMargin: "0px 0px -6% 0px",
    }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
