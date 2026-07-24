(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (window.scastie && document.getElementById("tour-code")) {
      try {
        scastie.Embedded("#tour-code", {
          theme: dark ? "dark" : "light",
          isWorksheetMode: true,
          targetType: "scala3"
        });
      } catch (e) {
        // Leave the plain <pre> in place if the embed fails.
        console.warn("Scastie embed failed:", e);
      }
    }

    var dialog = document.getElementById("toc-dialog");
    var openBtn = document.getElementById("toc-open");
    var closeBtn = document.getElementById("toc-close");
    if (dialog && openBtn) {
      openBtn.addEventListener("click", function () { dialog.showModal(); });
      if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });
      dialog.addEventListener("click", function (e) {
        if (e.target === dialog) dialog.close();
      });
    }

    // Cmd/Ctrl+Enter runs the code even when the editor isn't focused:
    // forward it to Scastie's own Run button. (When the editor has focus,
    // Scastie handles the shortcut itself.)
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || !(e.metaKey || e.ctrlKey)) return;
      var active = document.activeElement;
      if (active && active.closest && active.closest(".scastie")) return;
      var runBtn = document.querySelector(".scastie li.run-button");
      if (runBtn) {
        e.preventDefault();
        runBtn.click();
      }
    });

    // Arrow-key navigation (skipped while typing in the editor, an input,
    // or while the Contents dialog is open).
    document.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (dialog && dialog.open) return;
      var active = document.activeElement;
      if (active) {
        var tag = active.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable) return;
        if (active.closest && active.closest(".scastie")) return;
      }
      if (e.target && e.target.closest && e.target.closest(".scastie")) return;
      var link = document.querySelector(e.key === "ArrowRight" ? "[data-nav-next]" : "[data-nav-prev]");
      if (link) window.location.href = link.href;
    });

    // Progress tracking; same localStorage key/format as the old site so
    // returning readers keep their checkmarks.
    try {
      var visited = JSON.parse(localStorage.getItem("visited") || "{}") || {};
      visited[location.pathname] = true;
      localStorage.setItem("visited", JSON.stringify(visited));
      document.querySelectorAll("[data-tour-link]").forEach(function (a) {
        if (visited[a.getAttribute("href")]) a.classList.add("visited-page");
      });
    } catch (e) { /* localStorage unavailable */ }
  });
})();
