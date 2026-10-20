/* ==========================================================
   CORTEX UNDER CONSTRUCTION — SITE SCRIPT
   ----------------------------------------------------------
   This file makes the website interactive:
     • opens and closes the mobile menu
     • builds the article cards on the homepage
     • builds the topic tiles
     • runs the search and topic filters on the Articles page
     • shows "Keep exploring" suggestions under each article
     • draws the reading-progress bar on article pages

   You normally do NOT need to edit this file.
   To add or change articles, edit "articles-list.js" instead.
   ========================================================== */

(function () {
  "use strict";

  /* ---------- Small line-drawing icons for each topic ---------- */
  var ICONS = {
    medicine:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 20.5 3.5 13.5a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
    discoveries:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6.5L4.6 18.4A1.8 1.8 0 0 0 6.2 21h11.6a1.8 1.8 0 0 0 1.6-2.6L14 9.5V3"/><path d="M7.2 15h9.6"/></svg>',
    psychology:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5a3 3 0 0 0-5.2 1.3A3 3 0 0 0 4.5 9.6a3.2 3.2 0 0 0 .4 5.2A3 3 0 0 0 8 19.4a2.6 2.6 0 0 0 4 .6Z"/><path d="M12 4.5a3 3 0 0 1 5.2 1.3 3 3 0 0 1 2.3 3.8 3.2 3.2 0 0 1-.4 5.2 3 3 0 0 1-3.1 4.6 2.6 2.6 0 0 1-4-.6Z"/><path d="M12 4.5V20"/></svg>',
    philosophy:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .9-1 1.6v.7"/><path d="M12 17.2h.01"/></svg>',
    society:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M4 10h16"/><path d="M12 3 4 7.5h16Z"/><path d="M6.5 10v8M10 10v8M14 10v8M17.5 10v8"/></svg>',
    growth:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7Z"/><path d="M12 14.5c0-3.2-2.6-5.7-7-5.7 0 3.2 2.6 5.7 7 5.7Z"/><path d="M8 21h8"/></svg>'
  };

  /* ---------- Read the article list (from articles-list.js) ---------- */
  var ARTICLES = typeof SITE_ARTICLES !== "undefined" ? SITE_ARTICLES.slice() : [];
  var CATEGORIES = typeof SITE_CATEGORIES !== "undefined" ? SITE_CATEGORIES.slice() : [];

  // Newest articles first
  ARTICLES.sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });

  /* ---------- Helper functions ---------- */
  function escapeHTML(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getCategory(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].slug === slug) return CATEGORIES[i];
    }
    return null;
  }

  function formatDate(isoDate) {
    var parts = String(isoDate).split("-");
    if (parts.length !== 3) return isoDate;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  function normalise(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[“”‘’"']/g, "");
  }

  function plural(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  /* Builds the HTML for one article card */
  function cardHTML(article) {
    var cat = getCategory(article.category) || { slug: "", name: "" };
    return (
      '<article class="card cat-' + escapeHTML(cat.slug) + '">' +
        '<span class="card-icon" aria-hidden="true">' + (ICONS[cat.slug] || "") + "</span>" +
        '<a class="tag" href="articles.html?topic=' + encodeURIComponent(cat.slug) + '">' + escapeHTML(cat.name) + "</a>" +
        '<h3 class="card-title"><a href="' + escapeHTML(article.file) + '">' + escapeHTML(article.title) + "</a></h3>" +
        '<p class="card-desc">' + escapeHTML(article.description) + "</p>" +
        '<p class="card-meta"><span>' + escapeHTML(article.readingTime) + " min read</span>" +
          '<span aria-hidden="true">·</span>' +
          '<time datetime="' + escapeHTML(article.date) + '">' + escapeHTML(formatDate(article.date)) + "</time></p>" +
      "</article>"
    );
  }

  /* ==========================================================
     1. MOBILE MENU
     ========================================================== */
  function initMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after choosing a link
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ==========================================================
     2. HOMEPAGE: featured cards, topic tiles, recent list
     ========================================================== */
  function initHomepage() {
    var featuredBox = document.getElementById("featured-list");
    if (featuredBox) {
      var featured = ARTICLES.filter(function (a) { return a.featured; }).slice(0, 3);
      if (featured.length < 3) {
        // Top up with the newest articles if fewer than 3 are marked featured
        ARTICLES.forEach(function (a) {
          if (featured.length < 3 && featured.indexOf(a) === -1) featured.push(a);
        });
      }
      featuredBox.innerHTML = featured.map(cardHTML).join("");
    }

    var topicBox = document.getElementById("topic-grid");
    if (topicBox) {
      topicBox.innerHTML = CATEGORIES.map(function (cat) {
        var count = ARTICLES.filter(function (a) { return a.category === cat.slug; }).length;
        return (
          '<a class="topic-tile cat-' + escapeHTML(cat.slug) + '" href="articles.html?topic=' + encodeURIComponent(cat.slug) + '">' +
            '<span class="topic-icon">' + (ICONS[cat.slug] || "") + "</span>" +
            '<span class="topic-name">' + escapeHTML(cat.name) + "</span>" +
            '<span class="topic-desc">' + escapeHTML(cat.description) + "</span>" +
            '<span class="topic-count">' + plural(count, "article") + "</span>" +
          "</a>"
        );
      }).join("");
    }

    var recentBox = document.getElementById("recent-list");
    if (recentBox) {
      recentBox.innerHTML = ARTICLES.slice(0, 6).map(function (a) {
        var cat = getCategory(a.category) || { name: "" };
        return (
          "<li><a href=\"" + escapeHTML(a.file) + "\">" + escapeHTML(a.title) + "</a>" +
          '<span class="meta">' + escapeHTML(cat.name) + " · " + escapeHTML(a.readingTime) + " min read</span></li>"
        );
      }).join("");
    }
  }

  /* ==========================================================
     3. ARTICLES PAGE: search box + topic filters
     ========================================================== */
  function initFinder() {
    var results = document.getElementById("article-results");
    if (!results) return;

    var input = document.getElementById("article-search");
    var form = document.getElementById("finder-form");
    var chipBox = document.getElementById("filter-chips");
    var countEl = document.getElementById("results-count");
    var emptyEl = document.getElementById("no-results");
    var clearBtn = document.getElementById("clear-search");

    // Read any search words or topic from the web address,
    // e.g. articles.html?q=memory or articles.html?topic=medicine
    var params = new URLSearchParams(window.location.search);
    var state = {
      q: params.get("q") || "",
      topic: params.get("topic") || "all"
    };
    if (state.topic !== "all" && !getCategory(state.topic)) state.topic = "all";
    input.value = state.q;

    // Build the topic filter buttons
    var chips = [{ slug: "all", name: "All topics" }].concat(CATEGORIES);
    chipBox.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-topic="' + escapeHTML(c.slug) + '" aria-pressed="false">' + escapeHTML(c.name) + "</button>";
    }).join("");

    function matches(article, words) {
      var cat = getCategory(article.category) || { name: "" };
      var haystack = normalise(
        [article.title, article.description, cat.name, (article.keywords || []).join(" ")].join(" ")
      );
      return words.every(function (word) { return haystack.indexOf(word) !== -1; });
    }

    function update() {
      var words = normalise(state.q).split(/\s+/).filter(Boolean);
      var found = ARTICLES.filter(function (a) {
        var topicOK = state.topic === "all" || a.category === state.topic;
        return topicOK && matches(a, words);
      });

      results.innerHTML = found.map(cardHTML).join("");
      emptyEl.hidden = found.length !== 0;

      // Highlight the selected topic button
      Array.prototype.forEach.call(chipBox.querySelectorAll(".chip"), function (chip) {
        chip.setAttribute("aria-pressed", chip.getAttribute("data-topic") === state.topic ? "true" : "false");
      });

      // Describe the results in words (also read aloud by screen readers)
      var text = "Showing " + plural(found.length, "article");
      if (state.q.trim()) text += " matching “" + state.q.trim() + "”";
      if (state.topic !== "all") text += " in " + getCategory(state.topic).name;
      countEl.textContent = text + ".";

      // Keep the web address in sync so searches can be bookmarked or shared
      var newParams = new URLSearchParams();
      if (state.q.trim()) newParams.set("q", state.q.trim());
      if (state.topic !== "all") newParams.set("topic", state.topic);
      var query = newParams.toString();
      try {
        window.history.replaceState(null, "", query ? "?" + query : window.location.pathname);
      } catch (e) { /* some browsers block this for local files; that's fine */ }
    }

    input.addEventListener("input", function () {
      state.q = input.value;
      update();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      state.q = input.value;
      update();
    });

    chipBox.addEventListener("click", function (event) {
      var chip = event.target.closest(".chip");
      if (!chip) return;
      state.topic = chip.getAttribute("data-topic");
      update();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        state.q = "";
        state.topic = "all";
        input.value = "";
        update();
        input.focus();
      });
    }

    update();
  }

  /* ==========================================================
     4. ARTICLE PAGES: "Keep exploring" suggestions
     ========================================================== */
  function initRelated() {
    var box = document.getElementById("related-list");
    if (!box) return;
    var currentId = box.getAttribute("data-current");
    var current = ARTICLES.filter(function (a) { return a.id === currentId; })[0];

    var picks = [];
    if (current && current.related) {
      current.related.forEach(function (id) {
        var match = ARTICLES.filter(function (a) { return a.id === id; })[0];
        if (match) picks.push(match);
      });
    }
    // Top up with other recent articles
    ARTICLES.forEach(function (a) {
      if (picks.length < 3 && a.id !== currentId && picks.indexOf(a) === -1) picks.push(a);
    });

    box.innerHTML = picks.slice(0, 3).map(cardHTML).join("");
  }

  /* ==========================================================
     5. ARTICLE PAGES: reading-progress bar
     ========================================================== */
  function initProgress() {
    var bar = document.querySelector(".reading-progress span");
    var article = document.querySelector(".article");
    if (!bar || !article) return;

    var ticking = false;
    function draw() {
      var rect = article.getBoundingClientRect();
      var total = article.offsetHeight - window.innerHeight;
      var progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      bar.style.transform = "scaleX(" + progress + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(draw);
        ticking = true;
      }
    }, { passive: true });
    draw();
  }

  /* ==========================================================
     6. EXTRA MENU PAGES (listed in SITE_PAGES in articles-list.js)
     Adds each page to the top menu just before "About", and to
     the footer links.
     ========================================================== */
  function initExtraPages() {
    if (typeof SITE_PAGES === "undefined" || !SITE_PAGES.length) return;
    var here = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    function addTo(list, markCurrent) {
      if (!list) return;
      var items = list.querySelectorAll("li");
      var before = null;
      Array.prototype.forEach.call(items, function (li) {
        var a = li.querySelector("a");
        if (a && /about\.html$/.test(a.getAttribute("href") || "")) before = li;
      });
      SITE_PAGES.forEach(function (p) {
        if (!p || !p.name || !p.file) return;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = p.file;
        a.textContent = p.name;
        if (markCurrent && String(p.file).toLowerCase() === here) a.setAttribute("aria-current", "page");
        li.appendChild(a);
        list.insertBefore(li, before);
      });
    }

    addTo(document.querySelector("#site-nav ul"), true);
    addTo(document.querySelector(".footer-links"), false);
  }

  /* ==========================================================
     7. FOOTER: keep the copyright year current
     ========================================================== */
  function initYear() {
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
      el.textContent = year;
    });
  }

  /* ---------- Start everything ---------- */
  initExtraPages();
  initMenu();
  initHomepage();
  initFinder();
  initRelated();
  initProgress();
  initYear();
})();
