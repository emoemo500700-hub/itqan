// itqan-auth.js — دخول موقع إتقان: جوجل + إيميل وكلمة مرور (مع تأكيد، وإظهار الباسورد، ونسيت كلمة المرور)
// يُحمَّل في index.html بسطر واحد: <script type="module" src="itqan-auth.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendEmailVerification, sendPasswordResetEmail,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, doc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxJ5F44DKwPwK_N0ux_0jaRRzm61GaXL0",
  authDomain: "itqan-emad.firebaseapp.com",
  projectId: "itqan-emad",
  storageBucket: "itqan-emad.firebasestorage.app",
  messagingSenderId: "810368830515",
  appId: "1:810368830515:web:0b17584b9bf703be92e746",
  measurementId: "G-PFL3XQBEFZ"
};

// إيميل الأدمن (لازم يطابق الإيميل في قواعد Firestore)
const ADMIN_EMAIL = "emadmegedy.edu@gmail.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.languageCode = "ar"; // رسائل Firebase بالعربي
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// user = مسجّل ومؤكَّد الإيميل | pending = مسجّل لكن لم يؤكد الإيميل بعد
const state = { ready: false, user: null, pending: null, isAdmin: false };

/* ---------- واجهة الدخول ---------- */
const css = `
#itqan-auth-ui{font-family:inherit;direction:rtl}
#itqan-auth-ui [hidden]{display:none!important}
#itqan-auth-ui .ia-overlay{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(15,20,30,.62);overflow:auto}
#itqan-auth-ui .ia-overlay.open{display:flex}
#itqan-auth-ui .ia-card{width:100%;max-width:380px;background:#fff;color:#1b2430;border-radius:18px;padding:24px 20px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.35);margin:auto}
#itqan-auth-ui h2{margin:0 0 14px;font-size:20px;line-height:1.5}
#itqan-auth-ui p{margin:0 0 14px;font-size:15px;line-height:1.7;color:#4a5565}
#itqan-auth-ui .ia-btn{width:100%;min-height:48px;border:1.5px solid #c9d1dc;border-radius:12px;background:#fff;color:#1b2430;font:inherit;font-size:16px;font-weight:700;cursor:pointer;margin-top:8px}
#itqan-auth-ui .ia-primary{background:#1f5fd0;border-color:#1f5fd0;color:#fff}
#itqan-auth-ui button:focus-visible,#itqan-auth-ui input:focus-visible{outline:3px solid #2f6fdb;outline-offset:2px}
#itqan-auth-ui button[disabled]{opacity:.6;cursor:default}
#itqan-auth-ui .ia-or{margin:16px 0 10px;font-size:13px;color:#6a7686}
#itqan-auth-ui .ia-tabs{display:flex;gap:6px;margin-bottom:10px;background:#eef2f7;border-radius:12px;padding:4px}
#itqan-auth-ui .ia-tabs button{flex:1;min-height:40px;border:0;border-radius:9px;background:transparent;font:inherit;font-size:15px;font-weight:700;color:#4a5565;cursor:pointer}
#itqan-auth-ui .ia-tabs button[aria-pressed=true]{background:#fff;color:#1b2430;box-shadow:0 1px 4px rgba(0,0,0,.15)}
#itqan-auth-ui label{display:block;text-align:right;font-size:14px;font-weight:700;margin-top:10px}
#itqan-auth-ui input{width:100%;box-sizing:border-box;min-height:46px;margin-top:5px;padding:0 12px;border:1.5px solid #c9d1dc;border-radius:10px;font:inherit;font-size:16px;color:#1b2430;background:#fff;direction:ltr;text-align:left}
#itqan-auth-ui .ia-pw{position:relative}
#itqan-auth-ui .ia-pw input{padding-right:70px}
#itqan-auth-ui .ia-eye{position:absolute;right:6px;top:11px;min-height:36px;border:0;border-radius:8px;background:#eef2f7;padding:0 10px;font:inherit;font-size:13px;color:#1b2430;cursor:pointer}
#itqan-auth-ui .ia-link,#itqan-auth-ui .ia-close{background:none;border:0;color:#1f5fd0;font:inherit;font-size:14px;cursor:pointer;padding:10px}
#itqan-auth-ui .ia-close{color:#6a7686}
#itqan-auth-ui .ia-err{min-height:20px;margin-top:8px;font-size:14px;color:#b3261e}
#itqan-auth-ui .ia-ok{margin-top:8px;font-size:14px;color:#1b6e3c;line-height:1.7}
#itqan-auth-ui .ia-chip{position:fixed;top:8px;left:8px;z-index:2147482000;display:none;align-items:center;gap:8px;max-width:70vw;background:#fff;color:#1b2430;border:1px solid #d5dce6;border-radius:999px;padding:4px 6px 4px 12px;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,.15)}
#itqan-auth-ui .ia-chip.show{display:flex}
#itqan-auth-ui .ia-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#itqan-auth-ui .ia-chip button{border:0;background:#eef2f7;color:#1b2430;border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer}
`;

const ui = document.createElement("div");
ui.id = "itqan-auth-ui";
ui.innerHTML = `
<style>${css}</style>
<div class="ia-overlay" role="dialog" aria-modal="true" aria-labelledby="ia-title">
  <div class="ia-card">
    <h2 id="ia-title">سجّل الدخول للمتابعة</h2>

    <div id="ia-main">
      <button class="ia-btn" type="button" id="ia-google">الدخول بحساب جوجل</button>
      <div class="ia-or">أو بالإيميل وكلمة المرور</div>
      <div class="ia-tabs">
        <button type="button" id="ia-tab-in" aria-pressed="true">دخول</button>
        <button type="button" id="ia-tab-up" aria-pressed="false">حساب جديد</button>
      </div>
      <label for="ia-email">الإيميل</label>
      <input id="ia-email" type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false">
      <label for="ia-pass">كلمة المرور</label>
      <div class="ia-pw">
        <input id="ia-pass" type="password" autocomplete="current-password" autocapitalize="none">
        <button type="button" class="ia-eye" id="ia-eye" aria-label="إظهار كلمة المرور">إظهار</button>
      </div>
      <button class="ia-btn ia-primary" type="button" id="ia-submit">دخول</button>
      <button class="ia-link" type="button" id="ia-forgot">نسيت كلمة المرور؟</button>
    </div>

    <div id="ia-verify" hidden>
      <p id="ia-verify-text"></p>
      <button class="ia-btn ia-primary" type="button" id="ia-verified">تم التأكيد، تابع</button>
      <button class="ia-btn" type="button" id="ia-resend">أعد إرسال الرابط</button>
      <button class="ia-link" type="button" id="ia-other">استخدم حسابًا آخر</button>
    </div>

    <div class="ia-err" id="ia-err" role="alert"></div>
    <div class="ia-ok" id="ia-ok" role="status"></div>
    <button class="ia-close" type="button" id="ia-close">ليس الآن</button>
  </div>
</div>
<div class="ia-chip" id="ia-chip"><span id="ia-name"></span><button type="button" id="ia-out">خروج</button></div>`;

const q = (sel) => ui.querySelector(sel);
let mode = "in";   // in | up
let busy = false;

function say(err = "", ok = "") { q("#ia-err").textContent = err; q("#ia-ok").textContent = ok; }
function setBusy(b) { busy = b; ui.querySelectorAll("button").forEach((x) => (x.disabled = b)); }

function setMode(m) {
  mode = m;
  q("#ia-tab-in").setAttribute("aria-pressed", String(m === "in"));
  q("#ia-tab-up").setAttribute("aria-pressed", String(m === "up"));
  q("#ia-submit").textContent = m === "in" ? "دخول" : "إنشاء الحساب";
  q("#ia-pass").autocomplete = m === "in" ? "current-password" : "new-password";
  q("#ia-forgot").hidden = m === "up";
  say();
}

function showPanel(p) {
  q("#ia-main").hidden = p !== "main";
  q("#ia-verify").hidden = p !== "verify";
  q("#ia-title").textContent = p === "verify" ? "أكّد بريدك الإلكتروني" : "سجّل الدخول للمتابعة";
  if (p === "verify" && state.pending) {
    q("#ia-verify-text").textContent =
      "أرسلنا رابط تأكيد إلى " + state.pending.email + ". افتحه من بريدك (وراجع الرسائل غير المرغوبة) ثم ارجع هنا واضغط «تم التأكيد».";
  }
}

function openModal() {
  say();
  showPanel(state.pending ? "verify" : "main");
  q(".ia-overlay").classList.add("open");
  (state.pending ? q("#ia-verified") : q("#ia-google")).focus();
}
const closeModal = () => q(".ia-overlay").classList.remove("open");

const ERR = {
  "auth/invalid-credential": "الإيميل أو كلمة المرور غير صحيحة.",
  "auth/wrong-password": "الإيميل أو كلمة المرور غير صحيحة.",
  "auth/user-not-found": "الإيميل أو كلمة المرور غير صحيحة.",
  "auth/invalid-email": "اكتب إيميلًا صحيحًا.",
  "auth/missing-password": "اكتب كلمة المرور.",
  "auth/email-already-in-use": "هذا الإيميل مسجّل بالفعل. اختر «دخول».",
  "auth/weak-password": "كلمة المرور ضعيفة. استخدم 6 أحرف على الأقل.",
  "auth/too-many-requests": "محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
  "auth/network-request-failed": "لا يوجد اتصال بالإنترنت.",
  "auth/operation-not-allowed": "الدخول بالإيميل غير مفعّل في Firebase (Sign-in method ← Email/Password).",
  "auth/unauthorized-domain": "هذا الرابط غير مضاف في Firebase (Authorized domains)."
};
const SILENT = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];
function fail(e) {
  if (SILENT.includes(e.code)) return;
  console.error("itqan-auth:", e);
  say(ERR[e.code] || "حدث خطأ. حاول مرة أخرى.");
}

/* ---------- العمليات ---------- */
async function googleSignIn() {
  say(); setBusy(true);
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    if (e.code === "auth/popup-blocked") {
      try { await signInWithRedirect(auth, provider); return; } catch (e2) { e = e2; }
    }
    fail(e);
  } finally { setBusy(false); }
}

async function submit() {
  const email = q("#ia-email").value.trim();
  const pass = q("#ia-pass").value;
  if (!email) return say("اكتب إيميلك.");
  if (!pass) return say("اكتب كلمة المرور.");
  say(); setBusy(true);
  try {
    if (mode === "up") {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(cred.user);
      state.pending = cred.user;
      showPanel("verify");
    } else {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (!cred.user.emailVerified) { state.pending = cred.user; showPanel("verify"); }
    }
  } catch (e) { fail(e); } finally { setBusy(false); }
}

async function forgot() {
  const email = q("#ia-email").value.trim();
  if (!email) return say("اكتب إيميلك أولًا ثم اضغط «نسيت كلمة المرور».");
  say(); setBusy(true);
  try {
    await sendPasswordResetEmail(auth, email);
    say("", "إذا كان الإيميل مسجّلًا سيصلك رابط لتغيير كلمة المرور. راجع الرسائل غير المرغوبة أيضًا.");
  } catch (e) { fail(e); } finally { setBusy(false); }
}

async function iVerified() {
  say(); setBusy(true);
  try {
    const u = auth.currentUser;
    if (!u) { state.pending = null; showPanel("main"); return; }
    await u.reload();
    await u.getIdToken(true);          // يحدّث الصلاحيات بعد التأكيد
    if (u.emailVerified) await apply(u);
    else say("لم يتم التأكيد بعد. اضغط على الرابط في بريدك أولًا.");
  } catch (e) { fail(e); } finally { setBusy(false); }
}

async function resend() {
  say(); setBusy(true);
  try {
    if (auth.currentUser) await sendEmailVerification(auth.currentUser);
    say("", "أرسلنا الرابط مرة أخرى.");
  } catch (e) { fail(e); } finally { setBusy(false); }
}

/* ---------- حالة المستخدم ---------- */
async function apply(user) {
  state.ready = true;
  const verified = !!user && user.emailVerified;
  state.user = verified ? user : null;
  state.pending = user && !verified ? user : null;
  state.isAdmin = !!state.user && state.user.email.toLowerCase() === ADMIN_EMAIL;

  const chip = q("#ia-chip");
  if (state.user) {
    state.pending = null;
    closeModal();
    q("#ia-name").textContent = (state.isAdmin ? "المدير · " : "") + (state.user.displayName || state.user.email);
    chip.classList.add("show");
    try {
      await setDoc(doc(db, "users", state.user.uid), {
        email: state.user.email,
        name: state.user.displayName || "",
        lastLogin: serverTimestamp()
      }, { merge: true });
    } catch (e) { console.warn("itqan-auth: users doc not saved", e); }
  } else {
    chip.classList.remove("show");
  }
  window.dispatchEvent(new CustomEvent("itqan-auth", { detail: { user: state.user, isAdmin: state.isAdmin } }));
}

function mountUI() {
  document.body.appendChild(ui);
  q("#ia-google").addEventListener("click", googleSignIn);
  q("#ia-submit").addEventListener("click", submit);
  q("#ia-forgot").addEventListener("click", forgot);
  q("#ia-verified").addEventListener("click", iVerified);
  q("#ia-resend").addEventListener("click", resend);
  q("#ia-other").addEventListener("click", async () => { state.pending = null; await signOut(auth); showPanel("main"); say(); });
  q("#ia-tab-in").addEventListener("click", () => setMode("in"));
  q("#ia-tab-up").addEventListener("click", () => setMode("up"));
  q("#ia-close").addEventListener("click", closeModal);
  q("#ia-out").addEventListener("click", () => signOut(auth));
  q("#ia-eye").addEventListener("click", () => {
    const p = q("#ia-pass");
    const show = p.type === "password";
    p.type = show ? "text" : "password";
    q("#ia-eye").textContent = show ? "إخفاء" : "إظهار";
    q("#ia-eye").setAttribute("aria-label", show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
  });
  ui.querySelectorAll("#ia-email,#ia-pass").forEach((el) =>
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" && !busy) { e.preventDefault(); submit(); } })
  );
  setMode("in");
}
if (document.body) mountUI(); else document.addEventListener("DOMContentLoaded", mountUI);

getRedirectResult(auth).catch((e) => console.error("itqan-auth redirect:", e));
onAuthStateChanged(auth, (user) => { apply(user); });

/* ---------- البوابة: التصفح مفتوح، والإجراءات الفعلية تطلب دخول ---------- */
const ACTION_WORDS = /(تحميل|تنزيل|حمّل|حمل |نسخ|انسخ|طباعة|اطبع|العب|ابدأ اللعب|ابدأ النشاط|شغّل|تشغيل|بوربوينت|powerpoint|pptx|ورقة عمل|أوراق العمل|رفع|download|copy|print)/i;
// أضف هنا أي عنصر تريد حمايته بالـ CSS selector، مثل: ".game-card", "#btn-download"
const GATED_SELECTORS = [];
// أي عنصر في index.html تضيف له data-login يتحمي تلقائيًا، وdata-public يبقى مفتوحًا دائمًا.

function needsLogin(target) {
  if (!target || !target.closest) return false;
  if (target.closest("#itqan-auth-ui")) return false;
  if (target.closest("[data-public]")) return false;
  if (target.closest("[data-login],a[download],input[type=file]")) return true;
  for (const sel of GATED_SELECTORS) if (target.closest(sel)) return true;
  const el = target.closest("button,a,[role=button],[onclick]");
  if (!el) return false;
  const label = (el.innerText || "") + " " + (el.getAttribute("aria-label") || "") + " " + (el.title || "");
  return ACTION_WORDS.test(label);
}

function gate(e) {
  if (state.user) return;
  if (!needsLogin(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  if (state.ready) openModal();
}
document.addEventListener("click", gate, true);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") gate(e);
}, true);

/* واجهة صغيرة للأكواد الأخرى في الموقع */
window.ItqanAuth = {
  get user() { return state.user; },
  get isAdmin() { return state.isAdmin; },
  get ready() { return state.ready; },
  signIn: openModal,
  signOut: () => signOut(auth),
  auth, db
};
