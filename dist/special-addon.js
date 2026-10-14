/* إتقان | special-addon.js | يُضاف قبل </body> في special.html و index.html */
(()=>{"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const SM=new URLSearchParams(location.search).get("studentMode")==="true";
const isSp=/special/.test(location.pathname);
const css=`
.tbar{display:flex;gap:6px;align-items:center;padding:5px 10px;background:var(--bg,#fff);border-bottom:2px solid var(--line,#ddd);position:sticky;top:var(--hh,50px);z-index:19}.tbar.st{position:static}.tbar button{border:2px solid var(--line,#ccc);background:var(--surface,#fff);color:var(--ink,#111);border-radius:999px;padding:3px 12px;font-weight:800;font-size:.85rem;white-space:nowrap}.tbar .sp{flex:1}.tbar button[hidden]{display:none}.lbar{top:calc(var(--hh,50px) + 42px)!important}html.fslite{--hh:0px}
html.fslite .top,html.fslite header.top,html.fslite .ticker,html.fslite footer{display:none!important}
html.fslite .lbar{top:42px!important}
.hdrf{width:100%;border-collapse:collapse;margin-bottom:8px;font-size:12px}
.hdrf td{border:1.5px solid #333;padding:4px 8px;width:33%}
.ef{display:inline-block;min-width:70px;border-bottom:1px dotted #333;padding-inline:4px}
.ef:empty::before{content:"........";color:#888}
.doc[contenteditable]{outline:2px dashed #0e8f8a55;outline-offset:4px;cursor:text}
.edhint{font-size:.78rem;color:var(--mute,#666);margin:0 0 6px}
@media print{.doc[contenteditable]{outline:0}.ef:empty::before{color:#333}.edhint,.fabs{display:none!important}}
@media(max-width:640px){
 h1.pt{font-size:1.1rem;overflow-wrap:anywhere}
 .crumb{flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;scrollbar-width:none}
 .tile b{font-size:.92rem}.tile small{font-size:.7rem}.tile .e{font-size:1.9rem}
 .goal span.t{font-size:.84rem}.card h3{font-size:.95rem}
 .brand small{display:none}.brand b{font-size:1.2rem}
 .segt{font-size:.92rem}.qbox{font-size:1.1rem}.wrap{padding-inline:10px!important}.stage{padding:10px;border-radius:16px}.opts{gap:8px}.opt{min-height:70px}.card{padding:10px 12px}.lbar{padding-block:4px}.tbar button{padding:3px 9px;font-size:.78rem}
}`+(SM?`
html{--hh:0px}header.top,.top,footer,nav,.ticker,aside,.sidebar,#siteLink,#homeSpecial,#navSpecial,.tools,.bgfloat{display:none!important}
.wrap,main{max-width:100%!important}.lbar{top:42px!important}`:"");
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---- back ---- */
function back(){
 const m=$$(".modal").find(x=>!x.hidden);if(m){m.hidden=true;return}
 if(isSp){const p=location.hash.replace(/^#\/?/,"").split("/").filter(Boolean);
  if(p.length){p.pop();location.hash=p.length?"#/"+p.join("/"):"#/"}else if(!SM)location.href="index.html"}
 else{const h=$("#p-home");if(h&&h.hidden){const b=$('[data-go="home"]');b&&b.click()}else if(!SM&&history.length>1)history.back()}
}
/* ---- fullscreen (with fallback for iPhone) ---- */
function fs(){const d=document,e=d.documentElement;
 if(d.fullscreenElement||d.webkitFullscreenElement){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}
 const r=e.requestFullscreen||e.webkitRequestFullscreen;
 if(r){const p=r.call(e);if(p&&p.catch)p.catch(()=>e.classList.toggle("fslite"))}else e.classList.toggle("fslite")}
const tb=document.createElement("div");tb.className="tbar"+(isSp?"":" st");
tb.innerHTML='<button id="fabBack">→ رجوع</button><button id="fabFs">⛶ ملء الشاشة</button>'+'';
const mn=$("main");mn.parentNode.insertBefore(tb,mn);
$("#fabBack").onclick=back;$("#fabFs").onclick=fs;
const sh=$("#fabShare");if(sh)sh.onclick=()=>{const u=location.origin+location.pathname+"?studentMode=true"+location.hash;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>typeof toast==="function"&&toast("تم نسخ رابط الصفحة 🔗 (يفتح هذه الصفحة فقط)"),()=>prompt("انسخ الرابط:",u))};
const upd=()=>{const on=!!(document.fullscreenElement||document.webkitFullscreenElement)||document.documentElement.classList.contains("fslite");$("#fabFs").textContent=on?"🗗 إنهاء ملء الشاشة":"⛶ ملء الشاشة";
 let root=isSp?!location.hash.replace(/^#\/?/,"").split("/").filter(Boolean).length:($("#p-home")&&!$("#p-home").hidden);
 $("#fabBack").hidden=SM&&root&&!$$(".modal").some(x=>!x.hidden)};
["fullscreenchange","webkitfullscreenchange","hashchange","click"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(upd,60)));
window.addEventListener("hashchange",upd);upd();

/* ---- student mode: no links out of the page ---- */
if(SM){
 document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(a&&!a.getAttribute("href").startsWith("#")){e.preventDefault();e.stopPropagation()}},true);
 window.open=()=>null;
 document.title="إتقان";
}

/* ---- editable documents + Word export ---- */
const dp=$("#docPrint");
if(dp){dp.textContent="📄 PDF / طباعة";dp.insertAdjacentHTML("beforebegin",'<button class="btn g sm" id="docWord">⬇ Word</button>');
 const bd=$("#docbody");bd.insertAdjacentHTML("beforebegin",'<p class="edhint dochead">✏️ اضغط على أي نص داخل النموذج لتعديله، ثم احفظه Word أو PDF (من نافذة الطباعة اختر «حفظ كـ PDF»).</p>');
 const deco=()=>{const d=$("#docbody .doc");if(!d||d.dataset.ed)return;d.dataset.ed="1";d.contentEditable="true";
  d.querySelectorAll(".stdline").forEach(x=>x.remove());if(d.querySelector(".cert"))return;
  let t="";try{t=new Date().toLocaleDateString("ar-EG")}catch(e){}
  d.insertAdjacentHTML("afterbegin",`<table class="hdrf"><tr><td>القسم: <span class="ef"></span></td><td>الحضور: <span class="ef"></span></td><td>الغياب: <span class="ef"></span></td></tr><tr><td>اسم الطالب: <span class="ef"></span></td><td>الصف: <span class="ef"></span></td><td>التاريخ: <span class="ef">${t}</span></td></tr></table>`)};
 new MutationObserver(deco).observe(bd,{childList:true});
 $("#docWord").onclick=()=>{const d=$("#docbody .doc");if(!d)return;const c=d.cloneNode(true);
  c.removeAttribute("contenteditable");
  c.querySelectorAll("svg").forEach(s=>{const x=document.createElement("span");x.textContent="+";x.style.cssText="font-size:44px;color:#999;margin:4px";s.replaceWith(x)});
  const name=((c.querySelector("h2")||{}).textContent||"نموذج").trim().slice(0,40);
  const style="body{font-family:Tahoma,Arial;direction:rtl}table{border-collapse:collapse;width:100%}td,th{border:1px solid #333;padding:5px;vertical-align:top}th{background:#e8f4f2}.sym{border:1px solid #bbb;padding:0 6px;font-size:22px}.sym.a{background:#d3f1da;font-weight:bold}.cert{border:4px double #0e8f8a;padding:20px;text-align:center}.ef{border-bottom:1px dotted #333}.sec{font-weight:bold;border-bottom:2px solid #0e8f8a}";
  const h=`<html dir="rtl" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>${style}</style></head><body>${c.outerHTML}</body></html>`;
  const u=URL.createObjectURL(new Blob(["\ufeff"+h],{type:"application/msword"}));const l=document.createElement("a");l.href=u;l.download=name+".doc";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)};
}
/* ===== extras: intro, pen/zoom, log, prep tables ===== */
const E=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const x2=document.createElement("style");x2.textContent=`.tbar{flex-wrap:wrap}.doc .by{font-size:15px;font-weight:800;color:#0e8f8a}
.stage>*,#app>*{animation:segIn .45s cubic-bezier(.2,.8,.2,1) both}@keyframes segIn{from{opacity:0;transform:translateY(16px) scale(.97)}}
.intro{position:fixed;inset:0;z-index:120;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;color:#fff;overflow:hidden;animation:segIn .5s both}
.intro h1{font-size:clamp(1.6rem,7vw,3.2rem);position:relative}.intro .nm{font-size:clamp(1.6rem,7vw,3rem);margin-top:14px;background:#fff;color:#0e8f8a;border-radius:18px;padding:6px 22px;font-weight:800}
.intro .ru{display:flex;gap:10px;margin-top:14px;width:100%;max-width:640px}.intro .ru div{flex:1;background:#ffffff26;border-radius:16px;padding:12px 4px;font-weight:800;font-size:clamp(.8rem,3.2vw,1.1rem)}.intro .ru i{display:block;font-style:normal;font-size:clamp(2.2rem,10vw,3.6rem)}
.intro .fl{position:absolute;font-size:2rem;animation:flt 4s linear infinite}@keyframes flt{from{transform:translateY(105vh) rotate(0)}to{transform:translateY(-15vh) rotate(360deg)}}
.intro button{position:relative;margin-top:18px;border:0;border-radius:16px;padding:10px 26px;font-weight:800;font-size:1.1rem;background:#ffc933;color:#2a1100}
.pen{position:fixed;inset:0;z-index:95;touch-action:none;cursor:crosshair}.penbar{position:fixed;top:60px;inset-inline-start:10px;z-index:96;display:flex;gap:6px;background:#fff;border:2px solid #ccc;border-radius:14px;padding:5px}.penbar button{width:30px;height:30px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #888}
table.pt{width:100%;border-collapse:collapse}table.pt th{background:#0e8f8a;color:#fff;width:24%;padding:8px;border:1.5px solid #0a6e6a;vertical-align:top;text-align:start}table.pt td{border:1.5px solid #0e8f8a;padding:4px;background:var(--surface,#fff)}table.pt tr:nth-child(even) td{background:var(--soft,#eef)}table.pt textarea{border:0;background:transparent;width:100%}
.lg table{border-collapse:collapse;width:100%}.lg th,.lg td{border:1.5px solid #0e8f8a;padding:4px;text-align:center;font-size:.8rem}.lg th{background:#0e8f8a;color:#fff}`;document.head.appendChild(x2);
/* intro screens before every interactive lesson */
if(typeof startLesson==="function"){const oS=window.startLesson;window.startLesson=function(){const r=oS.apply(this,arguments);if(window.__noAddonIntro){if(typeof L!=="undefined"&&L)L.paused=false;return r}if(typeof L!=="undefined"&&L)L.paused=true;intro();return r}}
function intro(){const o=document.createElement("div");let k=0;document.body.appendChild(o);
 const fl=Array.from({length:14},(_,i)=>`<span class="fl" style="left:${i*7}%;animation-delay:-${i*.5}s">${i%2?"✌️":"⭐"}</span>`).join("");
 const S=[{bg:"#0e8f8a",h:`<img src="teacher.webp" alt="" style="max-height:30vh" onerror="this.remove()"><h1>السلام عليكم ورحمة الله وبركاته</h1><div class="nm">أ / عماد عبد العزيز</div>`},
 {bg:"#1c7ed6",h:`<h1>قوانين التعلم عن بعد</h1><div style="font-size:3.6rem">👩‍🏫💻🧒👧</div><div class="ru"><div><i>🎤❌</i>إغلاق المايك</div><div><i>📷❌</i>إغلاق الكاميرا</div><div><i>🤝</i>احترام المعلم وزملائك</div></div>`},
 {bg:"#006c35",h:`${fl}<h1 style="font-size:clamp(2rem,9vw,4rem);line-height:1.6">لا إله إلا الله<br>محمد رسول الله</h1><svg viewBox="0 0 300 20" width="70%"><path d="M10 10H290" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`}];
 const d=()=>{o.className="intro";o.style.background=S[k].bg;o.innerHTML=S[k].h+`<button>${k<2?"التالي ←":"ابدأ الحصة 🚀"}</button>`;o.querySelector("button").onclick=()=>{k++;if(k<3)d();else{o.remove();if(typeof L!=="undefined"&&L)L.paused=false}}};d()}
/* intro slides at the start of every PPTX */
if(typeof loadPptx==="function"){const oL=window.loadPptx;window.loadPptx=async function(){await oL();const P=window.PptxGenJS;if(P&&!P.w2){class P2 extends P{constructor(){super();const A={fontFace:"Arial",bold:true,color:"FFFFFF",align:"center",rtlMode:true,x:"5%",w:"90%"};
 let s=this.addSlide();s.background={color:"0E8F8A"};s.addText("السلام عليكم ورحمة الله وبركاته",{...A,y:"20%",h:"25%",fontSize:48});s.addText("أ / عماد عبد العزيز",{...A,y:"50%",h:"20%",fontSize:44,color:"FFC933"});
 s=this.addSlide();s.background={color:"1C7ED6"};s.addText("قوانين التعلم عن بعد",{...A,y:"3%",h:"14%",fontSize:36});s.addText("👩‍🏫💻🧒👧",{...A,y:"18%",h:"22%",fontSize:60});
 [["🎤❌","إغلاق المايك",3],["📷❌","إغلاق الكاميرا",36],["🤝","احترام المعلم وزملائك",69]].forEach(([e,t,x])=>{s.addText(e,{...A,x:x+"%",w:"28%",y:"45%",h:"22%",fontSize:48});s.addText(t,{...A,x:x+"%",w:"28%",y:"68%",h:"15%",fontSize:22})});
 s=this.addSlide();s.background={color:"006C35"};s.addText("لا إله إلا الله\nمحمد رسول الله",{...A,y:"20%",h:"45%",fontSize:54});s.addText("✌️ ⭐ ✌️ ⭐ ✌️ ⭐ ✌️ ⭐ ✌️",{...A,y:"72%",h:"15%",fontSize:36})}}P2.w2=1;window.PptxGenJS=P2}}}
/* pen + zoom */
const pb=document.createElement("button");pb.textContent="✏️ قلم";const zi=document.createElement("button"),zo=document.createElement("button"),lgb=document.createElement("button");zi.textContent="🔍 +";zo.textContent="🔍 −";lgb.textContent="📋 السجل";
tb.append(pb,zi,zo);if(!SM)tb.append(lgb);let cvp=null,zm=1;
const setZ=v=>{zm=Math.min(2,Math.max(.8,v));document.documentElement.style.zoom=zm};zi.onclick=()=>setZ(zm+.1);zo.onclick=()=>setZ(zm-.1);
pb.onclick=()=>{if(cvp){cvp.bar.remove();cvp.remove();cvp=null;return}
 const c=document.createElement("canvas");c.className="pen";c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext("2d");let col="#e03131",dr=false;
 const bar=document.createElement("div");bar.className="penbar";bar.innerHTML=["#e03131","#1c7ed6","#2f9e44","#111"].map(k=>`<button data-c="${k}" style="background:${k}"></button>`).join("")+'<button data-c="clr" style="background:#fff">🧽</button><button data-c="x" style="background:#fff">✕</button>';document.body.appendChild(bar);c.bar=bar;
 bar.onclick=e=>{const k=e.target.dataset.c;if(k==="clr")x.clearRect(0,0,c.width,c.height);else if(k==="x")pb.click();else if(k)col=k};
 c.onpointerdown=e=>{dr=true;c.setPointerCapture(e.pointerId);x.beginPath();x.moveTo(e.clientX,e.clientY);x.lineWidth=5;x.lineCap="round";x.strokeStyle=col};c.onpointermove=e=>{if(dr){x.lineTo(e.clientX,e.clientY);x.stroke()}};c.onpointerup=()=>{dr=false};cvp=c};
/* attendance & follow-up log (saved on this device only) */
lgb.onclick=()=>{const K="itqan_log";let D;try{D=JSON.parse(localStorage.getItem(K))}catch(e){}D=D||{sec:"",dates:[new Date().toLocaleDateString("ar-EG")],rows:[{n:"",a:[],m:"",t:""}]};
 const sv=()=>{try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}},CY=["","✔","✖","⏰"],MS=["","أتقن","أتقن بمساعدة","لم يتقن"];
 const m=document.createElement("div");m.className="modal";m.style.zIndex=130;document.body.appendChild(m);
 const cnt=(j,v)=>D.rows.filter(r=>r.a[j]===v).length;
 const draw=()=>{m.innerHTML=`<div class="sheet lg" style="width:min(1000px,100%)"><div class="row" style="justify-content:space-between"><b>📋 سجل الحضور والمتابعة</b><span class="row"><button class="btn sm" id="l1">+ طالب</button><button class="btn sm" id="l2">+ يوم</button><button class="btn g sm" id="l3">⬇ Word</button><button class="btn g sm" id="l4">✕</button></span></div><p class="hint">القسم: <span contenteditable id="lsec" class="ef">${E(D.sec)}</span> · يُحفظ على جهازك فقط. اضغط خانة الحضور للتبديل: ✔ حاضر · ✖ غائب · ⏰ متأخر، وخانة الإتقان للتبديل.</p><div style="overflow-x:auto"><table id="lt"><tr><th>م</th><th>اسم الطالب</th>${D.dates.map((d,i)=>`<th contenteditable data-d="${i}">${E(d)}</th>`).join("")}<th>الإتقان</th><th>ملاحظات</th></tr>${D.rows.map((r,i)=>`<tr><td>${i+1}</td><td contenteditable data-n="${i}" style="min-width:110px">${E(r.n)}</td>${D.dates.map((_,j)=>`<td data-a="${i},${j}" style="cursor:pointer">${r.a[j]||""}</td>`).join("")}<td data-m="${i}" style="cursor:pointer;min-width:80px">${r.m}</td><td contenteditable data-t="${i}" style="min-width:110px">${E(r.t)}</td></tr>`).join("")}<tr><th colspan="2">الحضور</th>${D.dates.map((_,j)=>`<td>${cnt(j,"✔")}</td>`).join("")}<td colspan="2"></td></tr><tr><th colspan="2">الغياب</th>${D.dates.map((_,j)=>`<td>${cnt(j,"✖")}</td>`).join("")}<td colspan="2"></td></tr></table></div></div>`;
  m.querySelector("#l1").onclick=()=>{D.rows.push({n:"",a:[],m:"",t:""});sv();draw()};m.querySelector("#l2").onclick=()=>{D.dates.push(new Date().toLocaleDateString("ar-EG"));sv();draw()};m.querySelector("#l4").onclick=()=>m.remove();
  m.querySelector("#l3").onclick=()=>{const h=`<html dir="rtl"><head><meta charset="utf-8"><style>table{border-collapse:collapse;width:100%}td,th{border:1px solid #333;padding:4px;text-align:center}th{background:#0e8f8a;color:#fff}</style></head><body><h2>سجل الحضور والمتابعة — القسم: ${E(D.sec)}</h2>${m.querySelector("#lt").outerHTML}<p>أ / عماد عبد العزيز</p></body></html>`;const u=URL.createObjectURL(new Blob(["\ufeff"+h],{type:"application/msword"})),a=document.createElement("a");a.href=u;a.download="سجل الحضور.doc";a.click()}};
 m.oninput=e=>{const t=e.target,d=t.dataset;if(t.id==="lsec")D.sec=t.textContent;else if(d.d!==undefined)D.dates[+d.d]=t.textContent;else if(d.n!==undefined)D.rows[+d.n].n=t.textContent;else if(d.t!==undefined)D.rows[+d.t].t=t.textContent;sv()};
 m.onclick=e=>{const t=e.target.closest("[data-a],[data-m]");if(!t)return;if(t.dataset.a){const[i,j]=t.dataset.a.split(",").map(Number);D.rows[i].a[j]=CY[(CY.indexOf(D.rows[i].a[j]||"")+1)%4]}else{const i=+t.dataset.m;D.rows[i].m=MS[(MS.indexOf(D.rows[i].m)+1)%4]}sv();draw()};draw()};
/* prep: special education subject + formatted tables (index.html) */
if(typeof PS!=="undefined"&&typeof SUBJ==="object"&&!Array.isArray(SUBJ)){
 SUBJ.special=["التربية الخاصة","🧩","#0e8f8a"];
 PS.special={g:t=>`أن يحقق الطالب هدف «${t}» بمستوى إتقان 4 محاولات صحيحة من 5.`,i:t=>`ترحيب وقواعد الحصة ثم نشاط تهيئة قصير مرتبط بـ«${t}» مع تعزيز فوري.`,hw:t=>`تدريب منزلي قصير (5 دقائق) على «${t}» بمساعدة ولي الأمر.`,st:"التعلم متعدد الحواس والتعزيز الفوري والمساعدة المتدرجة (جسدية ثم إيمائية ثم لفظية)"};
 ["#ps","#fs"].forEach(s=>{const e=$(s);e&&e.insertAdjacentHTML("beforeend",'<option value="special">🧩 التربية الخاصة</option>')});
 window.prepHtml=function(p,i){return `<article class="stage" data-pi="${i}" style="margin:0"><div class="hd"><h3>${esc(p.title)}</h3><span class="badge">${gn(p.g)} · ${SUBJ[p.s][0]} · ${p.min} د</span></div><table class="pt">${PF.map(([k,l])=>`<tr><th>${l}</th><td><textarea class="fld" data-k="${k}" rows="${k==="act"||k==="body"?5:3}">${esc(p[k])}</textarea></td></tr>`).join("")}</table><div class="row" style="margin-top:8px"><button class="btn" data-pa="save" data-i="${i}">💾 حفظ في تحضيراتي</button><button class="btn g" data-pa="copy" data-i="${i}">📋 نسخ</button><button class="btn g" data-pa="word" data-i="${i}">⬇ Word</button>${p.match?`<button class="btn g" data-pa="act" data-i="${i}">👀 النشاط المقترح</button>`:""}</div></article>`}}
})();
