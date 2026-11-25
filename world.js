/* Fan HQ: World tab. 3D globe (d3 orthographic on canvas), continent + country explorer, history timeline, quiz.
   Country outlines load at runtime from public CDNs (Natural Earth via world-atlas); content lives in world_*.js. */
(function(){
const CONT={
 AF:{n:"Africa",c:"#f0a33a",ctr:[20,4],area:30370000,pop:"about 1.5 billion",hi:"Kilimanjaro, Tanzania (5,895 m)",lo:"Lake Assal, Djibouti (−155 m)",river:"Nile (about 6,650 km), the longest in the world",big:"Algeria",
  geo:"The second-largest continent straddles the equator, so it holds both the Sahara, the largest hot desert, and the Congo rainforest. The Great Rift Valley is slowly splitting East Africa apart.",
  hist:"Humanity's birthplace: the oldest Homo sapiens fossils (about 300,000 years old) come from Morocco, and East Africa holds millions of years of earlier human ancestors. Ancient Egypt, Kush, Aksum, Ghana, Mali, Songhai, Great Zimbabwe and the Swahili city-states all flourished here. The Atlantic slave trade and the 'Scramble for Africa' (1880s) brought devastating European colonization; most countries won independence between 1956 and 1975."},
 AS:{n:"Asia",c:"#e8584f",ctr:[88,32],area:44580000,pop:"about 4.8 billion (roughly 60% of humanity)",hi:"Mount Everest, Nepal/China (8,849 m), the highest on Earth",lo:"Dead Sea shore (about −430 m), the lowest land on Earth",river:"Yangtze (about 6,300 km)",big:"Russia (Asian part) or China",
  geo:"The largest and most populous continent, from the Arctic tundra of Siberia to the tropical islands of Indonesia. The Himalayas and Tibetan Plateau feed rivers that sustain billions of people.",
  hist:"Mesopotamia (writing, cities, the wheel), the Indus Valley and China's Yellow River valley were among the first civilizations. Asia gave rise to Hinduism, Buddhism, Judaism, Christianity and Islam, and to vast empires: Persian, Mauryan, Han, Mongol and Ottoman. The Silk Road linked it to Europe for more than 1,500 years."},
 EU:{n:"Europe",c:"#5b8def",ctr:[15,52],area:10180000,pop:"about 745 million",hi:"Mount Elbrus, Russia (5,642 m); Mont Blanc (4,806 m) in the Alps",lo:"Caspian Sea shore (−28 m)",river:"Volga (3,530 km)",big:"Russia (European part); Ukraine is the largest wholly in Europe",
  geo:"Really a western peninsula of Eurasia, with a very long, jagged coastline. The Gulf Stream keeps it milder than other places at the same latitude. The Urals and Caucasus mark its traditional eastern edge.",
  hist:"Ancient Greece and Rome laid foundations for law, philosophy and democracy. After the medieval era came the Renaissance, Reformation, Age of Discovery, Scientific and Industrial revolutions, and global empires. Two World Wars and the Cold War followed; the European Union grew out of the drive for lasting peace."},
 NA:{n:"North America",c:"#3fb57a",ctr:[-98,42],area:24710000,pop:"about 610 million",hi:"Denali, Alaska (6,190 m)",lo:"Death Valley, California (−86 m)",river:"Missouri–Mississippi system (about 6,275 km)",big:"Canada",
  geo:"Stretches from the Arctic to the tropics, including Greenland, Central America and the Caribbean. The Rockies, Great Plains, Canadian Shield and the Great Lakes, the largest freshwater lake system by area.",
  hist:"People crossed from Asia at least 15,000 years ago. The Maya, Aztec, Ancestral Puebloan, Mississippian and many other cultures flourished. European colonization after 1492 devastated Indigenous populations; independence movements created the US (1776), Haiti (1804) and Mexico (1821)."},
 SA:{n:"South America",c:"#c46cf0",ctr:[-60,-16],area:17840000,pop:"about 440 million",hi:"Aconcagua, Argentina (6,961 m)",lo:"Laguna del Carbón, Argentina (−105 m)",river:"Amazon (about 6,400 km), the largest by water volume",big:"Brazil",
  geo:"The Andes, the world's longest continental mountain range, run its whole western edge. The Amazon basin holds the largest tropical rainforest; the Atacama is among the driest places on Earth.",
  hist:"Norte Chico cities in Peru date to about 3000 BC. The Inca built the largest empire in the pre-Columbian Americas. Spain and Portugal divided the continent after 1494; Bolívar and San Martín led independence in the 1810s–20s."},
 OC:{n:"Oceania",c:"#22b8c9",ctr:[150,-22],area:8525000,pop:"about 46 million",hi:"Puncak Jaya, New Guinea (4,884 m)",lo:"Lake Eyre, Australia (−15 m)",river:"Murray (2,508 km)",big:"Australia",
  geo:"Australia, New Guinea, New Zealand and thousands of Pacific islands in Melanesia, Micronesia and Polynesia, scattered across the largest ocean.",
  hist:"Aboriginal Australians and Papuans arrived at least 50,000 years ago. Polynesian navigators settled the remote Pacific using stars and swells, reaching New Zealand around 1300. European colonization followed Cook's voyages in the 1770s."},
 AN:{n:"Antarctica",c:"#a9c7dd",ctr:[0,-82],area:14200000,pop:"no permanent residents (1,000–5,000 researchers)",hi:"Vinson Massif (4,892 m)",lo:"Denman Glacier trough (about −3,500 m under the ice)",river:"Onyx River (32 km), which flows only in summer",big:"—",
  geo:"The coldest, driest, windiest and highest continent on average. Its ice sheet holds about 70% of Earth's fresh water; if it melted, seas would rise about 58 m.",
  hist:"First sighted in 1820. Roald Amundsen reached the South Pole in 1911, a month before Robert Falcon Scott. The 1959 Antarctic Treaty set it aside for peace and science."}
};
const TIMELINE=[
 ["c. 300,000 BC","AF","Homo sapiens appears","The oldest known fossils of our species, from Jebel Irhoud in Morocco."],
 ["c. 70,000–50,000 BC","AS","Humans spread out of Africa","Modern humans reach Asia, then Australia by at least 50,000 years ago."],
 ["c. 10,000 BC","AS","Farming begins","Agriculture starts in the Fertile Crescent, then independently in China, Mesoamerica, the Andes and New Guinea."],
 ["c. 3200 BC","AS","Writing is invented","Sumerian cuneiform in Mesopotamia; Egyptian hieroglyphs appear about the same time."],
 ["c. 2560 BC","AF","Great Pyramid of Giza","Built for Pharaoh Khufu; the tallest human-made structure for about 3,800 years."],
 ["c. 2600–1900 BC","AS","Indus Valley cities","Harappa and Mohenjo-daro have planned streets and drainage."],
 ["c. 1200 BC","NA","Olmec civilization","Mesoamerica's first major culture, known for colossal stone heads."],
 ["508 BC","EU","Democracy in Athens","Cleisthenes' reforms give citizens a direct vote."],
 ["221 BC","AS","China unified","Qin Shi Huang becomes the first emperor and standardizes writing and coins."],
 ["27 BC–476 AD","EU","Roman Empire","At its height it ringed the Mediterranean; the Western Empire fell in 476."],
 ["c. 250–900","NA","Classic Maya","Cities like Tikal and Calakmul, with advanced astronomy and writing."],
 ["632–750","AS","Early Islamic caliphates","Islam spreads from Arabia to Spain and Central Asia; Baghdad becomes a center of learning."],
 ["c. 1300","OC","Polynesians reach New Zealand","The last major landmass settled by humans, apart from Antarctica."],
 ["1206–1368","AS","Mongol Empire","Genghis Khan's empire becomes the largest contiguous land empire."],
 ["1324","AF","Mansa Musa's pilgrimage","Mali's ruler travels to Mecca with so much gold he disrupts Egypt's economy."],
 ["1440s","EU","Printing press","Gutenberg's movable type spreads books and ideas across Europe."],
 ["1438–1533","SA","Inca Empire","The largest empire in the pre-Columbian Americas, linked by about 40,000 km of roads."],
 ["1492","NA","Columbus reaches the Americas","Begins lasting contact, and conquest, between Europe and the Americas."],
 ["1519–22","SA","First circumnavigation","Magellan's expedition sails around the world; Elcano completes it."],
 ["1776","NA","US Declaration of Independence","Thirteen British colonies declare independence."],
 ["1789","EU","French Revolution","Overthrows the monarchy and spreads ideas of liberty and equality."],
 ["1804","NA","Haitian independence","The first nation founded by a successful revolt of enslaved people."],
 ["c. 1760–1840","EU","Industrial Revolution","Steam power and factories transform Britain, then the world."],
 ["1884–85","AF","Berlin Conference","European powers divide Africa among themselves."],
 ["1914–18","EU","World War I","About 20 million deaths; four empires collapse."],
 ["1939–45","EU","World War II","The deadliest conflict in history, including the Holocaust; ends with atomic bombings of Japan."],
 ["1947–75","AS","Decolonization","India, Pakistan, Indonesia and most of Africa win independence."],
 ["1969","NA","Moon landing","Apollo 11 astronauts walk on the Moon."],
 ["1989–91","EU","Cold War ends","The Berlin Wall falls in 1989; the Soviet Union dissolves in 1991."],
 ["1990s–2000s","NA","The internet age","The World Wide Web (1991) and smartphones connect billions of people."]
];
const $=s=>document.querySelector(s),esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ISO=window.WORLD_ISO||{};
const DATA={};(window.WORLD_C||[]).forEach(r=>{const [id,cont,cap,pop,area,lang,cur,geo,hist]=r;const iso=ISO[id]||[];DATA[id]={id,cont,cap,pop,area,lang,cur,geo,hist,iso2:iso[0]||"",num:iso[1]||"",name:NAME_OVERRIDE(id)||iso[2]||id};});
function NAME_OVERRIDE(id){return {USA:"United States",GBR:"United Kingdom",RUS:"Russia",KOR:"South Korea",PRK:"North Korea",IRN:"Iran",SYR:"Syria",VNM:"Vietnam",LAO:"Laos",BOL:"Bolivia",VEN:"Venezuela",TZA:"Tanzania",COD:"DR Congo",COG:"Republic of the Congo",MDA:"Moldova",FSM:"Micronesia",CZE:"Czechia",TUR:"Türkiye",XKX:"Kosovo",PSE:"Palestine",TWN:"Taiwan",CIV:"Côte d'Ivoire",SWZ:"Eswatini",MKD:"North Macedonia",BRN:"Brunei",CPV:"Cabo Verde",VAT:"Vatican City",ATA:"Antarctica",ESH:"Western Sahara",FLK:"Falkland Islands",GRL:"Greenland",PRI:"Puerto Rico",NCL:"New Caledonia",TLS:"Timor-Leste",STP:"São Tomé and Príncipe",KNA:"Saint Kitts and Nevis",LCA:"Saint Lucia",VCT:"Saint Vincent and the Grenadines",BHS:"Bahamas",GMB:"Gambia"}[id];}
const BY_NUM={},BY_A2={},BY_NAME={};
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z]/g,"");
Object.values(DATA).forEach(d=>{if(d.num)BY_NUM[String(+d.num)]=d.id;if(d.iso2)BY_A2[d.iso2]=d.id;BY_NAME[norm(d.name)]=d.id;const n=ISO[d.id]&&ISO[d.id][2];if(n)BY_NAME[norm(n)]=d.id;});
Object.assign(BY_NAME,{[norm("United States of America")]:"USA",[norm("Dem. Rep. Congo")]:"COD",[norm("Congo")]:"COG",[norm("Central African Rep.")]:"CAF",[norm("S. Sudan")]:"SSD",[norm("Eq. Guinea")]:"GNQ",[norm("eSwatini")]:"SWZ",[norm("W. Sahara")]:"ESH",[norm("Bosnia and Herz.")]:"BIH",[norm("Dominican Rep.")]:"DOM",[norm("Solomon Is.")]:"SLB",[norm("Falkland Is.")]:"FLK",[norm("Fr. S. Antarctic Lands")]:"",[norm("N. Cyprus")]:"CYP",[norm("Somaliland")]:"SOM",[norm("Kosovo")]:"XKX",[norm("Macedonia")]:"MKD",[norm("Czech Rep.")]:"CZE",[norm("Ivory Coast")]:"CIV",[norm("Swaziland")]:"SWZ",[norm("Republic of Serbia")]:"SRB",[norm("United Republic of Tanzania")]:"TZA",[norm("Guinea Bissau")]:"GNB",[norm("East Timor")]:"TLS",[norm("The Bahamas")]:"BHS",[norm("Republic of the Congo")]:"COG",[norm("Democratic Republic of the Congo")]:"COD"});
const flag=a2=>a2&&a2.length===2?String.fromCodePoint(...[...a2.toUpperCase()].map(c=>127397+c.charCodeAt(0))):"";
const fmtN=n=>n>=1000?Math.round(n).toLocaleString("en-US"):n>=100?Math.round(n).toString():n>=10?n.toFixed(1):n>=1?n.toFixed(1):n.toFixed(2);
const fmtPop=m=>m>=1000?(m/1000).toFixed(2).replace(/0$/,"")+" billion":m>=1?(m>=10?Math.round(m):m.toFixed(1))+" million":m>=0.01?Math.round(m*1000).toLocaleString("en-US")+" thousand":Math.round(m*1e6).toLocaleString("en-US");

/* ---------- state ---------- */
const S={feats:[],byId:{},rot:[-20,-20,0],scale:1,sel:null,cont:null,hover:null,spin:true,ready:false,err:null,src:""};
let canvas,ctx,proj,path,W=0,H=0,R=0,dpr=1,anim=null,lastInteract=0,grat;

/* ---------- data loading ---------- */
function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.async=true;s.onload=()=>ok();s.onerror=()=>no(new Error("load "+src));document.head.appendChild(s);setTimeout(()=>no(new Error("timeout "+src)),15000);});}
async function ensureD3(){if(window.d3&&d3.geoOrthographic)return;for(const u of ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js","https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js","https://unpkg.com/d3@7.9.0/dist/d3.min.js"]){try{await loadScript(u);if(window.d3&&d3.geoOrthographic)return;}catch(e){}}throw new Error("Could not load the globe library");}
/* tiny TopoJSON decoder (feature collection from a GeometryCollection) */
function topoFeatures(topo,obj){const tf=topo.transform;const arcs=topo.arcs.map(a=>{let x=0,y=0;return a.map(p=>{if(tf){x+=p[0];y+=p[1];return [x*tf.scale[0]+tf.translate[0],y*tf.scale[1]+tf.translate[1]];}return [p[0],p[1]];});});
  const arc=i=>i<0?arcs[~i].slice().reverse():arcs[i];
  const ring=ids=>{const out=[];ids.forEach((i,k)=>{const a=arc(i);out.push(...(k?a.slice(1):a));});return out;};
  const geom=g=>g.type==="Polygon"?{type:"Polygon",coordinates:g.arcs.map(ring)}:g.type==="MultiPolygon"?{type:"MultiPolygon",coordinates:g.arcs.map(p=>p.map(ring))}:null;
  return obj.geometries.map(g=>({type:"Feature",id:g.id,properties:g.properties||{},geometry:geom(g)})).filter(f=>f.geometry);}
function withTimeout(p,ms){return Promise.race([p,new Promise((_,no)=>setTimeout(()=>no(new Error("timeout")),ms))]);}
const SOURCES=[
 {name:"Natural Earth (world-atlas)",load:async()=>{const m=await withTimeout(import("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json",{with:{type:"json"}}),15000);const t=m.default;return topoFeatures(t,t.objects.countries);}},
 {name:"Natural Earth (world-atlas, unpkg)",load:async()=>{const m=await withTimeout(import("https://unpkg.com/world-atlas@2.0.2/countries-110m.json",{with:{type:"json"}}),15000);const t=m.default;return topoFeatures(t,t.objects.countries);}},
 {name:"Natural Earth (world-atlas ESM)",load:async()=>{const m=await withTimeout(import("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json/+esm"),15000);const t=m.default;return topoFeatures(t,t.objects.countries);}},
 {name:"Natural Earth (datamaps)",load:async()=>{await loadScript("https://cdn.jsdelivr.net/npm/datamaps@0.5.9/dist/datamaps.world.min.js");const D=window.Datamap||window.Datamaps;const t=D&&D.prototype.worldTopo;if(!t)throw new Error("no topo");return topoFeatures(t,t.objects.world);}}
];
function rewind(f){/* d3 needs clockwise exteriors: flip any ring set that would cover more than a hemisphere */
  const fix=poly=>{const a=d3.geoArea({type:"Polygon",coordinates:poly});return a>2*Math.PI?poly.map(r=>r.slice().reverse()):poly;};
  const g=f.geometry;if(g.type==="Polygon")g.coordinates=fix(g.coordinates);else g.coordinates=g.coordinates.map(fix);return f;}
function resolveId(f){const id=f.id!=null?String(f.id):"";const nm=f.properties&&(f.properties.name||f.properties.NAME)||"";
  if(/^[A-Z]{3}$/.test(id)&&DATA[id])return id;if(/^\d+$/.test(id)&&BY_NUM[String(+id)])return BY_NUM[String(+id)];if(/^[A-Z]{2}$/.test(id)&&BY_A2[id])return BY_A2[id];
  const k=BY_NAME[norm(nm)];return k||null;}
async function loadWorld(){await ensureD3();let lastErr;
  for(const s of SOURCES){try{const fs=await s.load();if(fs&&fs.length>=(window.WORLD_MINF||50)){S.src=s.name;return fs;}console.warn("[world] too few features from",s.name,fs&&fs.length);}catch(e){lastErr=e;console.warn("[world]",s.name,e&&e.message);}}
  throw lastErr||new Error("No map source reachable");}

/* ---------- rendering ---------- */
function contColor(d){return d?CONT[d.cont]&&CONT[d.cont].c:"#7d8796";}
function size(){const box=canvas.parentElement;W=box.clientWidth;H=Math.max(320,Math.min(box.clientWidth,620));dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+"px";canvas.style.height=H+"px";R=Math.min(W,H)/2-18;if(proj){proj.translate([W/2,H/2]).scale(R*S.scale);}draw();}
function draw(){if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const r=R*S.scale,cx=W/2,cy=H/2;
  // atmosphere glow
  const glow=ctx.createRadialGradient(cx,cy,r*0.92,cx,cy,r*1.12);glow.addColorStop(0,"rgba(90,160,255,.35)");glow.addColorStop(1,"rgba(90,160,255,0)");ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,r*1.12,0,7);ctx.fill();
  // ocean
  const oc=ctx.createRadialGradient(cx-r*.35,cy-r*.4,r*.1,cx,cy,r);oc.addColorStop(0,"#2f6fb6");oc.addColorStop(.6,"#174a85");oc.addColorStop(1,"#0b2547");ctx.fillStyle=oc;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
  if(!S.ready||!window.d3){return;}
  proj.rotate(S.rot).scale(r).translate([cx,cy]);
  ctx.beginPath();path(grat);ctx.strokeStyle="rgba(255,255,255,.08)";ctx.lineWidth=.6;ctx.stroke();
  for(const f of S.feats){const d=f._d;const inCont=!S.cont||(d&&d.cont===S.cont);
    let col=contColor(d);ctx.globalAlpha=inCont?1:.35;
    if(S.sel&&f._id===S.sel){col="#ffe066";ctx.globalAlpha=1;}
    else if(S.hover===f&&!(S.sel&&f._id===S.sel)){ctx.globalAlpha=1;col=shade(col,.25);}
    ctx.beginPath();path(f);ctx.fillStyle=col;ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle="rgba(10,20,35,.55)";ctx.lineWidth=.5;ctx.stroke();}
  if(S.sel){const fs=S.feats.filter(f=>f._id===S.sel);for(const f of fs){ctx.beginPath();path(f);ctx.strokeStyle="#fff";ctx.lineWidth=1.6;ctx.stroke();}
    const c=fs[0]&&labelPoint(fs);if(c){const p=proj(c);if(p&&visible(c)){const d=DATA[S.sel];const txt=d?d.name:"";ctx.font="600 13px system-ui,sans-serif";const w=ctx.measureText(txt).width;ctx.fillStyle="rgba(10,16,28,.85)";ctx.beginPath();ctx.roundRect?ctx.roundRect(p[0]-w/2-7,p[1]-30,w+14,22,6):ctx.rect(p[0]-w/2-7,p[1]-30,w+14,22);ctx.fill();ctx.fillStyle="#fff";ctx.textAlign="center";ctx.fillText(txt,p[0],p[1]-14);ctx.beginPath();ctx.arc(p[0],p[1],3,0,7);ctx.fill();}}}
  // lighting: soft specular + edge shadow for a 3D feel
  const sh=ctx.createRadialGradient(cx-r*.4,cy-r*.45,0,cx,cy,r);sh.addColorStop(0,"rgba(255,255,255,.18)");sh.addColorStop(.45,"rgba(255,255,255,0)");sh.addColorStop(.85,"rgba(0,0,0,.12)");sh.addColorStop(1,"rgba(0,0,0,.45)");ctx.fillStyle=sh;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();}
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*amt);g=Math.round(g+(255-g)*amt);b=Math.round(b+(255-b)*amt);return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
function visible(ll){const r=proj.rotate();return d3.geoDistance(ll,[-r[0],-r[1]])<Math.PI/2;}
function labelPoint(fs){let best=null,ba=-1;for(const f of fs){const g=f.geometry;const polys=g.type==="Polygon"?[g.coordinates]:g.coordinates;for(const p of polys){const a=d3.geoArea({type:"Polygon",coordinates:p});if(a>ba){ba=a;best=p;}}}return best?d3.geoCentroid({type:"Polygon",coordinates:best}):null;}
function featAt(x,y){const ll=proj.invert([x,y]);if(!ll||!visible(ll))return null;for(const f of S.feats){if(d3.geoContains(f,ll))return f;}return null;}
function flyTo(ll,zoom){if(!ll)return;const from=S.rot.slice(),to=[-ll[0],-ll[1],0];const z0=S.scale,z1=zoom||S.scale;
  let dl=to[0]-from[0];while(dl>180)dl-=360;while(dl<-180)dl+=360;to[0]=from[0]+dl;
  const t0=performance.now(),dur=900;cancelAnimationFrame(anim);S.spin=false;syncSpin();
  const step=t=>{let k=Math.min(1,(t-t0)/dur);k=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;S.rot=[from[0]+(to[0]-from[0])*k,from[1]+(to[1]-from[1])*k,0];S.scale=z0+(z1-z0)*k;draw();if(k<1)anim=requestAnimationFrame(step);};anim=requestAnimationFrame(step);}
function spinLoop(){let last=performance.now();const tick=t=>{const dt=t-last;last=t;if(S.spin&&S.ready&&!document.hidden&&isOn()&&t-lastInteract>1500){S.rot[0]+=dt*0.006;draw();}requestAnimationFrame(tick);};requestAnimationFrame(tick);}
function isOn(){const sec=document.getElementById("t-world");return sec&&sec.classList.contains("on");}
function syncSpin(){const b=$("#wSpin");if(b){b.textContent=S.spin?"Pause spin":"Auto-spin";b.setAttribute("aria-pressed",S.spin);}}

/* ---------- interaction ---------- */
function wireGlobe(){let drag=null,moved=false;const pts=new Map();let pinch0=null;
  canvas.addEventListener("pointerdown",e=>{canvas.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.offsetX,e.offsetY]);if(pts.size===2){const [a,b]=[...pts.values()];pinch0={d:Math.hypot(a[0]-b[0],a[1]-b[1]),s:S.scale};}
    drag={x:e.offsetX,y:e.offsetY,rot:S.rot.slice()};moved=false;lastInteract=performance.now();cancelAnimationFrame(anim);});
  canvas.addEventListener("pointermove",e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,[e.offsetX,e.offsetY]);
    if(pinch0&&pts.size===2){const [a,b]=[...pts.values()];S.scale=Math.max(.8,Math.min(8,pinch0.s*Math.hypot(a[0]-b[0],a[1]-b[1])/pinch0.d));draw();moved=true;return;}
    if(drag){const dx=e.offsetX-drag.x,dy=e.offsetY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;const k=75/(R*S.scale);S.rot=[drag.rot[0]+dx*k,Math.max(-89,Math.min(89,drag.rot[1]-dy*k)),0];lastInteract=performance.now();draw();return;}
    if(!S.ready)return;const f=featAt(e.offsetX,e.offsetY);if(f!==S.hover){S.hover=f;canvas.style.cursor=f?"pointer":"grab";draw();const tip=$("#wTip");if(f){const d=f._d;tip.textContent=d?d.name:(f.properties.name||"");tip.hidden=false;}else tip.hidden=true;}
    const tip=$("#wTip");if(!tip.hidden){tip.style.left=(e.offsetX+14)+"px";tip.style.top=(e.offsetY+10)+"px";}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch0=null;if(drag&&!moved&&S.ready){const f=featAt(e.offsetX,e.offsetY);if(f&&f._id)selectCountry(f._id,false);}drag=null;lastInteract=performance.now();};
  canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",e=>{pts.delete(e.pointerId);drag=null;pinch0=null;});
  canvas.addEventListener("pointerleave",()=>{S.hover=null;$("#wTip").hidden=true;draw();});
  canvas.addEventListener("wheel",e=>{e.preventDefault();S.scale=Math.max(.8,Math.min(8,S.scale*Math.exp(-e.deltaY*0.0015)));lastInteract=performance.now();draw();},{passive:false});
  canvas.addEventListener("keydown",e=>{const k={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-8],ArrowDown:[0,8]}[e.key];if(k){e.preventDefault();S.rot=[S.rot[0]-k[0],Math.max(-89,Math.min(89,S.rot[1]-k[1])),0];draw();}if(e.key==="+"||e.key==="=")zoom(1.3);if(e.key==="-")zoom(1/1.3);});
  new ResizeObserver(()=>size()).observe(canvas.parentElement);}
function zoom(f){S.scale=Math.max(.8,Math.min(8,S.scale*f));lastInteract=performance.now();draw();}

/* ---------- panel ---------- */
function stat(l,v){return `<div class="wst"><span>${esc(l)}</span><b>${v}</b></div>`;}
function countriesIn(c){return Object.values(DATA).filter(d=>d.cont===c).sort((a,b)=>a.name.localeCompare(b.name));}
function renderPanel(){const el=$("#wPanel");if(!el)return;
  if(S.sel&&DATA[S.sel]){const d=DATA[S.sel],C=CONT[d.cont];const dens=d.area>1&&d.pop>0?d.pop*1e6/d.area:null;const list=countriesIn(d.cont);const i=list.findIndex(x=>x.id===d.id);
    el.innerHTML=`<div class="wcrumb"><button class="wlink" data-cont="">World</button> › <button class="wlink" data-cont="${d.cont}">${esc(C.n)}</button></div>
    <div class="whd"><span class="wflag">${flag(d.iso2)}</span><div><h3>${esc(d.name)}</h3><div class="small muted">${esc(C.n)}${S.featIds&&!S.featIds.has(d.id)?" · too small to outline on this map":""}</div></div></div>
    <div class="wstats">${stat("Capital",esc(d.cap))}${stat("Population",d.pop?esc(fmtPop(d.pop)):"—")}${stat("Area",esc(fmtN(d.area))+" km²")}${stat("Density",dens!=null?esc(fmtN(dens))+" / km²":"—")}${stat("Languages",esc(d.lang))}${stat("Currency",esc(d.cur))}</div>
    <h4>Geography</h4><p>${esc(d.geo)}</p><h4>History</h4><p>${esc(d.hist)}</p>
    <div class="wnav"><button class="btn sm" data-go="${list[(i-1+list.length)%list.length].id}">‹ ${esc(list[(i-1+list.length)%list.length].name)}</button><button class="btn sm" data-go="${list[(i+1)%list.length].id}">${esc(list[(i+1)%list.length].name)} ›</button></div>
    <div class="small dim" style="margin-top:8px">Population figures are rounded estimates (about 2024).</div>`;}
  else if(S.cont){const C=CONT[S.cont];const list=countriesIn(S.cont);
    el.innerHTML=`<div class="wcrumb"><button class="wlink" data-cont="">World</button> › ${esc(C.n)}</div>
    <h3 style="color:${C.c}">${esc(C.n)}</h3>
    <div class="wstats">${stat("Area",esc(fmtN(C.area))+" km²")}${stat("Population",esc(C.pop))}${stat("Countries & territories listed",list.length)}${stat("Largest country",esc(C.big))}${stat("Highest point",esc(C.hi))}${stat("Lowest point",esc(C.lo))}${stat("Longest river",esc(C.river))}</div>
    <h4>Geography</h4><p>${esc(C.geo)}</p><h4>History</h4><p>${esc(C.hist)}</p>
    <h4>Countries</h4><div class="wlist">${list.map(d=>`<button data-go="${d.id}"><span>${flag(d.iso2)}</span>${esc(d.name)}</button>`).join("")}</div>`;}
  else{el.innerHTML=`<h3>Explore the world</h3><p class="muted">Drag to spin the globe, scroll or pinch to zoom, and click any country. Or pick a continent:</p>
    <div class="wconts">${Object.entries(CONT).map(([k,C])=>`<button data-cont="${k}" style="--c:${C.c}"><b>${esc(C.n)}</b><span>${countriesIn(k).length} listed · ${esc(fmtN(C.area/1e6))}M km²</span></button>`).join("")}</div>
    <h4>World at a glance</h4><div class="wstats">${stat("Population","about 8.2 billion")}${stat("Land area","about 149 million km² (29% of Earth)")}${stat("Highest point","Mount Everest, 8,849 m")}${stat("Deepest point","Challenger Deep, about 10,935 m")}${stat("Largest country","Russia")}${stat("Smallest country","Vatican City")}</div>`;}
  el.scrollTop=0;}
function selectCont(c,fly){S.cont=c||null;S.sel=null;renderPanel();chips();if(c&&fly!==false)flyTo(CONT[c].ctr,c==="AN"?1.6:c==="EU"?2.2:c==="OC"?1.5:1.25);if(!c&&fly!==false)flyTo([-S.rot[0],15],1);draw();}
function selectCountry(id,fromList){const d=DATA[id];if(!d)return;S.sel=id;S.cont=d.cont;renderPanel();chips();
  const fs=S.feats.filter(f=>f._id===id);if(fs.length){const c=labelPoint(fs);const b=d3.geoBounds({type:"FeatureCollection",features:fs});const span=Math.max(Math.abs(b[1][0]-b[0][0])%360||0,Math.abs(b[1][1]-b[0][1]));const z=span>60?1.3:span>25?2:span>10?3:span>4?4.5:6;flyTo(c,Math.min(z,fromList?6:Math.max(S.scale,z)));}
  draw();}
function chips(){const el=$("#wChips");if(!el)return;el.innerHTML=`<button data-cont="" class="${!S.cont?"on":""}">World</button>`+Object.entries(CONT).map(([k,C])=>`<button data-cont="${k}" class="${S.cont===k?"on":""}" style="--c:${C.c}"><i></i>${esc(C.n)}</button>`).join("");}

/* ---------- search ---------- */
function wireSearch(){const inp=$("#wSearch"),box=$("#wSug");const all=Object.values(DATA).sort((a,b)=>a.name.localeCompare(b.name));
  const show=()=>{const q=norm(inp.value);if(!q){box.hidden=true;return;}const hits=all.filter(d=>norm(d.name).includes(q)||norm(d.cap).includes(q)).slice(0,8);
    box.innerHTML=hits.length?hits.map(d=>`<button data-go="${d.id}"><span>${flag(d.iso2)}</span>${esc(d.name)}<small>${esc(d.cap.split(" (")[0])}</small></button>`).join(""):`<div class="small muted" style="padding:8px 10px">No match</div>`;box.hidden=false;};
  inp.addEventListener("input",show);inp.addEventListener("focus",show);
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"){const b=box.querySelector("[data-go]");if(b){b.click();}}if(e.key==="Escape"){box.hidden=true;inp.blur();}});
  document.addEventListener("click",e=>{if(!e.target.closest(".wsearch"))box.hidden=true;});}

/* ---------- timeline & quiz ---------- */
let tlF="";
function renderTimeline(){const el=$("#wTimeline");if(!el)return;
  $("#wTlF").innerHTML=`<button data-tl="" class="${!tlF?"on":""}">All</button>`+Object.entries(CONT).filter(([k])=>k!=="AN").map(([k,C])=>`<button data-tl="${k}" class="${tlF===k?"on":""}">${esc(C.n)}</button>`).join("");
  el.innerHTML=TIMELINE.filter(t=>!tlF||t[1]===tlF).map(t=>`<div class="wtl" style="--c:${CONT[t[1]].c}"><div class="when">${esc(t[0])}</div><div><b>${esc(t[2])}</b><span class="tag" style="margin-left:6px">${esc(CONT[t[1]].n)}</span><p>${esc(t[3])}</p></div></div>`).join("");}
function buildQuiz(){const all=Object.values(DATA).filter(d=>d.cont!=="AN"&&d.pop>=0.05);const pick=(arr,n,ex)=>{const out=[];const pool=arr.filter(x=>!ex||!ex.includes(x));while(out.length<n&&pool.length){out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);}return out;};
  const Q=[];const cap=d=>d.cap.split(" (")[0];
  for(const d of all){const others=pick(all.filter(x=>x.cont===d.cont&&x!==d),3);if(others.length<3)continue;
    Q.push([`What is the capital of ${d.name}?`,[cap(d),...others.map(cap)],0,`${cap(d)} is the capital of ${d.name}.`]);}
  for(let i=0;i<80;i++){const s=pick(all,4);const big=s.slice().sort((a,b)=>b.area-a.area)[0];Q.push(["Which of these countries is largest by area?",s.map(x=>x.name).sort((a,b)=>a===big.name?-1:b===big.name?1:0),0,`${big.name} covers about ${fmtN(big.area)} km².`]);}
  for(let i=0;i<80;i++){const s=pick(all,4);const big=s.slice().sort((a,b)=>b.pop-a.pop)[0];Q.push(["Which of these countries has the most people?",s.map(x=>x.name).sort((a,b)=>a===big.name?-1:b===big.name?1:0),0,`${big.name} has about ${fmtPop(big.pop)} people.`]);}
  const conts=Object.keys(CONT).filter(k=>k!=="AN");
  for(const d of pick(all,60)){const opts=[d.cont,...pick(conts.filter(k=>k!==d.cont),3)];Q.push([`${d.name} is in which continent?`,opts.map(k=>CONT[k].n),0,`${d.name} is in ${CONT[d.cont].n}.`]);}
  return Q;}

/* ---------- init ---------- */
async function init(){canvas=$("#wGlobe");if(!canvas)return;ctx=canvas.getContext("2d");chips();renderPanel();renderTimeline();wireSearch();
  document.getElementById("t-world").addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g&&g.closest("#t-world")&&g.dataset.go&&DATA[g.dataset.go]){e.preventDefault();$("#wSug").hidden=true;$("#wSearch").value="";selectCountry(g.dataset.go,true);return;}
    const c=e.target.closest("[data-cont]");if(c&&c.closest("#t-world")){selectCont(c.dataset.cont);return;}
    const t=e.target.closest("[data-tl]");if(t){tlF=t.dataset.tl;renderTimeline();}});
  $("#wZin").onclick=()=>zoom(1.35);$("#wZout").onclick=()=>zoom(1/1.35);$("#wReset").onclick=()=>{S.sel=null;S.cont=null;renderPanel();chips();flyTo([20,15],1);};
  $("#wSpin").onclick=()=>{S.spin=!S.spin;syncSpin();lastInteract=0;};syncSpin();
  const st=$("#wStatus");st.hidden=false;st.textContent="Loading the globe…";size();
  try{const feats=await loadWorld();proj=d3.geoOrthographic().clipAngle(90).precision(.4);path=d3.geoPath(proj,ctx);grat=d3.geoGraticule10();
    S.feats=feats.map(rewind).map(f=>{f._id=resolveId(f);f._d=f._id?DATA[f._id]:null;return f;});S.featIds=new Set(S.feats.map(f=>f._id).filter(Boolean));S.ready=true;st.hidden=true;size();spinLoop();
    $("#wSrc").textContent="Borders: "+S.src+" (public domain) · 1:110m scale, so the smallest islands aren't outlined.";}
  catch(e){S.err=e;st.hidden=false;st.innerHTML=`The 3D map couldn't load (${esc(e.message)}). You can still explore every continent and country from the panel.`;}}
window.WORLD={init,select:selectCountry,cont:selectCont,quiz:buildQuiz,data:DATA,CONT};
})();
