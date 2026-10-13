/* إتقان | special-math.js | دروس الرياضيات: الأهداف التدريسية m2–m6 | يُحمَّل بعد special-letters.js */
(()=>{"use strict";
const C={m2:{op:"+",k:"obj"},m3:{op:"+",k:"num"},m4:{op:"−",k:"sign"},m5:{op:"−",k:"obj"},m6:{op:"−",k:"num"}};
const TT={m2:"الجمع بالمحسوسات",m3:"الجمع بالأرقام",m4:"علامة الطرح",m5:"الطرح بالمحسوسات",m6:"الطرح بالأرقام"},EM={m2:"🍎",m3:"🔢",m4:"➖",m5:"🍪",m6:"🧮"};
Object.keys(C).forEach(k=>GOALS[k].ready=true);
let MC=null;const R=n=>Math.floor(Math.random()*n),E=["🍎","🐟","⭐","🎈","🚗"],NM=[["تفاحات","🍎"],["بالونات","🎈"],["أسماك","🐟"],["نجوم","⭐"]];
const prob=op=>{if(op==="+"){const a=1+R(5),b=1+R(4);return[a,b,a+b]}const a=3+R(6),b=1+R(a-1);return[a,b,a-b]};
const nopts=r=>{const s=new Set([r]);while(s.size<3)s.add(Math.max(0,r+R(5)-2));return shuffle([...s]).map(v=>({h:hd(v),ok:v===r}))};
const sopts=op=>shuffle([op,op==="+"?"−":"+","×"]).map(h=>({h,ok:h===op}));
const eq=t=>`<div class="eq" style="font-size:2.6rem;direction:ltr;unicode-bidi:isolate">${t}</div>`;
function Q(t,op){const[a,b,c]=prob(op),e=pick(E);
 if(t==="vis")return{stem:`<div>كم الناتج؟</div><div class="em">${e.repeat(a)} <b>${op}</b> ${e.repeat(b)} <b>=</b> ؟</div>`,opts:nopts(c)};
 if(t==="num")return{stem:`<div>احسب الناتج</div>${eq(`${hd(a)} ${op} ${hd(b)} = ؟`)}`,opts:nopts(c)};
 if(t==="miss")return{stem:`<div>ما العلامة الناقصة؟</div><div class="em">${e.repeat(a)} <b>؟</b> ${e.repeat(b)} <b>=</b> ${e.repeat(c)}</div>`,opts:sopts(op)};
 if(t==="mnum")return{stem:`<div>ما العدد الناقص؟</div>${eq(`${hd(a)} ${op} ☐ = ${hd(c)}`)}`,opts:nopts(b)};
 if(t==="word"){const[n,x]=pick(NM);return{stem:`<div>${op==="+"?`عند سلمى ${hd(a)} ${n} واشترت ${hd(b)} أخرى. كم صار عندها؟`:`عند سلمى ${hd(a)} ${n} وأعطت ${hd(b)} لصديقتها. كم بقي معها؟`}</div><div class="em">${x.repeat(a)}</div>`,opts:nopts(c)}}
 if(t==="tf"){const ok=Math.random()<.5,s=ok?c:c+1+R(2);return{stem:`<div>هل هذه العملية صحيحة؟</div>${eq(`${hd(a)} ${op} ${hd(b)} = ${hd(s)}`)}`,opts:[{h:"صح ✅",ok:ok,w:1},{h:"خطأ ❌",ok:!ok,w:1}]}}
 if(t==="sign")return{stem:`<div>أين علامة ${op==="+"?"الجمع":"الطرح"}؟</div>${eq(op)}`,opts:shuffle(["+","−","×","÷"]).map(h=>({h,ok:h===op}))};
 const P=op==="+"?["زائد","أضف","يجمع"]:["ناقص","اطرح","يأخذ"],M=shuffle(op==="+"?["ناقص","اطرح","ينقص"]:["زائد","أضف","يجمع"]);
 return{stem:`<div>أي كلمة تدل على ${op==="+"?"الجمع":"الطرح"}؟</div>`,opts:shuffle([{h:pick(P),ok:true,w:1},{h:M[0],w:1},{h:M[1],w:1}])}}
const AT={obj:["vis","miss","word","num"],num:["num","mnum","word","tf"],sign:["sign","miss","words","tf"]};
const ANL={obj:["١ احسب بالصور","٢ العلامة الناقصة","٣ مسائل كلامية","٤ اكتب الناتج"],num:["١ احسب بالأرقام","٢ العدد الناقص","٣ مسائل كلامية","٤ صح أم خطأ"],sign:["١ اكتشف العلامة","٢ العلامة الناقصة","٣ كلمات العملية","٤ صح أم خطأ"]};
const act=j=>el=>{const x=C[MC.id];trials(el,{id:"a"+(j+1),n:5,make:()=>Q(AT[x.k][j],x.op),done:()=>nextBar(el)})};
const MS=[
 el=>{const g=MC.id,x=C[g];el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>أهلاً بك يا بطل!</b><br><span class="hint">اليوم نتعلّم: ${TT[g]}</span></div></div><div class="goalbig">هدفنا اليوم<div class="cart" style="font-size:6rem">${EM[g]}</div><div>${TT[g]}</div><div style="font-size:2.6rem;direction:ltr">${x.op}</div></div><div class="rules"><div><i>👂</i>أسمع جيداً</div><div><i>🙋</i>أرفع يدي</div><div><i>🤝</i>أساعد زميلي</div></div><div class="row" style="justify-content:center"><button class="btn o" id="rdy">نحن جاهزون! 🚀</button></div>`;$("#rdy").onclick=()=>{say("start",true);confetti();gotoSeg(1)}},
 el=>trials(el,{id:"rev",n:3,record:false,make:()=>{const n=2+R(6),e=pick(E),s=new Set([n]);while(s.size<3)s.add(Math.max(1,n+R(5)-2));return{stem:`<div>كم عدد الأشياء؟</div><div class="em">${e.repeat(n)}</div>`,opts:shuffle([...s]).map(v=>({h:hd(v),ok:v===n}))}},done:()=>{el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>ممتاز! عرفنا نعدّ.</b><br><span class="hint">والآن نتعلّم ${TT[MC.id]}.</span></div></div><div class="goalbig" style="font-size:3.4rem;direction:ltr">${C[MC.id].op}</div>`;nextBar(el)}}),
 act(0),act(1),act(2),act(3),
 el=>{const M=[["🐰","اقفز ٥ قفزات صغيرة."],["🙆","ارفع يديك عالياً ثم اخفضهما ببطء."],["🌬️","شهيق عدّ ٤، زفير عدّ ٤."]];let k=0;
  const d=()=>{el.innerHTML=`<div class="mv"><span class="chip">استراحة ${hd(k+1)} من ${hd(M.length)}</span><div class="em cart">${M[k][0]}</div><h2>${M[k][1]}</h2><div class="row" style="justify-content:center;margin-top:10px">${k<M.length-1?'<button class="btn" id="mn">التالية ←</button>':'<button class="btn o" id="goNext">نرجع للعمل ←</button>'}</div></div>`;if(k<M.length-1)$("#mn").onclick=()=>{k++;d()};else $("#goNext").onclick=()=>gotoSeg(L.seg+1)};d()},
 el=>{const x=C[MC.id],G=8,cols=["#ff9aa2","#ffd166","#9be7a5","#8ecae6","#cdb4db"];let sc=0,alive=true,p=prob(x.op),sp,to;
  el.innerHTML=`<div class="qhead"><span class="chip" id="gq"></span><span class="stars">⭐ <b id="gs">٠</b>/${hd(G)}</span></div><div class="sky" id="sky"></div><p class="hint" style="margin-top:6px">اضغط البالون الذي عليه ناتج العملية. لا توجد خسارة!</p>`;
  const sky=$("#sky"),q=()=>{$("#gq").textContent=`${hd(p[0])} ${x.op} ${hd(p[1])} = ؟`};q();
  const end=()=>{if(!alive)return;alive=false;clearInterval(sp);clearTimeout(to);sky.innerHTML=`<div class="empty"><div class="big">🏆</div><h2>${sc>=G?"مبروك! أنت بطل الحساب":"أحسنت! أنهيت اللعبة"}</h2></div>`;if(sc>=G){confetti();say("win",true);L.stars+=3;drawStars()}nextBar(el)};
  sp=setInterval(()=>{if(!alive)return;const ok=Math.random()<.4,v=ok?p[2]:Math.max(0,p[2]+(R(2)?1:-1)*(1+R(3))),b=document.createElement("button");b.className="balloon";b.textContent=hd(v);b.style.left=(6+Math.random()*78)+"%";b.style.background=pick(cols);b.style.setProperty("--d",(prefs.calm?10:8)+"s");
   b.onclick=()=>{if(b.classList.contains("pop"))return;if(v===p[2]){b.classList.add("pop");sc++;$("#gs").textContent=hd(sc);sfx.ok();p=prob(x.op);q();if(sc>=G)end()}else{b.classList.add("wob");sfx.soft();setTimeout(()=>b.classList.remove("wob"),400)}};
   b.addEventListener("animationend",()=>b.remove());sky.appendChild(b)},prefs.calm?1400:1000);
  to=setTimeout(end,9e4);segCleanup(()=>{alive=false;clearInterval(sp);clearTimeout(to)})},
 el=>{const x=C[MC.id];el.innerHTML=`<div class="say"><div class="mc">${PENCIL}</div><div><b>تحدّي النهاية!</b><br><span class="hint">٥ أسئلة لنعرف كم تعلّمنا.</span></div></div><div id="fin"></div>`;
  trials($("#fin"),{id:"fin",n:5,make:i=>Q(AT[x.k][[0,1,2,3,0][i]],x.op),done:()=>summary(el)})}];
const prevRun=[...SEG_RUN];SEG_RUN.forEach((_,i)=>{SEG_RUN[i]=el=>MC?MS[i](el):prevRun[i](el)});
const prevStart=window.startLesson;
window.startLesson=function(g,sub,ti,goal){MC=C[goal.id]?goal:null;const r=prevStart.apply(this,arguments);
 if(MC){const k=C[MC.id].k,n=ANL[k];["ترحيب وقواعد","مراجعة","النشاط "+n[0],"النشاط "+n[1],"النشاط "+n[2],"النشاط "+n[3],"استراحة حركة","لعبة المكافأة","ختام وتقييم"].forEach((t,i)=>SEGS[i][0]=t);Object.assign(AN,{a1:n[0],a2:n[1],a3:n[2],a4:n[3]})}return r};
/* worksheets */
const d0=window.docHtml;
window.docHtml=function(k,id){if(!C[id]||!/^(ws|wsol|hw)$/.test(k))return d0(k,id);
 const x=GOALS[id],c=C[id],sol=k==="wsol",hw=k==="hw",box=v=>sol?`<span class="sym a">${v}</span>`:'<span class="sym" style="min-width:50px">&nbsp;</span>';
 const stg=`<div class="std"><b>الهدف قصير المدى:</b> ${esc(x.stg)}<br><b>الهدف التدريسي:</b> ${esc(x.t)}</div>`;
 const s1=Array.from({length:hw?3:6},()=>{const[a,b,r]=prob(c.op),e=pick(E);return `<div style="direction:ltr;text-align:right;font-size:22px;margin:4px 0">${c.k==="obj"?e.repeat(a)+" "+c.op+" "+e.repeat(b):hd(a)+" "+c.op+" "+hd(b)} = ${box(hd(r))}</div>`}).join("");
 const s2=Array.from({length:3},()=>{const[a,b,r]=prob(c.op);return `<div style="direction:ltr;text-align:right;font-size:22px;margin:4px 0">${hd(a)} ${box(c.op)} ${hd(b)} = ${hd(r)}</div>`}).join("");
 const s3=Array.from({length:2},()=>{const[a,b,r]=prob(c.op),[n]=pick(NM);return `<div>${c.op==="+"?`مع علي ${hd(a)} ${n} وأخذ ${hd(b)} أخرى. كم صار معه؟`:`مع علي ${hd(a)} ${n} وأعطى ${hd(b)} لأخيه. كم بقي معه؟`} ${box(hd(r))}</div>`}).join("");
 return `<div class="doc">${docHead((hw?"واجب منزلي: ":sol?"ورقة عمل محلولة: ":"ورقة عمل: ")+TT[id],hw?"بمساعدة ولي الأمر، ٥ دقائق فقط":"")}${stg}<div class="sec">١) احسب الناتج</div>${s1}<div class="sec">٢) اكتب العلامة الصحيحة (${c.op}) في المربع</div>${s2}${hw?"":`<div class="sec">٣) مسائل كلامية</div>${s3}`}</div>`};
/* PowerPoint */
const m0=window.makePptx;
window.makePptx=async function(id){if(!C[id])return m0(id);
 try{toast("جارٍ تجهيز ملف PowerPoint...");await loadPptx();const c=C[id],p=new window.PptxGenJS();p.rtlMode=true;p.layout="LAYOUT_WIDE";p.author=SPEC;
  const S=(t,b,sz,bg)=>{const s=p.addSlide();s.background={color:bg||"F1FAF8"};s.addShape(p.ShapeType.rect,{x:0,y:0,w:13.33,h:.9,fill:{color:"0E8F8A"}});s.addText(t,{x:.4,y:.1,w:12.5,h:.7,fontFace:"Arial",fontSize:26,bold:true,color:"FFFFFF",align:"right",rtlMode:true});s.addText(b,{x:.8,y:1.4,w:11.7,h:5.2,fontFace:"Arial",fontSize:sz||44,bold:true,color:bg?"1B6B2E":"0F2B2E",align:"center",valign:"middle",rtlMode:true});s.addText(SPEC,{x:.3,y:7.1,w:4,h:.3,fontFace:"Arial",fontSize:9,color:"6B7F80",align:"left",rtlMode:true})};
  const A="FFF8E1";S(`${EM[id]} ${TT[id]}`,`الأهداف الإثرائية · الصف الرابع · رياضيات\n${c.op}`,48);S("🎯 هدفنا اليوم",`أن أتعلّم: ${TT[id]}`,44);S("📏 قواعدنا","👂 أسمع جيداً\n🙋 أرفع يدي\n🤝 أساعد زميلي",44);
  for(let j=0;j<4;j++)for(let i=0;i<2;i++){const[a,b,r]=prob(c.op),e=pick(E),[n]=pick(NM);
   const T=[[`${e.repeat(a)} ${c.op} ${e.repeat(b)} = ؟`,hd(r)],[`${hd(a)} ؟ ${hd(b)} = ${hd(r)}\nما العلامة الناقصة؟`,c.op],[c.op==="+"?`مع سلمى ${hd(a)} ${n} واشترت ${hd(b)}. كم صار معها؟`:`مع سلمى ${hd(a)} ${n} وأعطت ${hd(b)}. كم بقي؟`,hd(r)],[`${hd(a)} ${c.op} ☐ = ${hd(r)}`,hd(b)]][j];
   S(`النشاط ${hd(j+1)} · سؤال ${hd(i+1)}`,T[0],40);S(`إجابة النشاط ${hd(j+1)} · ${hd(i+1)}`,T[1]+" ✅",60,A)}
  S("🤸 استراحة حركة","🐰 اقفز ٥ قفزات\n🙆 ارفع يديك واخفضهما\n🌬️ شهيق ٤ وزفير ٤",36);S("🏅 ختام وتقييم",`ما اسم العلامة؟  ${c.op}\nمتى نستخدمها؟`,40);S("🌟 شكراً لك!","أحسنت يا بطل ⭐⭐⭐⭐⭐",54);
  await p.writeFile({fileName:`إتقان - ${TT[id]}.pptx`});toast("تم تنزيل الملف ✅")}catch(e){toast("تعذر تجهيز الملف، تأكد من الاتصال بالإنترنت")}};
render();
})();
