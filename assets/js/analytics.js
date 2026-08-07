/* GA4 interaction events via click delegation (non-invasive; no-op if gtag is blocked) */
(function () {
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  var SHARE_METHOD = {
    "Post on X": "x",
    "Share on Bluesky": "bluesky",
    "Share on LinkedIn": "linkedin",
    "Post to Hacker News": "hacker_news"
  };

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest("#share-native")) {
      var canShare = typeof navigator.share === "function" && window.isSecureContext;
      track("share", { method: canShare ? "native" : "copy_link", content_type: "website" });
      return;
    }

    var shareLink = t.closest("#nav-share a[aria-label]");
    if (shareLink) {
      var method = SHARE_METHOD[shareLink.getAttribute("aria-label")];
      if (method) track("share", { method: method, content_type: "website" });
      return;
    }

    if (t.closest("#gh-star-widget")) {
      track("star_click", { method: "github" });
      return;
    }

    if (t.closest(".scastie li.run-button")) {
      track("run_code", { page_path: location.pathname });
    }
  }, true); // capture phase: Scastie's own click handler calls stopPropagation(),
            // which would otherwise stop this from ever seeing Run button clicks.
})();
