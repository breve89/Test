/* Fan HQ: World map game. "Find it on the map" for every world region, US states and Canadian provinces.
   Learn mode: click anything to see what it is. Play mode: find each place; 3 tries, then it's revealed. */
(function(){
const W=window.WORLD;if(!W)return;const H=W.h,esc=H.esc,$=s=>document.querySelector(s);
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const US={},CA={};(window.US_STATES||[]).forEach(r=>US[r[0]]={key:r[0],name:r[1],cap:r[2],note:r[3],yr:r[4]});(window.CA_PROV||[]).forEach(r=>CA[r[0]]={key:r[0],name:r[1],cap:r[2],note:r[3],yr:r[4]});
const byName=(T)=>{const m={};Object.values(T).forEach(d=>m[H.norm(d.name)]=d.key);return m;};const US_N=byName(US),CA_N=byName(CA);
const DECKS=[
 {k:"NA",n:"North America",type:"world",cont:"NA",box:[[-170,6],[-50,72]]},
 {k:"SA",n:"South America",type:"world",cont:"SA",box:[[-90,-56],[-30,14]]},
 {k:"EU",n:"Europe",type:"world",cont:"EU",box:[[-25,34],[46,71]]},
 {k:"AF",n:"Africa",type:"world",cont:"AF",box:[[-20,-36],[54,38]]},
 {k:"AS",n:"Asia",type:"world",cont:"AS",box:[[25,-11],[150,56]]},
 {k:"OC",n:"Oceania",type:"world",cont:"OC",box:[[110,-48],[180,2]]},
 {k:"ALL",n:"Whole world",type:"world",cont:null},
 {k:"US",n:"US states",type:"us"},
 {k:"CA",n:"Canada",type:"ca"}
];
const G={deck:DECKS[0],mode:"play",feats:[],ctx:[],targets:[],uniq:[],queue:[],cur:null,tries:0,res:{},t0:0,tEnd:0,done:false,hover:null,flash:null,reveal:null,labels:false,
  z:1,tx:0,ty:0,proj:null,path:null,w:0,h:0,dpr:1,loading:false,err:null};
let cv,cx,timer=null;const cache={};

/* ---------- data ---------- */
function amLoad(names){/* try amCharts geodata ESM modules in order */
  const tryOne=i=>i>=names.length?Promise.reject(new Error("no source")):H.withTimeout(import(names[i]),12000).then(m=>H.geoFeatures(m.default)).catch(e=>{console.warn("[mapgame]",names[i],e);return tryOne(i+1);});return tryOne(0);}
async function loadDeck(d){await H.ensureD3();
  if(d.type==="world"){if(!cache.world){cache.world=await W.feats();}return cache.world;}
  if(cache[d.type])return cache[d.type];
  let fs;
  if(d.type==="us"){try{if(!window.US_GEO_LOCAL)throw 0;fs=H.geoFeatures(window.US_GEO_LOCAL);}catch(_){try{fs=await amLoad(["https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@5/usaLow.js","https://cdn.jsdelivr.net/npm/@amcharts/amcharts4-geodata@4/usaLow.js"]);}
    catch(e){await H.loadScript("https://cdn.jsdelivr.net/npm/datamaps@0.5.9/dist/datamaps.usa.min.js");const D=window.Datamap||window.Datamaps;const t=D&&D.prototype.usaTopo;if(!t||typeof t!=="object")throw new Error("US map unavailable");fs=H.topoFeatures(t,t.objects.usa);}}
    fs=fs.map(H.rewind).map(f=>{const id=String(f.id||"").replace(/^US-/,"");f._id=US[id]?id:US_N[H.norm(f.properties.name)]||null;f._d=f._id?US[f._id]:null;return f;});}
  else{fs=window.CA_GEO_LOCAL?H.geoFeatures(window.CA_GEO_LOCAL):await amLoad(["https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@5/canadaLow.js","https://cdn.jsdelivr.net/npm/@amcharts/amcharts4-geodata@4/canadaLow.js"]);
    fs=fs.map(H.rewind).map(f=>{const id=String(f.id||"").replace(/^CA-/,"");f._id=CA[id]?id:CA_N[H.norm(f.properties.name)]||null;f._d=f._id?CA[f._id]:null;return f;});}
  cache[d.type]=fs;return fs;}
function info(f){const d=G.deck;if(!f||!f._d)return null;
  if(d.type==="world"){const c=f._d;return {name:c.name,cap:c.cap.split(" (")[0],sub:W.CONT[c.cont].n,flag:H.flag(c.iso2),fact:c.geo.split(". ")[0]+"."};}
  const s=f._d;return {name:s.name,cap:s.cap,sub:d.type==="us"?`${s.note} · statehood ${s.yr}`:`${s.note} · joined Canada ${s.yr}`,flag:"",fact:""};}

/* ---------- projection & drawing ---------- */
function setupProj(){const d=G.deck;const pad=12;const ext=[[pad,pad],[G.w-pad,G.h-pad]];
  if(d.type==="us"){G.proj=d3.geoAlbersUsa();G.proj.fitExtent(ext,{type:"FeatureCollection",features:G.feats.filter(f=>f._id)});}
  else if(d.type==="ca"){G.proj=d3.geoConicConformal().rotate([96,0]).parallels([49,77]);G.proj.fitExtent(ext,{type:"FeatureCollection",features:G.feats});}
  else if(!d.cont){G.proj=d3.geoNaturalEarth1();G.proj.fitExtent(ext,{type:"Sphere"});}
  else{const [a,b]=d.box;const poly={type:"Polygon",coordinates:[[[a[0],a[1]],[b[0],a[1]],[b[0],b[1]],[a[0],b[1]],[a[0],a[1]]].reverse()]};G.proj=d3.geoMercator();G.proj.fitExtent(ext,{type:"Feature",geometry:{type:"MultiPoint",coordinates:poly.coordinates[0]}});}
  G.path=d3.geoPath(G.proj,cx);}
function resize(){const box=cv.parentElement;const w=box.clientWidth;if(!w)return;G.w=w;G.h=Math.round(Math.max(300,Math.min(640,w*0.62)));G.dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=w*G.dpr;cv.height=G.h*G.dpr;cv.style.height=G.h+"px";if(G.feats.length){setupProj();}draw();}
function colorOf(f){const id=f._id,inDeck=G.targets.includes(f);
  if(!inDeck)return "#1d2636";
  if(G.mode==="play"){const r=G.res[id];if(r===0)return "#2fd27c";if(r===1)return "#c9d94a";if(r===2)return "#f0a33a";if(r===3)return "#ff6b6b";}
  return G.hover===f?"#56719c":"#3a4c69";}
function draw(){if(!cx)return;cx.setTransform(G.dpr,0,0,G.dpr,0,0);cx.fillStyle="#0c1a2e";cx.fillRect(0,0,G.w,G.h);
  if(!G.feats.length||!G.path)return;cx.save();cx.translate(G.tx,G.ty);cx.scale(G.z,G.z);const lw=1/G.z;
  if(G.deck.type==="world"&&!G.deck.cont){cx.beginPath();G.path({type:"Sphere"});cx.fillStyle="#10294a";cx.fill();}
  for(const f of G.feats){cx.beginPath();G.path(f);cx.fillStyle=colorOf(f);cx.fill();cx.strokeStyle="rgba(8,14,24,.9)";cx.lineWidth=.7*lw;cx.stroke();}
  if(G.hover&&G.targets.includes(G.hover)){cx.beginPath();G.path(G.hover);cx.strokeStyle="#fff";cx.lineWidth=1.4*lw;cx.stroke();}
  if(G.flash){cx.beginPath();G.path(G.flash);cx.fillStyle="rgba(255,90,90,.75)";cx.fill();}
  if(G.reveal){const on=Math.floor(performance.now()/300)%2===0;cx.beginPath();G.path(G.reveal);cx.fillStyle=on?"#ff6b6b":"#ffe066";cx.fill();cx.strokeStyle="#fff";cx.lineWidth=2*lw;cx.stroke();}
  if(G.labels||G.mode==="learn"&&G.labels){cx.font=`600 ${11/G.z}px system-ui,sans-serif`;cx.textAlign="center";
    for(const f of G.targets){const b=G.path.bounds(f);const area=(b[1][0]-b[0][0])*(b[1][1]-b[0][1])*G.z*G.z;if(area<900)continue;const c=G.path.centroid(f);if(!isFinite(c[0]))continue;const nm=info(f).name;
      cx.lineWidth=3/G.z;cx.strokeStyle="rgba(8,14,24,.85)";cx.strokeText(nm,c[0],c[1]);cx.fillStyle="#fff";cx.fillText(nm,c[0],c[1]);}}
  cx.restore();}
function featAt(px,py){if(!G.proj)return null;const x=(px-G.tx)/G.z,y=(py-G.ty)/G.z;const ll=G.proj.invert([x,y]);
  if(ll&&isFinite(ll[0])){for(const f of G.targets)if(d3.geoContains(f,ll))return f;for(const f of G.feats)if(d3.geoContains(f,ll))return f;}
  /* small places: accept a click within a few pixels of a target's outline box */
  let best=null,bd=1e9;for(const f of G.targets){const b=G.path.bounds(f);const cxm=(b[0][0]+b[1][0])/2,cym=(b[0][1]+b[1][1])/2;const sz=Math.max(b[1][0]-b[0][0],b[1][1]-b[0][1])*G.z;if(sz>14)continue;const d=Math.hypot(cxm-x,cym-y)*G.z;if(d<10&&d<bd){bd=d;best=f;}}return best;}

/* ---------- game flow ---------- */
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function pickTargets(){const d=G.deck;const seen=new Set();
  G.targets=G.feats.filter(f=>{if(!f._id||seen.has(f._id))return false;if(d.type==="world"){if(d.cont&&f._d.cont!==d.cont)return false;if(f._d.cont==="AN"&&d.cont!=="AN")return false;}seen.add(f._id);return true;});
  /* make every polygon of a multi-part place count (e.g. N. Cyprus with Cyprus) */
  const ids=new Set(G.targets.map(f=>f._id));G.targets=G.feats.filter(f=>f._id&&ids.has(f._id));G.uniq=[...ids];}
function start(){G.res={};G.tries=0;G.reveal=null;G.flash=null;G.done=false;G.queue=shuffle(G.uniq);G.cur=null;G.t0=performance.now();G.tEnd=0;next();ui();clearInterval(timer);timer=setInterval(()=>{if(G.mode==="play"&&!G.done)stats();},500);}
function next(){G.tries=0;G.reveal=null;G.cur=G.queue.shift()||null;if(!G.cur){finish();}ui();draw();}
function nameOf(id){const f=G.targets.find(x=>x._id===id);return f?info(f).name:id;}
function finish(){G.done=true;G.tEnd=performance.now();const total=G.uniq.length;const first=Object.values(G.res).filter(v=>v===0).length;const secs=Math.round((G.tEnd-G.t0)/1000);
  const pct=total?Math.round(first/total*100):0;const key="hq_mapgame_"+G.deck.k;const best=ls.get(key,null);const nb=!best||pct>best.pct||(pct===best.pct&&secs<best.secs);if(nb)ls.set(key,{pct,secs,date:Date.now()});
  const missed=G.uniq.filter(id=>G.res[id]===3);
  $("#mgEnd").hidden=false;$("#mgEnd").innerHTML=`<div class="mgbig">${pct}%</div><div>${first} of ${total} on the first try · ${fmtT(secs)}${nb?" · <b>New best!</b>":best?` · Best ${best.pct}% in ${fmtT(best.secs)}`:""}</div>
   ${missed.length?`<div class="small muted" style="margin-top:8px">Practice these: ${missed.map(id=>esc(nameOf(id))).join(", ")}</div>`:`<div class="small" style="margin-top:8px">No misses. Nice work!</div>`}
   <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn pri" id="mgAgain">Play again</button>${missed.length?`<button class="btn" id="mgMiss">Replay misses</button>`:""}<button class="btn" id="mgLearn">Learn mode</button></div>`;
  $("#mgAgain").onclick=()=>{$("#mgEnd").hidden=true;start();};if($("#mgMiss"))$("#mgMiss").onclick=()=>{$("#mgEnd").hidden=true;G.res={};G.done=false;G.queue=shuffle(missed);G.uniqBackup=G.uniq;G.t0=performance.now();next();};
  $("#mgLearn").onclick=()=>setMode("learn");ui();}
function fmtT(s){return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");}
function clickPlay(f){if(G.done||!G.cur||G.reveal)return;if(!f||!f._id||!G.targets.includes(f)){toast(f&&f._d?`That's ${info(f).name}, which isn't in this set`:"Missed. Try again");return;}
  if(f._id===G.cur){G.res[G.cur]=Math.min(G.tries,2);toast(`✓ ${info(f).name}`,"good");next();return;}
  G.tries++;G.flash=f;toast(`That's ${info(f).name}`);setTimeout(()=>{G.flash=null;draw();},600);
  if(G.tries>=3){G.res[G.cur]=3;G.reveal=G.targets.find(x=>x._id===G.cur);const hold=performance.now();const blink=()=>{if(G.reveal&&performance.now()-hold<1800){draw();requestAnimationFrame(blink);}};blink();
    setTimeout(()=>{G.reveal=null;next();},1800);}
  stats();draw();}
function clickLearn(f){if(!f||!f._d){$("#mgCard").innerHTML=`<span class="muted">Click any shape to see what it is.</span>`;return;}const i=info(f);
  $("#mgCard").innerHTML=`<div class="mgci">${i.flag?`<span class="mgflag">${i.flag}</span>`:""}<div><b>${esc(i.name)}</b><div class="small muted">Capital: ${esc(i.cap)} · ${esc(i.sub)}</div>${i.fact?`<div class="small" style="margin-top:4px">${esc(i.fact)}</div>`:""}</div></div>`;
  if(G.deck.type==="world"){const b=$("#mgCard");b.insertAdjacentHTML("beforeend",`<button class="btn sm" data-mgopen="${esc(f._id)}" style="margin-top:8px">Open in Explore</button>`);}}
let toastT;function toast(t,kind){const el=$("#mgToast");el.textContent=t;el.className="mgtoast "+(kind||"");el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,1300);}
function stats(){const el=$("#mgStats");if(!el)return;if(G.mode!=="play"){el.textContent=`${G.uniq.length} places · click any to learn it`;return;}
  const total=G.uniq.length,done=Object.keys(G.res).length,first=Object.values(G.res).filter(v=>v===0).length;const secs=Math.round(((G.tEnd||performance.now())-G.t0)/1000);
  el.innerHTML=`<b>${done}</b>/${total} found · <b>${done?Math.round(first/done*100):0}%</b> first try · ${fmtT(secs)}`;$("#mgBar").style.width=(total?done/total*100:0)+"%";}
function ui(){const p=$("#mgPrompt");if(!p)return;
  $("#mgDecks").innerHTML=DECKS.map(d=>`<button data-mgd="${d.k}" class="${G.deck.k===d.k?"on":""}">${esc(d.n)}</button>`).join("");
  $("#mgModes").innerHTML=`<button data-mgm="play" class="${G.mode==="play"?"on":""}">Play</button><button data-mgm="learn" class="${G.mode==="learn"?"on":""}">Learn</button>`;
  $("#mgLabels").textContent=G.labels?"Hide names":"Show names";$("#mgLabels").setAttribute("aria-pressed",G.labels);
  if(G.loading){p.innerHTML=`Loading the ${esc(G.deck.n)} map…`;}
  else if(G.err){p.innerHTML=`<span>The map couldn't load. <button class="btn sm" id="mgRetry">Try again</button></span>`;$("#mgRetry").onclick=()=>chooseDeck(G.deck.k);}
  else if(G.mode==="learn"){p.innerHTML=`<span class="muted">Learn mode:</span> hover or click any ${G.deck.type==="us"?"state":G.deck.type==="ca"?"province or territory":"country"} to see its name and capital.`;}
  else if(G.done){p.innerHTML=`Done! See your score below.`;}
  else if(G.cur){const nm=nameOf(G.cur);p.innerHTML=`Find <b class="mgtarget">${esc(nm)}</b>${G.tries?` <span class="small muted">· ${3-G.tries} ${3-G.tries===1?"try":"tries"} left</span>`:""}<button class="btn sm" id="mgSkip" style="margin-left:10px">Skip</button>`;$("#mgSkip").onclick=()=>{G.res[G.cur]=3;G.reveal=G.targets.find(x=>x._id===G.cur);draw();setTimeout(()=>{G.reveal=null;next();},1200);};}
  $("#mgCardWrap").hidden=G.mode!=="learn";stats();}
async function chooseDeck(k){G.deck=DECKS.find(d=>d.k===k)||DECKS[0];G.loading=true;G.err=null;G.feats=[];G.z=1;G.tx=0;G.ty=0;$("#mgEnd").hidden=true;ui();draw();
  try{G.feats=await loadDeck(G.deck);G.loading=false;pickTargets();resize();if(G.mode==="play")start();else{ui();draw();}}
  catch(e){console.warn("[mapgame]",e);G.loading=false;G.err=e;ui();draw();}}
function setMode(m){G.mode=m;$("#mgEnd").hidden=true;if(m==="play"&&G.feats.length)start();else{clearInterval(timer);G.res={};ui();draw();}if(m==="learn")clickLearn(null);}

/* ---------- interaction: click, hover, pan & zoom ---------- */
function wire(){let drag=null,moved=false;const pts=new Map();let pinch=null;
  cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.offsetX,e.offsetY]);if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:G.z,mx:(a[0]+b[0])/2,my:(a[1]+b[1])/2};}drag={x:e.offsetX,y:e.offsetY,tx:G.tx,ty:G.ty};moved=false;});
  cv.addEventListener("pointermove",e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,[e.offsetX,e.offsetY]);
    if(pinch&&pts.size===2){const [a,b]=[...pts.values()];zoomAt(pinch.mx,pinch.my,pinch.z*Math.hypot(a[0]-b[0],a[1]-b[1])/pinch.d/G.z);moved=true;return;}
    if(drag&&pts.size===1){const dx=e.offsetX-drag.x,dy=e.offsetY-drag.y;if(Math.abs(dx)+Math.abs(dy)>4){moved=true;G.tx=drag.tx+dx;G.ty=drag.ty+dy;clampPan();draw();}return;}
    const f=featAt(e.offsetX,e.offsetY);if(f!==G.hover){G.hover=f;draw();}const tip=$("#mgTip");
    if(f&&G.targets.includes(f)&&(G.mode==="learn"||G.labels)){tip.textContent=info(f).name;tip.hidden=false;tip.style.left=(e.offsetX+12)+"px";tip.style.top=(e.offsetY+8)+"px";}else tip.hidden=true;});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(drag&&!moved){const f=featAt(e.offsetX,e.offsetY);if(G.mode==="play")clickPlay(f);else clickLearn(f);}drag=null;};
  cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",e=>{pts.delete(e.pointerId);drag=null;pinch=null;});
  cv.addEventListener("pointerleave",()=>{G.hover=null;$("#mgTip").hidden=true;draw();});
  cv.addEventListener("wheel",e=>{e.preventDefault();zoomAt(e.offsetX,e.offsetY,Math.exp(-e.deltaY*0.0015));},{passive:false});
  new ResizeObserver(()=>{const keep=G.w;resize();}).observe(cv.parentElement);
  $("#mgZin").onclick=()=>zoomAt(G.w/2,G.h/2,1.4);$("#mgZout").onclick=()=>zoomAt(G.w/2,G.h/2,1/1.4);$("#mgFit").onclick=()=>{G.z=1;G.tx=0;G.ty=0;draw();};
  $("#mgLabels").onclick=()=>{G.labels=!G.labels;ui();draw();};
  document.getElementById("t-world").addEventListener("click",e=>{const d=e.target.closest("[data-mgd]");if(d){chooseDeck(d.dataset.mgd);return;}const m=e.target.closest("[data-mgm]");if(m){setMode(m.dataset.mgm);return;}
    const o=e.target.closest("[data-mgopen]");if(o){location.hash="world-explore";setTimeout(()=>W.select(o.dataset.mgopen,true),60);}});}
function zoomAt(px,py,k){const z=Math.max(1,Math.min(12,G.z*k));const f=z/G.z;G.tx=px-(px-G.tx)*f;G.ty=py-(py-G.ty)*f;G.z=z;clampPan();draw();}
function clampPan(){const minx=G.w-G.w*G.z,miny=G.h-G.h*G.z;G.tx=Math.min(0,Math.max(minx,G.tx));G.ty=Math.min(0,Math.max(miny,G.ty));}

let started=false;
function init(){cv=$("#mgMap");if(!cv)return;cx=cv.getContext("2d");wire();ui();
  /* load lazily the first time the Map game section is visible */
  const go=()=>{if(started)return;const p=document.querySelector('.subp[data-tab="world"][data-sub="game"]');if(p&&p.classList.contains("on")&&document.getElementById("t-world").classList.contains("on")){started=true;chooseDeck(G.deck.k);}};
  window.addEventListener("hashchange",()=>setTimeout(go,30));document.addEventListener("change",()=>setTimeout(go,30));setTimeout(go,50);}
window.MAPGAME={init,_pt:id=>{const f=G.targets.find(x=>x._id===id);if(!f)return null;const c=G.path.centroid(f);return [c[0]*G.z+G.tx,c[1]*G.z+G.ty];},_cur:()=>G.cur};
})();
