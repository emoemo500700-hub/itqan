/* إتقان — التحديث v3
   خلفية هادئة + موسيقى 50% + دخول بالأدوار + مصنع ألعاب مرتّب + صفحات كاملة بملء الشاشة + المناهج والعروض + واجهة موبايل جديدة */
(() => {
"use strict";
if (window.__v3) return; window.__v3 = true;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const safe = (n, f) => { try { f() } catch (e) { console.warn("[v3] " + n, e) } };
const CUR = window.ITQAN_CUR;
const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const isMobile = () => matchMedia("(max-width:760px)").matches;

/* ================= CSS ================= */
const css = `
html{background:var(--bg)}
body{background:transparent!important}
:root{--b1:#e3f6f2;--b2:#f7f1dc;--b3:#fde6c8;--dune1:#f3d9a4;--dune2:#e8c283;--palm:#2d7a52;--orb:rgba(14,143,138,.16);--orb2:rgba(255,122,47,.14)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--b1:#071a1e;--b2:#0b2a30;--b3:#16273a;--dune1:#1d3a3f;--dune2:#142d33;--palm:#0f3f33;--orb:rgba(53,201,192,.16);--orb2:rgba(255,145,80,.10)}}
:root[data-theme="dark"]{--b1:#071a1e;--b2:#0b2a30;--b3:#16273a;--dune1:#1d3a3f;--dune2:#142d33;--palm:#0f3f33;--orb:rgba(53,201,192,.16);--orb2:rgba(255,145,80,.10)}
.v3bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:linear-gradient(165deg,var(--b1) 0%,var(--b2) 55%,var(--b3) 100%);background-size:200% 200%;animation:v3grad 40s ease-in-out infinite alternate}
@keyframes v3grad{to{background-position:100% 100%}}
.v3bg .orb{position:absolute;border-radius:50%;filter:blur(40px);animation:v3orb 26s ease-in-out infinite alternate}
.v3bg .o1{width:46vmax;height:46vmax;left:-12vmax;top:-10vmax;background:var(--orb)}
.v3bg .o2{width:38vmax;height:38vmax;right:-10vmax;top:30vh;background:var(--orb2);animation-duration:32s}
@keyframes v3orb{to{transform:translate(8vmax,6vmax) scale(1.12)}}
.v3bg svg{position:absolute;inset-inline:0;bottom:0;width:140%;height:34vh;min-height:170px}
.v3bg .d1{animation:v3dune 60s linear infinite alternate}
.v3bg .d2{animation:v3dune 90s linear infinite alternate-reverse;opacity:.9}
@keyframes v3dune{to{transform:translateX(-12%)}}
.v3bg .palm{position:absolute;bottom:12vh;color:var(--palm);opacity:.5;transform-origin:50% 100%;animation:v3sway 7s ease-in-out infinite alternate}
.v3bg .p1{inset-inline-start:3%;width:90px}.v3bg .p2{inset-inline-end:5%;width:70px;animation-delay:-3s}
@keyframes v3sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}
.v3bg .moon{position:absolute;top:9vh;inset-inline-end:12%;font-size:42px;opacity:.55;animation:v3tw 6s ease-in-out infinite alternate}
.v3bg .st{position:absolute;font-size:12px;opacity:.5;animation:v3tw 4s ease-in-out infinite alternate}
@keyframes v3tw{from{opacity:.15;transform:scale(.8)}to{opacity:.7;transform:scale(1.1)}}
.bgfloat{opacity:.7}
@media (prefers-reduced-motion:reduce){.v3bg,.v3bg *{animation:none!important}}
/* settings button + sheet */
#vx3Set{display:inline-flex;align-items:center;justify-content:center}
.v3sh{position:fixed;inset:0;z-index:85;background:rgba(5,25,27,.55);display:flex;align-items:flex-end;justify-content:center}
.v3sh>div{width:min(560px,100%);background:var(--surface);border-radius:26px 26px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom,0px));border:3px solid var(--teal);border-bottom:0;max-height:88vh;overflow-y:auto;animation:v3up .25s ease-out}
@keyframes v3up{from{transform:translateY(40px);opacity:0}}
.v3sh h3{font-size:20px;margin-bottom:10px}
.v3tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.v3t{display:flex;flex-direction:column;align-items:center;gap:4px;background:var(--bg);border:2px solid var(--line);border-radius:16px;padding:10px 4px;font:700 12px var(--f-body);text-align:center}
.v3t .ibtn{width:44px;height:44px;font-size:18px}
.v3vol{display:flex;align-items:center;gap:10px;background:var(--soft);border-radius:16px;padding:10px 14px;font-weight:800}
.v3vol input{flex:1;accent-color:var(--orange);height:28px}
/* quick tiles on home */
.v3hi{font:800 15px var(--f-display);color:var(--orange);margin-bottom:2px}
.v3quick{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-block:14px 6px}
.v3q{border:0;border-radius:22px;padding:14px 12px;color:#fff;text-align:start;display:flex;flex-direction:column;gap:2px;min-height:96px;box-shadow:0 5px 0 rgba(0,0,0,.16);font:800 17px var(--f-display);position:relative;overflow:hidden;transition:transform .12s}
.v3q:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.16)}
.v3q i{font-style:normal;font-size:34px;line-height:1.1}
.v3q small{font:600 11.5px var(--f-body);opacity:.95}
.v3q::after{content:"";position:absolute;inset-inline-end:-18px;bottom:-22px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.18)}
.v3q.new::before{content:"جديد";position:absolute;top:8px;inset-inline-end:10px;background:var(--yellow);color:#2a1100;font:800 10px var(--f-body);padding:1px 8px;border-radius:99px;z-index:1}
@media(min-width:761px){.v3quick{grid-template-columns:repeat(3,1fr)}}
/* pages (games / activity / deck) */
.v3pg{position:fixed;inset:0;z-index:60;background:var(--bg);display:flex;flex-direction:column;animation:vxin .22s ease-out}
.v3pg>.bgx{position:absolute;inset:0;z-index:0}
.v3h{position:relative;z-index:1;display:flex;align-items:center;gap:8px;padding:calc(8px + env(safe-area-inset-top,0px)) 12px 8px;background:var(--surface);border-bottom:2px solid var(--line)}
.v3h b{flex:1;min-width:0;font:800 16px var(--f-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v3b{position:relative;z-index:1;flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 14px calc(20px + env(safe-area-inset-bottom,0px))}
.v3b .stage{max-width:920px;margin-inline:auto}
.v3pg .opt{font-size:clamp(15px,2.2vw,24px);min-height:clamp(50px,9vh,76px)}
.v3pg .mc{font-size:clamp(20px,5vw,40px)}
.v3pg.fs .v3h{display:none}
.v3pg.fs .v3fsx{display:flex}
.v3fsx{display:none;position:fixed;top:calc(8px + env(safe-area-inset-top,0px));inset-inline-start:8px;z-index:5;gap:6px}
.v3lv{font:800 11px var(--f-body);border-radius:99px;padding:2px 10px;background:var(--soft)}
#modal.v3act{align-items:stretch;padding:0;background:var(--bg)}
#modal.v3act .sheet{width:100%;max-width:900px;margin:0 auto;border-radius:0;border:0;min-height:100%;box-shadow:none;padding:16px 16px 40px}
#modal.v3act:fullscreen{overflow-y:auto}
/* games gallery */
.v3chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-block:4px;margin-bottom:6px}
.v3chips button{flex:none;border:2px solid var(--line);background:var(--surface);border-radius:99px;padding:5px 14px;font-weight:800;font-size:13px;white-space:nowrap}
.v3chips button[aria-pressed="true"]{background:var(--orange);color:#2a1100;border-color:var(--orange)}
.v3grp{margin-top:18px}
.v3grp h3{font-size:18px;display:flex;align-items:center;gap:8px}
.v3grp h3 small{font:600 12px var(--f-body);color:var(--mute)}
.v3gc{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:8px}
.v3g{background:var(--surface);border:2px solid var(--line);border-radius:20px;padding:12px;text-align:start;display:flex;flex-direction:column;gap:3px;box-shadow:var(--shadow);transition:transform .12s;min-width:0}
.v3g:hover{border-color:var(--orange)}.v3g:active{transform:scale(.97)}
.v3g .e{font-size:34px;line-height:1.1}.v3g b{font:800 14px var(--f-display);line-height:1.35}
.v3g small{color:var(--mute);font-size:11.5px}
.v3g .go{margin-top:6px;align-self:flex-start;background:var(--teal);color:var(--teal-ink);border-radius:99px;padding:2px 12px;font:800 12px var(--f-body)}
/* curriculum */
.v3cur{display:grid;gap:14px;margin-top:12px}
.v3curstep{background:color-mix(in srgb,var(--surface) 92%,var(--soft));border:3px solid var(--line);border-radius:24px;padding:12px;box-shadow:var(--shadow)}
.v3curstep>h3{display:flex;align-items:center;gap:8px;font-size:19px;color:var(--teal);margin-bottom:9px}
.v3curstep>h3 b{display:grid;place-items:center;width:32px;height:32px;border-radius:12px;background:var(--orange);color:#2a1100;font:800 17px var(--f-display)}
.v3curcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px}
.v3curcard{border:2px solid var(--line);background:var(--surface);border-radius:18px;padding:11px 9px;min-height:74px;text-align:start;font:800 14px/1.35 var(--f-display);transition:transform .15s,border-color .15s,background .15s;box-shadow:0 3px 0 color-mix(in srgb,var(--teal) 16%,transparent)}
.v3curcard:hover,.v3curcard[aria-pressed="true"]{transform:translateY(-3px);border-color:var(--orange);background:color-mix(in srgb,var(--orange) 12%,var(--surface))}
.v3curcard small{display:block;color:var(--mute);font:600 11px/1.4 var(--f-body);margin-top:3px}
.v3curcard[aria-pressed="true"] small{color:var(--ink)}
.v3les{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-top:10px}
.v3l{background:var(--surface);border:2px solid var(--line);border-radius:20px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow)}
.v3l .n{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--teal);color:var(--teal-ink);font:800 16px var(--f-display);flex:none}
.v3l h4{font:800 16px var(--f-display);line-height:1.35}
.v3l .row{gap:6px}
.v3prog{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.v3prog span{background:var(--soft);border-radius:99px;padding:1px 10px;font-size:12px;font-weight:700}
.v3prog span.on{background:var(--teal);color:var(--teal-ink)}
/* deck */
.v3deck{display:flex;flex-direction:column;flex:1;min-height:0;position:relative;z-index:1}
.v3sl{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(8px,2vh,18px);padding:16px;text-align:center}
.v3sl h2{font-size:clamp(24px,5vw,44px);color:var(--teal)}
.v3sl .big{font:800 clamp(80px,22vw,190px)/1 var(--f-display);color:var(--orange)}
.v3sl .ln{font:700 clamp(18px,3.6vw,32px)/1.7 var(--f-body)}
.v3sl .vis{font-size:clamp(28px,6vw,56px);line-height:1.5;white-space:pre-wrap;word-break:break-word}
.v3sl .q{font:800 clamp(22px,4.6vw,40px)/1.5 var(--f-display)}
.v3sl ul{list-style:none;padding:0;margin:0;display:grid;gap:10px;text-align:start;max-width:760px}
.v3sl li{font:700 clamp(18px,3.4vw,30px)/1.6 var(--f-body);background:var(--surface);border:2px solid var(--line);border-radius:18px;padding:8px 16px}
.v3sl .opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;width:min(100%,760px)}
.v3sl .opt{font-size:clamp(20px,4vw,34px)}
.v3sl .fb{min-height:40px;font:800 clamp(18px,3.4vw,28px) var(--f-display)}
.v3sl .fb.ok{color:#2f9e44}.v3sl .fb.no{color:#e03131}
.v3ex{display:grid;gap:10px}.v3ex div{font:800 clamp(24px,5vw,44px) var(--f-display);color:var(--teal);background:var(--surface);border-radius:18px;padding:6px 24px;border:2px solid var(--line)}
.v3nav{position:relative;z-index:1;display:flex;align-items:center;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:2px solid var(--line)}
.v3nav .bar{flex:1;margin:0}
.v3pg.fs .v3nav{background:transparent;border:0}
/* worksheet */
.ws{background:#fff;color:#111;max-width:800px;margin:0 auto;padding:22px;border-radius:14px;font:500 15px/1.9 Tajawal,Tahoma,sans-serif}
.ws h2{font-size:22px;color:#0e8f8a}.ws h3{font-size:16px;margin:14px 0 4px;border-bottom:2px solid #0e8f8a;padding-bottom:2px}
.ws-h{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #0e8f8a;padding-bottom:6px}
.ws-n{font:800 20px Tajawal;color:#ff7a2f}.ws-id{margin-block:8px;font-weight:700}
.ws-q{margin-block:8px;page-break-inside:avoid}.ws-vis{font-size:26px;letter-spacing:2px;line-height:1.5}
.ws-o{display:flex;gap:22px;flex-wrap:wrap;font-weight:700}
.ws-line{font-size:20px;font-weight:700;margin-block:4px}
.ws-box{border:2px dashed #999;border-radius:12px;height:150px;display:flex;align-items:center;justify-content:center;color:#999}
.ws-f{margin-top:14px;text-align:center;color:#777;font-size:12px}
@media print{
 body.v3print>*:not(.v3pg){display:none!important}
 body.v3print .v3pg{position:static!important;display:block!important;background:#fff!important}
 body.v3print .v3pg>.bgx,body.v3print .v3h,body.v3print .v3pp{display:none!important}
 body.v3print .v3b{overflow:visible!important;padding:0!important}
 body.v3print .ws{max-width:none;padding:0;border-radius:0}
}
/* الأدوات الثانوية داخل الإعدادات في كل الأحجام */
.tools>.ibtn:not(#xpb):not(#vx3Set){display:none!important}
/* ========== موبايل: واجهة جديدة ========== */
@media(max-width:760px){
 body{padding-inline:12px;font-size:14px}
 .v3cur{gap:10px}.v3curstep{border-radius:20px;padding:10px}.v3curstep>h3{font-size:17px}.v3curcards{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.v3curcard{padding:9px 8px;min-height:68px;font-size:13px}
 .top{padding:6px 12px;margin-inline:-12px}
 .top .wrap{flex-wrap:nowrap!important;gap:8px!important}
 .brand{flex:1;min-width:0}
 .brand svg{width:34px;height:34px}.brand b{font-size:21px}
 .brand>span{min-width:0;display:block;overflow:hidden;text-align:start}
 .brand small{display:block!important;font-size:9.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .brand svg{flex:none}
 .tools{order:0!important;width:auto!important;overflow:visible!important;gap:6px!important;flex:none}
 #xpb{height:34px;border-radius:99px;font-size:11.5px!important;padding-inline:9px!important;line-height:1.15}
 #vx3Set{width:36px;height:36px;font-size:16px}
 #loginBtn{padding:6px 10px;font-size:12px;border-radius:99px;max-width:84px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-shadow:none}
 .ticker{display:none}
 .hero{grid-template-columns:1fr 104px!important;padding-block:10px 0!important;gap:8px!important}
 .hero .mwrap{order:0!important;width:104px!important;grid-column:2;grid-row:1}
 .hero>div:first-child{grid-column:1;grid-row:1}
 .hero h1{font-size:22px!important;line-height:1.35}
 .hero .badge{display:none}
 .hero .search{grid-column:1/-1}
 .hero form.search{margin-top:10px}
 .hero p.lead{display:none!important}
 .bubble{max-width:90%!important;font-size:11px!important;inset-block-start:-14px!important}
 .toast{inset-block-end:calc(84px + env(safe-area-inset-bottom,0px))}
 .vx-hub{grid-template-columns:repeat(2,1fr);margin-top:8px}
 .v3gc{grid-template-columns:repeat(2,1fr)}
 .v3les{grid-template-columns:1fr}
 .filters{grid-template-columns:1fr 1fr!important;padding:10px!important}
 .h2 h2{font-size:18px!important}
 .v3sl{padding:10px}
 footer .row{flex-direction:column;align-items:flex-start;gap:8px}
}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

/* ================= الخلفية ================= */
safe("bg", () => {
  const d = document.createElement("div"); d.className = "v3bg"; d.setAttribute("aria-hidden", "true");
  const palm = `<svg viewBox="0 0 100 160" fill="currentColor"><path d="M47 160 Q50 100 52 60 L56 60 Q55 100 58 160Z"/><path d="M54 62 Q20 40 4 54 Q30 44 54 62Z"/><path d="M54 62 Q30 20 10 24 Q38 28 54 62Z"/><path d="M54 62 Q54 18 40 4 Q62 22 54 62Z"/><path d="M54 62 Q80 22 98 28 Q70 30 54 62Z"/><path d="M54 62 Q88 44 98 62 Q74 48 54 62Z"/></svg>`;
  const stars = [[8, 12], [22, 6], [38, 18], [60, 8], [74, 20], [90, 10], [48, 4], [14, 26]].map(([x, y], i) => `<span class="st" style="left:${x}%;top:${y}%;animation-delay:-${i * .7}s">✦</span>`).join("");
  d.innerHTML = `<div class="orb o1"></div><div class="orb o2"></div><div class="moon">🌙</div>${stars}
  <div class="palm p1">${palm}</div><div class="palm p2">${palm}</div>
  <svg class="d2" viewBox="0 0 1200 200" preserveAspectRatio="none"><path fill="var(--dune2)" d="M0 120 Q150 60 300 110 T600 100 T900 120 T1200 90 V200 H0Z"/></svg>
  <svg class="d1" viewBox="0 0 1200 200" preserveAspectRatio="none"><path fill="var(--dune1)" d="M0 150 Q200 100 380 140 T760 130 T1200 150 V200 H0Z"/></svg>`;
  document.body.prepend(d);
});

/* ================= الموسيقى الهادئة (50%) ================= */
const VOL = () => (prefs.vol === undefined ? .5 : prefs.vol);
safe("music", () => {
  const CH = [[146.83, 220, 329.63, 369.99], [123.47, 185, 293.66, 440], [98, 146.83, 246.94, 293.66], [110, 164.81, 220, 277.18]];
  const BELL = [587.33, 659.25, 739.99, 880, 987.77];
  let timers = [];
  window.musicOn = function () {
    if (amb || prefs.mus === false) return; const c = ac(); if (!c) return;
    const g = c.createGain(); g.gain.value = .0001;
    const master = c.createGain(); master.gain.value = VOL();
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1100;
    lp.connect(g); g.connect(master); master.connect(c.destination);
    g.gain.linearRampToValueAtTime(.075, c.currentTime + 3);
    amb = { g, c, master, lp };
    const voice = (f, t0, dur, amp, type) => {
      const o = c.createOscillator(), e = c.createGain(); o.type = type || "sine"; o.frequency.value = f; o.detune.value = (Math.random() - .5) * 8;
      o.connect(e); e.connect(lp); e.gain.setValueAtTime(.0001, t0); e.gain.linearRampToValueAtTime(amp, t0 + dur * .38); e.gain.linearRampToValueAtTime(.0001, t0 + dur);
      o.start(t0); o.stop(t0 + dur + .1);
    };
    let i = 0;
    const chord = () => { if (!amb || amb.c !== c) return; const t = c.currentTime + .05; CH[i % 4].forEach((f, k) => { voice(f, t + k * .15, 9, k === 0 ? .55 : .4, k === 0 ? "triangle" : "sine"); voice(f * 2, t + k * .15, 9, .1) }); i++; timers.push(setTimeout(chord, 7500)) };
    const bell = () => { if (!amb || amb.c !== c) return; const f = BELL[rnd(0, 4)], t = c.currentTime + .05; voice(f, t, 4.5, .22); timers.push(setTimeout(bell, rnd(4500, 9000))) };
    chord(); timers.push(setTimeout(bell, 3500));
  };
  window.musicOff = function () {
    timers.forEach(clearTimeout); timers = []; if (!amb) return; const a = amb; amb = null;
    try { a.g.gain.cancelScheduledValues(a.c.currentTime); a.g.gain.setTargetAtTime(.0001, a.c.currentTime, .3); setTimeout(() => { try { a.master.disconnect() } catch (e) { } }, 1600) } catch (e) { }
  };
});

/* ================= الإعدادات (موبايل: تجميع الأزرار) ================= */
const LBL = { vxChar: "من أنت؟", ctry: "المنهج", fsz: "حجم الخط", mus: "الموسيقى", snd: "المؤثرات", thm: "الوضع الليلي", vxBell: "التنبيهات" };
safe("settings", () => {
  const b = document.createElement("button"); b.className = "ibtn"; b.id = "vx3Set"; b.title = "الإعدادات"; b.setAttribute("aria-label", "الإعدادات"); b.textContent = "⚙️";
  $("#xpb").after(b);
  b.onclick = () => {
    const ov = document.createElement("div"); ov.className = "v3sh";
    const moved = [];
    const tiles = Object.keys(LBL).map(id => $("#" + id)).filter(Boolean);
    ov.innerHTML = `<div><h3>⚙️ الإعدادات</h3>${tiles.length ? '<div class="v3tiles"></div>' : ""}
      <div class="v3vol"><span>🎵</span><input type="range" min="0" max="100" step="5" value="${Math.round(VOL() * 100)}" aria-label="مستوى الموسيقى"><b id="v3vv">${Math.round(VOL() * 100)}%</b></div>
      <p class="hint" style="margin-top:8px">الموسيقى الهادئة تبدأ على 50% ويمكنك خفضها أو رفعها.</p>
      <button class="btn g" style="width:100%;margin-top:10px" data-v3x="1">إغلاق</button></div>`;
    const tw = ov.querySelector(".v3tiles");
    tiles.forEach(el => { const ph = document.createComment("v3"); el.before(ph); const w = document.createElement("div"); w.className = "v3t"; w.append(el); const l = document.createElement("span"); l.textContent = LBL[el.id]; w.append(l); tw.append(w); moved.push([el, ph]) });
    const close = () => { moved.forEach(([el, ph]) => ph.replaceWith(el)); ov.remove() };
    ov.onclick = e => { if (e.target === ov || e.target.closest("[data-v3x]")) close() };
    ov.querySelector("input").oninput = e => { prefs.vol = e.target.value / 100; store.set("itqan_prefs", prefs); $("#v3vv").textContent = e.target.value + "%"; if (amb && amb.master) amb.master.gain.value = prefs.vol; else if (prefs.mus !== false) musicOn() };
    document.body.appendChild(ov);
  };
});

/* ================= الصفحات الكاملة (مكدّس + زر الرجوع) ================= */
const stack = [];
function pushPage(entry) {
  const t = stack[stack.length - 1], m = $("#modal");
  if (t && t.el === m && m.hidden) { stack.pop(); stack.push(entry); history.replaceState(Object.assign({}, history.state, { vxm: 1, d: stack.length }), ""); return }
  stack.push(entry);
  history.pushState(Object.assign({}, history.state, { vxm: 1, d: stack.length }), "");
}
function closeTop() { const e = stack.pop(); if (!e) return; try { e.onClose && e.onClose() } catch (x) { } if (e.el && !e.keep) e.el.remove() }
addEventListener("popstate", ev => { const d = ev.state && ev.state.vxm ? ev.state.d : 0; while (stack.length > d) closeTop() });
const back = () => { if (stack.length) history.back() };
document.addEventListener("keydown", e => { if (e.key === "Escape" && stack.length && !document.fullscreenElement) back() }, true);
function toggleFS(el) {
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (fsEl) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return }
  const rq = el.requestFullscreen || el.webkitRequestFullscreen;
  if (rq) { try { const r = rq.call(el); if (r && r.catch) r.catch(() => el.classList.toggle("fs")) } catch (e) { el.classList.toggle("fs") } } else el.classList.toggle("fs");
}
document.addEventListener("fullscreenchange", () => { $$(".v3pg").forEach(p => p.classList.toggle("fs", document.fullscreenElement === p)); const m = $("#modal"); if (m) m.classList.toggle("fs", document.fullscreenElement === m) });
function mkPage(title, extraHead) {
  const el = document.createElement("div"); el.className = "v3pg"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", title);
  el.innerHTML = `<div class="v3h"><button class="btn g sm" data-v3b="1" aria-label="رجوع">→ رجوع</button><b>${title}</b>${extraHead || ""}<button class="btn g sm" data-v3fs="1" aria-label="ملء الشاشة">⛶ ملء الشاشة</button></div>
  <div class="v3fsx"><button class="btn g sm" data-v3b="1">→ رجوع</button><button class="btn g sm" data-v3fs="1">⛶ خروج</button></div><div class="v3b"></div>`;
  el.addEventListener("click", e => { if (e.target.closest("[data-v3b]")) back(); else if (e.target.closest("[data-v3fs]")) toggleFS(el) });
  return el;
}

/* ================= مصنع الألعاب: كتالوج مرتّب بالنوع والمستوى ================= */
const LV = ["", "🟢 سهل", "🟡 متوسط", "🔴 متقدم"];
const pickN = (arr, n) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i);[a[i], a[j]] = [a[j], a[i]] } return a.slice(0, n) };
function wrongNums(ans, lo, hi) { const s = new Set(); let g = 0; while (s.size < 2 && g++ < 80) { const v = ans + rnd(-3, 3); if (v !== ans && v >= lo && v <= hi + 4) s.add(v) } for (let v = lo; s.size < 2; v++) if (v !== ans) s.add(v); return [...s] }
function mathLines(kind, max, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    let a, b, ans, q;
    if (kind === "add") { a = rnd(1, max - 1); b = rnd(1, max - a); ans = a + b; q = `${AR(a)} + ${AR(b)} = ؟` }
    else if (kind === "addsub") { if (i % 2) { a = rnd(2, max); b = rnd(1, a); ans = a - b; q = `${AR(a)} − ${AR(b)} = ؟` } else { a = rnd(1, max - 1); b = rnd(1, max - a); ans = a + b; q = `${AR(a)} + ${AR(b)} = ؟` } }
    else if (kind === "mul") { a = rnd(2, 10); b = rnd(2, 10); ans = a * b; q = `${AR(a)} × ${AR(b)} = ؟` }
    else { b = rnd(2, 9); ans = rnd(2, 9); a = b * ans; q = `${AR(a)} ÷ ${AR(b)} = ؟` }
    const w = wrongNums(ans, 0, kind === "mul" ? 100 : max); out.push(`${q} | ${AR(ans)} | ${AR(w[0])} | ${AR(w[1])}`);
  }
  return out.join("\n");
}
const mixQuiz = () => mathLines("mul", 100, 8) + "\n" + mathLines("div", 100, 7);
const countLines = (max, n) => Array.from({ length: n }, () => `${["🍎", "⭐", "🐟", "🎈", "🚗", "🌸", "🐥", "🍪", "🧸", "🍊"][rnd(0, 9)]}|${rnd(1, max)}`).join("\n");
const WORDS3 = [["🍎", "تفاحة", "ت"], ["🐪", "جمل", "ج"], ["🌙", "قمر", "ق"], ["🐟", "سمكة", "س"], ["🦆", "بطة", "ب"], ["📖", "كتاب", "ك"], ["☀️", "شمس", "ش"], ["⭐", "نجمة", "ن"], ["🌹", "وردة", "و"], ["🏠", "بيت", "ي"], ["🐱", "قطة", "ط"], ["🐘", "فيل", "ف"]];
const WORDS4 = [["🚗", "سيارة", "ر"], ["🍌", "موزة", "م"], ["🍇", "عنب", "ع"], ["✈️", "طائرة", "ط"], ["🐎", "حصان", "ح"], ["🦅", "صقر", "ص"], ["🌴", "نخلة", "خ"], ["🏫", "مدرسة", "د"], ["🐑", "خروف", "ر"], ["🦒", "زرافة", "ر"], ["🌧️", "مطر", "ط"], ["🧸", "دمية", "ي"]];
const LETTERS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");
const missLines = L => L.map(([e, w, l]) => { const wr = pickN(LETTERS.filter(x => x !== l && !w.includes(x)), 2); return `${e}|${w}|${l}|${wr[0]}|${wr[1]}` }).join("\n");
const CAT = [
  /* بالونات */
  { t: "balloons", l: 1, e: "🎈", n: "بالونات الجمع ضمن ١٠", make: () => mathLines("add", 10, 14) },
  { t: "balloons", l: 2, e: "🎈", n: "بالونات الجمع والطرح ضمن ٢٠", s: 5, make: () => mathLines("addsub", 20, 16) },
  { t: "balloons", l: 3, e: "🎈", n: "بالونات الضرب", make: () => mathLines("mul", 100, 16) },
  /* اختيار من متعدد */
  { t: "quiz", l: 1, e: "🐾", n: "معلومات عن الحيوانات", make: () => "أي حيوان يعطينا الحليب؟ | البقرة | الأسد | الحوت\nأي حيوان يُسمّى سفينة الصحراء؟ | الجمل | الحصان | الأرنب\nأي حيوان يعيش في الماء؟ | السمكة | القطة | العصفور\nأي حيوان له خرطوم طويل؟ | الفيل | الذئب | الغزال\nأي حيوان يطير في السماء؟ | الصقر | الأسد | الدب\nأي حيوان يبني خلية العسل؟ | النحلة | النملة | الفراشة\nأين يعيش الأسد؟ | الغابة | البحر | السماء\nأي حيوان يقفز وله جيب لصغيره؟ | الكنغر | الجمل | الفيل\nأي طائر لا يطير ويعيش في القطب؟ | البطريق | الصقر | الحمامة\nما صوت القطة؟ | مواء | نباح | صهيل" },
  { t: "quiz", l: 2, e: "🔬", n: "حالات المادة والعلوم", s: 2, make: () => "الماء في الحالة السائلة يأخذ شكل؟ | الإناء | ثابت | غاز\nالثلج مادة؟ | صلبة | سائلة | غازية\nبخار الماء مادة؟ | غازية | صلبة | سائلة\nعند تسخين الثلج يتحول إلى؟ | ماء | حجر | هواء\nأي مما يلي مصدر للضوء؟ | الشمس | القمر | الكتاب\nأي حاسة نستخدمها للشم؟ | الأنف | الأذن | اليد\nما الكوكب الذي نعيش عليه؟ | الأرض | المريخ | زحل\nماذا تحتاج النباتات لتنمو؟ | ماء وضوء | حلوى | ظلام\nأي مما يلي يجذبه المغناطيس؟ | المسمار الحديد | الورقة | الخشب\nكم عدد حواس الإنسان الأساسية؟ | ٥ | ٣ | ٧\nما الغاز الذي نتنفسه؟ | الأكسجين | الدخان | الغبار\nأي فصل يكون الجو فيه شديد الحرارة؟ | الصيف | الشتاء | الربيع" },
  { t: "quiz", l: 2, e: "🕌", n: "معلومات إسلامية", make: () => "كم عدد أركان الإسلام؟ | ٥ | ٣ | ٧\nكم عدد الصلوات المفروضة في اليوم؟ | ٥ | ٣ | ٤\nما اسم الشهر الذي نصومه؟ | رمضان | محرم | رجب\nأين تقع الكعبة المشرفة؟ | مكة المكرمة | المدينة المنورة | جدة\nإلى أي مدينة هاجر النبي ﷺ؟ | المدينة المنورة | الطائف | دمشق\nما أول سورة في المصحف؟ | الفاتحة | البقرة | الإخلاص\nما اسم الملك الذي نزل بالوحي؟ | جبريل | ميكائيل | إسرافيل\nماذا نقول قبل الأكل؟ | بسم الله | الحمد لله | سبحان الله\nكم ركعة في صلاة الفجر؟ | ٢ | ٣ | ٤\nما أول شهر في السنة الهجرية؟ | محرم | رمضان | شوال" },
  { t: "quiz", l: 2, e: "🇸🇦", n: "وطني المملكة", make: () => "ما عاصمة المملكة العربية السعودية؟ | الرياض | جدة | الدمام\nما لون علم المملكة؟ | أخضر | أحمر | أزرق\nمتى يوم التأسيس؟ | ٢٢ فبراير | ٢٣ سبتمبر | ١١ مارس\nمتى اليوم الوطني؟ | ٢٣ سبتمبر | ٢٢ فبراير | ١١ مارس\nمتى يوم العلم؟ | ١١ مارس | ٢٢ فبراير | ٢٣ سبتمبر\nما الشجرة التي نراها في شعار المملكة؟ | النخلة | الصنوبر | الزيتون\nأي مدينتين فيهما الحرمان الشريفان؟ | مكة والمدينة | الرياض وجدة | تبوك وأبها\nما الكتابة على علم المملكة؟ | لا إله إلا الله محمد رسول الله | الله أكبر | بسم الله" },
  { t: "quiz", l: 3, e: "✖️", n: "جدول الضرب والقسمة", make: mixQuiz },
  /* عدّ */
  { t: "count", l: 1, e: "🔢", n: "عدّ حتى ٥", make: () => countLines(5, 8) },
  { t: "count", l: 2, e: "🔢", n: "عدّ حتى ١٠", s: 8, make: () => countLines(10, 12) },
  /* حرف ناقص */
  { t: "missing", l: 1, e: "🔤", n: "أكمل الكلمة: كلمات قصيرة", s: 9, make: () => missLines(pickN(WORDS3, 12)) },
  { t: "missing", l: 2, e: "🔤", n: "أكمل الكلمة: كلمات أطول", make: () => missLines(pickN(WORDS4, 12)) },
  /* ذاكرة */
  { t: "memory", l: 1, e: "🦁", n: "ذاكرة الحيوانات", s: 1, make: () => pickN(["🦁|أسد", "🐪|جمل", "🐑|خروف", "🐦|عصفور", "🐟|سمكة", "🐘|فيل", "🐱|قطة", "🐎|حصان", "🦅|صقر", "🐢|سلحفاة"], 8).join("\n") },
  { t: "memory", l: 2, e: "➕", n: "ذاكرة الجمع والطرح", make: () => "٢ + ٣|٥\n٤ + ٤|٨\n٦ + ١|٧\n٥ + ٥|١٠\n٩ − ٣|٦\n٧ − ٢|٥\n٣ + ٣|٦\n١٠ − ١|٩" },
  { t: "memory", l: 3, e: "🔠", n: "ذاكرة الإنجليزية", make: () => pickN(["🍎|apple", "🐱|cat", "🐶|dog", "📖|book", "🏠|house", "☀️|sun", "🌙|moon", "🚗|car", "🐟|fish", "🌳|tree"], 8).join("\n") },
  /* مطابقة */
  { t: "match", l: 1, e: "⭐", n: "مزرعة الأعداد", s: 0, make: () => pickN([2, 3, 4, 5, 6, 7, 8, 9], 6).map(n => `${AR(n)} = ${"⭐".repeat(n)}`).join("\n") },
  { t: "match", l: 2, e: "🔗", n: "الكلمة والصورة", make: () => pickN(["أسد = 🦁", "جمل = 🐪", "خروف = 🐑", "عصفور = 🐦", "شجرة = 🌳", "قمر = 🌙", "سمكة = 🐟", "تفاحة = 🍎", "كتاب = 📖", "شمس = ☀️"], 8).join("\n") },
  { t: "match", l: 3, e: "🔤", n: "إنجليزي وعربي", make: () => pickN(["cat = قطة", "dog = كلب", "book = كتاب", "apple = تفاحة", "water = ماء", "house = بيت", "school = مدرسة", "teacher = معلم", "friend = صديق", "sun = شمس"], 8).join("\n") },
  /* ترتيب */
  { t: "order", l: 1, e: "🌱", n: "رتّب نمو النبات", s: 3, make: () => "بذرة\nإنبات\nنبتة صغيرة\nنبات مكتمل\nزهرة" },
  { t: "order", l: 2, e: "📅", n: "رتّب أيام الأسبوع", make: () => "الأحد\nالاثنين\nالثلاثاء\nالأربعاء\nالخميس\nالجمعة\nالسبت" },
  { t: "order", l: 3, e: "🌙", n: "رتّب الأشهر الهجرية", make: () => "محرم\nصفر\nربيع الأول\nربيع الآخر\nجمادى الأولى\nجمادى الآخرة\nرجب\nشعبان\nرمضان\nشوال\nذو القعدة\nذو الحجة" },
  /* فرز */
  { t: "sort", l: 1, e: "🌿", n: "حيّ أم غير حيّ", s: 6, make: () => pickN(["قطة > حي", "حجر > غير حي", "شجرة > حي", "كرسي > غير حي", "سمكة > حي", "كتاب > غير حي", "عصفور > حي", "قلم > غير حي", "وردة > حي", "كرة > غير حي", "نملة > حي", "طاولة > غير حي"], 12).join("\n") },
  { t: "sort", l: 2, e: "♻️", n: "فرز النفايات", s: 7, make: () => pickN(["ورق > صندوق الورق", "بلاستيك > صندوق البلاستيك", "جريدة > صندوق الورق", "قارورة > صندوق البلاستيك", "كرتون > صندوق الورق", "كيس > صندوق البلاستيك", "دفتر قديم > صندوق الورق", "علبة عصير بلاستيكية > صندوق البلاستيك", "مجلة > صندوق الورق", "كوب بلاستيكي > صندوق البلاستيك"], 10).join("\n") },
  { t: "sort", l: 3, e: "✏️", n: "اسم أم فعل", make: () => pickN(["كتاب > اسم", "يكتب > فعل", "مدرسة > اسم", "يقرأ > فعل", "شجرة > اسم", "يلعب > فعل", "سيارة > اسم", "ذهب > فعل", "معلم > اسم", "جلس > فعل", "نخلة > اسم", "أكل > فعل", "طالب > اسم", "يرسم > فعل"], 14).join("\n") },
  /* ابحث عن */
  { t: "find", l: 1, e: "🔍", n: "ابحث عن النجمة والشكل", s: 10, make: () => "⭐|🌙\n🍎|🍌\n🐱|🐶\n🎈|🚗\n🌸|🌳\n🐟|🐦\n❤️|💙\n🔺|🔵" },
  { t: "find", l: 2, e: "🕵️", n: "ابحث عن المختلف (متشابهات)", make: () => "🍎|🍅\n🐶|🐺\n🍋|🍌\n🐱|🐯\n🌹|🌷\n😀|😃\n🔴|🟠\n🍊|🥕" },
  /* تتبع */
  { t: "trace", l: 1, e: "✍️", n: "تتبّع الأرقام", s: 11, make: () => "١\n٢\n٣\n٤\n٥\n٦\n٧\n٨\n٩\n٠" },
  { t: "trace", l: 2, e: "✍️", n: "تتبّع الحروف (١)", make: () => "أ\nب\nت\nث\nج\nح\nخ\nد\nذ\nر" },
  { t: "trace", l: 3, e: "✍️", n: "تتبّع الحروف (٢)", make: () => "ز\nس\nش\nص\nض\nط\nع\nغ\nف\nق" },
  /* ألوان */
  { t: "color", l: 1, e: "🎨", n: "تعلّم الألوان", s: 12, make: () => "أحمر|#e03131\nأزرق|#1c7ed6\nأصفر|#fcc419\nأخضر|#2f9e44\nبرتقالي|#f76707\nبنفسجي|#7048e8" },
  { t: "color", l: 2, e: "🌈", n: "ألوان متدرجة", make: () => "أحمر|#e03131\nأزرق|#1c7ed6\nأخضر|#2f9e44\nأصفر|#fcc419\nبرتقالي|#f76707\nبنفسجي|#7048e8\nوردي|#f06595\nبني|#8d5524\nرمادي|#868e96\nتركوازي|#12b886" },
  /* عجلة */
  { t: "wheel", l: 1, e: "🎡", n: "عجلة الحصة", s: 4, make: () => "سؤال علوم\nسؤال رياضيات\nأنشودة\nحركة رياضية\nقصة قصيرة\nجائزة 🎁" },
  { t: "wheel", l: 2, e: "🎡", n: "عجلة المراجعة", make: () => "اذكر جمعاً\nاذكر مثالاً من حياتك\nاقرأ الكلمة\nارسم شكلاً\nصفّق ٣ مرات\nاختر زميلاً يجيب" }
];
const TYPE_ORDER = ["quiz", "balloons", "memory", "match", "order", "sort", "count", "missing", "find", "trace", "color", "wheel"];
const gf = { t: "", l: "" };
function renderGallery() {
  const host = $("#v3gal"); if (!host) return;
  const types = TYPE_ORDER.filter(t => CAT.some(g => g.t === t));
  const chips = (arr, key, all) => `<div class="v3chips">${[["", all], ...arr].map(([v, n]) => `<button data-gf="${key}" data-v="${v}" aria-pressed="${gf[key] === v}">${n}</button>`).join("")}</div>`;
  let h = chips(types.map(t => [t, GT[t].e + " " + GT[t].n]), "t", "الكل") + chips([[1, LV[1]], [2, LV[2]], [3, LV[3]]].map(([v, n]) => [String(v), n]), "l", "كل المستويات");
  types.filter(t => !gf.t || gf.t === t).forEach(t => {
    const L = CAT.filter(g => g.t === t && (!gf.l || String(g.l) === gf.l)).sort((a, b) => a.l - b.l);
    if (!L.length) return;
    h += `<div class="v3grp"><h3>${GT[t].e} ${GT[t].n} <small>${L.length} ${L.length > 2 ? "ألعاب" : "لعبة"}</small></h3><div class="v3gc">${L.map(g => `<button class="v3g" data-v3g="${CAT.indexOf(g)}"><span class="e">${g.e}</span><b>${g.n}</b><small>${LV[g.l]}</small><span class="go">▶ العب</span></button>`).join("")}</div></div>`;
  });
  host.innerHTML = h || `<div class="empty"><div class="big">🦉</div><p>لا توجد ألعاب بهذه المواصفات</p></div>`;
}
let hostHome = null;
function openGame(g) {
  const pg = mkPage(`${g.e} ${g.n}`, `<span class="v3lv">${LV[g.l]}</span>`);
  const b = pg.querySelector(".v3b"); const host = $("#stageHost");
  const ph = document.createComment("v3stage"); host.before(ph); b.append(host);
  const play = () => {
    window.run(g.t, g.n, g.make());
    const again = $("#again"), stop = $("#stop");
    if (again) again.onclick = play;
    if (stop) { stop.textContent = "→ كل الألعاب"; stop.onclick = back }
    b.scrollTop = 0;
  };
  document.body.appendChild(pg);
  pushPage({ el: pg, onClose: () => { if (document.fullscreenElement) try { document.exitFullscreen() } catch (e) { } host.innerHTML = ""; ph.replaceWith(host) } });
  play();
}
safe("gallery", () => {
  const smp = $("#samples"); if (!smp) return;
  const prevH = smp.previousElementSibling; if (prevH) prevH.style.display = "none";
  smp.style.display = "none";
  const d = document.createElement("div"); d.id = "v3gal"; smp.before(d);
  d.addEventListener("click", e => {
    const f = e.target.closest("[data-gf]"); if (f) { gf[f.dataset.gf] = f.dataset.v; return renderGallery() }
    const g = e.target.closest("[data-v3g]"); if (g) openGame(CAT[+g.dataset.v3g]);
  });
  renderGallery();
  const hint = $("#p-games>.hint"); if (hint) hint.textContent = "اختر النوع والمستوى، ثم اضغط على اللعبة لتفتح في صفحة كاملة. وفي الأسفل تصنع لعبتك بنفسك.";
  const op = window.playSample; window.playSample = function (i) { const g = CAT.find(x => x.s === i); if (g) { go("games"); return openGame(g) } return op.apply(this, arguments) };
});

/* ================= صفحة النشاط: كاملة + ملء الشاشة ================= */
safe("activity", () => {
  const oa = window.openAct; const modal = $("#modal");
  window.openAct = function (id) {
    const wasHidden = modal.hidden;
    oa.apply(this, arguments);
    modal.classList.add("v3act");
    const sh = $("#sheet"), cl = sh.querySelector(".close");
    if (cl && !sh.querySelector("[data-v3fsa]")) { const f = document.createElement("button"); f.className = "btn g sm close"; f.style.marginInlineStart = "6px"; f.dataset.v3fsa = "1"; f.textContent = "⛶ ملء الشاشة"; cl.after(f) }
    if (wasHidden && !modal.hidden) pushPage({ el: modal, keep: true, onClose: () => { if (document.fullscreenElement) try { document.exitFullscreen() } catch (e) { } modal.hidden = true } });
  };
  modal.addEventListener("click", e => { if (e.target.closest("[data-v3fsa]")) { e.stopPropagation(); toggleFS(modal) } }, true);
  new MutationObserver(() => { if (modal.hidden && stack.length && stack[stack.length - 1].el === modal) back() }).observe(modal, { attributes: true, attributeFilter: ["hidden"] });
});

/* ================= المناهج والعروض ================= */
const cs = { g: 1, s: "math", t: 1, u: 0 };
const pptxLoad = () => window.PptxGenJS ? Promise.resolve(window.PptxGenJS) : new Promise((res, rej) => { const s = document.createElement("script"); s.src = "https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js"; s.onload = () => window.PptxGenJS ? res(window.PptxGenJS) : rej(); s.onerror = rej; document.head.appendChild(s) });
function lessonOf(i) { return CUR.build(cs.g, cs.s, cs.t, i) }
function renderCur() {
  const host = $("#curBody"); if (!host) return;
  const ready = [...Object.keys(CUR.LESSONS)].map(k => k.split("|"));
  const L = CUR.list(cs.g, cs.s, cs.t);
  const units = CUR.listUnits(cs.g, cs.s, cs.t);
  const UL = cs.u < units.length ? CUR.listByUnit(cs.g, cs.s, cs.t, cs.u) : L;
  const cards = (items, key, selected) => items.map(([value, title, note]) => `<button class="v3curcard" data-cs="${key}" data-v="${value}" aria-pressed="${String(selected) === String(value)}">${title}${note ? `<small>${note}</small>` : ""}</button>`).join("");
  let h = `<p class="hint">عروض تفاعلية بملء الشاشة + ملف PowerPoint قابل للتحميل + ورقة عمل للطباعة + لعبة، لكل درس. اختر الفصل الدراسي، ثم الصف والمادة والوحدة.</p>
  <div class="v3cur">
   <section class="v3curstep"><h3><b>١</b> اختر الفصل الدراسي</h3><div class="v3curcards">${cards([1, 2, 3].map(t => [t, `📚 ${CUR.TERMS[t - 1]}`, t === 1 ? "المحتوى المتاح يبدأ هنا" : "تصفح المحتوى المتاح"]), "t", cs.t)}</div></section>
   <section class="v3curstep"><h3><b>٢</b> اختر الصف</h3><div class="v3curcards">${cards(GRADES.map(g => [g, `${["🐣", "🧸", "🎈", "🚀", "🧪", "🏆", "🎓"][g]} ${gn(g)}`, `${CUR.list(g, cs.s, cs.t).length} درس متاح`]), "g", cs.g)}</div></section>
   <section class="v3curstep"><h3><b>٣</b> اختر المادة</h3><div class="v3curcards">${cards(Object.entries(SUBJ).filter(([k]) => k === "math" || k === "arabic").map(([k, v]) => [k, `${v[1]} ${v[0]}`, CUR.list(cs.g, k, cs.t).length ? `${CUR.list(cs.g, k, cs.t).length} درس` : "قيد الإعداد"]), "s", cs.s)}</div></section>
   ${units.length ? `<section class="v3curstep"><h3><b>٤</b> اختر الوحدة</h3><div class="v3curcards">${cards(units.map((u, idx) => [idx, `${u.e} ${u.n}`, `${CUR.listByUnit(cs.g, cs.s, cs.t, idx).length} درس`]), "u", cs.u)}</div></section>` : ""}
  </div>
  <div class="v3prog"><span class="on">✅ جاهز الآن: ${ready.length} مجموعة دروس (${ready.reduce((n, r) => n + CUR.LESSONS[r.join("|")].length, 0)} درساً)</span><span>الباقي يُضاف تباعاً</span></div>`;
  if (UL.length) {
    h += `<div class="h2"><h2>${SUBJ[cs.s][1]} ${SUBJ[cs.s][0]} · ${gn(cs.g)} · ${CUR.TERMS[cs.t - 1]}${units.length && cs.u < units.length ? " · " + units[cs.u].n : ""}</h2><span class="hint">${UL.length} درساً</span></div><div class="v3les">${UL.map(x => `<article class="v3l"><div class="row" style="flex-wrap:nowrap"><span class="n">${AR(x.i + 1)}</span><h4>${x.title}</h4></div><div class="row"><button class="btn sm" data-cl="show" data-i="${x.i}">▶ عرض تفاعلي</button><button class="btn o sm" data-cl="pptx" data-i="${x.i}">⬇ PowerPoint</button><button class="btn g sm" data-cl="ws" data-i="${x.i}">🖨 ورقة عمل</button><button class="btn g sm" data-cl="game" data-i="${x.i}">🎮 لعبة الدرس</button></div></article>`).join("")}</div>`;
  } else {
    h += `<div class="empty"><div class="big">🦉🛠️</div><h3>دروس هذه المادة قيد الإعداد</h3><p>نضيف المواد دفعات متتالية. الدفعة الأولى جاهزة الآن.</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn o" data-cs="jump">🚀 افتح الدفعة الجاهزة</button><button class="btn g" data-cs="req">💬 اطلب هذه المادة بالأولوية</button></div></div>`;
  }
  host.innerHTML = h;
}
function openDeck(les) {
  const pg = mkPage("🖥️ " + les.title, `<button class="btn g sm" data-v3sp="1" aria-label="قراءة بصوت">🔊</button>`);
  const body = pg.querySelector(".v3b"); body.style.cssText = "padding:0;display:flex;flex-direction:column";
  const S = [...les.slides, { k: "result" }]; let i = 0, score = 0, tot = S.filter(x => x.k === "quiz").length; const done = new Set();
  const wrap = document.createElement("div"); wrap.className = "v3deck";
  const nav = document.createElement("div"); nav.className = "v3nav v3pp";
  nav.innerHTML = `<button class="btn" data-n="p">▶ السابق</button><div class="bar"><i></i></div><button class="btn o" data-n="n">التالي ◀</button>`;
  wrap.innerHTML = `<div class="v3sl" id="v3sl"></div>`; wrap.append(nav); body.append(wrap);
  const text = s => [s.t, s.h, s.big, ...(s.lines || []), s.q, ...(s.items || []).map(x => typeof x === "string" ? x : x.q + " = " + x.a)].filter(Boolean).join(". ");
  const speak = () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text(S[i])); u.lang = "ar-SA"; u.rate = .9; speechSynthesis.speak(u) } catch (e) { } };
  const E = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function draw() {
    const s = S[i], el = pg.querySelector("#v3sl"); let h = "";
    if (s.k === "cover") h = `<div style="font-size:84px">🦉</div><h2>${E(s.t)}</h2><div class="ln">${E(s.sub)}</div><button class="btn o" data-n="n" style="font-size:20px;padding:12px 30px">ابدأ الدرس ◀</button>`;
    else if (s.k === "goals" || s.k === "sum") h = `<h2>${s.k === "goals" ? "🎯 أهداف الدرس" : "✅ ماذا تعلّمنا؟"}</h2><ul>${s.items.map(x => `<li>• ${E(x)}</li>`).join("")}</ul>`;
    else if (s.k === "learn") h = `<h2>${E(s.h)}</h2>${s.big ? `<div class="big">${E(s.big)}</div>` : ""}${s.lines.map(x => `<div class="ln">${E(x)}</div>`).join("")}${s.vis ? `<div class="vis">${E(s.vis)}</div>` : ""}`;
    else if (s.k === "example") h = `<h2>${E(s.h)}</h2><div class="v3ex">${s.items.map(x => `<div>${E(x.q)} = ${E(x.a)}</div>`).join("")}</div>`;
    else if (s.k === "try") h = `<h2>${E(s.h)}</h2><div class="q">${E(s.q)}</div>${s.vis ? `<div class="vis">${E(s.vis)}</div>` : ""}<button class="btn" data-n="rev" style="font-size:18px">👀 اكشف الإجابة</button><div class="fb ok" id="v3fb"></div>`;
    else if (s.k === "quiz") h = `<h2>سؤال ${AR([...S].slice(0, i + 1).filter(x => x.k === "quiz").length)} من ${AR(tot)}</h2><div class="q">${E(s.q)}</div>${s.vis ? `<div class="vis">${E(s.vis)}</div>` : ""}<div class="opts">${s.opts.map((o, k) => `<button class="opt" data-a="${k}">${E(o)}</button>`).join("")}</div><div class="fb" id="v3fb"></div>`;
    else h = `<div style="font-size:84px">🏆</div><h2>أحسنت! أنهيت الدرس</h2><div class="q">نتيجتك: ${AR(score)} من ${AR(tot)}</div><div class="row" style="justify-content:center"><button class="btn o" data-n="game">🎮 العب لعبة الدرس</button><button class="btn g" data-n="ws">🖨 ورقة العمل</button><button class="btn g" data-n="again">↺ أعد العرض</button></div>`;
    el.innerHTML = h; el.scrollTop = 0;
    nav.querySelector(".bar i").style.width = Math.round((i + 1) / S.length * 100) + "%";
    nav.querySelector('[data-n="p"]').disabled = i === 0; nav.querySelector('[data-n="n"]').style.visibility = i === S.length - 1 ? "hidden" : "visible";
    if (s.k === "result") { confetti(); addXP && addXP(5, "views", true) }
  }
  wrap.addEventListener("click", e => {
    const a = e.target.closest("[data-a]"), n = e.target.closest("[data-n]");
    if (a) { const s = S[i], fb = pg.querySelector("#v3fb"), k = +a.dataset.a;
      if (k === s.ans) { a.classList.add("done"); if (!done.has(i)) { done.add(i); if (!a.dataset.w && !pg._wrong?.has(i)) score++ } fb.className = "fb ok"; fb.textContent = "✅ أحسنت! إجابة صحيحة"; good(); pg.querySelectorAll(".opt").forEach(o => o.style.pointerEvents = "none") }
      else { (pg._wrong = pg._wrong || new Set()).add(i); a.classList.add("bad"); setTimeout(() => a.classList.remove("bad"), 400); fb.className = "fb no"; fb.textContent = "🤔 حاول مرة أخرى"; bad() }
      return }
    if (!n) return; const v = n.dataset.n;
    if (v === "n" && i < S.length - 1) { i++; draw() } else if (v === "p" && i > 0) { i--; draw() }
    else if (v === "rev") { const fb = pg.querySelector("#v3fb"); fb.textContent = "الإجابة: " + S[i].a; good() }
    else if (v === "again") { i = 0; score = 0; done.clear(); pg._wrong = null; draw() }
    else if (v === "game") openLessonGame(les); else if (v === "ws") openWs(les);
  });
  pg.addEventListener("click", e => { if (e.target.closest("[data-v3sp]")) speak() });
  const key = e => { if (!document.body.contains(pg)) return removeEventListener("keydown", key); if (stack[stack.length - 1]?.el !== pg) return; if (e.key === "ArrowLeft") { if (i < S.length - 1) { i++; draw() } } else if (e.key === "ArrowRight") { if (i > 0) { i--; draw() } } };
  addEventListener("keydown", key);
  let x0 = null; wrap.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  wrap.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) < 70 || e.target.closest(".opt")) return; if (dx < 0 && i < S.length - 1) { i++; draw() } else if (dx > 0 && i > 0) { i--; draw() } }, { passive: true });
  document.body.appendChild(pg); pushPage({ el: pg, onClose: () => { removeEventListener("keydown", key); try { speechSynthesis.cancel() } catch (e) { } if (document.fullscreenElement) try { document.exitFullscreen() } catch (e) { } } });
  draw();
}
function openLessonGame(les) { openGame({ t: "quiz", l: 1, e: "🎮", n: "لعبة: " + les.title, make: () => CUR.gameText(les) }) }
function openWs(les) {
  const pg = mkPage("🖨 ورقة عمل: " + les.title, `<button class="btn o sm" data-v3pr="1">🖨 طباعة</button>`);
  pg.querySelector(".v3b").innerHTML = CUR.worksheetHtml(les);
  pg.addEventListener("click", e => { if (e.target.closest("[data-v3pr]")) { document.body.classList.add("v3print"); const un = () => { document.body.classList.remove("v3print"); removeEventListener("afterprint", un) }; addEventListener("afterprint", un); window.print() } });
  document.body.appendChild(pg); pushPage({ el: pg });
}
async function dlPptx(i) {
  const les = lessonOf(i); toast("جارٍ تجهيز ملف PowerPoint… ⏳");
  try { const P = await pptxLoad(); const p = CUR.buildPptx(P, les); await p.writeFile({ fileName: `${les.title} - ${les.meta.sname} - ${les.meta.gname}.pptx` }); toast("تم تنزيل ملف PowerPoint ⬇"); addXP(5, "dl", true) }
  catch (e) { toast("تعذر إنشاء الملف، تأكد من الاتصال بالإنترنت") }
}
safe("cur-page", () => {
  const main = $("main"), sec = document.createElement("section"); sec.className = "page"; sec.id = "p-cur"; sec.hidden = true;
  sec.innerHTML = `<div class="h2"><h2>🖥️ المناهج الدراسية</h2></div><div id="curBody"></div>`; main.appendChild(sec);
  PAGES.push("cur");
  const nb = document.createElement("button"); nb.dataset.go = "cur"; nb.textContent = "🖥️ المناهج الدراسية"; $('nav button[data-go="games"]').after(nb);
  const og = window.go; window.go = function (p) { og.apply(this, arguments); if (p === "cur") renderCur() };
  sec.addEventListener("click", e => {
    const c = e.target.closest("[data-cs]"), l = e.target.closest("[data-cl]");
    if (c) { const k = c.dataset.cs; if (k === "jump") { Object.assign(cs, { g: 1, s: "math", t: 1, u: 0 }) } else if (k === "req") { sendFeedback("request", `طلب مادة: ${SUBJ[cs.s][0]} - ${gn(cs.g)} - ${CUR.TERMS[cs.t - 1]}`); return toast("وصل طلبك ✅") } else { cs[k] = k === "s" ? c.dataset.v : +c.dataset.v; if (k === "t" || k === "g" || k === "s") cs.u = 0 } return renderCur() }
    if (l) { const i = +l.dataset.i, k = l.dataset.cl; const les = lessonOf(i);
      if (k === "show") openDeck(les); else if (k === "pptx") needAuth(() => dlPptx(i)); else if (k === "ws") openWs(les); else if (k === "game") openLessonGame(les) }
  });
});

/* ================= الدخول بالأدوار + رابط التأكيد ================= */
const ROLES = [["teacher", "معلم", "🧑‍🏫"], ["boy", "طالب", "🧒"], ["girl", "طالبة", "👧"], ["parent", "ولي أمر", "👨‍👦"]];
safe("auth", () => {
  const show = function () {
    let role = prefs.char && ROLES.some(r => r[0] === prefs.char) ? prefs.char : "teacher";
    $("#asheet").innerHTML = `<button class="btn g sm close" data-close="1">✕</button><div style="font-size:46px">🌴</div><h2>حيّاك الله في إتقان</h2>
     <p class="hint">اختر من أنت، واكتب بريدك الإلكتروني. نرسل لك رسالة تأكيد، تضغط الرابط فيها ويفتح الموقع تلقائياً وأنت داخل.</p>
     <div class="v3chips" id="v3roles" style="flex-wrap:wrap">${ROLES.map(r => `<button type="button" data-r="${r[0]}" aria-pressed="${role === r[0]}">${r[2]} ${r[1]}</button>`).join("")}</div>
     <form id="af"><label class="hint" for="em">البريد الإلكتروني</label><input class="fld" id="em" type="email" required autocomplete="email" placeholder="name@example.com" dir="ltr" value="${user ? esc(user.email) : ""}">
     <label class="row hint" style="margin-block:8px"><input type="checkbox" id="ag" required> أوافق على الشروط وسياسة الخصوصية</label>
     <button class="btn o" type="submit" style="width:100%">${sb ? "✉️ أرسل رابط الدخول" : "دخول تجريبي ←"}</button></form>
     <p class="sec-note" style="margin-top:10px">${sb ? "الدخول بدون كلمة مرور: نرسل رابطاً آمناً إلى بريدك (تفقّد الرسائل غير الهامة إن تأخر)." : "⚠️ التحقق بالبريد غير مفعّل بعد على هذا الموقع، فالدخول الآن تجريبي ويُحفظ في هذا الجهاز فقط. لتفعيل رسالة التأكيد يُربط الموقع بقاعدة البيانات (الخطوات في ملف README)."}</p>`;
    $("#authm").hidden = false; setTimeout(() => { const e = $("#em"); e && e.focus() }, 60);
    if (window.itqanSay) itqanSay("login");
    $("#v3roles").onclick = e => { const b = e.target.closest("[data-r]"); if (!b) return; role = b.dataset.r; $$("#v3roles button").forEach(x => x.setAttribute("aria-pressed", x === b)) };
    $("#af").onsubmit = async ev => {
      ev.preventDefault(); const email = $("#em").value.trim().toLowerCase();
      if (window.itqanSetChar) itqanSetChar(role);
      if (sb) {
        const btn = ev.submitter; if (btn) { btn.disabled = true; btn.textContent = "جارٍ الإرسال…" }
        const r = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname, data: { role } } });
        if (r.error) { if (btn) { btn.disabled = false; btn.textContent = "✉️ أرسل رابط الدخول" } return toast("تعذر إرسال الرابط: " + r.error.message) }
        $("#asheet").innerHTML = `<button class="btn g sm close" data-close="1">✕</button><div style="font-size:52px">✉️</div><h2>تفقّد بريدك الآن</h2><p>أرسلنا رسالة تأكيد إلى <b dir="ltr">${esc(email)}</b>.<br>اضغط على الرابط داخلها وسيفتح الموقع تلقائياً وأنت مسجّل الدخول.</p><p class="hint" style="margin-top:8px">لم تصل؟ انتظر دقيقة وتفقّد الرسائل غير الهامة (Spam).</p><button class="btn g" id="v3re" style="margin-top:8px">إعادة الإرسال</button>`;
        $("#v3re").onclick = async () => { const x = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname, data: { role } } }); toast(x.error ? "تعذر الإرسال" : "أُعيد إرسال الرابط ✅") };
        return;
      }
      user = { email, role, at: Date.now() }; store.set("itqan_user", user); $("#authm").hidden = true; updUser(); toast("أهلاً بك 👋"); confetti();
      if (pending) { const f = pending; pending = null; f() }
    };
  };
  window.showAuth = show;
});

/* ================= الرئيسية: تحية بالدور + بطاقات سريعة ================= */
const GREET = {
  teacher: ["حيّاك الله يا معلمنا الغالي 🌴", "أنشطة جاهزة تخلّي حصتك <em>أحلى</em> وتوفّر وقتك"],
  boy: ["هلا يا بطل! 🌟", "العب وتعلّم واكسب <em>النقاط</em> كل يوم"],
  girl: ["هلا يا بطلة! 🌟", "العبي وتعلّمي واكسبي <em>النقاط</em> كل يوم"],
  parent: ["أهلاً بك يا ولي الأمر الكريم 🌴", "أنشطة وألعاب تساعد أبناءك على <em>الإتقان</em> في البيت"]
};
function applyRole() {
  const g = GREET[prefs.char] || GREET.teacher, h1 = $(".hero h1"); if (!h1) return;
  let hi = $(".v3hi"); if (!hi) { hi = document.createElement("div"); hi.className = "v3hi"; h1.before(hi) } hi.textContent = g[0]; h1.innerHTML = g[1];
}
safe("home", () => {
  const T = [["lib", "📚", "المكتبة", "أنشطة جاهزة للتنفيذ", "linear-gradient(135deg,#0e8f8a,#12b3ab)"], ["games", "🎮", "الألعاب", "ألعاب مرتّبة بالنوع", "linear-gradient(135deg,#ff7a2f,#ff9f5a)"], ["cur", "🖥️", "المناهج الدراسية", "عروض لكل درس", "linear-gradient(135deg,#7048e8,#9775fa)", 1], ["prep", "📝", "التحضير", "حضّر حصتك بدقيقة", "linear-gradient(135deg,#1c7ed6,#4dabf7)"], ["occ", "🌙", "المناسبات", "رمضان والوطني والعيد", "linear-gradient(135deg,#c2255c,#f06595)"], ["my", "⭐", "مكتبتي", "مفضلتك وإنجازاتك", "linear-gradient(135deg,#2f9e44,#69db7c)"]];
  const q = document.createElement("div"); q.className = "v3quick";
  q.innerHTML = T.map(([k, e, n, s, bg, nw]) => `<button class="v3q${nw ? " new" : ""}" data-go="${k}" style="background:${bg}"><i>${e}</i>${n}<small>${s}</small></button>`).join("");
  const hub = $(".vx-hub"); (hub || $(".hero")).before(q);
  applyRole(); new MutationObserver(applyRole).observe($(".mwrap"), { childList: true, subtree: false });
  const t = document.createElement("div"); t.className = "h2"; t.innerHTML = "<h2>🔎 استكشف</h2>"; (hub || q).before(t);
});

/* ================= تحسين الرابط عند المشاركة ================= */
safe("og", () => { });

/* ================= إعادة ترتيب بعد التحميل ================= */
window.__v3ready = true;
if (typeof rerender === "function") { try { rerender() } catch (e) { } }
})();
