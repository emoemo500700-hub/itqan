/* إتقان | special-words.js | حصص المدود والكلمات (الهدف قصير المدى الثاني) | يُحمَّل بعد special-math.js */
(()=>{"use strict";
const __noAddonIntro=true;
const VOW=[["ا","ألف","🦅","طويل"],["و","واو","🌊","طويل"],["ي","ياء","🍋","طويل"]];
const SHORT=[["َ","فتحة","🍎"],["ُ","ضمة","🐷"],["ِ","كسرة","🔑"]];
const mkWord=(v,c)=>({w:v.root+v.v+v.tail,e:v.emoji,medd:v.medd});
const A_WORDS=[
 {root:"قَل",v:{a:"ا",tail:"ب",medd:"ألف",emoji:"🚗"},w:"قالب"},
 {root:"بَاب",v:{a:"ا",tail:"",medd:"ألف",emoji:"🚪"},w:"باب"},
 {root:"نُور",v:{a:"و",tail:"",medd:"واو",emoji:"💡"},w:"نور"},
 {root:"دُور",v:{a:"و",tail:"",medd:"واو",emoji:"🏠"},w:"دور"},
 {root:"سَي",v:{a:"ا",tail:"ف",medd:"ألف",emoji:"🚐"},w:"سيف"},
 {root:"تِين",v:{a:"ي",tail:"",medd:"ياء",emoji:"🍇"},w:"تين"},
 {root:"زِين",v:{a:"ي",tail:"",medd:"ياء",emoji:"🌸"},w:"زين"},
 {root:"رُوس",v:{a:"و",tail:"",medd:"واو",emoji:"👶"},w:"روس"}
];
const L2_WORDS=[
 {w:"قالب",e:"🚗",p:"ق ا ل ب",l:"قَالَب"},
 {w:"باب",e:"🚪",p:"ب ا ب",l:"بَاب"},
 {w:"نور",e:"💡",p:"ن و ر",l:"نُور"},
 {w:"دور",e:"🏠",p:"د و ر",l:"دُور"},
 {w:"سيف",e:"🚐",p:"س ا ف",l:"سَيف"},
 {w:"تين",e:"🍇",p:"ت ي ن",l:"تِين"},
 {w:"زين",e:"🌸",p:"ز ي ن",l:"زِين"},
 {w:"قام",e:"🧍",p:"ق ا م",l:"قَام"},
 {w:"نوم",e:"😴",p:"ن و م",l:"نُوم"},
 {w:"ريم",e:"🦌",p:"ر ي م",l:"رِيم"},
 {w:"كتاب",e:"📖",p:"ك ت ا ب",l:"كِتَاب"},
 {w:"دلو",e:"🪣",p:"د ل و",l:"دَلو"}
];
const L3_WORDS=[
 {w:"كتاب",e:"📖",p:"كِتَاب",h:"كِتَاب"},
 {w:"قاموس",e:"📚",p:"قَامُوس",h:"قَامُوس"},
 {w:"مدرسة",e:"🏫",p:"مَدرَسة",h:"مَدْرَسة"},
 {w:"نخيل",e:"🌴",p:"نَخِيل",h:"نَخِيل"},
 {w:"يمامة",e:"🕊️",p:"يَمَامة",h:"يَمامَة"},
 {w:"وزارة",e:"🏛️",p:"وِزَارة",h:"وِزارة"},
 {w:"كعبة",e:"🕋",p:"كَعبَة",h:"كَعْبَة"},
 {w:"سفينة",e:"🚢",p:"سَفِينة",h:"سَفِينة"}
];
const L4_WORDS=[
 {w:"عصفور",e:"🐦",p:"عُصفُور",h:"عُصْفُور",s:2},
 {w:"مفتاح",e:"🔑",p:"مِفتَاح",h:"مِفْتَاح",s:1},
 {w:"برتقال",e:"🍊",p:"بُرتُقَال",h:"بُرْتُقَال",s:2},
 {w:"كرسي",e:"🪑",p:"كُرسِي",h:"كُرْسِي",s:1},
 {w:"سلطان",e:"👑",p:"سُلطَان",h:"سُلْطَان",s:1},
 {w:"فلتر",e:"☕",p:"فِلتر",h:"فِلْتر",s:1}
];
const L5_WORDS=[
 {w:"مدرسة",e:"🏫",p:"مَدْرَسَة"},
 {w:"نافذة",e:"🪟",p:"نَافِذَة"},
 {w:"كراجة",e:"🚗",p:"سَيَّارَة"},
 {w:"سماء",e:"☁️",p:"سَمَاء"},
 {w:"حقيبة",e:"🎒",p:"حَقِيبَة"},
 {w:"فنجان",e:"☕",p:"فِنْجَان"},
 {w:"ماء",e:"💧",p:"مَاء"},
 {w:"هواء",e:"🌬️",p:"هَوَاء"}
];
const CAT=[
 {k:"w0",level:1,words:A_WORDS},
 {k:"w1",level:1,words:A_WORDS},
 {k:"w2",level:1,words:A_WORDS},
 {k:"w3",level:2,words:L2_WORDS},
 {k:"w4",level:2,words:L2_WORDS},
 {k:"w5",level:2,words:L2_WORDS},
 {k:"w6",level:2,words:L2_WORDS},
 {k:"w7",level:3,words:L3_WORDS},
 {k:"w8",level:3,words:L3_WORDS},
 {k:"w9",level:3,words:L3_WORDS},
 {k:"w10",level:4,words:L4_WORDS},
 {k:"w11",level:4,words:L4_WORDS}
];
const DUMMY5=[{w:"",e:"",p:"",h:""}];
const GOAL_CAT=CAT.find(c=>c.k===L.goal.id)||CAT[0];
const GW=GOAL_CAT.words;
const TT={w0:"حرف المد الألف",w1:"حرف المد الواو",w2:"حرف المد الياء",w3:"قراءة كلمات بحرف الألف",w4:"قراءة كلمات بحرف الواو",w5:"قراءة كلمات بحرف الياء",w6:"قراءة كلمات بحرف مد منوعة",w7:"قراءة كلمات من حرفين",w8:"قراءة كلمات من 3 أحرف",w9:"قراءة كلمات من 4 أحرف",w10:"كتابة كلمات من حرفين",w11:"كتابة كلمات من 3 أحرف"};
const EM={w0:"🦅",w1:"🌊",w2:"🍋",w3:"🚪",w4:"💡",w5:"🍇",w6:"🌸",w7:"🚗",w8:"🏠",w9:"📖",w10:"✏️",w11:"📝"};
const isWrite=()=>L.goal.id==="w10"||L.goal.id==="w11";
const R=n=>Math.floor(Math.random()*n);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const st=document.createElement("style");
st.textContent=`.cart{font-size:7.5rem;line-height:1.2;animation:bnc 1.4s ease-in-out infinite}.lt{font-family:var(--f-display);line-height:1.2}@keyframes bnc{50%{transform:translateY(-12px) rotate(-6deg)}}.opt small{display:block;font:700 .85rem var(--f-body)}.opt:has(small){min-height:130px}.wcard{background:var(--surface,#fff);border:3px solid var(--teal,#0e8f8a);border-radius:20px;padding:14px 18px;font:800 2rem/1.6 var(--f-display);display:inline-block;box-shadow:0 5px 0 rgba(14,143,138,.16)}.wcard .v{color:var(--orange,#ff7a2f);font-size:1.3em}.medd-badge{display:inline-block;background:var(--soft,#e2f4f1);color:var(--teal,#0e8f8a);border-radius:999px;padding:2px 14px;font-weight:800;font-size:.9rem;margin-top:6px}`;
document.head.appendChild(st);
CAT.forEach(c=>{if(GOALS[c.k])GOALS[c.k].ready=true});
const SEGW=["ترحيب وتهيئة","اختبار الجاهزية","قوانين الحصة","العلم والنشيد","درس اليوم: المدود","النشاط ١: اكتشف المد","النشاط ٢: صوت المد","النشاط ٣: توصيل الكلمة","النشاط ٤: اكتب/ارسم","استراحة حركة","لعبة المكافأة","ختام وتقييم"];
const ANW={a1:"١ اكتشف المد",a2:"٢ صوت المد",a3:"٣ توصيل الكلمة",a4:"٤ اكتب/ارسم",fin:"الاختبار الختامي"};
const prevStart=window.startLesson;
const prevRun=[...SEG_RUN];
window.startLesson=function(g,sub,ti,goal){
 if(!CAT.find(c=>c.k===goal.id))return prevStart.apply(this,arguments);
 W=goal;SEGS.forEach((s,i)=>s[0]=SEGW[i]||s[0]);Object.assign(AN,ANW);
 return prevStart.apply(this,arguments);
};
let W=null;
SEG_RUN.forEach((_,i)=>{SEG_RUN[i]=el=>W?WS[i](el):prevRun[i](el)});
const WS=[
 el=>{
  const id=W.id,gid=id.startsWith("w")?+id.slice(1):0;
  const titles=["حرف المد الألف 🦅","حرف المد الواو 🌊","حرف المد الياء 🍋","كلمات بحرف الألف","كلمات بحرف الواو","كلمات بحرف الياء","كلمات بحروف مد منوعة","كلمات من حرفين","كلمات من 3 أحرف","كتابة كلمات من حرفين","كتابة كلمات من 3 أحرف"];
  const ti=titles[Math.min(gid,titles.length-1)];
  el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>أهلاً بك يا بطل! 🌟</b><br><span class="hint">اليوم نتعلّم: ${ti}</span></div></div><div class="goalbig">هدفنا اليوم<div class="cart">${EM[id]||"📖"}</div><div>${ti}</div></div><div class="rules"><div><i>👂</i>أسمع جيداً</div><div><i>🙋</i>أرفع يدي</div><div><i>🤝</i>أساعد زميلي</div></div><div class="row" style="justify-content:center"><button class="btn o" id="rdy">نحن جاهزون! 🚀</button></div>`;
  $("#rdy").onclick=()=>{say("start",true);confetti();gotoSeg(1)};
 },
 el=>{
  const bank=["🌙","⭐","🍎","🚗","🏠","🐟","🎈","🌼"];
  const n=3+R(5);const e=pick(bank);
  const opts=new Set([n]);while(opts.size<3)opts.add(Math.max(1,n+R(5)-2));
  trials(el,{id:"rev",n:3,record:false,make:()=>({stem:`<div>كم عدد الأشياء؟ 👇</div><div class="em" style="font-size:3rem">${e.repeat(n)}</div>`,opts:shuffle([...opts]).map(v=>({h:hd(v),ok:v===n}))}),done:()=>{el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>ممتاز! أنت جاهز 🎯</b><br><span class="hint">والآن نبدأ درسنا عن المدود.</span></div></div><div class="goalbig">الحروف الممدودة<div style="font-size:3rem">ا · و · ي</div></div>`;nextBar(el)}});
 },
 el=>{
  el.innerHTML=`<div class="mv"><div class="cart" style="font-size:5rem">📏</div><h2>قوانين الحصة</h2><div class="rules" style="max-width:500px;margin:12px auto"><div><i>👂</i>أسمع جيداً</div><div><i>🙋</i>أرفع يدي</div><div><i>🤝</i>أساعد زميلي</div><div><i>✍️</i>أكتب مع المعلم</div></div><p class="hint">كيف أشارك: أجيب بعد سؤال المعلم، وأمدح زملائي عند الإجابة الصحيحة.</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn o" id="goNext">التالي ←</button></div></div>`;
  $("#goNext").onclick=()=>gotoSeg(L.seg+1);
 },
 el=>{
  el.innerHTML=`<div class="mv"><div style="font-size:5rem">🇸🇦</div><h2>المملكة العربية السعودية</h2><div class="goalbig" style="font-size:1.4rem;background:color-mix(in srgb,var(--teal,#0e8f8a) 15%,var(--surface,#fff))">🎯 الهدف: نتعلّم المدود ونحن فخورون بوطننا</div><div style="margin-top:10px"><span class="medd-badge">🇸🇦 وطني الحبيب</span></div><div style="margin-top:12px;font-size:1.2rem;font-weight:800;color:var(--mute,#666)">النشيد الوطني</div><div style="background:var(--soft,#e2f4f1);border-radius:16px;padding:12px 16px;margin-top:6px;font-size:1rem;line-height:1.8">سارعي لمجد المجد يا وطني<br>وخلّدي ذكرى الخلود</div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn o" id="goNext">ابدأ الدرس 🚀</button></div></div>`;
  $("#goNext").onclick=()=>gotoSeg(L.seg+1);
 },
 el=>{
  const id=W.id;
  const isMedd=id==="w0"||id==="w1"||id==="w2";
  if(isMedd){
   const vi=+id.slice(1);
   const v=VOW[vi];
   el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>درس اليوم: حرف المد ${v[3]}</b></div></div><div class="goalbig"><div class="cart" style="font-size:6rem">${v[2]}</div><div class="wcard" style="font-size:3rem">${v[0]}<span class="v">ـ${v[0]}</span></div><div class="medd-badge">حرف مد ${v[3]}: ${v[1]}</div></div><div style="text-align:center;margin-top:10px"><p class="hint">حرف المد يُمدّ بصوت أطول من الحرف العادي.</p><button class="btn" id="hearM">🔊 اسمع صوت المد</button></div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn o" id="goNext">التالي ←</button></div>`;
   try{$("#hearM").onclick=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(v[1]+" "+v[1]+" "+v[1]);u.lang="ar-SA";u.rate=.5;speechSynthesis.speak(u)}}catch(e){}
  } else {
   const lvl=GOAL_CAT.level;
   const sample=GW[0];
   el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>درس اليوم: ${TT[id]}</b></div></div><div class="goalbig"><div class="cart" style="font-size:5rem">${sample.e||"📖"}</div><div class="wcard">${sample.h||sample.p||sample.w}</div></div><p class="hint" style="text-align:center;margin-top:8px">نقرأ الكلمة ونلاحظ حرف المد الموجود فيها.</p><div class="row" style="justify-content:center;margin-top:10px"><button class="btn o" id="goNext">التالي ←</button></div>`;
  }
  $("#goNext").onclick=()=>gotoSeg(L.seg+1);
 },
 el=>{
  const id=W.id;
  const isMedd=id==="w0"||id==="w1"||id==="w2";
  if(isMedd){
   const vi=+id.slice(1);const v=VOW[vi];
   const others=VOW.filter((_,k)=>k!==vi);
   trials(el,{id:"a1",n:5,make:i=>({stem:`<div>أين حرف المد ${v[1]}؟</div><div class="em lt" style="font-size:3rem">${v[0]}</div>`,opts:shuffle([{h:v[0],ok:true},...others.map(o=>({h:o[0]}))])}),done:()=>nextBar(el)});
  } else {
   const lvl=GOAL_CAT.level;
   trials(el,{id:"a1",n:5,make:i=>{
    const w=GW[i%GW.length];const others=shuffle(GW.filter(x=>x!==w)).slice(0,2);
    if(lvl<=2){return{stem:`<div>أي كلمة فيها حرف مد؟</div>`,opts:shuffle([{h:`<span style="font-size:2.8rem">${w.e||"📖"}</span><small>${w.w}</small>`,ok:true},...others.map(o=>({h:`<span style="font-size:2.8rem">${o.e||"📖"}</span><small>${o.w}</small>`}))])}}
    return{stem:`<div>اقرأ الكلمة التي فيها حرف مد:</div>`,opts:shuffle([{h:w.w,ok:true,w:1},...others.map(o=>({h:o.w,w:1}))])};
   },done:()=>nextBar(el)});
  }
 },
 el=>{
  const id=W.id;
  const isMedd=id==="w0"||id==="w1"||id==="w2";
  if(isMedd){
   const vi=+id.slice(1);const v=VOW[vi];
   trials(el,{id:"a2",n:5,make:i=>{
    const sounds=[v[1]+" "+v[1],v[0]+"ـ"+v[0],v[1]+"ْ"];
    const wrongSounds=VOW.filter((_,k)=>k!==vi).map(o=>o[1]+" "+o[1]);
    return{stem:`<div>أي صوت يمثل مد ${v[1]}؟</div><div class="em">🔊</div>`,opts:shuffle([{h:sounds[0],ok:true,w:1},...wrongSounds.slice(0,2).map(s=>({h:s,w:1}))])};
   },done:()=>nextBar(el)});
  } else {
   const lvl=GOAL_CAT.level;
   trials(el,{id:"a2",n:5,make:i=>{
    const w=GW[i%GW.length];const others=shuffle(GW.filter(x=>x!==w)).slice(0,2);
    return{stem:`<div>أي كلمة تحتوي على حرف مد؟</div><div class="em" style="font-size:2.5rem">${w.e||"📖"}</div>`,opts:shuffle([{h:w.w,ok:true,w:1},...others.map(o=>({h:o.w,w:1}))])};
   },done:()=>nextBar(el)});
  }
 },
 el=>{
  const lvl=GOAL_CAT.level;
  if(lvl<=1){
   trials(el,{id:"a3",n:5,make:i=>{
    const w=GW[i%GW.length];const others=shuffle(GW.filter(x=>x!==w)).slice(0,2);
    return{stem:`<div>أي صورة تمثل كلمة فيها حرف مد؟</div>`,opts:shuffle([{h:`<span style="font-size:4rem">${w.e||"📖"}</span><small>${w.w}</small>`,ok:true},...others.map(o=>({h:`<span style="font-size:4rem">${o.e||"📖"}</span><small>${o.w}</small>`}))])};
   },done:()=>nextBar(el)});
  } else {
   trials(el,{id:"a3",n:5,make:i=>{
    const w=GW[i%GW.length];const others=shuffle(GW.filter(x=>x!==w)).slice(0,2);
    return{stem:`<div>صل الكلمة بالصورة الصحيحة:</div><div style="font-size:2.2rem;font-weight:800;margin:8px">${w.w}</div>`,opts:shuffle([{h:`<span style="font-size:3.5rem">${w.e||"📖"}</span>`,ok:true},...others.map(o=>({h:`<span style="font-size:3.5rem">${o.e||"📖"}</span>`}))])};
   },done:()=>nextBar(el)});
  }
 },
 el=>{
  if(isWrite()){traceWord(el)}
  else{drawActivity(el)}
 },
 el=>{
  const M=[["🐰","اقفز ٥ قفزات صغيرة.",""],["🙆","ارفع يديك عالياً ثم اخفضهما ببطء.",""],["🌬️","تنفّس: شهيق عدّ ٤، زفير عدّ ٤.",""],["✏️","اكتب حرف المد في الهواء بإصبعك.",""]];let k=0;
  const d=()=>{el.innerHTML=`<div class="mv"><span class="chip">استراحة ${hd(k+1)} من ${hd(M.length)}</span><div class="em cart">${M[k][0]}</div><h2>${M[k][1]}</h2><div class="row" style="justify-content:center;margin-top:10px">${k<M.length-1?'<button class="btn" id="mn">التالية ←</button>':'<button class="btn o" id="goNext">نرجع للعمل ←</button>'}</div></div>`;if(k<M.length-1)$("#mn").onclick=()=>{k++;d()};else $("#goNext").onclick=()=>gotoSeg(L.seg+1)};d();
 },
 el=>balloonWord(el),
 el=>{
  const id=W.id,isMedd=id==="w0"||id==="w1"||id==="w2";
  el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>تحدّي النهاية! 🏆</b><br><span class="hint">٥ أسئلة سريعة لنعرف كم تعلّمنا.</span></div></div><div id="fin"></div>`;
  trials($("#fin"),{id:"fin",n:5,make:i=>{
   if(isMedd){const vi=+id.slice(1),v=VOW[vi],others=VOW.filter((_,k)=>k!==vi);return{stem:`<div>أين حرف المد ${v[1]}؟</div>`,opts:shuffle([{h:v[0],ok:true},...others.map(o=>({h:o[0]}))])}}
   const w=GW[i%GW.length],others=shuffle(GW.filter(x=>x!==w)).slice(0,2);
   if(i%2)return{stem:`<div>أي كلمة فيها حرف مد؟</div>`,opts:shuffle([{h:w.w,ok:true,w:1},...others.map(o=>({h:o.w,w:1}))])}
   return{stem:`<div>صل الكلمة بالصورة:</div><div style="font-size:2rem;font-weight:800;margin:6px">${w.w}</div>`,opts:shuffle([{h:`<span style="font-size:3rem">${w.e||"📖"}</span>`,ok:true},...others.map(o=>({h:`<span style="font-size:3rem">${o.e||"📖"}</span>`}))])};
  },done:()=>summary(el)});
 }
];
function traceWord(el){
 const w=GW[0],N=5;L.res.a4=L.res.a4||Array(N).fill(null);let i=0;
 const show=()=>{el.innerHTML=`<div class="qhead"><span class="chip">المحاولة ${hd(i+1)} من ${hd(N)}</span><div class="dots">${L.res.a4.map((r,k)=>`<span class="dot ${r||""} ${k===i?"cur":""}"></span>`).join("")}</div></div><div class="qbox" style="min-height:0;padding-bottom:0">اكتب الكلمة فوق الشكل الباهت</div><canvas class="cv" id="cv" width="300" height="200"></canvas><div class="fb" id="fb"></div><div class="row" style="justify-content:center"><button class="btn g sm" id="clr">🧽 مسح</button><span class="hint">للمعلم:</span><button class="btn sm" id="tOk">✔ أتقن</button><button class="btn g sm" id="tHelp">🟡 بمساعدة</button><button class="btn g sm" id="tNo">✖ لم يتقن</button></div>`;
  const cv=$("#cv"),x=cv.getContext("2d");let dr=false;
  const bg=()=>{x.clearRect(0,0,300,200);x.font="800 64px Tajawal,Tahoma,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillStyle="#0e8f8a";x.globalAlpha=.18;x.fillText(w.w,150,100);x.globalAlpha=1};bg();
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*300/r.width,(e.clientY-r.top)*200/r.height]};
  cv.onpointerdown=e=>{dr=true;cv.setPointerCapture(e.pointerId);const[a,b]=pt(e);x.beginPath();x.moveTo(a,b);x.lineWidth=12;x.lineCap="round";x.lineJoin="round";x.strokeStyle="#ff7a2f"};
  cv.onpointermove=e=>{if(!dr)return;const[a,b]=pt(e);x.lineTo(a,b);x.stroke()};cv.onpointerup=()=>{dr=false};
  $("#clr").onclick=bg;
  const fin=r=>{L.res.a4[i]=r;refreshPanel();const f=$("#fb");if(r!=="no"){L.stars++;drawStars();f.textContent=PRAISE[praiseI++%PRAISE.length]+" ⭐";f.className="fb p";sfx.ok();say(["ok1","ok2","ok3"][voiceI++%3]);jumpMas()}else f.textContent="لا بأس، نتعلّم معاً 🤝";
   setTimeout(()=>{i++;if(i<N)show();else nextBar(el)},1200)};
  $("#tOk").onclick=()=>fin("ok");$("#tHelp").onclick=()=>fin("help");$("#tNo").onclick=()=>fin("no")};show();
}
function drawActivity(el){
 const N=5;L.res.a4=L.res.a4||Array(N).fill(null);let i=0;
 const show=()=>{el.innerHTML=`<div class="qhead"><span class="chip">المحاولة ${hd(i+1)} من ${hd(N)}</span><div class="dots">${L.res.a4.map((r,k)=>`<span class="dot ${r||""} ${k===i?"cur":""}"></span>`).join("")}</div></div><div class="qbox" style="min-height:0;padding-bottom:0">ارسم صورة الكلمة ثم اكتبها</div><div style="text-align:center;margin:8px"><span class="wcard">${GW[i%GW.length].w}</span></div><canvas class="cv" id="cv" width="300" height="300"></canvas><div class="fb" id="fb"></div><div class="row" style="justify-content:center"><button class="btn g sm" id="clr">🧽 مسح</button><span class="hint">للمعلم:</span><button class="btn sm" id="tOk">✔ أتقن</button><button class="btn g sm" id="tHelp">🟡 بمساعدة</button></div>`;
  const cv=$("#cv"),x=cv.getContext("2d");let dr=false;const bg=()=>{x.clearRect(0,0,300,300);x.font="800 80px Tajawal";x.textAlign="center";x.fillStyle="#0e8f8a";x.globalAlpha=.12;x.fillText(GW[i%GW.length].w,150,150);x.globalAlpha=1};bg();
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*300/r.width,(e.clientY-r.top)*300/r.height]};
  cv.onpointerdown=e=>{dr=true;cv.setPointerCapture(e.pointerId);const[a,b]=pt(e);x.beginPath();x.moveTo(a,b);x.lineWidth=10;x.lineCap="round";x.strokeStyle="#ff7a2f"};
  cv.onpointermove=e=>{if(!dr)return;const[a,b]=pt(e);x.lineTo(a,b);x.stroke()};cv.onpointerup=()=>{dr=false};
  $("#clr").onclick=bg;
  const fin=r=>{L.res.a4[i]=r;refreshPanel();const f=$("#fb");if(r!=="no"){L.stars++;drawStars();f.textContent=PRAISE[praiseI++%PRAISE.length]+" ⭐";f.className="fb p";sfx.ok();say(["ok1","ok2","ok3"][voiceI++%3]);jumpMas()}else f.textContent="لا بأس، نتعلّم معاً 🤝";
   setTimeout(()=>{i++;if(i<N)show();else nextBar(el)},1200)};
  $("#tOk").onclick=()=>fin("ok");$("#tHelp").onclick=()=>fin("help")};show();
}
function balloonWord(el){
 const G=8,cols=["#ff9aa2","#ffd166","#9be7a5","#8ecae6","#cdb4db"];let sc=0,alive=true;
 const targetWords=GW.map(w=>w.w);
 el.innerHTML=`<div class="qhead"><span class="chip">اصطد بالونات الكلمات ✨</span><span class="stars">⭐ <b id="gs">٠</b>/${hd(G)}</span></div><div class="sky" id="sky"></div><p class="hint" style="margin-top:6px">اضغط البالونات التي عليها كلمات فيها حرف مد. لا توجد خسارة!</p>`;
 const sky=$("#sky");let sp,to;
 const end=()=>{if(!alive)return;alive=false;clearInterval(sp);clearTimeout(to);sky.innerHTML=`<div class="empty"><div class="big">🏆</div><h2>${sc>=G?"مبروك! أنت بطل الكلمات":"أحسنت! أنهيت اللعبة"}</h2></div>`;if(sc>=G){confetti();say("win",true);L.stars+=3;drawStars()}nextBar(el)};
 const distractors=["شجرة","قلم","كأس","ورد","باب","نار","درب","ملك"];
 sp=setInterval(()=>{if(!alive)return;const ok=Math.random()<.45,w=ok?pick(targetWords):pick(distractors),b=document.createElement("button");b.className="balloon";b.textContent=w;b.style.left=(6+Math.random()*78)+"%";b.style.background=pick(cols);b.style.setProperty("--d",(prefs.calm?10:8)+"s");b.style.fontSize="1.4rem";
  b.onclick=()=>{if(b.classList.contains("pop"))return;if(ok){b.classList.add("pop");sc++;$("#gs").textContent=hd(sc);sfx.ok();if(sc>=G)end()}else{b.classList.add("wob");sfx.soft();setTimeout(()=>b.classList.remove("wob"),400)}};
  b.addEventListener("animationend",()=>b.remove());sky.appendChild(b)},prefs.calm?1400:1000);
 to=setTimeout(end,9e4);segCleanup(()=>{alive=false;clearInterval(sp);clearTimeout(to)});
}
const d0=window.docHtml;
window.docHtml=function(k,id){if(!CAT.find(c=>c.k===id)||!/^(ws|wsol|hw|assess|cert)$/.test(k))return d0(k,id);
 const x=GOALS[id],cat=CAT.find(c=>c.k===id),sol=k==="wsol",hw=k==="hw";
 if(k==="assess"||k==="cert")return d0(k,id);
 const stg=`<div class="std"><b>الهدف قصير المدى:</b> ${esc(x.stg)}<br><b>الهدف التدريسي:</b> ${esc(x.t)}</div>`;
 const ws1=cat.words.map(w=>`<div>☐${sol&&w.w?'<span class="ok">✔</span>':""} ${w.e||"📖"} <b>${w.w}</b></div>`).join("");
 const ws2=cat.words.slice(0,4).map(w=>`<div style="font-size:22px;margin:4px 0">${w.w} = ........ <span class="hint">${sol?w.e||"":""}</span></div>`).join("");
 const ws3=`<div style="font-size:28px;letter-spacing:8px;color:${sol?"#0e8f8a":"#bbb"};text-align:center">${cat.words.slice(0,3).map(w=>w.w).join(" · ")}</div><div style="height:46px;border-bottom:1.5px dotted #888;margin-bottom:6px"></div>`;
 const t=hw?`واجب منزلي: ${TT[id]}`:sol?`ورقة عمل: ${TT[id]} (نموذج الإجابة)`:`ورقة عمل: ${TT[id]}`;
 return `<div class="doc">${docHead(t,hw?"بمساعدة ولي الأمر، ٥ دقائق فقط":"")}${stg}<div class="sec">١) ضع ✔ أمام الكلمة التي فيها حرف مد</div>${ws1}<div class="sec">٢) اكتب الكلمة بجانب الصورة</div>${ws2}${hw?"":`<div class="sec">٣) انسخ الكلمات</div>${ws3}`}<p class="hint" style="margin-top:10px">${hw?"لولي الأمر: اقرأ الكلمات مع ابنك ونطق حرف المد بصوت واضح.":""}</p></div>`};
const m0=window.makePptx;
window.makePptx=async function(id){if(!CAT.find(c=>c.k===id))return m0(id);
 try{toast("جارٍ تجهيز ملف PowerPoint...");await loadPptx();const cat=CAT.find(c=>c.k===id),p=new window.PptxGenJS();p.rtlMode=true;p.layout="LAYOUT_WIDE";p.author=SPEC;
  const S=(t,b,sz,bg)=>{const s=p.addSlide();s.background={color:bg||"F1FAF8"};s.addShape(p.ShapeType.rect,{x:0,y:0,w:13.33,h:.9,fill:{color:"0E8F8A"}});s.addText(t,{x:.4,y:.1,w:12.5,h:.7,fontFace:"Arial",fontSize:26,bold:true,color:"FFFFFF",align:"right",rtlMode:true});s.addText(b,{x:.8,y:1.4,w:11.7,h:5.2,fontFace:"Arial",fontSize:sz||44,bold:true,color:bg?"1B6B2E":"0F2B2E",align:"center",valign:"middle",rtlMode:true});s.addText(SPEC,{x:.3,y:7.1,w:4,h:.3,fontFace:"Arial",fontSize:9,color:"6B7F80",align:"left",rtlMode:true})};
  const A="FFF8E1";
  S(`${EM[id]||"📖"} ${TT[id]}`,`الأهداف الإثرائية · الصف الرابع · لغتي`,48);
  S("🎯 هدفنا اليوم",`أن أتعلّم: ${TT[id]}`,40);
  S("📏 قوانيننا","👂 أسمع جيداً\n🙋 أرفع يدي\n🤝 أساعد زميلي",44);
  S("🇸🇦 وطننا الحبيب","سارعي لمجد المجد يا وطني\nوخلّدي ذكرى الخلود",36);
  cat.words.slice(0,6).forEach((w,i)=>{S(`درس: كلمة ${hd(i+1)}`,`${w.e||"📖"}\n${w.w}`,54);S(`إجابة ${hd(i+1)}`,`${w.w} ✅`,60,A)});
  S("🤸 استراحة حركة","🐰 اقفز ٥ قفزات\n🙆 ارفع يديك\n🌬️ شهيق ٤ وزفير ٤",36);
  S("🎈 لعبة المكافأة","اقرأ الكلمات التي فيها حرف مد",44);
  S("🏅 ختام وتقييم",`هل تعرفت على ${TT[id]}؟\nأعطني مثالاً`,40);
  S("🌟 شكراً لك!","أحسنت يا بطل ⭐⭐⭐⭐⭐",54);
  await p.writeFile({fileName:`إتقان - ${TT[id]}.pptx`});toast("تم تنزيل الملف ✅")}catch(e){toast("تعذر تجهيز الملف، تأكد من الاتصال بالإنترنت")}};
render();
})();
