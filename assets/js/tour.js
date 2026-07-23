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
