/* ==========================================================
   FIREBASE SETTINGS
   ----------------------------------------------------------
   Firebase gives you a block of settings that starts with
       const firebaseConfig = {
   and ends with
       };
   Delete the example block below (from "const firebaseConfig"
   down to "};") and paste YOUR block in its place.

   Copy ONLY that block. Do not paste the lines that start with
   "import" or "const app", if Firebase shows them too.

   Are these secret? No. Firebase web settings are designed to
   be visible inside a website. Your data is protected by the
   security rules you publish in Firebase, not by hiding these.

   Until you paste real values here, the discussion section
   simply stays hidden and the rest of the site works normally.
   ========================================================== */

// ▼▼▼ DELETE FROM HERE… ▼▼▼
const firebaseConfig = {
  apiKey: "PASTE-YOUR-API-KEY",
  authDomain: "PASTE-YOUR-PROJECT.firebaseapp.com",
  projectId: "PASTE-YOUR-PROJECT-ID",
  storageBucket: "PASTE-YOUR-PROJECT.appspot.com",
  messagingSenderId: "PASTE-YOUR-SENDER-ID",
  appId: "PASTE-YOUR-APP-ID"
};
// ▲▲▲ …TO HERE, AND PASTE YOUR OWN BLOCK INSTEAD ▲▲▲


// Leave this line exactly as it is:
window.CORTEX_FIREBASE_CONFIG = firebaseConfig;
