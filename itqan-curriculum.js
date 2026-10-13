/* إتقان — محرك المناهج: دروس + عروض تفاعلية + ملفات PowerPoint + أوراق عمل
   كل درس عبارة عن بيانات (شرائح)، ومنها يُولَّد: عرض بملء الشاشة، ملف .pptx تفاعلي، ورقة عمل للطباعة، ولعبة. */
(function (root) {
"use strict";
const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
const WORDS = ["صفر","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"];
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mk(seed){const r=rng(seed);
  const o={r,int:(a,b)=>a+Math.floor(r()*(b-a+1)),pick:a=>a[Math.floor(r()*a.length)],
   shuffle:a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}};return o}
const EM = ["🍎","⭐","🐟","🎈","🚗","🌸","🐥","🍪","🧸","🍊"];
const NAMES = ["سالم","نورة","فهد","ريم","خالد","لمى","ماجد","سارة"];
const row = (n, e) => Array(n).fill(e).join(" ");

/* ---- أدوات بناء الأسئلة ---- */
function numOpts(R, ans, lo, hi) {
  const s = new Set([ans]); let g = 0;
  while (s.size < 3 && g++ < 60) { const v = ans + R.int(-2, 2); if (v >= lo && v <= hi) s.add(v); }
  for (let v = lo; s.size < 3 && v <= hi + 3; v++) s.add(v);
  const arr = R.shuffle([...s]).slice(0, 3); if (!arr.includes(ans)) arr[0] = ans;
  const opts = R.shuffle(arr).map(AR); return { opts, ans: opts.indexOf(AR(ans)) };
}
const Q = (q, vis, o) => ({ k: "quiz", q, vis, opts: o.opts, ans: o.ans });

/* ---- مصانع الدروس (الرياضيات - الصف الأول) ---- */
function lessonCount(title, from, to, seed) {
  const R = mk(seed), S = [];
  S.push({ k: "goals", items: [`أعدّ الأشياء من ${AR(from)} إلى ${AR(to)}.`, "أربط العدد بالرمز وبالكلمة.", "أكوّن مجموعة بالعدد المطلوب."] });
  for (let n = from; n <= to; n++) S.push({ k: "learn", h: `العدد ${AR(n)}`, big: AR(n), lines: [WORDS[n], `هذه ${AR(n)} من الأشياء`], vis: row(n, EM[n % EM.length]) });
  S.push({ k: "try", h: "جرّب مع معلمك", q: "كم عدد النجوم؟", vis: row(to, "⭐"), a: `${AR(to)} (${WORDS[to]})` });
  for (let i = 0; i < 4; i++) { const n = R.int(from, to), e = R.pick(EM); S.push(Q("كم عدد الأشياء؟", row(n, e), numOpts(R, n, 0, 10))); }
  S.push({ k: "sum", items: [`تعلّمت العدّ من ${AR(from)} إلى ${AR(to)}.`, "كل عدد له رمز وكلمة.", "أحسنت يا بطل!"] });
  return { title, slides: S };
}
function lessonReadWrite(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أقرأ الأعداد من ١ إلى ١٠.", "أطابق الرمز بالكلمة.", "أكتب العدد بالرمز."] }];
  S.push({ k: "learn", h: "الأعداد بالرمز والكلمة", lines: [1,2,3,4,5].map(n => `${AR(n)} = ${WORDS[n]}`), vis: "" });
  S.push({ k: "learn", h: "نكمل", lines: [6,7,8,9,10].map(n => `${AR(n)} = ${WORDS[n]}`), vis: "" });
  for (let i = 0; i < 4; i++) { const n = R.int(1, 10); const o = R.shuffle([n, n % 10 + 1, (n + 3) % 10 + 1].filter((v, k, a) => a.indexOf(v) === k)); while (o.length < 3) o.push(R.int(1, 10)); const ws = [...new Set(o)].slice(0, 3); if (!ws.includes(n)) ws[0] = n;
    const opts = R.shuffle(ws); S.push({ k: "quiz", q: `أي كلمة تدل على العدد ${AR(n)}؟`, vis: AR(n), opts: opts.map(v => WORDS[v]), ans: opts.indexOf(n) }); }
  S.push({ k: "sum", items: ["كل عدد نقرأه ونكتبه بالرمز.", "نستطيع كتابة العدد بالكلمة أيضاً."] });
  return { title, slides: S };
}
function lessonCompare(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أقارن بين مجموعتين.", "أستخدم: أكثر، أقل، يساوي."] }];
  S.push({ k: "learn", h: "أكثر وأقل", lines: ["المجموعة التي فيها عدد أكبر هي الأكثر.", "المجموعة التي فيها عدد أصغر هي الأقل."], vis: `${row(5, "🍎")}\n${row(2, "🍎")}` });
  for (let i = 0; i < 5; i++) { let a = R.int(1, 8), b = R.int(1, 8); if (a === b) b = (b % 8) + 1; const e = R.pick(EM);
    const more = i % 2 === 0; const ans = more ? (a > b ? 0 : 1) : (a < b ? 0 : 1);
    S.push({ k: "quiz", q: more ? "أي صف فيه أكثر؟" : "أي صف فيه أقل؟", vis: `الأول: ${row(a, e)}\nالثاني: ${row(b, e)}`, opts: ["الصف الأول", "الصف الثاني", "متساويان"], ans }); }
  S.push({ k: "sum", items: ["نقارن بالعدّ أو بالمقابلة.", "الأكثر: عدده أكبر. الأقل: عدده أصغر."] });
  return { title, slides: S };
}
function lessonBiggest(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أحدد العدد الأكبر والأصغر.", "أقارن بين عددين."] }];
  S.push({ k: "learn", h: "العدد الأكبر", lines: ["٨ أكبر من ٥ لأنه يأتي بعده في العدّ.", "٣ أصغر من ٧ لأنه يأتي قبله."], vis: "" });
  for (let i = 0; i < 6; i++) { let a = R.int(1, 10), b = R.int(1, 10); if (a === b) b = a % 10 + 1; const big = i % 2 === 0;
    S.push({ k: "quiz", q: big ? "أيّ العددين أكبر؟" : "أيّ العددين أصغر؟", vis: `${AR(a)}      ${AR(b)}`, opts: [AR(a), AR(b), "متساويان"], ans: big ? (a > b ? 0 : 1) : (a < b ? 0 : 1) }); }
  S.push({ k: "sum", items: ["العدد الأكبر يأتي متأخراً في العدّ.", "العدد الأصغر يأتي مبكراً."] });
  return { title, slides: S };
}
function lessonOrder(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أرتّب الأعداد من الأصغر إلى الأكبر.", "أكمل نمط العدّ."] }];
  S.push({ k: "learn", h: "ترتيب الأعداد", lines: ["نبدأ من الأصغر: ١ ٢ ٣ ٤ ٥", "كل عدد أكبر من الذي قبله بواحد."], vis: "" });
  for (let i = 0; i < 5; i++) { const s = R.int(1, 6), seq = [s, s + 1, s + 2, s + 3]; const miss = R.int(1, 2); const ans = seq[miss];
    const shown = seq.map((v, k) => k === miss ? "؟" : AR(v)).join("  ");
    S.push(Q("ما العدد الناقص؟", shown, numOpts(R, ans, 0, 10))); }
  S.push({ k: "sum", items: ["نرتّب الأعداد بالعدّ: ١، ٢، ٣ ...", "نبحث عن العدد الناقص في التسلسل."] });
  return { title, slides: S };
}
function lessonBeforeAfter(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أجد العدد قبل عدد وبعده.", "أستخدم: قبل، بعد، بين."] }];
  S.push({ k: "learn", h: "قبل وبعد", lines: ["العدد قبل ٥ هو ٤.", "العدد بعد ٥ هو ٦.", "٥ بين ٤ و٦."], vis: "" });
  for (let i = 0; i < 6; i++) { const n = R.int(2, 9), before = i % 2 === 0, ans = before ? n - 1 : n + 1;
    S.push(Q(before ? `ما العدد الذي قبل ${AR(n)}؟` : `ما العدد الذي بعد ${AR(n)}؟`, "", numOpts(R, ans, 0, 10))); }
  S.push({ k: "sum", items: ["قبل: أنقص واحداً. بعد: أزيد واحداً."] });
  return { title, slides: S };
}
function lessonZero(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أتعرف على الصفر.", "أعرف أن الصفر يعني لا شيء."] }];
  S.push({ k: "learn", h: "الصفر", big: "٠", lines: ["ليس عندي أي تفاحة: العدد صفر.", "الصفر يعني: لا يوجد شيء."], vis: "🍎 ➜ 😋 ➜ 🍎 ➜ 😋 ➜ ⚪" });
  S.push({ k: "try", h: "فكّر معنا", q: "في الطبق ٣ تمرات وأكلتها كلها. كم بقي؟", vis: "🟤 🟤 🟤", a: "٠ (لا يوجد شيء)" });
  for (let i = 0; i < 4; i++) { const n = R.int(0, 4), ans = n; const e = R.pick(EM);
    S.push(Q("كم عدد الأشياء؟", n === 0 ? "(لا شيء)" : row(n, e), numOpts(R, ans, 0, 5))); }
  S.push({ k: "sum", items: ["الصفر يعني لا شيء.", "الصفر أصغر عدد نعدّه."] });
  return { title, slides: S };
}
function lessonAddIntro(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أضمّ مجموعتين لأعرف المجموع.", "أقرأ جملة الجمع: ٢ + ١ = ٣."] }];
  S.push({ k: "learn", h: "الجمع يعني الضم", lines: ["مع سالم ٢ كرة ومع فهد ١ كرة.", "نضم الكرات معاً: ٢ + ١ = ٣"], vis: "⚽ ⚽  +  ⚽  =  ⚽ ⚽ ⚽" });
  S.push({ k: "try", h: "جرّب مع معلمك", q: "٣ + ٢ = ؟", vis: `${row(3, "⭐")}  +  ${row(2, "⭐")}`, a: "٥" });
  for (let i = 0; i < 5; i++) { const a = R.int(1, 3), b = R.int(1, 3), e = R.pick(EM);
    S.push(Q(`${AR(a)} + ${AR(b)} = ؟`, `${row(a, e)}  +  ${row(b, e)}`, numOpts(R, a + b, 0, 10))); }
  S.push({ k: "sum", items: ["الجمع معناه الضم والزيادة.", "المجموع: عدد الأشياء بعد الضم."] });
  return { title, slides: S };
}
function lessonAdd(title, max, seed) {
  const R = mk(seed), S = [{ k: "goals", items: [`أجمع عددين ناتجهما حتى ${AR(max)}.`, "أستخدم العدّ التصاعدي أو الرسم."] }];
  S.push({ k: "learn", h: "طريقة العدّ إلى الأمام", lines: [`نبدأ من العدد الأكبر ثم نعدّ الأصغر.`, `مثال: ٤ + ٢ ← نقول: ٤ ... ٥ ، ٦`], vis: "٤ ➜ ٥ ➜ ٦" });
  const ex = [[1, 2], [2, 2], [3, 1]].map(([a, b]) => ({ q: `${AR(a)} + ${AR(b)}`, a: AR(a + b) }));
  S.push({ k: "example", h: "أمثلة محلولة", items: ex });
  for (let i = 0; i < 6; i++) { const a = R.int(1, max - 1), b = R.int(1, max - a);
    S.push(Q(`${AR(a)} + ${AR(b)} = ؟`, max <= 5 ? `${row(a, "🔵")}  +  ${row(b, "🔴")}` : "", numOpts(R, a + b, 0, max))); }
  S.push({ k: "sum", items: ["نجمع بضم المجموعتين.", "نبدأ بالعدد الأكبر ونعدّ الباقي."] });
  return { title, slides: S };
}
function lessonSubIntro(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أفهم أن الطرح يعني الإزالة.", "أقرأ جملة الطرح: ٣ − ١ = ٢."] }];
  S.push({ k: "learn", h: "الطرح يعني الإزالة", lines: ["في الطبق ٣ تمرات، أكل سالم واحدة.", "بقي ٢: ٣ − ١ = ٢"], vis: "🟤 🟤 🟤  ➜  🟤 🟤 ❌" });
  S.push({ k: "try", h: "جرّب مع معلمك", q: "٤ − ١ = ؟", vis: row(4, "🎈"), a: "٣" });
  for (let i = 0; i < 5; i++) { const a = R.int(2, 5), b = R.int(1, a - 1), e = R.pick(EM);
    S.push(Q(`${AR(a)} − ${AR(b)} = ؟`, row(a, e) + `   (نشطب ${AR(b)})`, numOpts(R, a - b, 0, 10))); }
  S.push({ k: "sum", items: ["الطرح معناه الإزالة أو الأخذ.", "الباقي: ما يتبقى بعد الإزالة."] });
  return { title, slides: S };
}
function lessonSub(title, max, seed) {
  const R = mk(seed), S = [{ k: "goals", items: [`أطرح عددين ضمن ${AR(max)}.`, "أستخدم العدّ التنازلي."] }];
  S.push({ k: "learn", h: "العدّ إلى الخلف", lines: ["نبدأ من العدد الأكبر ثم نعدّ للخلف.", "مثال: ٦ − ٢ ← نقول: ٦ ... ٥ ، ٤"], vis: "٦ ➜ ٥ ➜ ٤" });
  S.push({ k: "example", h: "أمثلة محلولة", items: [[5, 1], [4, 2], [3, 3]].map(([a, b]) => ({ q: `${AR(a)} − ${AR(b)}`, a: AR(a - b) })) });
  for (let i = 0; i < 6; i++) { const a = R.int(2, max), b = R.int(0, a);
    S.push(Q(`${AR(a)} − ${AR(b)} = ؟`, "", numOpts(R, a - b, 0, max))); }
  S.push({ k: "sum", items: ["نطرح بالعدّ للخلف.", "إذا طرحنا الصفر بقي العدد كما هو."] });
  return { title, slides: S };
}
function lessonWord(title, seed) {
  const R = mk(seed), S = [{ k: "goals", items: ["أحل مسألة لفظية بسيطة.", "أحدد: جمع أم طرح؟"] }];
  S.push({ k: "learn", h: "كيف أحلّ المسألة؟", lines: ["أقرأ المسألة جيداً.", "أحدد المعطيات والمطلوب.", "أختار: جمع (ضم) أم طرح (إزالة)."], vis: "📖 ➜ 🤔 ➜ ✅" });
  for (let i = 0; i < 6; i++) { const n = R.pick(NAMES), a = R.int(2, 6), b = R.int(1, 3), add = i % 2 === 0, e = R.pick(["تفاحات", "كرات", "أقلام", "بالونات"]);
    const q = add ? `مع ${n} ${AR(a)} ${e}، وأخذ ${AR(b)} أخرى. كم أصبح معه؟` : `مع ${n} ${AR(a + b)} ${e}، وأعطى زميله ${AR(b)}. كم بقي معه؟`;
    S.push(Q(q, "", numOpts(R, add ? a + b : a, 0, 10))); }
  S.push({ k: "sum", items: ["أقرأ المسألة، ثم أقرر: ضم أم إزالة.", "أراجع إجابتي بالرسم أو العدّ."] });
  return { title, slides: S };
}

const UNITS = {
  "1|math|1": [
    { n: "الوحدة الأولى: الأعداد من ١ إلى ١٠", e: "🔢", range: [0, 7] },
    { n: "الوحدة الثانية: المقارنة والترتيب", e: "⚖️", range: [4, 7] },
    { n: "الوحدة الثالثة: الجمع والطرح", e: "➕", range: [8, 14] }
  ],
  "1|arabic|1": [
    { n: "الوحدة الأولى: حروف اللغة", e: "🔤", range: [0, 4] },
    { n: "الوحدة الثانية: القراءة والكتابة", e: "📖", range: [3, 6] }
  ]
};
const LESSONS = {
  "1|math|1": [
    ["العدّ من ١ إلى ٥", s => lessonCount("العدّ من ١ إلى ٥", 1, 5, s)],
    ["العدّ من ٦ إلى ١٠", s => lessonCount("العدّ من ٦ إلى ١٠", 6, 10, s)],
    ["قراءة الأعداد وكتابتها", s => lessonReadWrite("قراءة الأعداد وكتابتها", s)],
    ["الصفر", s => lessonZero("الصفر", s)],
    ["أكثر وأقل", s => lessonCompare("أكثر وأقل", s)],
    ["العدد الأكبر والعدد الأصغر", s => lessonBiggest("العدد الأكبر والعدد الأصغر", s)],
    ["ترتيب الأعداد", s => lessonOrder("ترتيب الأعداد", s)],
    ["قبل وبعد", s => lessonBeforeAfter("قبل وبعد", s)],
    ["معنى الجمع", s => lessonAddIntro("معنى الجمع", s)],
    ["الجمع ضمن ٥", s => lessonAdd("الجمع ضمن ٥", 5, s)],
    ["الجمع ضمن ١٠", s => lessonAdd("الجمع ضمن ١٠", 10, s)],
    ["معنى الطرح", s => lessonSubIntro("معنى الطرح", s)],
    ["الطرح ضمن ٥", s => lessonSub("الطرح ضمن ٥", 5, s)],
    ["الطرح ضمن ١٠", s => lessonSub("الطرح ضمن ١٠", 10, s)],
    ["مسائل الجمع والطرح", s => lessonWord("مسائل الجمع والطرح", s)]
  ]
};
const GR_N = ["رياض الأطفال", "الصف الأول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"];
const SUBJ_N = { quran: "القرآن الكريم", islamic: "الدراسات الإسلامية", arabic: "لغتي", math: "الرياضيات", science: "العلوم", social: "الاجتماعيات", english: "اللغة الإنجليزية", digital: "المهارات الرقمية", art: "التربية الفنية", pe: "التربية البدنية" };
const TERMS = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث"];
const key = (g, s, t) => `${g}|${s}|${t}`;
function list(g, s, t) { return (LESSONS[key(g, s, t)] || []).map((x, i) => ({ i, title: x[0] })); }
function listUnits(g, s, t) { return UNITS[key(g, s, t)] || []; }
function listByUnit(g, s, t, unitIdx) {
  const u = (UNITS[key(g, s, t)] || [])[unitIdx]; if (!u) return [];
  const L = LESSONS[key(g, s, t)] || [];
  const [lo, hi] = u.range;
  return L.map((x, i) => ({ i, title: x[0] })).filter(x => x.i >= lo && x.i <= hi);
}
function build(g, s, t, i) {
  const L = LESSONS[key(g, s, t)]; if (!L || !L[i]) return null;
  const seed = (+g + 1) * 100000 + Object.keys(SUBJ_N).indexOf(s) * 10000 + t * 1000 + i * 7 + 13;
  const les = L[i][1](seed); les.meta = { g, s, t, i, n: L.length, gname: GR_N[g], sname: SUBJ_N[s], tname: TERMS[t - 1] || ("الفصل " + t) };
  les.slides = [{ k: "cover", t: les.title, sub: `${SUBJ_N[s]} · ${GR_N[g]} · ${les.meta.tname} · الدرس ${AR(i + 1)}` }, ...les.slides]; return les;
}

/* ---- ورقة العمل (HTML للطباعة) ---- */
function worksheetHtml(les) {
  const m = les.meta, qs = les.slides.filter(x => x.k === "quiz");
  const items = qs.map((q, n) => `<div class="ws-q"><b>${AR(n + 1)}) ${esc(q.q)}</b>${q.vis ? `<div class="ws-vis">${esc(q.vis).replace(/\n/g, "<br>")}</div>` : ""}<div class="ws-o">${q.opts.map(o => `<span>◯ ${esc(o)}</span>`).join("")}</div></div>`).join("");
  const tr = les.slides.filter(x => x.k === "example").flatMap(x => x.items).map(x => `<div class="ws-line">${esc(x.q)} = ........</div>`).join("");
  return `<div class="ws"><div class="ws-h"><div><h2>ورقة عمل: ${esc(les.title)}</h2><div>${esc(m.sname)} · ${esc(m.gname)} · ${esc(m.tname)}</div></div><div class="ws-n">إتقان 🦉</div></div>
  <div class="ws-id">الاسم: ................................  الصف: ............  التاريخ: ............</div>
  <h3>أولاً: اختر الإجابة الصحيحة بوضع دائرة</h3>${items}${tr ? `<h3>ثانياً: أكمل</h3>${tr}` : ""}
  <h3>ثالثاً: ارسم أو لوّن</h3><div class="ws-box">ارسم مثالاً من الدرس هنا</div>
  <div class="ws-f">بإشراف الأخصائي عماد عبد العزيز · منصة إتقان</div></div>`;
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---- لعبة الدرس: أسئلة الاختيار من متعدد ---- */
function gameText(les) {
  return les.slides.filter(x => x.k === "quiz").map(q => `${q.q.replace(/\|/g, "-")} ${q.vis && q.vis.length < 24 && !q.vis.includes("\n") ? q.vis.replace(/\|/g, "-") : ""} | ${q.opts[q.ans]} | ${q.opts.filter((_, i) => i !== q.ans).join(" | ")}`.replace(/\s+\|/g, " |")).join("\n");
}

/* ---- ملف PowerPoint تفاعلي (PptxGenJS) ---- */
function buildPptx(PptxGenJS, les) {
  const p = new PptxGenJS(); p.layout = "LAYOUT_16x9"; p.rtlMode = true; p.title = les.title; p.author = "إتقان";
  const F = "Tahoma", C = { bg: "F1FAF8", teal: "0E8F8A", dark: "0F2B2E", or: "FF7A2F", yel: "FFC933", ok: "2F9E44", bad: "E03131", soft: "E2F4F1", white: "FFFFFF" };
  const T = (s, txt, o) => { if (Array.isArray(txt)) txt = txt.map(r => ({ text: r.text, options: Object.assign({ rtlMode: true }, r.options) })); return s.addText(txt, Object.assign({ fontFace: F, rtlMode: true, align: "center", color: C.dark }, o)); };
  const base = (title) => { const s = p.addSlide(); s.background = { color: C.bg };
    s.addShape(p.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.18, fill: { color: C.teal } });
    if (title) T(s, title, { x: 0.4, y: 0.3, w: 9.2, h: 0.8, fontSize: 30, bold: true, color: C.teal, align: "right" });
    T(s, "إتقان · بإشراف الأخصائي عماد عبد العزيز", { x: 0.3, y: 5.25, w: 9.4, h: 0.3, fontSize: 10, color: "7A9A9C" }); return s; };
  // أرقام الشرائح مسبقاً لروابط الأسئلة
  let n = 0; const idx = les.slides.map(sl => { const start = n + 1; n += sl.k === "quiz" ? 3 : 1; return start; });
  les.slides.forEach((sl, si) => {
    const next = idx[si + 1] || null;
    const navBtn = (s, to, label, x, color) => T(s, label, { x, y: 4.65, w: 2.2, h: 0.55, fontSize: 16, bold: true, color: C.white, fill: { color }, shape: p.ShapeType.roundRect, rectRadius: 0.15, hyperlink: to ? { slide: to, tooltip: label } : undefined });
    if (sl.k === "cover") { const s = p.addSlide(); s.background = { color: C.teal };
      T(s, "🦉", { x: 4, y: 0.5, w: 2, h: 1.1, fontSize: 54 });
      T(s, sl.t, { x: 0.6, y: 1.7, w: 8.8, h: 1.3, fontSize: 44, bold: true, color: C.white });
      T(s, sl.sub, { x: 0.6, y: 3.1, w: 8.8, h: 0.6, fontSize: 18, color: "D8F3F0" });
      T(s, "ابدأ الدرس ◀", { x: 3.8, y: 4.1, w: 2.4, h: 0.65, fontSize: 18, bold: true, color: C.dark, fill: { color: C.yel }, shape: p.ShapeType.roundRect, rectRadius: 0.2, hyperlink: next ? { slide: next } : undefined });
      T(s, "إتقان · بإشراف الأخصائي عماد عبد العزيز", { x: 0.3, y: 5.1, w: 9.4, h: 0.3, fontSize: 11, color: "BFE8E4" }); return; }
    if (sl.k === "goals" || sl.k === "sum") { const s = base(sl.k === "goals" ? "🎯 أهداف الدرس" : "✅ ماذا تعلّمنا؟");
      T(s, sl.items.map(t => ({ text: "• " + t, options: { breakLine: true } })), { x: 0.8, y: 1.4, w: 8.4, h: 3, fontSize: 26, align: "right", valign: "top", paraSpaceAfter: 14 });
      if (next) navBtn(s, next, "التالي ◀", 0.4, C.teal); return; }
    if (sl.k === "learn") { const s = base(sl.h);
      if (sl.big) T(s, sl.big, { x: 7.4, y: 1.2, w: 2.2, h: 1.6, fontSize: 90, bold: true, color: C.or });
      T(s, sl.lines.map(t => ({ text: t, options: { breakLine: true } })), { x: 0.5, y: 1.3, w: sl.big ? 6.8 : 9, h: 1.7, fontSize: 24, align: "right", valign: "top", paraSpaceAfter: 8 });
      if (sl.vis) T(s, sl.vis, { x: 0.5, y: 3.0, w: 9, h: 1.5, fontSize: 36 });
      if (next) navBtn(s, next, "التالي ◀", 0.4, C.teal); return; }
    if (sl.k === "example") { const s = base(sl.h);
      T(s, sl.items.map(x => ({ text: `${x.q} = ${x.a}`, options: { breakLine: true } })), { x: 0.8, y: 1.5, w: 8.4, h: 2.8, fontSize: 36, bold: true, color: C.teal });
      if (next) navBtn(s, next, "التالي ◀", 0.4, C.teal); return; }
    if (sl.k === "try") { const s = base(sl.h);
      T(s, sl.q, { x: 0.6, y: 1.3, w: 8.8, h: 0.9, fontSize: 32, bold: true });
      if (sl.vis) T(s, sl.vis, { x: 0.6, y: 2.2, w: 8.8, h: 1.2, fontSize: 36 });
      const s2 = null; T(s, "الإجابة: " + sl.a, { x: 2.4, y: 3.6, w: 5.2, h: 0.7, fontSize: 24, bold: true, color: C.white, fill: { color: C.ok }, shape: p.ShapeType.roundRect, rectRadius: 0.15, transparency: 0 });
      if (next) navBtn(s, next, "التالي ◀", 0.4, C.teal); return; }
    if (sl.k === "quiz") {
      const q = base("سؤال ؟"), ok = idx[si] + 1, no = idx[si] + 2;
      T(q, sl.q, { x: 0.6, y: 1.05, w: 8.8, h: 0.9, fontSize: 30, bold: true });
      if (sl.vis) T(q, sl.vis, { x: 0.6, y: 1.9, w: 8.8, h: 1.3, fontSize: 30 });
      const w = 2.7, gap = 0.3, tot = sl.opts.length * w + (sl.opts.length - 1) * gap, x0 = (10 - tot) / 2;
      sl.opts.forEach((o, i) => T(q, o, { x: x0 + i * (w + gap), y: 3.5, w, h: 0.95, fontSize: 24, bold: true, color: C.dark, fill: { color: C.soft }, line: { color: C.teal, width: 3 }, shape: p.ShapeType.roundRect, rectRadius: 0.2, hyperlink: { slide: i === sl.ans ? ok : no, tooltip: o } }));
      T(q, "اضغط على الإجابة الصحيحة", { x: 0.6, y: 4.7, w: 8.8, h: 0.4, fontSize: 14, color: "7A9A9C" });
      const g = base(); T(g, "✅ أحسنت!", { x: 0.6, y: 1.3, w: 8.8, h: 1.2, fontSize: 54, bold: true, color: C.ok });
      T(g, `الإجابة الصحيحة: ${sl.opts[sl.ans]}`, { x: 0.6, y: 2.7, w: 8.8, h: 0.8, fontSize: 28 });
      if (next) navBtn(g, next, "التالي ◀", 3.9, C.ok);
      const b = base(); T(b, "🤔 حاول مرة أخرى", { x: 0.6, y: 1.3, w: 8.8, h: 1.2, fontSize: 48, bold: true, color: C.bad });
      T(b, "فكّر جيداً ثم اختر من جديد", { x: 0.6, y: 2.7, w: 8.8, h: 0.8, fontSize: 24 });
      navBtn(b, idx[si], "◀ رجوع للسؤال", 3.9, C.or); }
  });
  return p;
}

root.ITQAN_CUR = { AR, GR_N, SUBJ_N, TERMS, UNITS, LESSONS, list, listUnits, listByUnit, build, worksheetHtml, gameText, buildPptx, hasLessons: (g, s, t) => !!LESSONS[key(g, s, t)], key };
if (typeof module !== "undefined") module.exports = root.ITQAN_CUR;
})(typeof window !== "undefined" ? window : globalThis);
