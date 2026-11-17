/* =========================================================
   SABER 3D VIEWER: raw WebGL, no external libraries.
   Hilts are ORIGINAL study designs (not screen-prop replicas),
   built around each character's real blade facts.
   ========================================================= */
(function(){
"use strict";
const D=()=>window.SWDATA||{};
const LORE={
 "Luke Skywalker":{crystal:"Green kyber crystal (his own saber).",notes:"",fate:"He still carries it years later in The Mandalorian and The Book of Boba Fett."},
 "Anakin Skywalker":{crystal:"Blue kyber crystal.",notes:"This is the saber he carried through the end of the Clone Wars and into Revenge of the Sith.",fate:"Obi-Wan kept it and gave it to Luke. Maz Kanata later recovered it, it split in two in The Last Jedi, Rey repaired it, and she buried it on Tatooine in The Rise of Skywalker."},
 "Darth Vader":{crystal:"A \"bled\" kyber crystal: a Sith pours the dark side into a captured crystal until it turns red. Marvel's Darth Vader comics show him taking his from a Jedi he defeated.",notes:"Red blades in canon come from bleeding, not from a natural red crystal.",fate:"He wields it from the original trilogy through Obi-Wan Kenobi and Rogue One's famous hallway scene."},
 "Obi-Wan Kenobi":{crystal:"Blue kyber crystal.",notes:"A master of Form III (Soresu), the most defensive lightsaber form.",fate:"His saber fell to the deck when he became one with the Force aboard the Death Star."},
 "Yoda":{crystal:"Green kyber crystal.",notes:"A shorter hilt and blade suit his size. He used it against Count Dooku on Geonosis and Darth Sidious in the Senate.",fate:"After Revenge of the Sith he set it aside in exile on Dagobah."},
 "Mace Windu":{crystal:"Purple kyber crystal.",notes:"Samuel L. Jackson asked for a purple blade so he could spot himself in big battle scenes. Windu created the Vaapad style, a variant of Form VII.",fate:"Lost with him when he fell from the Chancellor's office in Revenge of the Sith."},
 "Qui-Gon Jinn":{crystal:"Green kyber crystal.",notes:"A practitioner of Form IV (Ataru).",fate:"After Maul struck him down on Naboo, Obi-Wan called Qui-Gon's saber to his hand to win the duel."},
 "Darth Maul":{crystal:"Two bled kyber crystals, one for each blade.",notes:"A double-bladed saberstaff, with an emitter at each end of one long hilt.",fate:"Obi-Wan cut the staff in half on Naboo. Maul later used rebuilt sabers in The Clone Wars and Rebels."},
 "Count Dooku":{crystal:"A bled red kyber crystal.",notes:"Form II (Makashi) is built on precise, one-handed footwork and blade control, and the curved hilt angles the blade for exactly that.",fate:"Anakin defeated him aboard the Invisible Hand in Revenge of the Sith."},
 "Darth Sidious":{crystal:"Bled red kyber crystals.",notes:"He kept his sabers hidden for decades, drawing them only against Mace Windu and the Jedi in his office, and Yoda in the Senate.",fate:"Rarely seen again after Revenge of the Sith."},
 "Kylo Ren":{crystal:"A cracked kyber crystal, so the blade crackles and spits.",notes:"",fate:"Ben Solo tossed it into the sea on Kef Bir in The Rise of Skywalker."},
 "Rey":{crystal:"Yellow kyber crystal.",notes:"Built from parts of her old Jakku quarterstaff.",fate:"She ignites it for the first time on Tatooine at the end of The Rise of Skywalker."},
 "Leia Organa":{crystal:"Blue kyber crystal.",notes:"Built during her Jedi training with Luke before she chose a different path.",fate:"Rey buried it on Tatooine beside the Skywalker saber."},
 "Ahsoka Tano":{crystal:"Two purified kyber crystals. She took them from an Inquisitor and cleansed them until they glowed white (the Ahsoka novel).",notes:"She fights with a reverse grip and twin sabers. This viewer shows one of the pair.",fate:"Still her weapons in Ahsoka (2023)."},
 "Asajj Ventress":{crystal:"Bled red kyber crystals.",notes:"Her two curved sabers could link at the pommels into one double-bladed weapon. This viewer shows one.",fate:"She lost them during The Clone Wars."},
 "Kanan Jarrus":{crystal:"Blue kyber crystal.",notes:"He kept his saber hidden for years after surviving Order 66.",fate:"He fell protecting the crew on Lothal in Rebels."},
 "Ezra Bridger":{crystal:"Blue, then green kyber crystals.",notes:"His first saber doubled as a stun blaster. His green crystal came from a vision on Lothal.",fate:"Maul destroyed the first saber on Malachor, and Ezra built the green one after."},
 "Baylan Skoll":{crystal:"Kyber crystal with an orange-red blade.",notes:"A Jedi who survived Order 66 and now works as a mercenary.",fate:"Introduced in Ahsoka (2023)."},
 "Shin Hati":{crystal:"Kyber crystal with an orange blade.",notes:"Baylan's apprentice. Her blade matches her master's.",fate:"Introduced in Ahsoka (2023)."},
 "Din Djarin (Darksaber)":{crystal:"A unique kyber crystal that makes a flat black blade with a white glowing edge.",notes:"Tarre Vizsla was the first Mandalorian ever inducted into the Jedi Order. In Mandalorian culture, whoever wins it in combat can claim to lead.",fate:"Passed from Din Djarin to Bo-Katan in The Mandalorian."},
 "General Grievous":{crystal:"Crystals taken from fallen Jedi.",notes:"He kept the sabers of Jedi he killed as trophies and could spin four at once.",fate:"Obi-Wan defeated him on Utapau in Revenge of the Sith."},
 "Cal Kestis":{crystal:"Kyber crystal from Ilum.",notes:"The hilt began as his master Jaro Tapal's saber. Cal rebuilt it with a new crystal in Jedi: Fallen Order, and it can split into a double-bladed stance.",fate:"He customizes it further in Jedi: Survivor."}
};
const INFO={
 emitter:["Blade emitter","Where the blade comes out. The emitter shroud guards the opening and shields the delicate parts behind it. Its outer shape is entirely the builder's choice."],
 emitter2:["Second emitter","A double-bladed hilt has a full second blade assembly at the other end: emitter, focusing lens and crystal."],
 matrix:["Emitter matrix","Shapes the focused energy into a blade and sets its length. The energy loops out and arcs back into the hilt, so a blade stops at a fixed length. Installing it backwards was said to make a saber short out or backfire."],
 lens:["Focusing lens","Sits between the crystal and the emitter and narrows the crystal's output into a tight, stable beam. Builders swap lenses to change how a blade feels."],
 crystal:["Kyber crystal","The heart of the saber. This Force-attuned crystal focuses the power cell's energy and gives the blade its color. Jedi younglings traditionally gathered theirs on Ilum."],
 conduit:["Power conduit & field energizer","Carries energy from the power cell up to the crystal chamber and energizes the containment field that holds the blade together."],
 cell:["Power cell","The energy source. Saber power cells are so efficient that the looping blade recycles most of its energy, so they rarely need recharging."],
 sw:["Control section","Houses the activation matrix, the circuitry between the controls and the power cell. Some hilts add a blade-length or intensity dial here."],
 stud:["Activation stud","The on/off control. Some duelists rig it as a dead-man's switch so the blade shuts off when the saber leaves their hand."],
 grip:["Handgrip","Where the wielder holds the saber. Ridges, wraps or grooves keep a secure grip through spins and blade locks. The grip also encloses the power cell."],
 pommel:["Pommel cap","Seals the bottom of the hilt, balances the weight and usually opens to reach the power cell. Some pommels carry a belt clip or recharge socket."],
 quillons:["Crossguard quillons","Side vents that project two short secondary blades. They bleed off excess energy and guard the hand."],
 blade:["Plasma blade","A loop of energy projected from the emitter and pulled back into the hilt by the containment field. The blade itself has almost no weight, which is why lightsaber combat takes so much skill."]
};
const BUILD=["grip","cell","conduit","crystal","lens","matrix","sw","stud","emitter","emitter2","quillons","pommel"];
const HFIN=["Chrome","Black","Gunmetal","Titanium","Brass","Bronze","White","Carbon","Copper"];

/* ---------- math ---------- */
const M4={
 id:()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 mul(a,b){const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s;}return o;},
 tr:(x,y,z)=>[1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1],
 sc:(x,y,z)=>[x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1],
 rz(t){const c=Math.cos(t),s=Math.sin(t);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1];},
 ry(t){const c=Math.cos(t),s=Math.sin(t);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1];},
 persp(f,a,n,fa){const t=1/Math.tan(f/2);return[t/a,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0];},
 look(e,c,u){const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],nm=a=>{const l=Math.hypot(...a)||1;return a.map(v=>v/l)},dt=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const z=nm(sub(e,c)),x=nm(cr(u,z)),y=cr(z,x);return[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dt(x,e),-dt(y,e),-dt(z,e),1];},
 ap(m,p,w=1){return[m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12]*w,m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13]*w,m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]*w,m[3]*p[0]+m[7]*p[1]+m[11]*p[2]+m[15]*w];}
};

/* ---------- geometry ---------- */
function G(){return{pos:[],nor:[]};}
function close(p){p=p.slice();if(p[0][1]>0)p.unshift([p[0][0],0]);if(p[p.length-1][1]>0)p.push([p[p.length-1][0],0]);return p;}
function lathe(prof,seg,flat){const g=G();seg=seg||48;
 for(let i=0;i<prof.length-1;i++){const[y0,r0]=prof[i],[y1,r1]=prof[i+1];const dy=y1-y0,dr=r1-r0,L=Math.hypot(dy,dr);if(L<1e-6)continue;const nr=dy/L,ny=-dr/L;
  for(let j=0;j<seg;j++){const a0=j/seg*6.2832,a1=(j+1)/seg*6.2832;const P=(r,y,a)=>[r*Math.cos(a),y,r*Math.sin(a)],N=a=>[nr*Math.cos(a),ny,nr*Math.sin(a)];
   let n0=N(a0),n1=N(a1);if(flat){n0=n1=N((a0+a1)/2);}
   g.pos.push(...P(r0,y0,a0),...P(r1,y1,a0),...P(r1,y1,a1),...P(r0,y0,a0),...P(r1,y1,a1),...P(r0,y0,a1));
   g.nor.push(...n0,...n0,...n1,...n0,...n1,...n1);}}
 return g;}
function box(w,h,d){const g=G(),x=w/2,y=h/2,z=d/2;
 const F=[[[1,0,0],[[x,-y,-z],[x,y,-z],[x,y,z],[x,-y,z]]],[[-1,0,0],[[-x,-y,z],[-x,y,z],[-x,y,-z],[-x,-y,-z]]],[[0,1,0],[[-x,y,-z],[-x,y,z],[x,y,z],[x,y,-z]]],[[0,-1,0],[[-x,-y,z],[-x,-y,-z],[x,-y,-z],[x,-y,z]]],[[0,0,1],[[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z]]],[[0,0,-1],[[x,-y,-z],[-x,-y,-z],[-x,y,-z],[x,y,-z]]]];
 F.forEach(([n,q])=>{[0,1,2,0,2,3].forEach(i=>{g.pos.push(...q[i]);g.nor.push(...n);});});return g;}
function add(dst,src,m){m=m||M4.id();for(let i=0;i<src.pos.length;i+=3){const p=M4.ap(m,src.pos.slice(i,i+3)),n=M4.ap(m,src.nor.slice(i,i+3),0);dst.pos.push(p[0],p[1],p[2]);dst.nor.push(n[0],n[1],n[2]);}return dst;}
// place a [t,r] profile over y0..y0+L (flip turns it upside down)
function seg(prof,y0,L,flip,segs,flat){let p=prof.map(([t,r])=>[flip?1-t:t,r]);if(flip)p.reverse();p=close(p.map(([t,r])=>[y0+t*L,r]));return lathe(p,segs,flat);}

/* ---------- original part library ---------- */
const R0=.19;
const POMMEL=[
 [[0,.10],[.12,.16],[.35,.19],[1,.19]],
 [[0,.2],[.25,.2],[.25,.17],[.45,.17],[.45,.205],[.72,.205],[.72,.18],[1,.18]],
 [[0,.14],[.35,.2],[.7,.2],[1,.185]],
 [[0,.235],[.3,.235],[.36,.2],[.62,.2],[.62,.215],[.74,.215],[.8,.185],[1,.185]]
];
function gripProf(v){const p=[];
 if(v===0){for(let i=0;i<=11;i++){const t=i/11;p.push([t,R0],[Math.min(1,t+.03),R0+.022],[Math.min(1,t+.06),R0+.022],[Math.min(1,t+.09),R0]);}p.length=p.length-3;}
 else if(v===1){p.push([0,R0],[.08,R0],[.08,R0+.02],[.14,R0+.02],[.14,R0],[.86,R0],[.86,R0+.02],[.92,R0+.02],[.92,R0],[1,R0]);}
 else if(v===2){for(let i=0;i<=40;i++){const t=i/40;p.push([t,R0+.012*(1+Math.sin(i*Math.PI))]);}}
 else{for(let i=0;i<=7;i++){const t=i/7;p.push([t,R0+.01]);if(i<7)p.push([t+.06,R0+.01],[t+.065,R0-.03],[t+.08,R0-.03],[t+.085,R0+.01]);}}
 return p;}
const EMIT=[
 [[0,.2],[.4,.2],[.62,.24],[1,.27],[1,.22],[.85,.22],[.85,.1]],
 [[0,.205],[.3,.205],[.3,.24],[1,.24],[1,.2],[.9,.2],[.9,.1]],
 [[0,.2],[.15,.23],[.25,.23],[.25,.205],[1,.205],[1,.17],[.9,.17],[.9,.1]],
 [[0,.205],[.45,.205],[1,.165],[1,.12],[.9,.12],[.9,.06]]
];
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function cfgOf(a){const s=a.style.toLowerCase();if(a.blades[0]==="Black")return"dark";if(s.includes("double")||s.includes("or double"))return"double";if(s.includes("crossguard"))return"cross";if(s.includes("shoto"))return"shoto";if(s.includes("curved"))return"curved";return"single";}

function buildHilt(a){
 const h=hash(a.n),pick=(k,n)=>(h>>>k)%n,cfg=cfgOf(a);
 const pv=pick(1,POMMEL.length),gv=pick(5,4),ev=pick(9,EMIT.length);
 const FIN=D().FIN,BLADES=D().BLADES;const fin=FIN[HFIN[pick(13,HFIN.length)]],fin2=FIN[["Black","Gunmetal","Carbon","Chrome"][pick(17,4)]];
 const blade=a.blades[0]==="Black"?"Black":((a.try&&a.try.blade)||a.blades[0]);
 const col=blade==="Black"?"#000000":BLADES[blade];
 const k=cfg==="shoto"?.72:1;
 const parts=[],P=(id,o)=>{const p=Object.assign({id,name:INFO[id][0],info:INFO[id][1],geo:G(),metal:.85,emis:0,alpha:1,kind:"shell",e:0},o);parts.push(p);return p;};
 const hexC=x=>[parseInt(x.slice(1,3),16)/255,parseInt(x.slice(3,5),16)/255,parseInt(x.slice(5,7),16)/255];
 const mc=hexC(fin[2]),gc=gv===2?hexC(fin2[1]):hexC(fin[2]),dc=hexC(fin2[2]);
 let y=0;const lay={};
 if(cfg==="double"){
  lay.em2=[y,.65];y+=.65;lay.grip=[y,1.55];y+=1.55;lay.sw=[y,.5];y+=.5;lay.em=[y,.65];y+=.65;
 }else{
  lay.pom=[y,.38*k];y+=.38*k;lay.grip=[y,1.15*k];y+=1.15*k;lay.sw=[y,.55*k];y+=.55*k;lay.em=[y,.72*k];y+=.72*k;
 }
 const top=y,len=y;
 let bend=M4.id();
 if(cfg==="curved"){const py=lay.sw[0];bend=M4.mul(M4.tr(0,py,0),M4.mul(M4.rz(.26),M4.tr(0,-py,0)));}
 // shell
 const grip=P("grip",{color:gc,metal:gv===2?.2:.8});add(grip.geo,seg(gripProf(gv),lay.grip[0],lay.grip[1]),bend);
 if(lay.pom){const pm=P("pommel",{color:mc});add(pm.geo,seg(POMMEL[pv],lay.pom[0],lay.pom[1],false,pv===2?10:48,pv===2),bend);}
 const sw=P("sw",{color:mc});add(sw.geo,seg([[0,R0+.01],[.08,R0+.03],[.92,R0+.03],[1,R0+.01]],lay.sw[0],lay.sw[1]));
 add(sw.geo,box(.1,lay.sw[1]*.62,.16),M4.tr(R0+.06,lay.sw[0]+lay.sw[1]*.5,0));
 const stud=P("stud",{color:[.85,.12,.12],metal:.3});
 add(stud.geo,lathe(close([[0,.045],[.05,.045],[.06,.03]]),24),M4.mul(M4.tr(R0+.11,lay.sw[0]+lay.sw[1]*.42,0),M4.rz(-Math.PI/2)));
 add(stud.geo,lathe(close([[0,.028],[.04,.028]]),16),M4.mul(M4.tr(R0+.11,lay.sw[0]+lay.sw[1]*.7,0),M4.rz(-Math.PI/2)));
 const em=P("emitter",{color:mc});add(em.geo,seg(EMIT[ev],lay.em[0],lay.em[1]));
 if(ev===2){for(let i=0;i<6;i++){add(em.geo,box(.05,.1,.05),M4.mul(M4.ry(i/6*6.2832),M4.tr(.19,lay.em[0]+lay.em[1]+.03,0)));}}
 if(lay.em2){const e2=P("emitter2",{color:mc});add(e2.geo,seg(EMIT[ev],lay.em2[0],lay.em2[1],true));}
 if(cfg==="cross"){const q=P("quillons",{color:dc});const qy=lay.em[0]+lay.em[1]*.35;
  [1,-1].forEach(s=>{add(q.geo,lathe(close([[0,.075],[.3,.075],[.3,.09],[.36,.09],[.36,.06]]),32),M4.mul(M4.tr(0,qy,0),M4.rz(-s*Math.PI/2)));});}
 // internals
 const IN=(id,o)=>P(id,Object.assign({kind:"internal"},o));
 const cy0=lay.grip[0]+.12,cy1=lay.grip[0]+lay.grip[1]-.12;
 const cell=IN("cell",{color:[.75,.6,.25],metal:.6});add(cell.geo,seg([[0,.13],[.04,.14],[.96,.14],[1,.13]],cy0+(cfg==="double"?.35:0),cy1-cy0-(cfg==="double"?.7:0)),bend);
 add(cell.geo,seg([[0,.05],[1,.05]],cy1-(cfg==="double"?.35:0),.06),bend);
 const cond=IN("conduit",{color:[.85,.45,.2],metal:.7});const c0=cy1-(cfg==="double"?.3:0),c1=lay.sw[0]+lay.sw[1]*.35;
 add(cond.geo,seg([[0,.035],[1,.035]],c0,c1-c0));for(let i=0;i<5;i++)add(cond.geo,seg([[0,.09],[1,.09]],c0+(c1-c0)*(i+.5)/5-.012,.024,false,32));
 const ky=IN("crystal",{color:hexC(blade==="Black"?"#dfe6ff":col),metal:.1,emis:.55,alpha:.95});
 const kyb=(y0,l)=>add(ky.geo,seg([[0,0],[.38,.085],[.62,.085],[1,0]],y0,l,false,6,true));
 kyb(lay.sw[0]+lay.sw[1]*.4,.3*k+.02);
 const ln=IN("lens",{color:[.75,.92,1],metal:.2,emis:.15,alpha:.7}),mx=IN("matrix",{color:[.8,.5,.3],metal:.8});
 const ring=(g,y0,l,r1,r2)=>add(g.geo,lathe([[y0,r2],[y0,r1],[y0+l,r1],[y0+l,r2],[y0,r2]],36));
 add(ln.geo,seg([[0,.1],[.5,.14],[1,.1]],lay.em[0]+.04,.07));
 ring(mx,lay.em[0]+.18*k,.1,.17,.06);add(mx.geo,seg([[0,.02],[1,.02]],lay.em[0]+.14*k,.2));
 if(lay.em2){kyb(lay.grip[0]+.05,.3);add(ln.geo,seg([[0,.1],[.5,.14],[1,.1]],lay.em2[0]+lay.em2[1]-.11,.07));ring(mx,lay.em2[0]+lay.em2[1]-.28,.1,.17,.06);
  ky.name="Kyber crystals (×2)";ln.name="Focusing lenses (×2)";mx.name="Emitter matrices (×2)";}
 if(cfg==="cross"){ky.info+=" A cracked crystal like this one needs the crossguard vents to stay stable.";}
 // blade
 const blades=[];const BL=(cfg==="shoto"?2.1:3.5);
 blades.push({m:M4.mul(M4.tr(0,top,0),M4.id()),len:BL,r:.07});
 if(cfg==="double")blades.push({m:M4.mul(M4.tr(0,0,0),M4.rz(Math.PI)),len:BL,r:.07});
 if(cfg==="cross"){const qy=lay.em[0]+lay.em[1]*.35;blades.push({m:M4.mul(M4.tr(.36,qy,0),M4.rz(-Math.PI/2)),len:.55,r:.035});blades.push({m:M4.mul(M4.tr(-.36,qy,0),M4.rz(Math.PI/2)),len:.55,r:.035});}
 // ordering & explode vectors
 const shell=parts.filter(p=>p.kind==="shell").sort((a,b)=>cen(a)-cen(b));
 shell.forEach((p,i)=>{p.ex=[0,(i-(shell.length-1)/2)*.6,0];});
 const q=parts.find(p=>p.id==="quillons");if(q)q.ex=parts.find(p=>p.id==="emitter").ex.slice();
 const swp=parts.find(p=>p.id==="sw");stud.ex=[.5,swp.ex[1],0];
 const ins=parts.filter(p=>p.kind==="internal").sort((a,b)=>cen(a)-cen(b));
 ins.forEach((p,i)=>{p.ex=[-1.05,(i-(ins.length-1)/2)*.5,0];});
 parts.forEach(p=>{p.c=[0,cen(p),0];p.build=BUILD.indexOf(p.id);});
 parts.sort((a,b)=>a.build-b.build);
 return{parts,blades,len,col:hexC(col),dark:cfg==="dark",flick:cfg==="cross",cfg,blade};
}
function cen(p){let s=0,n=0;for(let i=1;i<p.geo.pos.length;i+=9){s+=p.geo.pos[i];n++;}return n?s/n:0;}

/* ---------- WebGL ---------- */
const VS=`attribute vec3 p;attribute vec3 n;uniform mat4 M,V,P;varying vec3 vn,vw;varying float vy;
void main(){vec4 w=M*vec4(p,1.);vw=w.xyz;vn=(M*vec4(n,0.)).xyz;vy=p.y;gl_Position=P*V*w;}`;
const FS=`precision mediump float;uniform vec3 C,eye;uniform float metal,emis,alpha,hl,time,glow,flick;varying vec3 vn,vw;varying float vy;
float rnd(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec3 N=normalize(vn);vec3 Vd=normalize(eye-vw);if(dot(N,Vd)<0.)N=-N;
 if(glow>.5){float f=pow(max(dot(N,Vd),0.),2.6);float fl=1.-flick*.55*rnd(vec2(floor(vy*14.),floor(time*24.)));gl_FragColor=vec4(C*f*alpha*fl,1.);return;}
 vec3 L1=normalize(vec3(.4,.8,.7)),L2=normalize(vec3(-.6,-.3,-.4));
 float d=max(dot(N,L1),0.)*.85+max(dot(N,L2),0.)*.3+.16;
 vec3 R=reflect(-Vd,N);float env=.5+.5*R.y;vec3 ec=mix(vec3(.06,.07,.09),vec3(1.,1.,1.05),smoothstep(.42,.7,env))+vec3(.15,.12,.1)*smoothstep(.3,0.,abs(R.x));
 float sp=pow(max(dot(R,L1),0.),48.);
 vec3 col=mix(C*d,C*ec*1.2,metal)+sp*(.25+.6*metal);
 col=mix(col,C*1.3,emis);col+=hl*vec3(.35,.28,.05)*(.6+.4*sin(time*5.));
 gl_FragColor=vec4(col,alpha);}`;
const PFS=`precision mediump float;uniform vec3 C;void main(){gl_FragColor=vec4(C,1.);}`;

let gl,cv,prog,pprog,U={},PU={},fb,fbT,fbD,model,unitBlade,flatBlade,raf=0,char=null,lastT=0;
const st={yaw:.55,pitch:.32,dist:7,ex:0,exT:0,xray:false,lit:true,litT:0,sel:null,step:-1,auto:true};
function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o;}
function mk(v,f){const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);return p;}
function buf(g){const b={p:gl.createBuffer(),n:gl.createBuffer(),c:g.pos.length/3};gl.bindBuffer(gl.ARRAY_BUFFER,b.p);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.pos),gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,b.n);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.nor),gl.STATIC_DRAW);return b;}
function initGL(){
 cv=document.getElementById("svCanvas");gl=cv.getContext("webgl",{antialias:true,alpha:false,preserveDrawingBuffer:false});
 if(!gl)return false;
 prog=mk(VS,FS);pprog=mk(VS,PFS);
 ["M","V","P","C","eye","metal","emis","alpha","hl","time","glow","flick"].forEach(k=>U[k]=gl.getUniformLocation(prog,k));
 ["M","V","P","C"].forEach(k=>PU[k]=gl.getUniformLocation(pprog,k));
 unitBlade=buf(lathe(close([[0,1],[.965,1],[.985,.75],[1,.3]]),40));
 flatBlade=buf(add(G(),box(2,1,.35),M4.tr(0,.5,0)));
 return true;}
function bind(b,pr){const lp=gl.getAttribLocation(pr,"p"),ln=gl.getAttribLocation(pr,"n");gl.bindBuffer(gl.ARRAY_BUFFER,b.p);gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,3,gl.FLOAT,false,0,0);
 if(ln>=0){gl.bindBuffer(gl.ARRAY_BUFFER,b.n);gl.enableVertexAttribArray(ln);gl.vertexAttribPointer(ln,3,gl.FLOAT,false,0,0);}}
function resize(){const r=cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(1,Math.round(r.width*d)),h=Math.max(1,Math.round(r.height*d));
 if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;mkFB();}}
function mkFB(){if(fb){gl.deleteFramebuffer(fb);gl.deleteTexture(fbT);gl.deleteRenderbuffer(fbD);}
 fb=gl.createFramebuffer();fbT=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,fbT);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,cv.width,cv.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);fbD=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,fbD);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,cv.width,cv.height);
 gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbT,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,fbD);gl.bindFramebuffer(gl.FRAMEBUFFER,null);}

function cam(){
 const bl=model.blades[0].len*st.litT,c=model.len/2+(model.cfg==="double"?0:bl/2);
 const span=model.len+(model.cfg==="double"?2*bl:bl)+st.ex*2.8;
 const aspect=cv.width/cv.height,need=span/2/Math.tan(.42)/Math.min(1.6,aspect)*1.38;
 const dist=Math.max(2.4,need)*st.dist/7;
 const S=M4.mul(M4.rz(-Math.PI/2),M4.tr(0,-c,0));
 const e=[dist*Math.cos(st.pitch)*Math.sin(st.yaw),dist*Math.sin(st.pitch),dist*Math.cos(st.pitch)*Math.cos(st.yaw)];
 return{S,eye:e,V:M4.look(e,[0,0,0],[0,1,0]),P:M4.persp(.84,aspect,.05,60)};}
function partM(S,p){const e=p.e;return M4.mul(S,M4.tr(p.ex[0]*e,p.ex[1]*e,p.ex[2]*e));}
function visible(p){return st.step<0||p.build<=curBuildIdx();}
function steps(){return model.parts.map(p=>p.id).concat(["ignite"]);}
function curBuildIdx(){const s=steps()[st.step];if(s==="ignite")return 99;return model.parts.find(p=>p.id===s).build;}

function draw(t){
 if(!document.getElementById("sv")||document.getElementById("sv").hidden){raf=0;return;}
 raf=requestAnimationFrame(draw);const dt=Math.min(.05,(t-lastT)/1000||0);lastT=t;
 resize();
 // animate
 const k=1-Math.pow(.0015,dt);
 st.ex+=(st.exT-st.ex)*k;
 model.parts.forEach(p=>{let tg=st.exT;if(st.step>=0){tg=0;}p.e+=(tg-p.e)*k;});
 const wantLit=st.lit&&st.ex<.05&&(st.step<0||steps()[st.step]==="ignite");
 st.litT+=((wantLit?1:0)-st.litT)*Math.min(1,dt*(wantLit?3.2:6));
 if(st.auto&&!drag)st.yaw+=dt*.18;
 const C=cam();
 gl.viewport(0,0,cv.width,cv.height);gl.clearColor(.055,.065,.095,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.useProgram(prog);
 gl.uniformMatrix4fv(U.V,false,C.V);gl.uniformMatrix4fv(U.P,false,C.P);gl.uniform3fv(U.eye,C.eye);gl.uniform1f(U.time,t/1000);gl.uniform1f(U.glow,0);gl.uniform1f(U.flick,0);
 const xr=st.xray||st.step>=0;
 const one=(p,alpha)=>{gl.uniformMatrix4fv(U.M,false,partM(C.S,p));gl.uniform3fv(U.C,p.color);gl.uniform1f(U.metal,p.metal);gl.uniform1f(U.emis,p.emis);gl.uniform1f(U.alpha,alpha);
  const cur=st.step>=0&&steps()[st.step]===p.id;gl.uniform1f(U.hl,(st.sel===p.id||cur)?1:0);bind(p.buf,prog);gl.drawArrays(gl.TRIANGLES,0,p.buf.c);};
 gl.disable(gl.BLEND);gl.depthMask(true);
 model.parts.filter(p=>visible(p)&&(p.kind==="internal"||!xr)).forEach(p=>one(p,p.kind==="internal"&&p.alpha<1?1:1));
 if(xr){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
  model.parts.filter(p=>visible(p)&&p.kind==="shell").forEach(p=>one(p,st.sel===p.id?.55:.24));gl.depthMask(true);gl.disable(gl.BLEND);}
 // blades
 if(st.litT>.01){const L=st.litT;
  model.blades.forEach(b=>{const base=M4.mul(C.S,b.m);
   const core=(r,col,alpha,glow,buf2)=>{gl.uniformMatrix4fv(U.M,false,M4.mul(base,M4.sc(r,b.len*L,r)));gl.uniform3fv(U.C,col);gl.uniform1f(U.alpha,alpha);gl.uniform1f(U.glow,glow);
    gl.uniform1f(U.metal,0);gl.uniform1f(U.emis,1);gl.uniform1f(U.hl,st.sel==="blade"?.6:0);bind(buf2,prog);gl.drawArrays(gl.TRIANGLES,0,buf2.c);};
   gl.uniform1f(U.flick,0);
   if(model.dark){const w=b.r*1.5,dk=(m,col,a,g)=>{gl.uniformMatrix4fv(U.M,false,m);gl.uniform3fv(U.C,col);gl.uniform1f(U.alpha,a);gl.uniform1f(U.glow,g);gl.uniform1f(U.metal,0);gl.uniform1f(U.emis,1);gl.uniform1f(U.hl,0);bind(flatBlade,prog);gl.drawArrays(gl.TRIANGLES,0,flatBlade.c);};
    dk(M4.mul(base,M4.sc(w,b.len*L,b.r*.9)),[.015,.015,.02],1,0);
    [1,-1].forEach(sg=>dk(M4.mul(base,M4.mul(M4.tr(sg*w*1.02,0,0),M4.sc(.006,b.len*L,b.r*.85))),[.92,.95,1],1,0));
    gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);gl.depthMask(false);
    [1,-1].forEach(sg=>[[.03,.35],[.06,.12]].forEach(([g,a])=>dk(M4.mul(base,M4.mul(M4.tr(sg*w,0,0),M4.sc(g,b.len*L*1.004,b.r*1.1))),[.8,.86,1],a,1)));
   }else{
   core(b.r*.55,model.col.map(v=>.82+.18*v),1,0,unitBlade);
   gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);gl.depthMask(false);gl.uniform1f(U.flick,model.flick?1:0);
   [[1,.85],[1.5,.4],[2.2,.16],[3.2,.06]].forEach(([s,a])=>core(b.r*s,model.col,a,1,unitBlade));}
   gl.depthMask(true);gl.disable(gl.BLEND);gl.uniform1f(U.flick,0);});}
 labels(C);
}
function labels(C){const box=document.getElementById("svLabels");if(!box)return;
 const show=st.ex>.45||st.step>=0;let h="";
 if(show){const w=cv.clientWidth,hh=cv.clientHeight;
  model.parts.filter(visible).forEach(p=>{if(st.step>=0&&steps()[st.step]!==p.id&&st.sel!==p.id)return;
   const c=M4.ap(partM(C.S,p),p.c),v=M4.ap(C.V,c),q=M4.ap(C.P,v);if(q[3]<=0)return;
   const x=(q[0]/q[3]*.5+.5)*w,y=(1-(q[1]/q[3]*.5+.5))*hh;
   h+=`<button class="svl${st.sel===p.id?" on":""}${p.kind==="internal"?" in":""}" data-part="${p.id}" style="left:${x}px;top:${y}px">${p.name}</button>`;});}
 if(box._h!==h){box.innerHTML=h;box._h=h;}}

function pick(cx,cy){const C=cam();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.useProgram(pprog);gl.uniformMatrix4fv(PU.V,false,C.V);gl.uniformMatrix4fv(PU.P,false,C.P);
 const xr=st.xray||st.step>=0;
 model.parts.forEach((p,i)=>{if(!visible(p))return;if(xr&&p.kind==="shell"&&st.ex<.3)return;gl.uniformMatrix4fv(PU.M,false,partM(C.S,p));gl.uniform3fv(PU.C,[(i+1)/255,0,0]);bind(p.buf,pprog);gl.drawArrays(gl.TRIANGLES,0,p.buf.c);});
 if(st.litT>.5)model.blades.forEach(b=>{gl.uniformMatrix4fv(PU.M,false,M4.mul(M4.mul(C.S,b.m),M4.sc(b.r*2.2,b.len*st.litT,b.r*2.2)));gl.uniform3fv(PU.C,[200/255,0,0]);bind(unitBlade,pprog);gl.drawArrays(gl.TRIANGLES,0,unitBlade.c);});
 const r=cv.getBoundingClientRect(),d=cv.width/r.width,px=new Uint8Array(4);
 gl.readPixels(Math.round((cx-r.left)*d),Math.round(cv.height-(cy-r.top)*d),1,1,gl.RGBA,gl.UNSIGNED_BYTE,px);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
 if(px[0]===200)return"blade";return px[0]?model.parts[px[0]-1].id:null;}

/* ---------- UI ---------- */
let drag=null;const ptrs=new Map();
function css(){if(document.getElementById("svCss"))return;const s=document.createElement("style");s.id="svCss";s.textContent=`
.sv{position:fixed;inset:0;z-index:100;background:radial-gradient(ellipse at 40% 45%,#1a2030 0%,#07080c 70%);display:grid;grid-template-columns:1fr 360px}
.sv[hidden]{display:none}
.sv .stage{position:relative;min-height:0;touch-action:none;cursor:grab}
.sv .stage:active{cursor:grabbing}
.sv canvas{width:100%;height:100%;display:block}
.sv .side{background:rgba(20,24,33,.94);border-left:1px solid var(--line);overflow:auto;padding:16px 16px 24px;display:flex;flex-direction:column;gap:12px}
.sv .x{position:absolute;top:12px;left:12px;z-index:3}
.sv .hud{position:absolute;left:12px;right:12px;bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;z-index:3}
.sv .hud input[type=range]{width:140px;accent-color:var(--sw)}
.sv .tip{position:absolute;top:14px;right:14px;font-size:12px;color:var(--dim);z-index:3;text-align:right}
.sv .btn.on{background:var(--sw);color:#111;border-color:var(--sw)}
#svLabels{position:absolute;inset:0;pointer-events:none;z-index:2}
.svl{position:absolute;transform:translate(-50%,-150%);pointer-events:auto;white-space:nowrap;font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:999px;background:rgba(11,13,18,.85);border:1px solid #3a4256;color:#e9ecf2;cursor:pointer}
.svl.in{border-color:#6a5a2a;color:#ffe9a8}
.svl.on{background:var(--sw);color:#111;border-color:var(--sw)}
.sv .pcard{background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:12px}
.sv .pcard h4{margin:0 0 4px;font-family:Oswald,Impact,sans-serif;font-size:17px;letter-spacing:.02em}
.sv .pcard p{margin:0;font-size:13.5px;color:var(--muted)}
.sv .chips{display:flex;flex-wrap:wrap;gap:6px}
.sv .chips button{font-size:12px;padding:4px 9px;border-radius:999px;background:var(--panel2);border:1px solid var(--line);cursor:pointer}
.sv .chips button.on{background:var(--sw);color:#111;border-color:var(--sw)}
.sv .chips button.in{border-style:dashed}
.sv .lore dt{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);margin-top:8px}
.sv .lore dd{margin:2px 0 0;font-size:13.5px;color:var(--muted)}
.sv .stepbar{display:flex;gap:8px;align-items:center}
.sv .prog{flex:1;height:6px;border-radius:3px;background:var(--line);overflow:hidden}.sv .prog i{display:block;height:100%;background:var(--sw)}
@media(max-width:820px){.sv{grid-template-columns:1fr;grid-template-rows:56vh 1fr}.sv .side{border-left:0;border-top:1px solid var(--line)}.sv .tip{display:none}}
.arc.click{cursor:pointer;transition:border-color .15s,transform .15s}.arc.click:hover{border-color:#4a5470;transform:translateY(-2px)}
`;document.head.appendChild(s);}
function shell(){if(document.getElementById("sv"))return;const d=document.createElement("div");d.id="sv";d.className="sv";d.hidden=true;d.setAttribute("role","dialog");d.setAttribute("aria-label","3D saber viewer");
 d.innerHTML=`<div class="stage" id="svStage"><canvas id="svCanvas"></canvas><div id="svLabels"></div>
  <button class="btn sm x" id="svClose">← Back to archive</button>
  <div class="tip">Drag to rotate · scroll or pinch to zoom<br>Click a part to learn what it does</div>
  <div class="hud"><button class="btn sm" id="svEx">Deconstruct</button><input type="range" id="svExR" min="0" max="100" value="0" aria-label="Explode amount">
   <button class="btn sm" id="svXr">X-ray</button><button class="btn sm" id="svLit">Deactivate</button><button class="btn sm" id="svBuild">Build step-by-step</button><button class="btn sm" id="svRot">Auto-rotate</button><button class="btn sm" id="svReset">Reset view</button></div></div>
  <div class="side" id="svSide"></div>`;
 document.body.appendChild(d);wire();}
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function side(){const BLADES=D().BLADES,ARCHIVE=D().ARCHIVE;const a=char,L=LORE[a.n]||{},m=model;
 const sel=st.step>=0?(steps()[st.step]==="ignite"?"blade":steps()[st.step]):st.sel;
 const part=sel==="blade"?{name:INFO.blade[0],info:INFO.blade[1]}:m.parts.find(p=>p.id===sel);
 const sc=steps(),stepHtml=st.step>=0?`<div class="pcard"><div class="small dim">Step ${st.step+1} of ${sc.length}</div><h4>${sc[st.step]==="ignite"?"Ignite the blade":"Install: "+esc2(part.name)}</h4>
   <p>${sc[st.step]==="ignite"?"Every part is in place. The power cell feeds the crystal, the lens focuses it, the emitter matrix shapes the blade, and the activation stud closes the circuit.":esc2(part.info)}</p>
   <div class="stepbar" style="margin-top:10px"><button class="btn sm" id="svPrev"${st.step===0?" disabled":""}>‹ Back</button><div class="prog"><i style="width:${(st.step+1)/sc.length*100}%"></i></div><button class="btn sm" id="svNext">${st.step===sc.length-1?"Finish":"Next ›"}</button></div></div>`:"";
 document.getElementById("svSide").innerHTML=`<div><div class="small dim">Saber archive</div><h2 style="font-size:26px">${esc2(a.n)}</h2>
  <div class="row" style="gap:6px;margin-top:6px;flex-wrap:wrap"><span class="pill">${esc2(a.side)}</span><span class="pill" style="color:${m.blade==="Black"?"#fff":BLADES[m.blade]}">${esc2(a.blades.filter((v,i,s)=>s.indexOf(v)===i).join(" / "))} blade</span><span class="pill">${esc2(a.style)}</span></div></div>
  ${stepHtml}
  ${st.step<0?(part?`<div class="pcard"><h4>${esc2(part.name)}</h4><p>${esc2(part.info)}</p></div>`:`<div class="pcard"><h4>Explore the saber</h4><p>Click any part, or press <b>Deconstruct</b> to pull the hilt apart and see what's inside. <b>Build step-by-step</b> walks through putting it together.</p></div>`):""}
  <div><div class="small dim" style="margin-bottom:6px">Parts (dashed = inside the hilt)</div><div class="chips">${m.parts.map(p=>`<button data-part="${p.id}" class="${p.kind==="internal"?"in ":""}${sel===p.id?"on":""}">${esc2(p.name)}</button>`).join("")}<button data-part="blade" class="${sel==="blade"?"on":""}">Plasma blade</button></div></div>
  <dl class="lore pcard" style="margin:0"><dt>Crystal</dt><dd>${esc2(L.crystal||"Kyber crystal.")}</dd><dt>About this saber</dt><dd>${esc2(a.txt)} ${esc2(L.notes||"")}</dd>${L.fate?`<dt>What happened to it</dt><dd>${esc2(L.fate)}</dd>`:""}<dt>First seen</dt><dd>${esc2(a.first)}</dd></dl>
  ${a.try?`<button class="btn" id="svWork">Load this blade in the workshop</button>`:""}
  <div class="small dim">The 3D hilt is an original study design that shows how a lightsaber is put together. It is not a replica of the screen prop. The blade color, blade setup and lore facts match the character.</div>`;
 const h=(id,f)=>{const e=document.getElementById(id);if(e)e.onclick=f;};
 h("svPrev",()=>{st.step--;enterStep();});h("svNext",()=>{if(st.step>=sc.length-1){st.step=-1;st.lit=true;st.exT=0;syncHud();side();return;}st.step++;enterStep();});
 h("svWork",()=>{closeSV();const b=document.querySelector(`#archive [data-try="${ARCHIVE.indexOf(a)}"]`);if(b)b.click();});
}
function enterStep(){const s=steps()[st.step];const p=model.parts.find(x=>x.id===s);if(p)p.e=1;st.sel=null;st.lit=true;st.exT=0;syncHud();side();}
function syncHud(){const on=(id,v)=>document.getElementById(id).classList.toggle("on",!!v);
 on("svEx",st.exT>.5);document.getElementById("svEx").textContent=st.exT>.5?"Reconstruct":"Deconstruct";document.getElementById("svExR").value=Math.round(st.exT*100);
 on("svXr",st.xray);on("svBuild",st.step>=0);on("svRot",st.auto);document.getElementById("svLit").textContent=st.lit?"Deactivate":"Ignite";on("svLit",st.lit);
 document.getElementById("svLit").disabled=st.exT>.05;}
function selectPart(id){if(st.step>=0)return;st.sel=st.sel===id?null:id;side();}
function wire(){
 const $i=id=>document.getElementById(id),stg=$i("svStage");
 $i("svClose").onclick=closeSV;
 $i("svEx").onclick=()=>{st.step=-1;st.exT=st.exT>.5?0:1;syncHud();side();};
 $i("svExR").oninput=e=>{st.step=-1;st.exT=e.target.value/100;syncHud();};
 $i("svXr").onclick=()=>{st.xray=!st.xray;syncHud();};
 $i("svLit").onclick=()=>{st.lit=!st.lit;syncHud();};
 $i("svRot").onclick=()=>{st.auto=!st.auto;syncHud();};
 $i("svBuild").onclick=()=>{if(st.step>=0){st.step=-1;}else{st.step=0;model.parts.forEach(p=>p.e=0);enterStep();return;}syncHud();side();};
 $i("svReset").onclick=()=>{Object.assign(st,{yaw:.55,pitch:.32,dist:7});};
 $i("svSide").addEventListener("click",e=>{const b=e.target.closest("[data-part]");if(b)selectPart(b.dataset.part);});
 $i("svLabels").addEventListener("click",e=>{const b=e.target.closest("[data-part]");if(b)selectPart(b.dataset.part);});
 stg.addEventListener("pointerdown",e=>{if(e.target.closest("button,input"))return;stg.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);drag={x:e.clientX,y:e.clientY,moved:0,pd:null};});
 stg.addEventListener("pointermove",e=>{if(!drag||!ptrs.has(e.pointerId))return;const prev=ptrs.get(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);
  if(ptrs.size===2){const [a,b]=[...ptrs.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(drag.pd)st.dist=Math.min(14,Math.max(2.5,st.dist*drag.pd/d));drag.pd=d;drag.moved=99;return;}
  const dx=e.clientX-prev[0],dy=e.clientY-prev[1];drag.moved+=Math.abs(dx)+Math.abs(dy);st.yaw-=dx*.008;st.pitch=Math.max(-1.3,Math.min(1.3,st.pitch+dy*.006));if(drag.moved>4)st.auto=false;});
 const up=e=>{if(!drag)return;ptrs.delete(e.pointerId);if(ptrs.size===0){if(drag.moved<5){const id=pick(e.clientX,e.clientY);if(id)selectPart(id);else if(st.step<0){st.sel=null;side();}}drag=null;syncHud();}};
 stg.addEventListener("pointerup",up);stg.addEventListener("pointercancel",up);
 stg.addEventListener("wheel",e=>{e.preventDefault();st.dist=Math.min(14,Math.max(2.5,st.dist*(1+Math.sign(e.deltaY)*.08)));},{passive:false});
 document.addEventListener("keydown",e=>{if(document.getElementById("sv").hidden)return;if(e.key==="Escape")closeSV();
  if(st.step>=0&&e.key==="ArrowRight")document.getElementById("svNext").click();if(st.step>0&&e.key==="ArrowLeft")document.getElementById("svPrev").click();});
}
function open(a){css();shell();
 const sv=document.getElementById("sv");sv.hidden=false;document.body.style.overflow="hidden";
 if(!gl&&!initGL()){document.getElementById("svSide").innerHTML=`<h2>${esc2(a.n)}</h2><p class="muted">Your browser doesn't support WebGL, so the 3D viewer can't run here.</p>`;return;}
 if(model)model.parts.forEach(p=>{gl.deleteBuffer(p.buf.p);gl.deleteBuffer(p.buf.n);});
 char=a;model=buildHilt(a);model.parts.forEach(p=>{p.buf=buf(p.geo);p.geo=null;});
 Object.assign(st,{yaw:.55,pitch:.32,dist:7,ex:0,exT:0,xray:false,lit:true,litT:0,sel:null,step:-1,auto:true});
 syncHud();side();if(!raf){lastT=performance.now();raf=requestAnimationFrame(draw);}
 try{history.replaceState(null,"","#starwars-archive");}catch(e){}}
function closeSV(){const sv=document.getElementById("sv");if(sv)sv.hidden=true;document.body.style.overflow="";}
window.SV={open,close:closeSV,_st:st};
})();
