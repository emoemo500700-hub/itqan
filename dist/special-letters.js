/* إتقان | special-letters.js | حصص الحروف من أ إلى ز | يُحمَّل في special.html بعد السكربت الرئيسي */
(()=>{"use strict";
const WD={"أ":["أرنب","🐰"],"ب":["بطة","🦆"],"ت":["تفاحة","🍎"],"ث":["ثعلب","🦊"],"ج":["جمل","🐪"],"ح":["حصان","🐴"],"خ":["خروف","🐑"],"د":["دجاجة","🐔"],"ذ":["ذرة","🌽"],"ر":["رسم","🎨"],"ز":["زرافة","🦒"],"س":["سمكة","🐟"],"ش":["شجرة","🌳"],"ص":["صقر","🦅"],"ض":["ضفدع","🐸"],"ط":["طائرة","✈️"],"ظ":["ظرف","✉️"],"ع":["عصفور","🐦"],"غ":["غيمة","☁️"],"ف":["فيل","🐘"],"ق":["قمر","🌙"],"ك":["كتاب","📖"],"ل":["ليمون","🍋"],"م":["موز","🍌"],"ن":["نحلة","🐝"],"ه":["هاتف","📱"],"و":["وردة","🌹"],"ي":["يد","✋"]};
const OPEN=[w=>`يا بطل! ${w[1]} ${w[0]} يريد أن يعرّفك على حرفه الجميل`,w=>`مفاجأة! ${w[1]} ${w[0]} وصل إلى الحصة ومعه حرف جديد`,w=>`هل تعرف من هنا؟ إنه ${w[0]} ${w[1]}! دعنا نكتشف حرفه`,w=>`${w[1]} ${w[0]} ينتظرك ليلعب معك لعبة الحروف`];
const VN=["الفتحة","الضمة","الكسرة"],V=l=>l==="أ"?["أَ","أُ","إِ"]:[l+"َ",l+"ُ",l+"ِ"];
const ALL=[...LET1,...LET2];let LC=null;
const oth=(n,x)=>shuffle(ALL.filter(c=>c!==(x||LC.letter))).slice(0,n);
const wordsOth=n=>shuffle(ALL.filter(c=>c!==LC.letter)).slice(0,n).map(c=>WD[c]);
const st=document.createElement("style");st.textContent=".cart{font-size:7.5rem;line-height:1.2;animation:bnc 1.4s ease-in-out infinite}.lt{font-family:var(--f-display);line-height:1.2}@keyframes bnc{50%{transform:translateY(-12px) rotate(-6deg)}}.opt small{display:block;font:700 .85rem var(--f-body)}.opt:has(small){min-height:130px}";document.head.appendChild(st);
ALL.forEach((l,i)=>["r","w"].forEach(s=>{GOALS["l"+i+s].ready=true}));

/* ---- mode switch (letters vs plus-sign lesson) ---- */
const SEGN0=SEGS.map(s=>s[0]),AN0={...AN};
const SEGN1=["ترحيب وقواعد","مراجعة","النشاط ١: اكتشف الحرف","النشاط ٢: الحركات","النشاط ٣: كلمات الحرف","النشاط ٤: اكتب الحرف","استراحة حركة","لعبة المكافأة","ختام وتقييم"];
const ORIG=[...SEG_RUN],oStart=startLesson,oDoc=docHtml,oPptx=makePptx;
SEG_RUN.forEach((_,i)=>{SEG_RUN[i]=el=>LC?LS[i](el):ORIG[i](el)});
window.startLesson=function(g,sub,ti,goal){LC=goal.letter?goal:null;SEGS.forEach((s,i)=>s[0]=LC?SEGN1[i]:SEGN0[i]);
 Object.assign(AN,LC?{a1:"١ اكتشف الحرف",a2:"٢ الحركات",a3:"٣ كلمات الحرف",a4:"٤ اكتب الحرف"}:AN0);return oStart.apply(this,arguments)};

/* ---- lesson segments ---- */
const mk=(opts,ok)=>shuffle(opts).map(h=>({h,ok:ok(h)}));
const LS=[
 el=>{const l=LC.letter,w=WD[l],i=ALL.indexOf(l);
  el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>${OPEN[i%4](w)}</b><br><span class="hint">هيا نتعلّم معاً!</span></div></div><div class="goalbig">حرفنا اليوم<div class="lt" style="font-size:5.5rem">${l}</div><div class="cart">${w[1]}</div><div>${w[0]}</div></div><div class="rules"><div><i>👂</i>أسمع جيداً</div><div><i>🙋</i>أرفع يدي</div><div><i>🤝</i>أساعد زميلي</div></div><div class="row" style="justify-content:center"><button class="btn o" id="rdy">نحن جاهزون! 🚀</button></div>`;
  $("#rdy").onclick=()=>{say("start",true);confetti();gotoSeg(1)}},
 el=>{const l=LC.letter;trials(el,{id:"rev",n:3,record:false,make:()=>({stem:`<div>ما هذا الحرف؟</div><div class="em lt" style="font-size:4rem">${l}</div>`,opts:mk([l,...oth(2)],h=>h===l)}),
  done:()=>{el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>أحسنت!</b><br><span class="hint">والآن نبحث عن الحرف ونتعرف على حركاته.</span></div></div><div class="goalbig lt" style="font-size:4rem">${l}</div>`;nextBar(el)}})},
 el=>{const l=LC.letter;trials(el,{id:"a1",n:5,make:i=>({stem:`<div>أين الحرف (${l})؟</div><div class="em lt" style="font-size:3.2rem">${l}</div>`,opts:mk([l,...oth(2)],h=>h===l)}),done:()=>nextBar(el)})},
 el=>{const l=LC.letter,F=V(l);trials(el,{id:"a2",n:5,make:i=>{const k=i%3;return{stem:`<div>أين الحرف (${l}) مع ${VN[k]}؟</div>`,opts:mk(F,h=>h===F[k])}},done:()=>nextBar(el)})},
 el=>{const l=LC.letter,w=WD[l];trials(el,{id:"a3",n:5,make:()=>({stem:`<div>أي صورة اسمها يبدأ بحرف (${l})؟</div>`,opts:mk([w,...wordsOth(2)],h=>h===w).map(o=>({ok:o.ok,h:`<span style="font-size:4.2rem">${o.h[1]}</span><small>${o.h[0]}</small>`}))}),done:()=>nextBar(el)})},
 el=>traceL(el),
 el=>{const M=[["🐰","اقفز مثل الأرنب ٥ قفزات صغيرة."],["🙆","ارفع يديك عالياً ثم اخفضهما ببطء."],["🌬️","تنفّس: شهيق عدّ ٤، زفير عدّ ٤."]];let k=0;
  const draw=()=>{el.innerHTML=`<div class="mv"><span class="chip">استراحة ${hd(k+1)} من ${hd(M.length)}</span><div class="em cart">${M[k][0]}</div><h2>${M[k][1]}</h2><div class="row" style="justify-content:center;margin-top:10px">${k<M.length-1?'<button class="btn" id="mn">التالية ←</button>':'<button class="btn o" id="goNext">نرجع للعمل ←</button>'}</div></div>`;if(k<M.length-1)$("#mn").onclick=()=>{k++;draw()};else $("#goNext").onclick=()=>gotoSeg(L.seg+1)};draw()},
 el=>balloonL(el),
 el=>{const l=LC.letter,w=WD[l],F=V(l);el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>تحدّي النهاية!</b><br><span class="hint">٥ أسئلة لنعرف كم تعلّمنا.</span></div></div><div id="fin"></div>`;
  trials($("#fin"),{id:"fin",n:5,make:i=>{const c=i%3;if(c===0)return{stem:`<div>أين الحرف (${l})؟</div>`,opts:mk([l,...oth(2)],h=>h===l)};
   if(c===1){const k=i%3+ (i>2?1:0)%3;return{stem:`<div>أين (${l}) مع ${VN[k%3]}؟</div>`,opts:mk(F,h=>h===F[k%3])}}
   return{stem:`<div>أي صورة تبدأ بحرف (${l})؟</div>`,opts:mk([w,...wordsOth(2)],h=>h===w).map(o=>({ok:o.ok,h:`<span style="font-size:4.2rem">${o.h[1]}</span><small>${o.h[0]}</small>`}))}},done:()=>summary(el)})}];

function traceL(el){const l=LC.letter,N=5;L.res.a4=L.res.a4||Array(N).fill(null);let i=0;
 const show=()=>{el.innerHTML=`<div class="qhead"><span class="chip">المحاولة ${hd(i+1)} من ${hd(N)}</span><div class="dots">${L.res.a4.map((r,k)=>`<span class="dot ${r||""} ${k===i?"cur":""}"></span>`).join("")}</div></div><div class="qbox" style="min-height:0;padding-bottom:0">اكتب الحرف (${l}) فوق الشكل الباهت</div><canvas class="cv" id="cv" width="300" height="300"></canvas><div class="fb" id="fb"></div><div class="row" style="justify-content:center"><button class="btn g sm" id="clr">🧽 مسح</button><span class="hint">للمعلم:</span><button class="btn sm" id="tOk">✔ أتقن</button><button class="btn g sm" id="tHelp">🟡 بمساعدة</button><button class="btn g sm" id="tNo">✖ لم يتقن</button></div>`;
  const cv=$("#cv"),x=cv.getContext("2d");let dr=false;
  const bg=()=>{x.clearRect(0,0,300,300);x.font="800 210px Tajawal,Tahoma,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillStyle="#0e8f8a";x.globalAlpha=.18;x.fillText(l,150,160);x.globalAlpha=1};bg();
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*300/r.width,(e.clientY-r.top)*300/r.height]};
  cv.onpointerdown=e=>{dr=true;cv.setPointerCapture(e.pointerId);const[a,b]=pt(e);x.beginPath();x.moveTo(a,b);x.lineWidth=14;x.lineCap="round";x.lineJoin="round";x.strokeStyle="#ff7a2f"};
  cv.onpointermove=e=>{if(!dr)return;const[a,b]=pt(e);x.lineTo(a,b);x.stroke()};cv.onpointerup=()=>{dr=false};
  $("#clr").onclick=bg;
  const fin=r=>{L.res.a4[i]=r;refreshPanel();const f=$("#fb");if(r!=="no"){L.stars++;drawStars();f.textContent=PRAISE[praiseI++%PRAISE.length]+" ⭐";f.className="fb p";sfx.ok();say(["ok1","ok2","ok3"][voiceI++%3]);jumpMas()}else f.textContent="لا بأس، نتعلّم معاً 🤝";
   setTimeout(()=>{i++;if(i<N)show();else nextBar(el)},1200)};
  $("#tOk").onclick=()=>fin("ok");$("#tHelp").onclick=()=>fin("help");$("#tNo").onclick=()=>fin("no")};show()}

function balloonL(el){const l=LC.letter,G=8,cols=["#ff9aa2","#ffd166","#9be7a5","#8ecae6","#cdb4db"];let sc=0,alive=true;
 el.innerHTML=`<div class="qhead"><span class="chip">اصطد بالونات حرف ${l}</span><span class="stars">⭐ <b id="gs">٠</b>/${hd(G)}</span></div><div class="sky" id="sky"></div><p class="hint" style="margin-top:6px">اضغط البالونات التي عليها الحرف (${l}) فقط. لا توجد خسارة!</p>`;
 const sky=$("#sky");let sp,to;
 const end=()=>{if(!alive)return;alive=false;clearInterval(sp);clearTimeout(to);sky.innerHTML=`<div class="empty"><div class="big">🏆</div><h2>${sc>=G?"مبروك! أنت بطل البالونات":"أحسنت! أنهيت اللعبة"}</h2></div>`;if(sc>=G){confetti();say("win",true);L.stars+=3;drawStars()}nextBar(el)};
 sp=setInterval(()=>{if(!alive)return;const t=Math.random()<.45,b=document.createElement("button");b.className="balloon";b.textContent=t?l:pick(oth(10));b.style.left=(6+Math.random()*78)+"%";b.style.background=pick(cols);b.style.setProperty("--d",(prefs.calm?10:8)+"s");
  b.onclick=()=>{if(b.classList.contains("pop"))return;if(t){b.classList.add("pop");sc++;$("#gs").textContent=hd(sc);sfx.ok();if(sc>=G)end()}else{b.classList.add("wob");sfx.soft();setTimeout(()=>b.classList.remove("wob"),400)}};
  b.addEventListener("animationend",()=>b.remove());sky.appendChild(b)},prefs.calm?1400:1000);
 to=setTimeout(end,9e4);segCleanup(()=>{alive=false;clearInterval(sp);clearTimeout(to)})}

/* ---- printable worksheets / homework ---- */
window.docHtml=function(k,id){const x=GOALS[id];if(!x||!x.letter||!/^(ws|wsol|hw)$/.test(k))return oDoc(k,id);
 LC=x;const l=x.letter,w=WD[l],sol=k==="wsol",hw=k==="hw",F=V(l);
 const stg=`<div class="std"><b>الهدف قصير المدى:</b> ${esc(x.stg)}<br><b>الهدف التدريسي:</b> ${esc(x.t)}</div>`;
 const row=()=>shuffle([l,l,...oth(3)]).map(s=>`<span class="sym ${sol&&s===l?"a":""}">${s}</span>`).join("");
 const s1=[0,1,2].map(row).map(r=>`<div>${r}</div>`).join("");
 const s2=[0,1,2].map(j=>`<div>ضع دائرة حول (${l}) مع ${VN[j]}: ${shuffle(F).map(f=>`<span class="sym ${sol&&f===F[j]?"a":""}">${f}</span>`).join("")}</div>`).join("");
 const ws=shuffle([w,...wordsOth(3)]).map(o=>`<div>☐${sol&&o===w?'<span class="ok">✔</span>':""} ${o[1]} ${o[0]}</div>`).join("");
 const tr=`<div class="lt" style="font-size:64px;letter-spacing:12px;color:${sol?"#0e8f8a":"#ccc"}">${l} ${l} ${l} ${l} ${l}</div><div style="height:46px;border-bottom:1.5px dotted #888"></div><div style="height:46px;border-bottom:1.5px dotted #888"></div>`;
 const t=hw?`واجب منزلي: حرف ${l}`:sol?`ورقة عمل: حرف ${l} (نموذج الإجابة)`:`ورقة عمل: حرف ${l}`;
 return `<div class="doc">${docHead(t,hw?"بمساعدة ولي الأمر، ٥ دقائق فقط":"")}${stg}<div class="sec">١) ضع دائرة حول الحرف (${l})</div>${s1}${hw?"":`<div class="sec">٢) الحركات</div>${s2}`}<div class="sec">${hw?"٢":"٣"}) ضع ✔ أمام الصورة التي تبدأ بحرف (${l})</div>${ws}<div class="sec">${hw?"٣":"٤"}) اكتب الحرف (${l}) فوق الشكل</div>${tr}${hw?`<p class="hint" style="margin-top:10px">لولي الأمر: اطلب من ابنك نطق الحرف والكلمة (${w[0]}) بصوت واضح، وامدح محاولته.</p>`:""}</div>`};

/* ---- PowerPoint ---- */
window.makePptx=async function(id){const x=GOALS[id];if(!x||!x.letter)return oPptx(id);
 try{toast("جارٍ تجهيز ملف PowerPoint...");await loadPptx();LC=x;const l=x.letter,w=WD[l],F=V(l),p=new window.PptxGenJS();p.rtlMode=true;p.layout="LAYOUT_WIDE";p.author=SPEC;
  const S=(t,body,sz,bg)=>{const s=p.addSlide();s.background={color:bg||"F1FAF8"};s.addShape(p.ShapeType.rect,{x:0,y:0,w:13.33,h:.9,fill:{color:"0E8F8A"}});
   s.addText(t,{x:.4,y:.1,w:12.5,h:.7,fontFace:"Arial",fontSize:26,bold:true,color:"FFFFFF",align:"right",rtlMode:true});
   s.addText(body,{x:.8,y:1.4,w:11.7,h:5.2,fontFace:"Arial",fontSize:sz||48,bold:true,color:bg?"1B6B2E":"0F2B2E",align:"center",valign:"middle",rtlMode:true});
   s.addText(SPEC,{x:.3,y:7.1,w:4,h:.3,fontFace:"Arial",fontSize:9,color:"6B7F80",align:"left",rtlMode:true})};
  const A="FFF8E1";
  S(`حرف ${l} ${w[1]}`,`${w[1]} ${w[0]}\n\nالأهداف الإثرائية · الصف الرابع · لغتي`,44);
  S("🎯 هدفنا اليوم",`أن أتعرّف على الحرف (${l}) وحركاته وأكتبه`,40);
  S("📏 قواعدنا","👂 أسمع جيداً\n🙋 أرفع يدي\n🤝 أساعد زميلي",44);
  S("🔤 هذا هو الحرف",`${l}\n${w[1]} ${w[0]}`,90);
  S("النشاط ١: اكتشف الحرف",`أين الحرف (${l})؟\n${shuffle([l,...oth(2)]).join("    ")}`,48);S("إجابة النشاط ١",`الحرف (${l})  ✅`,60,A);
  F.forEach((f,k)=>{S(`النشاط ٢: الحركات · ${k+1}`,`أين (${l}) مع ${VN[k]}؟\n${shuffle(F).join("    ")}`,44);S(`إجابة ${k+1}`,`${f}  ✅`,70,A)});
  S("النشاط ٣: كلمات الحرف",`أي صورة تبدأ بحرف (${l})؟\n${shuffle([w,...wordsOth(2)]).map(o=>o[1]+" "+o[0]).join("     ")}`,36);S("إجابة النشاط ٣",`${w[1]} ${w[0]}  ✅`,60,A);
  S("✍️ النشاط ٤: اكتب الحرف",`ارسم الحرف (${l}) في الهواء ثم على الورقة\n${l}  ${l}  ${l}`,44);
  S("🤸 استراحة حركة (٣ د)","🐰 اقفز ٥ قفزات\n🙆 ارفع يديك واخفضهما\n🌬️ شهيق ٤ وزفير ٤",36);
  S("🎈 لعبة المكافأة",`أشر إلى الحرف (${l}) فقط\n${shuffle([l,l,l,...oth(5)]).join("  ")}`,44);
  S("🏅 ختام وتقييم",`ما اسم هذا الحرف؟  ${l}\nاذكر كلمة تبدأ به: ${w[0]}`,38);
  S("🌟 شكراً لك!","أحسنت يا بطل ⭐⭐⭐⭐⭐",54);
  await p.writeFile({fileName:`إتقان - حرف ${l}.pptx`});toast("تم تنزيل الملف ✅")}catch(e){toast("تعذر تجهيز الملف، تأكد من الاتصال بالإنترنت")}};
const VL=l=>l==="أ"?["آ","أُو","إِي"]:[l+"َا",l+"ُو",l+"ِي"],VLN=["الفتحة الطويلة","الضمة الطويلة","الكسرة الطويلة"];
const pic=o=>({ok:o.ok,h:`<span style="font-size:4.2rem;line-height:1.1">${o.h[1]}</span><small>${o.h[0]}</small>`});
const big=e=>`<div class="cart" style="font-size:6.5rem">${e}</div>`;
LS[2]=el=>{const l=LC.letter,w=WD[l];trials(el,{id:"a1",n:5,make:i=>i%2?{stem:`<div>بأي حرف يبدأ اسم هذه الصورة؟</div>${big(w[1])}`,opts:mk([l,...oth(2)],h=>h===l)}:{stem:`<div>أين الحرف (${l})؟</div><div class="em lt" style="font-size:3.4rem">${l}</div>`,opts:mk([l,...oth(2)],h=>h===l)},done:()=>nextBar(el)})};
LS[3]=el=>{const l=LC.letter,F=V(l),N=VN,T=shuffle([0,1,2,0,1]);
 trials(el,{id:"a2",n:5,make:i=>{const k=T[i],g=k<3?0:3;return{stem:`<div>أين الحرف (${l}) مع ${N[k]}؟</div>`,opts:mk(F.slice(g,g+3),h=>h===F[k])}},done:()=>nextBar(el)})};
LS[4]=el=>{const l=LC.letter,w=WD[l];trials(el,{id:"a3",n:5,make:i=>{const t=i%3;
 if(t===0)return{stem:`<div>أي صورة اسمها يبدأ بحرف (${l})؟</div>`,opts:mk([w,...wordsOth(2)],h=>h===w).map(pic)};
 if(t===1)return{stem:`<div>أي كلمة تبدأ بحرف (${l})؟</div>`,opts:mk([w,...wordsOth(2)],h=>h===w).map(o=>({ok:o.ok,w:1,h:o.h[0]}))};
 return{stem:`${big(w[1])}<div>بأي حرف تبدأ كلمة (${w[0]})؟</div>`,opts:mk([l,...oth(2)],h=>h===l)}},done:()=>nextBar(el)})};
LS[8]=el=>{const l=LC.letter,w=WD[l],F=V(l),N=VN;
 el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>تحدّي النهاية!</b><br><span class="hint">٥ أسئلة لنعرف كم تعلّمنا.</span></div></div><div id="fin"></div>`;
 trials($("#fin"),{id:"fin",n:5,make:i=>{
  if(i===0)return{stem:`<div>أين الحرف (${l})؟</div>`,opts:mk([l,...oth(2)],h=>h===l)};
  if(i===1||i===3){const k=i===1?pick([0,1,2]):pick([0,1,2]),g=k<3?0:3;return{stem:`<div>أين (${l}) مع ${N[k]}؟</div>`,opts:mk(F.slice(g,g+3),h=>h===F[k])}}
  if(i===2)return{stem:`<div>أي صورة تبدأ بحرف (${l})؟</div>`,opts:mk([w,...wordsOth(2)],h=>h===w).map(pic)};
  return{stem:`${big(w[1])}<div>بأي حرف تبدأ هذه الصورة؟</div>`,opts:mk([l,...oth(2)],h=>h===l)}},done:()=>summary(el)})};
const d2=window.docHtml;window.docHtml=function(k,id){const o=d2(k,id),x=GOALS[id];if(!x||!x.letter||!/^(ws|wsol)$/.test(k))return o;
 const l=x.letter,L2=VL(l),sol=k==="wsol";
 const sec=`<div class="sec">حركات طويلة: ضع دائرة حول (${l}) مع الحركات الطويلة</div>`+[0,1,2].map(j=>`<div>${VLN[j]}: ${shuffle(L2).map(f=>`<span class="sym ${sol&&f===L2[j]?"a":""}">${f}</span>`).join("")}</div>`).join("");
 return o};
render();
})();
