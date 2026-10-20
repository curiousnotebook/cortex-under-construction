/* ==========================================================
   CORTEX UNDER CONSTRUCTION — REACTIONS, DISCUSSION & LOGIN
   ----------------------------------------------------------
   This file adds, at the end of every article:
     • a row of reactions (one per reader per article)
     • a discussion section where readers join with just a
       display name (no email or password)
   and powers the author sign-in page (login.html).

   It uses Firebase, a free Google service, to store accounts,
   comments and reactions. Your Firebase settings go in
   "firebase-config.js". Until those are filled in, the
   discussion section simply stays hidden.

   You normally do NOT need to edit this file — except to
   change the reactions in the list just below.
   ========================================================== */

const SDK = "https://www.gstatic.com/firebasejs/13.0.0/";

/* The reactions shown after each article.
   If you change a "type" here, change it in your Firestore
   rules too (the list near "reactions"). */
const REACTIONS = [
  { type: "heart",     emoji: "❤️", label: "Loved it" },
  { type: "curious",   emoji: "🤔", label: "Curious" },
  { type: "learned",   emoji: "💡", label: "Learned something" },
  { type: "skeptical", emoji: "🤨", label: "Not convinced" },
  { type: "dislike",   emoji: "😕", label: "Didn’t like it" }
];

const DEFAULT_AUTHOR_NAME = "Cortex Under Construction";
const RESERVED_NAMES = /(cortex|admin|author|moderator)/i;   // readers can't use these
const MAX_COMMENT = 2000;

/* ---------- Is Firebase set up yet? ---------- */
const config = window.CORTEX_FIREBASE_CONFIG;
const isConfigured = !!(
  config &&
  typeof config.apiKey === "string" &&
  config.apiKey.length > 10 &&
  !/PASTE/i.test(JSON.stringify(config))
);

const discussionRoot = document.getElementById("discussion");
const loginRoot = document.getElementById("author-login");

/* ---------- Small helpers ---------- */
function friendlyDate(ts) {
  try {
    const d = ts && typeof ts.toDate === "function" ? ts.toDate() : null;
    if (!d) return "just now";
    return d.toLocaleString("en-GB", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  } catch (e) {
    return "";
  }
}

function avatarColour(name) {
  const palette = ["#E3EADA", "#ECE8F2", "#E1EAEA", "#F4E5DA", "#ECF0D6", "#F1EADA"];
  let h = 0;
  for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

function whenVisible(node, callback) {
  // Only talk to Firebase when the reader scrolls near the discussion.
  // This keeps you well within Firebase's free daily allowance.
  if (!("IntersectionObserver" in window)) return callback();
  const observer = new IntersectionObserver(function (entries) {
    if (entries.some(function (e) { return e.isIntersecting; })) {
      observer.disconnect();
      callback();
    }
  }, { rootMargin: "700px 0px" });
  observer.observe(node);
}

function cleanName(raw) {
  return String(raw || "").trim().replace(/\s+/g, " ");
}

async function loadFirebase() {
  const mods = await Promise.all([
    import(SDK + "firebase-app.js"),
    import(SDK + "firebase-auth.js"),
    import(SDK + "firebase-firestore.js")
  ]);
  return Object.assign({}, mods[0], mods[1], mods[2]);
}

const UNAVAILABLE_HTML =
  '<div class="container narrow"><p class="discussion-status is-error">The discussion can’t load right now. Please try again later.</p></div>';

/* ==========================================================
   START
   ========================================================== */
async function main() {
  if (!discussionRoot && !loginRoot) return;

  if (!isConfigured) {
    if (loginRoot) {
      loginRoot.innerHTML =
        '<div class="auth-card"><h2>Not connected yet</h2>' +
        '<p class="discussion-sub">Sign-in will work once your Firebase settings are pasted into <code>firebase-config.js</code>. See the setup steps in README.md.</p></div>';
    }
    return;
  }

  let fb;
  try {
    fb = await loadFirebase();
  } catch (err) {
    console.error(err);
    if (discussionRoot) { discussionRoot.hidden = false; discussionRoot.innerHTML = UNAVAILABLE_HTML; }
    if (loginRoot) loginRoot.innerHTML = UNAVAILABLE_HTML;
    return;
  }

  const app = fb.initializeApp(config);
  const auth = fb.getAuth(app);
  const db = fb.getFirestore(app);

  if (discussionRoot) initDiscussion(fb, auth, db, discussionRoot);
  if (loginRoot) initLogin(fb, auth, db, loginRoot);
}

/* ==========================================================
   REACTIONS + DISCUSSION (on article pages)
   ========================================================== */
function initDiscussion(fb, auth, db, root) {
  const articleId = root.getAttribute("data-article");
  if (!articleId || !/^[a-z0-9-]{1,60}$/.test(articleId)) return;

  const reactionButtons = REACTIONS.map(function (r) {
    return (
      '<button type="button" class="reaction" data-type="' + r.type + '" aria-pressed="false">' +
        '<span class="r-emoji" aria-hidden="true">' + r.emoji + "</span>" +
        '<span class="r-label">' + r.label + "</span>" +
        '<span class="r-count" aria-hidden="true">·</span>' +
      "</button>"
    );
  }).join("");

  root.hidden = false;
  root.innerHTML =
    '<div class="container narrow">' +
      '<div class="reactions-card">' +
        '<h2 class="discussion-title" id="react-heading">How did this essay land?</h2>' +
        '<p class="discussion-sub">Tap a reaction. Tap it again to take it back, or pick another if you change your mind.</p>' +
        '<div class="reaction-bar" role="group" aria-labelledby="react-heading">' + reactionButtons + "</div>" +
      "</div>" +

      '<div class="comments-card">' +
        '<h2 class="discussion-title">Discussion <span class="comment-count"></span></h2>' +
        '<p class="discussion-sub">Questions, counter-arguments and further reading are all welcome. Please be kind and stay on topic. Comments are not medical advice, and the author may remove comments that break these simple rules.</p>' +

        '<form class="join-form" hidden novalidate>' +
          '<label class="field-label" for="join-name">Choose a display name to join</label>' +
          '<div class="inline-field">' +
            '<input id="join-name" type="text" maxlength="30" autocomplete="nickname" placeholder="e.g. Curious Reader">' +
            '<button class="button" type="submit">Join</button>' +
          "</div>" +
          '<p class="field-hint">No email or password needed. Your account is kept in this browser, so you’ll stay signed in on this device. To stay anonymous, avoid using your full real name.</p>' +
        "</form>" +

        '<form class="comment-form" hidden novalidate>' +
          '<p class="commenting-as">Commenting as <strong class="as-name"></strong> <span class="author-badge as-badge" hidden>Author</span> · <button type="button" class="link-btn change-name">Change name</button></p>' +
          '<label class="visually-hidden" for="comment-text">Your comment</label>' +
          '<textarea id="comment-text" rows="4" maxlength="' + MAX_COMMENT + '" placeholder="Share a thought, a question or a source…"></textarea>' +
          '<div class="form-row"><span class="char-count">0 / ' + MAX_COMMENT + '</span><button class="button" type="submit">Post comment</button></div>' +
        "</form>" +

        '<form class="name-form" hidden novalidate>' +
          '<label class="field-label" for="new-name">New display name</label>' +
          '<div class="inline-field">' +
            '<input id="new-name" type="text" maxlength="30" autocomplete="nickname">' +
            '<button class="button" type="submit">Save</button>' +
            '<button type="button" class="link-btn cancel-name">Cancel</button>' +
          "</div>" +
          '<p class="field-hint">Comments you’ve already posted keep the name they were posted with.</p>' +
        "</form>" +

        '<p class="discussion-status" role="status" aria-live="polite"></p>' +
        '<ol class="comment-list"></ol>' +
        '<p class="comments-empty" hidden>No comments yet. Be the first to start the conversation.</p>' +
      "</div>" +
    "</div>";

  const $ = function (s) { return root.querySelector(s); };
  const bar = $(".reaction-bar");
  const statusEl = $(".discussion-status");
  const joinForm = $(".join-form");
  const joinInput = $("#join-name");
  const commentForm = $(".comment-form");
  const textArea = $("#comment-text");
  const charCount = $(".char-count");
  const asName = $(".as-name");
  const asBadge = $(".as-badge");
  const nameForm = $(".name-form");
  const nameInput = $("#new-name");
  const list = $(".comment-list");
  const countEl = $(".comment-count");
  const emptyEl = $(".comments-empty");

  const state = {
    user: null, profile: null, mine: null, counts: {}, comments: [],
    ready: false, busy: false, creating: false
  };
  REACTIONS.forEach(function (r) { state.counts[r.type] = 0; });

  const reactionsCol = fb.collection(db, "articles", articleId, "reactions");
  const commentsCol = fb.collection(db, "articles", articleId, "comments");

  function isAuthorUser() { return !!(state.user && !state.user.isAnonymous); }

  function say(msg, isError) {
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-error", !!isError);
  }

  /* ---------- Drawing ---------- */
  function renderReactions() {
    bar.classList.toggle("is-loading", !state.ready);
    bar.querySelectorAll(".reaction").forEach(function (btn) {
      const type = btn.getAttribute("data-type");
      const r = REACTIONS.find(function (x) { return x.type === type; });
      const n = state.counts[type] || 0;
      const mine = state.mine === type;
      btn.querySelector(".r-count").textContent = state.ready ? String(n) : "·";
      btn.setAttribute("aria-pressed", mine ? "true" : "false");
      btn.setAttribute("aria-label",
        r.label + ", " + n + (n === 1 ? " reaction" : " reactions") + (mine ? ", your reaction" : ""));
    });
  }

  function renderForms() {
    const hasProfile = !!state.profile;
    joinForm.hidden = !state.ready || hasProfile;
    commentForm.hidden = !state.ready || !hasProfile;
    nameForm.hidden = true;
    if (hasProfile) {
      asName.textContent = state.profile.name;
      asBadge.hidden = !isAuthorUser();
    } else if (isAuthorUser() && !joinInput.value) {
      joinInput.value = DEFAULT_AUTHOR_NAME;
    }
  }

  function renderComments() {
    list.innerHTML = "";
    state.comments.forEach(function (c) {
      const li = document.createElement("li");
      li.className = "comment" + (c.isAuthor ? " comment--author" : "");

      const head = document.createElement("div");
      head.className = "comment-head";

      const avatar = document.createElement("span");
      avatar.className = "comment-avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = String(c.name || "?").trim().charAt(0).toUpperCase();
      avatar.style.background = c.isAuthor ? "var(--butter)" : avatarColour(c.name || "");

      const name = document.createElement("span");
      name.className = "comment-name";
      name.textContent = c.name || "Reader";
      head.append(avatar, name);

      if (c.isAuthor) {
        const badge = document.createElement("span");
        badge.className = "author-badge";
        badge.textContent = "Author";
        head.append(badge);
      }

      const time = document.createElement("time");
      time.className = "comment-time";
      time.textContent = friendlyDate(c.createdAt);
      head.append(time);

      const text = document.createElement("p");
      text.className = "comment-text";
      text.textContent = c.text || "";

      li.append(head, text);

      if (state.user && (isAuthorUser() || c.uid === state.user.uid)) {
        const del = document.createElement("button");
        del.type = "button";
        del.className = "link-btn comment-delete";
        del.textContent = "Delete";
        del.addEventListener("click", function () { removeComment(c); });
        li.append(del);
      }
      list.append(li);
    });

    const n = state.comments.length;
    countEl.textContent = n ? "(" + n + ")" : "";
    emptyEl.hidden = !state.ready || n !== 0;
  }

  function renderAll() { renderReactions(); renderForms(); renderComments(); }

  /* ---------- Loading data ---------- */
  async function loadCounts() {
    await Promise.all(REACTIONS.map(async function (r) {
      const snap = await fb.getCountFromServer(fb.query(reactionsCol, fb.where("type", "==", r.type)));
      state.counts[r.type] = snap.data().count;
    }));
  }

  async function loadComments() {
    const snap = await fb.getDocs(fb.query(commentsCol, fb.orderBy("createdAt", "desc"), fb.limit(100)));
    state.comments = snap.docs.map(function (d) {
      return Object.assign({ id: d.id }, d.data());
    }).reverse();
  }

  async function loadMine() {
    const u = state.user;
    if (!u) return;
    const results = await Promise.all([
      fb.getDoc(fb.doc(db, "profiles", u.uid)),
      fb.getDoc(fb.doc(reactionsCol, u.uid))
    ]);
    if (state.user !== u) return;
    state.profile = results[0].exists() ? results[0].data() : null;
    state.mine = results[1].exists() ? results[1].data().type : null;
  }

  async function ensureUser() {
    if (state.user) return state.user;
    state.creating = true;
    try {
      const cred = await fb.signInAnonymously(auth);   // an account with no email or password
      state.user = cred.user;
      return cred.user;
    } finally {
      state.creating = false;
    }
  }

  fb.onAuthStateChanged(auth, async function (u) {
    if (u && state.user && u.uid === state.user.uid) return;   // same person, nothing to do
    state.user = u;
    state.profile = null;
    state.mine = null;
    if (u && state.ready && !state.creating) {
      try { await loadMine(); } catch (e) { console.error(e); }
    }
    renderAll();
  });

  whenVisible(root, async function () {
    say("Loading the discussion…");
    try {
      await Promise.all([loadCounts(), loadComments(), state.user ? loadMine() : null]);
      say("");
    } catch (e) {
      console.error(e);
      say("The discussion couldn’t be loaded right now. Please try again later.", true);
    }
    state.ready = true;
    renderAll();
  });

  renderAll();

  /* ---------- Reactions ---------- */
  async function react(type) {
    if (!state.ready || state.busy) return;
    state.busy = true;
    say("");
    try {
      const u = await ensureUser();
      const ref = fb.doc(reactionsCol, u.uid);
      if (state.mine === type) {
        await fb.deleteDoc(ref);
        state.counts[type] = Math.max(0, state.counts[type] - 1);
        state.mine = null;
      } else {
        await fb.setDoc(ref, { type: type, updatedAt: fb.serverTimestamp() });
        if (state.mine) state.counts[state.mine] = Math.max(0, state.counts[state.mine] - 1);
        state.counts[type] += 1;
        state.mine = type;
      }
    } catch (e) {
      console.error(e);
      say("Sorry, your reaction couldn’t be saved. Please try again.", true);
    } finally {
      state.busy = false;
      renderReactions();
    }
  }

  bar.addEventListener("click", function (e) {
    const btn = e.target.closest(".reaction");
    if (btn) react(btn.getAttribute("data-type"));
  });

  /* ---------- Names ---------- */
  function checkName(raw) {
    const name = cleanName(raw);
    if (name.length < 2 || name.length > 30) return { error: "Please choose a name between 2 and 30 characters." };
    if (!isAuthorUser() && RESERVED_NAMES.test(name)) return { error: "That name is reserved. Please choose another." };
    return { name: name };
  }

  joinForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (state.busy) return;
    const check = checkName(joinInput.value);
    if (check.error) return say(check.error, true);
    state.busy = true;
    say("Creating your account…");
    try {
      const u = await ensureUser();
      await fb.setDoc(fb.doc(db, "profiles", u.uid), {
        name: check.name,
        lastCommentAt: fb.Timestamp.fromMillis(0)
      });
      state.profile = { name: check.name };
      renderForms();
      renderComments();
      say("Welcome, " + check.name + "! You can now post a comment.");
      textArea.focus();
    } catch (err) {
      console.error(err);
      say("Sorry, your account couldn’t be created. Please try again.", true);
    } finally {
      state.busy = false;
    }
  });

  $(".change-name").addEventListener("click", function () {
    commentForm.hidden = true;
    nameForm.hidden = false;
    nameInput.value = state.profile ? state.profile.name : "";
    nameInput.focus();
  });

  $(".cancel-name").addEventListener("click", function () {
    renderForms();
  });

  nameForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (state.busy || !state.user) return;
    const check = checkName(nameInput.value);
    if (check.error) return say(check.error, true);
    state.busy = true;
    try {
      await fb.setDoc(fb.doc(db, "profiles", state.user.uid), { name: check.name }, { merge: true });
      state.profile = Object.assign({}, state.profile, { name: check.name });
      say("Your name is now " + check.name + ".");
      renderForms();
    } catch (err) {
      console.error(err);
      say("Sorry, your name couldn’t be changed. Please try again.", true);
    } finally {
      state.busy = false;
    }
  });

  /* ---------- Comments ---------- */
  function updateCharCount() {
    charCount.textContent = textArea.value.length + " / " + MAX_COMMENT;
  }
  textArea.addEventListener("input", updateCharCount);

  commentForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (state.busy || !state.user || !state.profile) return;
    const text = textArea.value.trim();
    if (text.length < 2) return say("Please write a little more before posting.", true);
    if (text.length > MAX_COMMENT) return say("Comments can be up to 2,000 characters.", true);

    state.busy = true;
    say("Posting…");
    try {
      const batch = fb.writeBatch(db);
      batch.set(fb.doc(commentsCol), {
        uid: state.user.uid,
        name: state.profile.name,
        text: text,
        createdAt: fb.serverTimestamp(),
        isAuthor: isAuthorUser()
      });
      // Records the time of this comment, so readers can't post more than once every 30 seconds
      batch.set(fb.doc(db, "profiles", state.user.uid), { lastCommentAt: fb.serverTimestamp() }, { merge: true });
      await batch.commit();
      textArea.value = "";
      updateCharCount();
      await loadComments();
      renderComments();
      say("Your comment is posted. Thank you!");
    } catch (err) {
      console.error(err);
      say(isAuthorUser()
        ? "Your comment couldn’t be posted. Check that your author ID is pasted into the Firestore rules."
        : "Your comment couldn’t be posted. If you commented a moment ago, please wait 30 seconds and try again.", true);
    } finally {
      state.busy = false;
    }
  });

  async function removeComment(c) {
    if (!window.confirm("Delete this comment? This can’t be undone.")) return;
    try {
      await fb.deleteDoc(fb.doc(commentsCol, c.id));
      state.comments = state.comments.filter(function (x) { return x.id !== c.id; });
      renderComments();
      say("Comment deleted.");
    } catch (err) {
      console.error(err);
      say("That comment couldn’t be deleted.", true);
    }
  }
}

/* ==========================================================
   AUTHOR SIGN-IN (login.html)
   ========================================================== */
function initLogin(fb, auth, db, root) {
  root.innerHTML =
    '<form class="login-form auth-card" novalidate>' +
      "<h2>Author sign-in</h2>" +
      '<p class="discussion-sub">This page is only for the author. Readers don’t need to sign in here: they can join the discussion at the end of any article with just a display name.</p>' +
      '<label class="field-label" for="login-email">Email</label>' +
      '<input id="login-email" type="email" autocomplete="username" required>' +
      '<label class="field-label" for="login-password">Password</label>' +
      '<input id="login-password" type="password" autocomplete="current-password" required>' +
      '<button class="button" type="submit">Sign in</button>' +
      '<p class="discussion-status login-status" role="status" aria-live="polite"></p>' +
    "</form>" +

    '<div class="author-panel auth-card" hidden>' +
      "<h2>You’re signed in as the author</h2>" +
      '<p class="discussion-sub">You can now comment on any article. Your comments show an <span class="author-badge">Author</span> badge, and you can delete any comment.</p>' +
      '<form class="author-name-form" novalidate>' +
        '<label class="field-label" for="author-name">Name shown on your comments</label>' +
        '<div class="inline-field"><input id="author-name" type="text" maxlength="30"><button class="button" type="submit">Save name</button></div>' +
      "</form>" +
      '<p class="field-label">Your author ID</p>' +
      '<div class="inline-field uid-row"><code class="author-uid"></code><button type="button" class="link-btn copy-uid">Copy</button></div>' +
      '<p class="field-hint">You only need this once, when you paste it into your Firestore rules.</p>' +
      '<p class="discussion-status panel-status" role="status" aria-live="polite"></p>' +
      '<div class="panel-actions"><a class="button" href="articles.html">Go to the articles</a><button type="button" class="link-btn sign-out">Sign out</button></div>' +
    "</div>";

  const $ = function (s) { return root.querySelector(s); };
  const form = $(".login-form");
  const panel = $(".author-panel");
  const loginStatus = $(".login-status");
  const panelStatus = $(".panel-status");
  const nameInput = $("#author-name");
  let hasProfile = false;

  function say(el, msg, isError) {
    el.textContent = msg || "";
    el.classList.toggle("is-error", !!isError);
  }

  fb.onAuthStateChanged(auth, async function (u) {
    const isAuthor = !!(u && !u.isAnonymous);
    form.hidden = isAuthor;
    panel.hidden = !isAuthor;
    if (!isAuthor) return;

    $(".author-uid").textContent = u.uid;
    say(panelStatus, "");
    try {
      const snap = await fb.getDoc(fb.doc(db, "profiles", u.uid));
      hasProfile = snap.exists();
      nameInput.value = hasProfile ? snap.data().name : DEFAULT_AUTHOR_NAME;
      if (!hasProfile) say(panelStatus, "Click “Save name” once to finish setting up your author profile.");
    } catch (err) {
      console.error(err);
      nameInput.value = DEFAULT_AUTHOR_NAME;
      say(panelStatus, "Your profile couldn’t be read. If you haven’t yet, paste your author ID into the Firestore rules and publish them.", true);
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = $("#login-email").value.trim();
    const password = $("#login-password").value;
    if (!email || !password) return say(loginStatus, "Please enter your email and password.", true);
    say(loginStatus, "Signing in…");
    try {
      await fb.signInWithEmailAndPassword(auth, email, password);
      $("#login-password").value = "";
      say(loginStatus, "");
    } catch (err) {
      console.error(err);
      const code = err && err.code ? err.code : "";
      let msg = "Sign-in didn’t work. Please try again.";
      if (/invalid-credential|wrong-password|user-not-found|invalid-email/.test(code)) msg = "That email or password isn’t right.";
      if (/too-many-requests/.test(code)) msg = "Too many attempts. Please wait a few minutes and try again.";
      if (/operation-not-allowed/.test(code)) msg = "Email/Password sign-in isn’t switched on in Firebase yet.";
      say(loginStatus, msg, true);
    }
  });

  $(".author-name-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    const name = cleanName(nameInput.value);
    if (name.length < 2 || name.length > 30) return say(panelStatus, "Please choose a name between 2 and 30 characters.", true);
    try {
      const ref = fb.doc(db, "profiles", user.uid);
      if (hasProfile) {
        await fb.setDoc(ref, { name: name }, { merge: true });
      } else {
        await fb.setDoc(ref, { name: name, lastCommentAt: fb.Timestamp.fromMillis(0) });
        hasProfile = true;
      }
      say(panelStatus, "Saved. Your comments will show as “" + name + "”.");
    } catch (err) {
      console.error(err);
      say(panelStatus, "That couldn’t be saved. Check that your author ID is pasted into the Firestore rules and that you clicked Publish.", true);
    }
  });

  $(".copy-uid").addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText($(".author-uid").textContent);
      say(panelStatus, "Author ID copied.");
    } catch (err) {
      say(panelStatus, "Couldn’t copy automatically. Please select the ID and copy it by hand.", true);
    }
  });

  $(".sign-out").addEventListener("click", async function () {
    await fb.signOut(auth);
    say(loginStatus, "You’re signed out.");
  });
}

main();
