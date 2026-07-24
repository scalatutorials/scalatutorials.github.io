(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isMac = /Mac|iP(hone|ad|od)/.test(navigator.platform || "");
    document.documentElement.style.setProperty("--run-kbd", isMac ? '"⌘ ↩"' : '"Ctrl+↩"');
    if (!isMac) {
      // Scastie hardcodes its tooltip to "Run (Cmd-Enter)"; its keymap is
      // actually Ctrl-Enter off macOS. Fix the tooltip once the embed mounts.
      var titleTimer = setInterval(function () {
        var btns = document.querySelectorAll(".scastie li.run-button");
        if (btns.length) {
          btns.forEach(function (b) { b.setAttribute("title", "Run (Ctrl+Enter)"); });
          clearInterval(titleTimer);
        }
      }, 500);
      setTimeout(function () { clearInterval(titleTimer); }, 15000);
    }

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

    // A page counts as "seen" only once you move on from it via next/prev
    // (not merely by opening it).
    function markVisited() {
      try {
        var v = JSON.parse(localStorage.getItem("visited") || "{}") || {};
        v[location.pathname] = true;
        localStorage.setItem("visited", JSON.stringify(v));
      } catch (e) { /* localStorage unavailable */ }
    }
    document.querySelectorAll("[data-nav-next], [data-nav-prev]").forEach(function (a) {
      a.addEventListener("click", markVisited);
    });

    document.querySelectorAll("[data-clear-history]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        try { localStorage.removeItem("visited"); } catch (e) { /* unavailable */ }
        document.querySelectorAll("[data-tour-link].visited-page").forEach(function (a) {
          a.classList.remove("visited-page");
        });
        var b = document.getElementById("seen-badge");
        if (b) b.classList.add("hidden");
      });
    });

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
      if (link) {
        markVisited();
        window.location.href = link.href;
      }
    });

    // Progress display; same localStorage key/format as the old site so
    // returning readers keep their checkmarks. (Marking happens in
    // markVisited, on next/prev navigation only.)
    try {
      var visited = JSON.parse(localStorage.getItem("visited") || "{}") || {};
      var seenBadge = document.getElementById("seen-badge");
      if (seenBadge) {
        if (visited[location.pathname]) seenBadge.classList.remove("hidden");
        seenBadge.addEventListener("click", function () {
          try {
            var v = JSON.parse(localStorage.getItem("visited") || "{}") || {};
            delete v[location.pathname];
            localStorage.setItem("visited", JSON.stringify(v));
          } catch (err) { /* localStorage unavailable */ }
          seenBadge.classList.add("hidden");
        });
      }
      document.querySelectorAll("[data-tour-link]").forEach(function (a) {
        if (visited[a.getAttribute("href")]) a.classList.add("visited-page");
      });
    } catch (e) { /* localStorage unavailable */ }
  });
})();
