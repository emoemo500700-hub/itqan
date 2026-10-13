/* إتقان — الملحق v2 */
(()=>{
"use strict";
if(window.__vxLoaded)return;window.__vxLoaded=true;
const BASE="audio/";
{const s=document.createElement("script");s.src="audio-data.js?v=20261012-1";s.async=true;document.head.appendChild(s)}
const safe=(n,f)=>{try{f()}catch(e){console.warn("[itqan-addon] "+n,e)}};
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const dayKey=()=>new Date().toDateString();
const pick=a=>a[Math.floor(Math.random()*a.length)];
const PHONE="0557545461",PHONE_INTL="966557545461";

/* ========== CSS ========== */
const css=`
.vx-ov{position:fixed;inset:0;z-index:90;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;text-align:center;overflow-y:auto}
.vx-ov h2{font-size:clamp(22px,6vw,32px)}
.vx-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:min(100%,420px)}
.vx-ch{border:3px solid var(--line);background:var(--surface);border-radius:22px;padding:10px 6px 12px;font:800 15px var(--f-display);display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:var(--shadow);transition:transform .15s,border-color .15s}
.vx-ch:hover,.vx-ch[aria-pressed="true"]{border-color:var(--orange);transform:translateY(-3px)}
.vx-ch svg{width:92px;height:100px}
.mascot.vx-talk{animation:vxtalk .45s ease-in-out infinite}
@keyframes vxtalk{50%{transform:translateY(-6px) scale(1.04) rotate(2deg)}}
.vx-bb{display:none;position:fixed;inset-inline:0;bottom:0;z-index:40;background:color-mix(in srgb,var(--surface) 94%,transparent);backdrop-filter:blur(8px);border-top:2px solid var(--line);padding:4px 4px calc(4px + env(safe-area-inset-bottom,0px));justify-content:space-around}
.vx-bb button{border:0;background:none;display:flex;flex-direction:column;align-items:center;font:700 10px var(--f-body);color:var(--mute);padding:2px 6px;border-radius:12px;min-width:44px}
.vx-bb button i{font-style:normal;font-size:19px;line-height:1.2}
.vx-bb button[aria-current="true"]{color:var(--teal);background:var(--soft)}
.vx-scr{position:fixed;inset:0;z-index:44;background:var(--bg);display:flex;flex-direction:column;animation:vxin .25s ease-out}
@keyframes vxin{from{transform:translateX(-26px);opacity:0}}
.vx-sh{display:flex;align-items:center;gap:10px;padding:calc(8px + env(safe-area-inset-top,0px)) 12px 8px;border-bottom:2px solid var(--line);background:var(--surface);font:800 16px var(--f-display)}
.vx-sb{flex:1;overflow-y:auto;padding:12px 14px calc(18px + env(safe-area-inset-bottom,0px));-webkit-overflow-scrolling:touch}
.vx-pbar{margin-bottom:6px}
.vx-hub{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:10px}
.vx-tile{border:2px solid var(--line);background:var(--surface);border-radius:16px;padding:9px 10px;display:flex;align-items:center;gap:9px;font:800 13px var(--f-display);box-shadow:var(--shadow);text-align:start;transition:transform .12s}
.vx-tile:active{transform:scale(.97)}
.vx-tile i{font-style:normal;font-size:24px;flex:none}
.vx-tile small{display:block;font:500 10.5px var(--f-body);color:var(--mute);line-height:1.3}
#p-home>.h2,#p-home>#daily,#p-home>#gradeGrid,#p-home>#subjGrid,#p-home>#topCards,#p-home>#occ{display:none}
a.btn{text-decoration:none;display:inline-block}
.vx-off{position:fixed;inset-inline:0;top:0;z-index:95;padding:calc(5px + env(safe-area-inset-top,0px)) 12px 5px;background:#c2410c;color:#fff;font-weight:800;font-size:12.5px;display:flex;gap:8px;align-items:center;justify-content:center;text-align:center}
.vx-off.ok{background:#2f9e44}
.vx-spin{width:13px;height:13px;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:vxspin .8s linear infinite;flex:none}
@keyframes vxspin{to{transform:rotate(360deg)}}
.vx-adv{position:fixed;inset-inline-end:12px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:45;border:0;border-radius:999px;background:var(--orange);color:#2a1100;font:800 12px var(--f-body);padding:8px 12px;box-shadow:0 4px 0 color-mix(in srgb,var(--orange) 55%,#000)}
.vx-advb{position:fixed;inset-inline-end:12px;bottom:calc(56px + env(safe-area-inset-bottom,0px));z-index:45;max-width:220px;background:var(--surface);border:2px solid var(--orange);border-radius:14px;padding:5px 11px;font-size:12px;font-weight:700;animation:pop .3s}
.vx-bell{position:relative}
.vx-dot{position:absolute;top:2px;inset-inline-end:2px;width:9px;height:9px;border-radius:50%;background:var(--orange);border:2px solid var(--surface)}
.vx-ans ol{margin:6px 0 0;padding-inline-start:22px}.vx-ans li{margin-block:4px}
.tk .vx-z{font-weight:800;color:var(--yellow)}
.vx-contact{margin-top:10px;font-size:13px}
.vx-contact a{color:var(--teal);font-weight:800}
body{font-size:13.5px}
.cards{grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:10px}
.card .bd{padding:8px 10px 10px;gap:4px}.card h3{font-size:13.5px}.meta{font-size:10.5px}
.card .bd>.hint{font-size:11.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cover{height:54px;font-size:30px}
.grades{grid-template-columns:repeat(auto-fill,minmax(105px,1fr))}.grade{font-size:14px;padding:9px 4px}.grade span{font-size:21px}
.subjects{grid-template-columns:repeat(auto-fill,minmax(125px,1fr))}.subj{font-size:12.5px;padding:8px}.subj i{font-size:20px}
.btn{font-size:13px;padding:7px 12px}.btn.sm{font-size:12px;padding:5px 10px}
.ibtn{width:32px;height:32px;font-size:13px}
.h2{margin-block:14px 8px}.h2 h2{font-size:17px}
@media(max-width:760px){
 .vx-bb{display:flex}body{padding-bottom:74px}.top nav{display:none}
 .top .wrap{gap:6px}.tools{order:3;width:100%;overflow-x:auto;scrollbar-width:none}
 .hero{padding-block:4px;gap:4px}.hero p.lead,.stats{display:none}.mwrap{width:104px!important}
 .vx-adv{bottom:calc(80px + env(safe-area-inset-bottom,0px))}.vx-advb{bottom:calc(122px + env(safe-area-inset-bottom,0px))}
}
@media(min-width:600px){.vx-hub{grid-template-columns:repeat(3,1fr)}}
@media(min-width:761px){body{font-size:14.5px}.cards{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}.vx-scr .vx-sb{padding-inline:max(14px,calc((100% - 1000px)/2))}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ========== PWA ========== */
let SWR=null;
safe("pwa",()=>{
 const add=(tag,attrs)=>{const k=Object.entries(attrs)[0];if(document.querySelector(`${tag}[${k[0]}="${k[1]}"]`))return;const e=document.createElement(tag);Object.entries(attrs).forEach(([a,v])=>e.setAttribute(a,v));document.head.appendChild(e)};
 add("link",{rel:"manifest",href:"manifest.webmanifest"});
 add("meta",{name:"mobile-web-app-capable",content:"yes"});add("meta",{name:"apple-mobile-web-app-capable",content:"yes"});
 add("meta",{name:"apple-mobile-web-app-title",content:"إتقان"});add("meta",{name:"apple-mobile-web-app-status-bar-style",content:"default"});
 if("serviceWorker" in navigator){const reg=()=>navigator.serviceWorker.register("sw.js?v=20261012-1").then(r=>{SWR=r}).catch(()=>{});document.readyState==="complete"?reg():addEventListener("load",reg)}});
let dip=null;
addEventListener("beforeinstallprompt",e=>{e.preventDefault();dip=e});
const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function sheet(html){$("#asheet").onclick=null;$("#asheet").innerHTML=`<button class="btn g sm close" data-close="1">✕</button>${html}`;$("#authm").hidden=false}
function install(){
 if(dip){dip.prompt();dip.userChoice.finally(()=>{dip=null});return}
 sheet(`<div style="font-size:44px">📲</div><h2>ثبّت إتقان كتطبيق</h2><p>${isIOS?"في Safari اضغط زر المشاركة ⬆️ ثم اختر «إضافة إلى الشاشة الرئيسية».":"من قائمة المتصفح ⋮ اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»."}</p><p class="hint" style="margin-top:6px">بعد التثبيت يفتح الموقع بملء الشاشة ويعمل حتى بدون إنترنت.</p>`)}

/* ========== حالة الاتصال ========== */
safe("offline",()=>{
 const b=document.createElement("div");b.className="vx-off";b.hidden=true;b.setAttribute("role","status");document.body.appendChild(b);let t;
 const off=()=>{clearTimeout(t);b.className="vx-off";b.innerHTML='<span class="vx-spin"></span>انقطع الاتصال بالإنترنت، تقدر تكمل استخدام الموقع';b.hidden=false};
 const on=()=>{b.className="vx-off ok";b.textContent="✅ عاد الاتصال بالإنترنت";b.hidden=false;t=setTimeout(()=>b.hidden=true,2500)};
 addEventListener("offline",off);addEventListener("online",on);if(!navigator.onLine)off()});

/* ========== الصوت ========== */
let VMAP=null;
safe("vmap",()=>{try{const l=lsGet("itqan_vox_map");if(l)VMAP=JSON.parse(l)}catch(e){}
 fetch("audio-map.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&!VMAP)VMAP=j}).catch(()=>{})});
const au={};let cur=null,lastT=0,gc=0,bc=0;
function talk(on){const m=document.querySelector(".mascot");if(m)m.classList.toggle("vx-talk",on);
 if(typeof amb!=="undefined"&&amb)try{amb.g.gain.setTargetAtTime(on?.02:.075,amb.c.currentTime,.15)}catch(e){}}
function say(ev,force){
 if(!prefs.snd)return;
 if(ev==="achieve")[523,659,784,1047].forEach((x,i)=>note(x,i*.09,.22,.06,"triangle"));
 const ids=VMAP&&VMAP[ev];if(!ids||!ids.length)return;
 const now=Date.now();if(!force&&cur&&!cur.paused&&now-lastT<2500)return;
 const id=pick(ids);let a=au[id];if(a===undefined){a=new Audio((window.ITQAN_AUDIO&&ITQAN_AUDIO[id])||BASE+id+".mp3");a.preload="auto";a.onerror=()=>{au[id]=null};au[id]=a}
 if(!a)return;
 try{if(cur&&cur!==a){cur.pause();cur.currentTime=0}a.currentTime=0;cur=a;lastT=now;talk(true);a.onended=a.onpause=()=>talk(false);const p=a.play();if(p&&p.catch)p.catch(()=>talk(false))}catch(e){}}
window.itqanSay=say;
safe("beep-hook",()=>{const ob=window.beep;
 window.beep=function(f,d,t){ob.apply(this,arguments);
  if(t==="square"&&f===180){if(++bc%2===1)say("retry")}
  else if(f===660&&d===.1){if(++gc%3===1)say("good")}}});
safe("toast-hook",()=>{const ot=window.toast;
 const MAP=[["شارة جديدة","achieve"],["ارتقيت","achieve"],["متتالية","bonus"],["مكافأة اليوم","bonus"],["أهلاً بك","loginok"],["مكتبتي","saved"],["تحضيراتي","saved"],["التحميل","saved"],["تنزيل","saved"]];
 window.toast=function(m){ot.apply(this,arguments);const h=MAP.find(x=>String(m).includes(x[0]));if(h)say(h[1],true)}});
safe("auth-hook",()=>{const os=window.showAuth;window.showAuth=function(){os.apply(this,arguments);say("login")}});
safe("game-hook",()=>{const or=window.run;window.run=function(){say("gstart",true);return or.apply(this,arguments)}});
safe("first-tap",()=>addEventListener("pointerdown",()=>{if(document.querySelector(".vx-ov"))return;if(lsGet("itqan_vx_day")===dayKey())return;lsSet("itqan_vx_day",dayKey());say("back",true)},{once:true}));

/* ========== الشخصيات ========== */
const S=(inner,c)=>`<svg ${c?`class="${c}" `:""}viewBox="0 0 200 220" role="img" aria-label="شخصية إتقان">${inner}</svg>`;
const SH='<ellipse cx="100" cy="208" rx="50" ry="8" fill="#000" opacity=".12"/>';
const EY=y=>`<g class="blink"><circle cx="82" cy="${y}" r="9" fill="#fff"/><circle cx="118" cy="${y}" r="9" fill="#fff"/><circle cx="83" cy="${y+1}" r="4.5" fill="#0f2b2e"/><circle cx="119" cy="${y+1}" r="4.5" fill="#0f2b2e"/></g>`;
const SM=y=>`<path d="M86 ${y} Q100 ${y+14} 114 ${y}" stroke="#0f2b2e" stroke-width="4" fill="none" stroke-linecap="round"/>`;
const CK=y=>`<circle cx="68" cy="${y}" r="7" fill="#ff6f91" opacity=".35"/><circle cx="132" cy="${y}" r="7" fill="#ff6f91" opacity=".35"/>`;
const CH={
 teacher:{n:"معلم",i:SH+'<rect x="56" y="146" width="88" height="62" rx="26" fill="#fff" stroke="#e1e6ea" stroke-width="3"/><path d="M88 146 L100 168 L112 146Z" fill="#e8ecef"/><path d="M46 100Q44 34 100 34Q156 34 154 100L162 156L38 156Z" fill="#fff" stroke="#dfe3e7" stroke-width="3"/><circle cx="100" cy="100" r="40" fill="#e9b98a"/>'+'<path d="M58 66 Q100 44 142 66" stroke="#1a1a1a" stroke-width="8" fill="none" stroke-linecap="round"/>'+'<g fill="none" stroke="#0f2b2e" stroke-width="4"><circle cx="82" cy="100" r="14"/><circle cx="118" cy="100" r="14"/><path d="M96 100H104"/></g>'+EY(100)+SM(122)+'<rect x="116" y="170" width="34" height="26" rx="4" fill="#ff7a2f"/><path d="M122 178h22M122 186h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'},
 boy:{n:"طالب",i:SH+'<defs><pattern id="vxChk" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#fff"/><path d="M0 7H14M7 0V14" stroke="#d6403a" stroke-width="3"/></pattern></defs>'+'<rect x="58" y="146" width="84" height="60" rx="26" fill="#fff" stroke="#e1e6ea" stroke-width="3"/><path d="M48 98Q46 40 100 38Q154 40 152 98L158 150L42 150Z" fill="url(#vxChk)" stroke="#d6403a" stroke-width="2"/><circle cx="100" cy="102" r="38" fill="#f2c9a0"/>'+'<path d="M58 66 Q100 44 142 66" stroke="#1a1a1a" stroke-width="8" fill="none" stroke-linecap="round"/>'+EY(102)+SM(124)+CK(118)},
 girl:{n:"طالبة",i:SH+'<rect x="56" y="146" width="88" height="60" rx="26" fill="#7048e8"/><path d="M84 146L100 166L116 146Z" fill="#fff"/><path d="M42 110Q36 36 100 34Q164 36 158 110L162 170Q100 190 38 170Z" fill="#9775fa"/><circle cx="100" cy="102" r="38" fill="#f2c9a0"/><path d="M62 96Q70 58 100 56Q130 58 138 96Q118 76 100 78Q82 76 62 96Z" fill="#9775fa"/><circle cx="142" cy="62" r="9" fill="#ff6f91"/><circle cx="142" cy="62" r="4" fill="#ffc933"/>'+EY(104)+SM(124)+CK(118)},
 parent:{n:"ولي أمر",i:SH+'<rect x="52" y="146" width="96" height="62" rx="28" fill="#fff" stroke="#e1e6ea" stroke-width="3"/><path d="M52 150Q100 134 148 150L148 176Q100 160 52 176Z" fill="#8a5a2b" opacity=".85"/><path d="M46 100Q44 34 100 34Q156 34 154 100L162 156L38 156Z" fill="#fff" stroke="#dfe3e7" stroke-width="3"/><circle cx="100" cy="100" r="40" fill="#e3b083"/>'+'<path d="M58 66 Q100 44 142 66" stroke="#1a1a1a" stroke-width="8" fill="none" stroke-linecap="round"/>'+'<path d="M62 106Q68 148 100 150Q132 148 138 106Q120 128 100 128Q80 128 62 106Z" fill="#3a2a22"/>'+EY(98)+'<path d="M88 118Q100 126 112 118" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>'}
};
function mount(){const s=document.querySelector(".mwrap .mascot");if(s&&CH[prefs.char])s.outerHTML=S(CH[prefs.char].i,"mascot")}
function setChar(k){prefs.char=k;store.set("itqan_prefs",prefs);mount()}
window.itqanSetChar=setChar;window.itqanCharNames=()=>Object.fromEntries(Object.entries(CH).map(([k,c])=>[k,c.n]));
function picker(first){
 const o=document.createElement("div");o.className="vx-ov";o.setAttribute("role","dialog");o.setAttribute("aria-label","اختر من أنت");
 o.innerHTML=`<h2>حيّاك الله في إتقان 🌴</h2><p class="hint">اختر من أنت ليناسبك المحتوى، وتقدر تغيّره في أي وقت.</p><div class="vx-grid">${Object.entries(CH).map(([k,c])=>`<button class="vx-ch" data-k="${k}" aria-pressed="${prefs.char===k}">${S(c.i)}${c.n}</button>`).join("")}</div>${first?"":'<button class="btn g sm" data-x="1">إغلاق</button>'}`;
 o.onclick=e=>{const b=e.target.closest("[data-k]");if(b){setChar(b.dataset.k);o.remove();if(first)say("welcome",true);return}if(e.target.closest("[data-x]"))o.remove()};
 document.body.appendChild(o)}
safe("characters",()=>{
 const b=document.createElement("button");b.className="ibtn";b.id="vxChar";b.title="من أنت؟";b.setAttribute("aria-label","من أنت؟");b.textContent="🎭";b.onclick=()=>picker(false);$("#ctry").before(b);
 if(prefs.char==="pencil")prefs.char="teacher";else if(prefs.char==="star")prefs.char="parent";store.set("itqan_prefs",prefs);mount();if(!CH[prefs.char])picker(true);
 addEventListener("keydown",e=>{if(e.key==="Escape"&&prefs.char){const o=document.querySelector(".vx-ov");if(o)o.remove()}})});

/* ========== التنقل ========== */
let curPage="home",fromPop=false;
function openScr(title,build){
 const scr=document.createElement("div");scr.className="vx-scr";scr.setAttribute("role","dialog");scr.setAttribute("aria-label",title);
 scr.innerHTML=`<div class="vx-sh"><button class="btn g sm" data-vxback="1" aria-label="رجوع">→ رجوع</button><span>${title}</span></div><div class="vx-sb"></div>`;
 document.body.appendChild(scr);scr._undo=build(scr.querySelector(".vx-sb"));
 scr.querySelector("[data-vxback]").onclick=()=>history.back();history.pushState({scr:1},"")}
const closeScrDom=()=>document.querySelectorAll(".vx-scr").forEach(s=>{s._undo&&s._undo();s.remove()});
const moveNode=id=>b=>{const n=$("#"+id),ph=document.createComment("vx");n.before(ph);b.append(n);return()=>ph.replaceWith(n)};
const contactHtml=()=>b=>{const y=new Date().getFullYear();b.innerHTML=`
 <div class="sec-note"><b>الأخصائي عماد عبد العزيز</b><br>صاحب منصة إتقان للأنشطة والألعاب التعليمية.</div>
 <div class="sec-note">📞 تواصل معنا على الرقم <b dir="ltr">${PHONE}</b><div class="row" style="margin-top:8px"><a class="btn" href="tel:+${PHONE_INTL}">اتصال</a><a class="btn o" href="https://wa.me/${PHONE_INTL}" target="_blank" rel="noopener">واتساب</a></div><p class="hint" style="margin-top:6px">نسعد بملاحظاتكم واقتراحاتكم وطلبات الأنشطة الجديدة.</p></div>
 <div class="sec-note"><b>حقوق النشر</b><br>© ${y} إتقان. جميع الأنشطة والألعاب والتصاميم والنصوص والتسجيلات الصوتية في المنصة محفوظة لأصحابها. يُسمح بالاستخدام التعليمي داخل الصف، ولا يجوز بيعها أو إعادة نشرها أو نسبتها لغير المنصة دون إذن كتابي.</div>
 <div class="row"><button class="btn g sm" id="vxPv">الخصوصية والشروط</button><button class="btn g sm" id="vxBg">🐞 بلّغ عن خطأ</button><button class="btn g sm" id="vxSh">💬 شارك إتقان</button></div>`;
 $("#vxPv").onclick=()=>$("#privacyBtn").click();$("#vxBg").onclick=()=>$("#bugBtn").click();$("#vxSh").onclick=()=>$("#shareSite").click();return null};
safe("nav",()=>{
 history.replaceState({p:"home"},"");
 const og=window.go;
 window.go=function(p){const had=!!document.querySelector(".vx-scr");closeScrDom();og.apply(this,arguments);syncBar();
  if(!fromPop){if(had)history.replaceState({p},"");else if(p!==curPage)history.pushState({p},"")}curPage=p};
 addEventListener("popstate",e=>{closeScrDom();const p=(e.state&&e.state.p)||"home";if(p!==curPage&&PAGES.includes(p)){fromPop=true;go(p);fromPop=false}});
 ["lib","games","prep","occ","my","admin"].forEach(k=>{const s=$("#p-"+k);if(!s)return;const d=document.createElement("div");d.className="vx-pbar";d.innerHTML='<button class="btn g sm" aria-label="رجوع">→ رجوع</button>';d.firstChild.onclick=()=>history.length>1?history.back():go("home");s.prepend(d)});
 const SEC=[["daily","🌟","نشاط اليوم","فكرة جاهزة لحصتك"],["gradeGrid","🎒","اختر الصف","من الروضة للسادس"],["subjGrid","🧩","المواد","عشر مواد دراسية"],["topCards","🔥","الأكثر تحميلاً","الأنشطة المفضلة"],["occ","🌙","مناسبات قادمة","جهّز لها مبكراً"]];
 const hub=document.createElement("div");hub.className="vx-hub";
 hub.innerHTML=SEC.map(([id,e,t,s])=>`<button class="vx-tile" data-sec="${id}"><i>${e}</i><span>${t}<small>${s}</small></span></button>`).join("")+
  `<button class="vx-tile" data-sec="contact"><i>☎️</i><span>تواصل معنا<small>${PHONE}</small></span></button>`+(standalone()?"":`<button class="vx-tile" data-sec="install"><i>📲</i><span>ثبّت التطبيق<small>يعمل بدون إنترنت</small></span></button>`);
 $(".hero").after(hub);
 hub.onclick=e=>{const t=e.target.closest("[data-sec]");if(!t)return;const id=t.dataset.sec;
  if(id==="install")return install();
  if(id==="contact")return openScr("☎️ تواصل معنا",contactHtml());
  const x=SEC.find(s=>s[0]===id);openScr(x[1]+" "+x[2],moveNode(id))}});

/* ========== الشريط السفلي ========== */
const BB=[["home","🏠","الرئيسية"],["lib","📚","المكتبة"],["games","🎮","الألعاب"],["prep","📝","التحضير"],["cur","🖥️","المناهج"],["my","⭐","مكتبتي"]];
let bar;
function syncBar(){if(!bar)return;const c=PAGES.find(k=>!$("#p-"+k).hidden),items=BB.slice();if(!$("#navAdmin").hidden)items.push(["admin","🛠️","الإدارة"]);
 bar.innerHTML=items.map(([k,e,n])=>`<button data-go="${k}" aria-current="${c===k}"><i>${e}</i>${n}</button>`).join("")}
safe("bottom-bar",()=>{bar=document.createElement("nav");bar.className="vx-bb";bar.setAttribute("aria-label","التنقل السفلي");$("main").after(bar);syncBar();
 const ou=window.updUser;if(ou)window.updUser=function(){ou.apply(this,arguments);syncBar()}});

/* ========== الأذكار ========== */
const ADH=["سبحان الله وبحمده","لا إله إلا الله","أستغفر الله العظيم","الحمد لله رب العالمين","اللهم صلِّ على نبينا محمد","لا حول ولا قوة إلا بالله","حسبنا الله ونعم الوكيل","سبحان الله العظيم","رب اشرح لي صدري","اللهم بارك لنا","الله أكبر كبيرًا","ربنا آتنا في الدنيا حسنة"];
safe("adhkar",()=>{const ob=window.buildTicker;
 window.buildTicker=function(){ob.apply(this,arguments);const tk=$("#tk");if(!tk)return;const n=tk.children.length/2,base=[...tk.children].slice(0,n).map(s=>s.textContent);
  const off=Math.floor(Date.now()/864e5)%ADH.length;let z=0,seq=[];
  base.forEach((t,i)=>{seq.push(`<span>${esc(t)}</span>`);if(i%2===1||i===base.length-1)seq.push(`<span class="vx-z">🤍 ${ADH[(off+z++)%ADH.length]}</span>`)});
  const row=seq.join("");tk.innerHTML=row+row};
 window.buildTicker()});

/* ========== الإشعارات ========== */
async function notify(title,body){try{const r=SWR||(await navigator.serviceWorker.getRegistration());if(r&&r.showNotification)return r.showNotification(title,{body,icon:"icon-192.png",badge:"icon-192.png",dir:"rtl",lang:"ar",tag:"itqan"});new Notification(title,{body})}catch(e){}}
async function enablePush(){
 if(!("Notification" in window))return toast("المتصفح لا يدعم الإشعارات");
 const p=await Notification.requestPermission();if(p!=="granted")return toast("لم يتم السماح بالإشعارات");
 try{const r=SWR||(await navigator.serviceWorker.ready);
  if(r.periodicSync)await r.periodicSync.register("itqan-daily",{minInterval:24*3600*1000}).catch(()=>{});
  const k=(window.ITQAN_CFG||{}).vapid;
  if(k&&r.pushManager){const u8=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
   const sub=await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:u8(k)});
   if(typeof sb!=="undefined"&&sb)sb.from("push_subs").upsert({endpoint:sub.endpoint,data:sub.toJSON(),email:user?user.email:null}).then(()=>{},()=>{})}}catch(e){}
 notify("إتقان 🦉","تم تفعيل التنبيهات. سنذكّرك بالمناسبات والأنشطة الجديدة.");toast("تم تفعيل الإشعارات ✅")}
const dleft=o=>{const n=new Date(),t0=new Date(n.getFullYear(),n.getMonth(),n.getDate()),y=n.getFullYear();let d=null;
 if(o.fn){d=o.fn(y);if(d<t0)d=o.fn(y+1)}else if(o.m){d=new Date(y,o.m-1,o.d);if(d<t0)d=new Date(y+1,o.m-1,o.d)}return d?Math.round((d-t0)/864e5):null};
const upc=days=>curOccs().map(o=>({...o,left:dleft(o)})).filter(o=>o.left!==null&&o.left<=days).sort((a,b)=>a.left-b.left);
function bellSheet(){
 const up=upc(14),V=vis(),d=V.length?V[Math.floor(Date.now()/864e5)%V.length]:null,canN="Notification" in window;
 sheet(`<h2>🔔 التنبيهات</h2>
 ${up.length?up.map(o=>`<div class="sec-note row" style="justify-content:space-between"><span>${o.e} <b>${esc(o.n)}</b> ${o.left===0?"اليوم 🎊":"بعد "+o.left+" يوم"}</span><button class="btn o sm" data-vxo="${esc(o.n)}">أنشطة المناسبة</button></div>`).join(""):'<div class="sec-note">لا مناسبات خلال الأسبوعين القادمين.</div>'}
 ${d?`<div class="sec-note row" style="justify-content:space-between"><span>🌟 نشاط اليوم: <b>${esc(d.title)}</b></span><button class="btn sm" data-vxa="${d.id}">عرض</button></div>`:""}
 <div class="sec-note">🔥 ${prefs.streak} ${prefs.streak>1?"أيام متتالية":"يوم"} · ⭐ ${prefs.xp} نقطة</div>
 ${user?"":'<div class="sec-note">سجّل بإيميلك لتحفظ مفضلتك وتحميلاتك ونقاطك.</div>'}
 <div class="row">${canN&&Notification.permission!=="granted"?'<button class="btn" id="vxNotif">🔔 فعّل الإشعارات</button>':""}${standalone()?"":'<button class="btn g" id="vxInst">📲 ثبّت التطبيق</button>'}</div>
 ${canN&&Notification.permission==="granted"?'<p class="hint">الإشعارات مفعّلة على هذا الجهاز.</p>':'<p class="hint">للحصول على الإشعارات والتذكير حتى والتطبيق مغلق، ثبّت الموقع على الشاشة الرئيسية ثم فعّل الإشعارات.</p>'}`);
 lsSet("itqan_vx_bell",dayKey());dot();
 $("#asheet").onclick=e=>{const o=e.target.closest("[data-vxo]"),a=e.target.closest("[data-vxa]");
  if(o){$("#authm").hidden=true;setFilters({q:o.dataset.vxo})}
  if(a){$("#authm").hidden=true;seeAct(+a.dataset.vxa);openAct(+a.dataset.vxa)}
  if(e.target.closest("#vxNotif"))enablePush().then(bellSheet);
  if(e.target.closest("#vxInst"))install()}}
function dot(){const b=$("#vxBell");if(!b)return;const has=upc(7).length&&lsGet("itqan_vx_bell")!==dayKey();let d=b.querySelector(".vx-dot");if(has&&!d){d=document.createElement("i");d.className="vx-dot";b.append(d)}else if(!has&&d)d.remove()}
safe("bell",()=>{const b=document.createElement("button");b.className="ibtn vx-bell";b.id="vxBell";b.title="التنبيهات";b.setAttribute("aria-label","التنبيهات");b.textContent="🔔";b.onclick=bellSheet;$("#xpb").before(b);dot();
 if("Notification" in window&&Notification.permission==="granted"&&lsGet("itqan_vx_n")!==dayKey()){const u=upc(3)[0];if(u){lsSet("itqan_vx_n",dayKey());notify("إتقان",`${u.e} ${u.n} ${u.left===0?"اليوم":"بعد "+u.left+" يوم"}، جهّز أنشطتك من المكتبة.`)}}});

/* ========== المستشار التربوي ========== */
const TOP=[
 {k:"cls",e:"🧘",n:"ضبط الصف",kw:["ضبط","هدوء","فوضى","صوت","يتكلم","ازعاج","نظام"],t:["ابدأ الحصة بإشارة ثابتة، مثل جرس صغير أو عدّ تنازلي من 5، ليعرف الطلاب أن وقت الهدوء بدأ.","اتفق مع الطلاب في أول الأسبوع على ثلاث قواعد قصيرة بصياغة إيجابية، مثل «نرفع أيدينا قبل الكلام».","امدح السلوك الصحيح بالاسم والتحديد: «أحسنت يا سعد، جلست بهدوء»، بدل لوم المخطئ.","اقترب من الطالب المشاغب وكلّمه بصوت منخفض بدل رفع الصوت أمام الجميع."]},
 {k:"mot",e:"🌟",n:"تحفيز الطلاب",kw:["تحفيز","دافع","حماس","ملل","كسل","نجوم","تشجيع"],t:["اجعل الهدف صغيراً وقابلاً للتحقق في الحصة نفسها، فالنجاح السريع يشجع على المحاولة.","استخدم لوحة نجوم للفصل كله بدل المنافسة بين الأفراد.","امنح الطلاب أدواراً: قائد المجموعة، مسؤول الأدوات، قارئ التعليمات.","اربط الدرس بشيء يحبونه: لعبة أو حيوان أو شخصية معروفة."]},
 {k:"read",e:"📖",n:"صعوبات القراءة",kw:["قراءة","يقرا","حروف","تهجئة","بطيء","تعثر"],t:["لا تطلب القراءة الجهرية المفاجئة أمام الصف، وامنحه فرصة للتدرب قبلها.","ابدأ بأصوات الحروف والمقاطع القصيرة ثم الكلمات المألوفة المرفقة بصور.","قسّم النص إلى أسطر قصيرة، واستخدم إصبعاً أو مسطرة لتتبع السطر.","إذا استمر الضعف رغم التدريب، أبلغ الأخصائي ليُقيَّم الطالب مبكراً."]},
 {k:"focus",e:"⚡",n:"الحركة وقلة التركيز",kw:["حركة","تركيز","شرود","لا يركز","انتباه","سرحان","يتشتت","نشاط زائد"],t:["قسّم الحصة إلى فقرات من 7 إلى 10 دقائق، وغيّر النشاط بين فقرة وأخرى.","امنحه مهام حركية مقبولة: توزيع الأوراق، مسح السبورة.","أجلسه قرب المعلم وبعيداً عن النافذة والباب.","أعطِ تعليمات قصيرة من خطوة واحدة، ثم الخطوة التالية بعد أن ينجزها."]},
 {k:"beh",e:"🤝",n:"العناد والسلوك",kw:["عناد","يعاند","عنيد","سلوك","عدوان","يضرب","شجار","مشاكس","مشاغب"],t:["افصل بين الطالب وسلوكه: «هذا التصرف لا يناسب»، وليس «أنت سيئ».","اعرض خيارين مقبولين بدل الأمر المباشر، فيشعر أنه يتحكم بالموقف.","ابحث عن سبب السلوك: تعب، جوع، طلب انتباه، أو صعوبة في المهمة.","تحدث معه على انفراد بعد هدوئه، وسجّل الموقف لتتابعه مع الأخصائي."]},
 {k:"par",e:"👨‍👩‍👧",n:"التواصل مع ولي الأمر",kw:["ولي","اولياء","الام","الاب","اتصال","رسالة","اجتماع"],t:["ابدأ بخبر إيجابي عن الطالب قبل الحديث عن المشكلة.","كن محدداً: اذكر الموقف والتاريخ وما جرّبته، دون أحكام عامة.","اقترح خطوة واحدة بسيطة يستطيع ولي الأمر تنفيذها في البيت.","حدد موعداً للمتابعة، فذلك يبني الثقة."]},
 {k:"prep",e:"📝",n:"التحضير والحصة",kw:["تحضير","حصة","درس","خطة","اهداف"],t:["ابدأ بهدف واحد واضح يستطيع الطالب قوله بكلماته في نهاية الحصة.","وزّع الوقت: تمهيد قصير، شرح، نشاط أطول، ثم تقويم سريع.","جهّز نشاطاً احتياطياً قصيراً إن انتهى الطلاب قبل الوقت.","استخدم مولّد التحضير في إتقان، ثم عدّله ليناسب صفك."]},
 {k:"ev",e:"✅",n:"التقويم",kw:["تقويم","اختبار","تقييم","درجات","واجب"],t:["اطرح أسئلة سريعة في منتصف الحصة، لا في آخرها فقط.","نوّع الأدوات: سؤال شفهي، بطاقة خروج، ملاحظة أثناء النشاط.","عرّف الطالب بالمعيار قبل بدء المهمة.","دوّن ملاحظة قصيرة لكل طالب ليسهل كتابة التقارير لاحقاً."]}
];
const nrm=s=>String(s).replace(/[\u064B-\u0652]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه");
function answer(t){$("#vxA").innerHTML=`<b>${t.e} ${t.n}</b><ol>${t.t.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><div class="row" style="margin-top:8px"><button class="btn g sm" id="vxCp">📋 نسخ النصائح</button></div>`;
 $$("#vxT button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.t===t.k));
 $("#vxCp").onclick=()=>copyText(t.n+"\n"+t.t.map((x,i)=>`${i+1}. ${x}`).join("\n")).then(()=>toast("تم نسخ النصائح 📋"),()=>{})}
function advisor(){
 sheet(`<div style="font-size:44px">🧑‍🏫</div><h2>مستشارك التربوي</h2><p class="hint">اختر موضوعاً، أو اكتب سؤالك بكلمات بسيطة.</p>
 <div class="tabs2" id="vxT" style="margin-top:8px">${TOP.map(t=>`<button data-t="${t.k}" aria-pressed="false">${t.e} ${t.n}</button>`).join("")}</div>
 <div class="sec-note vx-ans" id="vxA" aria-live="polite">جاهز لمساعدتك. اختر موضوعاً من الأعلى.</div>
 <form id="vxF" class="row"><input class="fld" id="vxQ" style="flex:1;min-width:180px" placeholder="مثال: طالب لا يركز في الحصة" aria-label="سؤالك"><button class="btn o sm" type="submit">اسأل</button></form>
 <p class="hint" style="margin-top:8px">إرشادات تربوية عامة. للحالات الخاصة راجع الأخصائي أو إدارة المدرسة.</p>`);
 $("#vxT").onclick=e=>{const b=e.target.closest("[data-t]");if(b)answer(TOP.find(t=>t.k===b.dataset.t))};
 $("#vxF").onsubmit=e=>{e.preventDefault();const q=nrm($("#vxQ").value);if(!q.trim())return;
  let best=null,sc=0;TOP.forEach(t=>{const s=t.kw.filter(k=>q.includes(nrm(k))).length;if(s>sc){sc=s;best=t}});
  if(best)answer(best);else $("#vxA").textContent="ما قدرت أحدد الموضوع من كلماتك. اختر أقرب موضوع من الأزرار أعلاه، أو أعد الصياغة بكلمات مثل: تركيز، عناد، قراءة، ضبط، تحفيز."}}
safe("advisor",()=>{const b=document.createElement("button");b.className="vx-adv";b.id="vxAdv";b.innerHTML="🧑‍🏫 مستشارك التربوي";b.onclick=()=>{const x=$(".vx-advb");if(x)x.remove();advisor()};document.body.appendChild(b);
 let seen=false;try{seen=sessionStorage.getItem("vx_adv")}catch(e){}
 if(!seen)setTimeout(()=>{if(document.querySelector(".vx-ov")||$("#authm").hidden===false)return;const x=document.createElement("div");x.className="vx-advb";x.textContent="مستشارك التربوي جاهز لمساعدتك";document.body.appendChild(x);try{sessionStorage.setItem("vx_adv","1")}catch(e){}setTimeout(()=>x.remove(),6000)},5000)});

/* ========== الفوتر ========== */
safe("footer",()=>{const f=$("footer .wrap"),d=f.querySelector(".row>div"),y=new Date().getFullYear();
 d.innerHTML=`<b>إتقان</b> · منصة أنشطة وألعاب للصفوف الأولية<br>© ${y} جميع الحقوق محفوظة للأخصائي عماد عبد العزيز`;
 const c=document.createElement("div");c.className="vx-contact";
 c.innerHTML=`<b>تواصل معنا</b> على الرقم <a href="tel:+${PHONE_INTL}" dir="ltr">${PHONE}</a> · <a href="https://wa.me/${PHONE_INTL}" target="_blank" rel="noopener">واتساب</a><br><span class="hint">نسعد بملاحظاتكم واقتراحاتكم وطلبات الأنشطة الجديدة.</span>`;f.append(c)});
})();
