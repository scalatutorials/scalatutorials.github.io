(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // GitHub star count, cached in localStorage so repeat visits across pages
    // don't re-hit the API each time (unauthenticated requests are capped at
    // 60/hr). Degrades silently if the API or storage is unavailable.
    var starEl = document.getElementById("gh-star-count");
    if (starEl) {
      var KEY = "st-star-count";
      var TTL = 10 * 60 * 1000; // 10 minutes

      function showStars(n) {
        starEl.textContent = n;
        starEl.classList.remove("hidden");
      }

      function cacheStars(n) {
        try {
          localStorage.setItem(KEY, JSON.stringify({ n: n, t: Date.now() }));
        } catch (e) { /* storage unavailable */ }
      }

      var cached = null;
      try {
        cached = JSON.parse(localStorage.getItem(KEY) || "null");
      } catch (e) { /* ignore malformed cache */ }

      if (cached && cached.n != null && (Date.now() - cached.t) < TTL) {
        showStars(cached.n);
      } else {
        fetch("https://api.github.com/repos/scalatutorials/scalatutorials.github.io")
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (d && d.stargazers_count != null) {
              showStars(d.stargazers_count);
              cacheStars(d.stargazers_count);
            }
          })
          .catch(function () { /* offline or rate-limited; leave count hidden */ });
      }
    }

    // Native share (Web Share API) with a copy-link fallback for browsers
    // that don't support it.
    var shareBtn = document.getElementById("share-native");
    if (shareBtn) {
      var toast = document.getElementById("share-toast");
      var toastTimer;
      var canShare = typeof navigator !== "undefined"
        && typeof navigator.share === "function"
        && window.isSecureContext;

      if (!canShare) {
        shareBtn.setAttribute("aria-label", "Copy link to clipboard");
      }

      function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.remove("opacity-0");
        toast.classList.add("opacity-100");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove("opacity-100");
          toast.classList.add("opacity-0");
        }, 1600);
      }

      function legacyCopy(text) {
        var ok = false;
        try {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          ok = document.execCommand("copy");
          document.body.removeChild(ta);
        } catch (e) {
          ok = false;
        }
        showToast(ok ? "Link copied!" : "Copy failed");
      }

      function copyLink(url) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url)
            .then(function () { showToast("Link copied!"); })
            .catch(function () { legacyCopy(url); });
        } else {
          legacyCopy(url);
        }
      }

      shareBtn.addEventListener("click", function () {
        var url = location.href;
        if (canShare) {
          navigator.share({ title: document.title, url: url }).catch(function (err) {
            // Dismissing the native share sheet rejects with AbortError; only
            // fall back to copying on genuine failures, not cancellation.
            if (!err || err.name !== "AbortError") copyLink(url);
          });
          return;
        }
        copyLink(url);
      });
    }
  });
})();
