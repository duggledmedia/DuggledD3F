import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createDuggledMarkGeometry} from './duggled-mark';
const PAPER=0x10110f,ORANGE=0xff713e,INK=0x1d2317;
const clamp=THREE.MathUtils.clamp,lerp=THREE.MathUtils.lerp;
const ease=(a:number,b:number,p:number)=>{const t=clamp((p-a)/(b-a),0,1);return t*t*(3-2*t)};
type Piece={mesh:THREE.Group;from:THREE.Vector3;to:THREE.Vector3;spin:number};
// All stages share one physical world. In particular the camera crosses the website's z=-12 plane.
export function createCinemaWorld(host:HTMLElement,onAssetProgress:(p:number)=>void=()=>{}){
 const mobile=innerWidth<700;const low=mobile||(navigator.hardwareConcurrency||8)<=4;
 const scene=new THREE.Scene();scene.background=new THREE.Color(PAPER);scene.fog=new THREE.Fog(PAPER,38,110);
 const camera=new THREE.PerspectiveCamera(mobile?59:48,1,.06,200);
 const renderer=new THREE.WebGLRenderer({antialias:!low,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,low?1.25:1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.setClearColor(PAPER);renderer.shadowMap.enabled=!low;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
 let disposed=false;const screenImages=new Map<string,Promise<HTMLImageElement>>();const textures:THREE.Texture[]=[];const geometries:THREE.BufferGeometry[]=[];const materials:THREE.Material[]=[];
 const standard=(color:number)=>{const m=new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.08});materials.push(m);return m};
 const orange=standard(ORANGE),paper=standard(0x252b1e);
 const letterMaterial=new THREE.MeshPhysicalMaterial({color:ORANGE,metalness:.32,roughness:.27,clearcoat:.7,clearcoatRoughness:.25,emissive:0xff440b,emissiveIntensity:.055,transparent:true});materials.push(letterMaterial);
 const light=new THREE.DirectionalLight(0xfff2de,3.8);light.position.set(12,20,18);light.castShadow=!low;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-25;light.shadow.camera.right=25;light.shadow.camera.top=20;light.shadow.camera.bottom=-20;light.shadow.camera.far=90;light.shadow.bias=-.001;light.shadow.normalBias=.04;scene.add(light,new THREE.HemisphereLight(0xf5f3ed,0x161b11,1.5));
 const rim=new THREE.DirectionalLight(0xff713e,3.2);rim.position.set(-10,5,-5);scene.add(rim);
 const fill=new THREE.DirectionalLight(0xf0f3e9,2);fill.position.set(2,-3,10);scene.add(fill);
 const box=(w:number,h:number,d:number,material:THREE.Material,r=.08)=>{const geometry=new RoundedBoxGeometry(w,h,d,low?1:3,r);geometries.push(geometry);const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;return mesh};
 // The actual open D and detached square, extruded from the original brand paths.
 const letterGeometry=createDuggledMarkGeometry(low);geometries.push(letterGeometry);
 const idea=new THREE.Group();const letter=new THREE.Mesh(letterGeometry,letterMaterial);letter.castShadow=true;letter.receiveShadow=true;letter.rotation.set(.16,-.35,-.06);idea.add(letter);scene.add(idea);
 const orbits=new THREE.Group();idea.add(orbits);
 const orbitMaterial=new THREE.MeshBasicMaterial({color:ORANGE,transparent:true,opacity:.2,depthWrite:false});materials.push(orbitMaterial);
 for(let i=0;i<2;i++){const geometry=new THREE.TorusGeometry(2.7+i*.5,.009,4,low?64:120);geometries.push(geometry);const ring=new THREE.Mesh(geometry,orbitMaterial);ring.rotation.set(.9+i*.3,.25,-.35+i*.7);ring.scale.y=.8;orbits.add(ring)}
 const floorGeometry=new THREE.PlaneGeometry(180,180);geometries.push(floorGeometry);const floorMaterial=standard(0x10140c);const floor=new THREE.Mesh(floorGeometry,floorMaterial);floor.rotation.x=-Math.PI/2;floor.position.set(0,-7,-25);floor.receiveShadow=true;scene.add(floor);

 const screens:Record<string,string>={web:'website',search:'google-business',social:'meta-suite','Google Ads':'google-ads',Anuncio:'meta-ad',Web:'website',Lead:'whatsapp-chat',WhatsApp:'whatsapp-list',Respuesta:'instagram-chat',Seguimiento:'crm',Venta:'sale'};
 function screenImage(name:string){let promise=screenImages.get(name);if(!promise){promise=new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=`/screens/${name}.${name==='sale'?'svg':'webp'}`});screenImages.set(name,promise)}return promise}
 function texture(kind:string,title:string){
  const name=screens[title]||screens[kind];const resolution=name?(low?1280:Math.min(2048,renderer.capabilities.maxTextureSize)):(low?768:1024);
  const canvas=document.createElement('canvas');canvas.width=resolution;canvas.height=Math.round(resolution*640/1024);const ctx=canvas.getContext('2d')!;ctx.scale(resolution/1024,resolution/1024);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  const labels:Record<string,string>={Anuncio:'ANUNCIO / META ADS',Web:'WEB / ECOMMERCE',Lead:'LEAD / WHATSAPP',WhatsApp:'WHATSAPP / CHATS',Respuesta:'RESPUESTA / INSTAGRAM',Seguimiento:'SEGUIMIENTO / CRM',Venta:'VENTA / PEDIDO CONFIRMADO'};const label=kind==='web'?'DISEÑO WEB':kind==='search'?'GOOGLE BUSINESS PROFILE':kind==='social'?'META BUSINESS SUITE':labels[title]||title.toUpperCase();
  const header=()=>{
   ctx.clearRect(0,0,1024,640);ctx.fillStyle='#151a11';ctx.beginPath();ctx.roundRect(1,1,1022,638,22);ctx.fill();ctx.save();ctx.beginPath();ctx.roundRect(1,1,1022,638,22);ctx.clip();
   ctx.fillStyle='#252d1e';ctx.fillRect(0,0,1024,76);ctx.strokeStyle='#48533d';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,76);ctx.lineTo(1024,76);ctx.stroke();
   ['#ff5f57','#febc2e','#28c840'].forEach((color,i)=>{ctx.fillStyle=color;ctx.beginPath();ctx.arc(34+i*29,38,9,0,Math.PI*2);ctx.fill()});
   ctx.fillStyle='#d9e4cc';ctx.font='500 21px Arial';ctx.textAlign='center';ctx.fillText(label,512,46);ctx.textAlign='left';ctx.fillStyle='#151a11';ctx.fillRect(12,88,1000,534);ctx.restore();
   ctx.strokeStyle='#46513b';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(1,1,1022,638,22);ctx.stroke();
  };header();
  if(!name){ctx.fillStyle='#e9f0e0';ctx.font='bold 100px Arial';ctx.fillText(title,60,320);ctx.fillStyle='#ff6b35';ctx.fillRect(60,385,310,16)}
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(low?2:8,renderer.capabilities.getMaxAnisotropy());t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;textures.push(t);
  if(name)screenImage(name).then(image=>{if(disposed)return;header();const x=16,y=89,w=992,h=532;
   // Website preview shows its first fold; other interfaces keep their original aspect ratio.
   if(name==='website'){const cropH=Math.min(image.height,image.width*h/w);ctx.drawImage(image,0,0,image.width,cropH,x,y,w,h)}
   else{const scale=Math.min(w/image.width,h/image.height);const width=image.width*scale,height=image.height*scale;ctx.drawImage(image,x+(w-width)/2,y+(h-height)/2,width,height)}
   t.needsUpdate=true;
  }).catch(()=>{if(disposed)return;ctx.fillStyle='#bac9ac';ctx.font='28px Arial';ctx.fillText(title,40,320);t.needsUpdate=true});return t;
 }
 function panel(w:number,h:number,kind:string,title:string){const group=new THREE.Group();const backGeometry=new RoundedBoxGeometry(w,h,.16,low?1:3,.08);geometries.push(backGeometry);const back=new THREE.Mesh(backGeometry,paper);back.castShadow=true;back.receiveShadow=true;group.add(back);const geometry=new THREE.PlaneGeometry(w-.08,h-.08);geometries.push(geometry);const material=new THREE.MeshBasicMaterial({map:texture(kind,title),side:THREE.DoubleSide,transparent:true});materials.push(material);const face=new THREE.Mesh(geometry,material);face.position.z=.085;group.add(face);return group}
 const design=new THREE.Group();design.position.z=-12;scene.add(design);const website=panel(9,5.625,'web','Tu web');design.add(website);
 const pieces:Piece[]=[];const pieceData=[[-3.7,2.2,1.4,'Aa'],[3.8,1.5,1,'UI'],[-4,-1.8,2.2,'Diseño'],[3.8,-1.7,2.8,'Contenido'],[0,3.8,3.5,'Identidad'],[0,-3.5,1.8,'UX / UI']];
 pieceData.forEach(([x,y,z,label],i)=>{const mesh=panel(2.5,1.55,'Diseño',String(label));const to=new THREE.Vector3(Number(x),Number(y),Number(z)*.04);const from=new THREE.Vector3((i%2?1:-1)*(mobile?5:9),i%3===0?5:-3,8+i*2.2);mesh.position.copy(from);design.add(mesh);pieces.push({mesh,from,to,spin:i%2?.5:-.4})});
 const marketing=new THREE.Group();scene.add(marketing);const search=panel(7,4.375,'search','Google');search.position.set(-5,2,-26);search.rotation.y=.14;marketing.add(search);const social=panel(5.5,3.44,'social','Meta');social.position.set(5,-1,-30);social.rotation.y=-.2;marketing.add(social);const ads=panel(4,2.5,'Campañas','Google Ads');ads.position.set(-4,-3,-34);marketing.add(ads);
 const automation=new THREE.Group();scene.add(automation);const nodeNames=['Anuncio','Web','Lead','WhatsApp','Respuesta','Seguimiento','Venta'];const nodes:THREE.Group[]=[];const original:THREE.Vector3[]=[];
 nodeNames.forEach((name,i)=>{const node=panel(3.7,2.31,`0${i+1} / CONEXIÓN`,name);const position=new THREE.Vector3((i%2?1:-1)*(mobile?2:3.2),(i%3-1)*1.4,-37-i*4.5);node.position.copy(position);automation.add(node);nodes.push(node);original.push(position);const dot=box(.3,.3,.3,orange,.05);dot.position.set(1.4,.7,.2);node.add(dot)});
 const links:THREE.Mesh[]=[];const pulses:THREE.Mesh[]=[];const pulseGeo=new THREE.SphereGeometry(.12,low?6:10,low?4:8);geometries.push(pulseGeo);
 const lineMat=standard(ORANGE);for(let i=0;i<6;i++){const geo=new THREE.CylinderGeometry(.018,.018,1,low?4:6);geometries.push(geo);const link=new THREE.Mesh(geo,lineMat);automation.add(link);links.push(link);const pulse=new THREE.Mesh(pulseGeo,orange);automation.add(pulse);pulses.push(pulse)}
 // A spatial neural network: every interface remains linked to the original idea.
 const core=new THREE.Vector3(0,1,-25);
 const targets=[new THREE.Vector3(-9,6,-27),new THREE.Vector3(9,6,-28),new THREE.Vector3(11,-1,-24),new THREE.Vector3(1,-6,-28)];
 const nodeTargets=nodes.map((_,i)=>{const angle=Math.PI*.62+i*Math.PI*1.45/6;return new THREE.Vector3(Math.cos(angle)*13,1+Math.sin(angle)*8,-25+Math.sin(i*2.1)*5)});
 const networkObjects=[design,search,social,ads,...nodes];
 const finalLinks=new THREE.Group();scene.add(finalLinks);const synapses:{mesh:THREE.Mesh;pulse:THREE.Mesh;a:THREE.Object3D;b:THREE.Object3D}[]=[];
 const synapseGeo=new THREE.CylinderGeometry(.018,.018,1,low?4:6);geometries.push(synapseGeo);
 const connect=(a:THREE.Object3D,b:THREE.Object3D)=>{const mesh=new THREE.Mesh(synapseGeo,lineMat),pulse=new THREE.Mesh(pulseGeo,orange);finalLinks.add(mesh,pulse);synapses.push({mesh,pulse,a,b})};
 networkObjects.forEach(object=>connect(idea,object));networkObjects.forEach((object,i)=>{if(i%2===0)connect(object,networkObjects[(i+3)%networkObjects.length])});
 const startPoint=new THREE.Vector3(),endPoint=new THREE.Vector3();
 let settled=0;const assetCount=screenImages.size;
 const assetsReady=Promise.allSettled([...screenImages.values()].map(p=>p.finally(()=>onAssetProgress(++settled/assetCount))));
 const ready=assetsReady.then(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve())));
 const particleCount=low?12:24;const pointsGeometry=new THREE.BufferGeometry();const positions=new Float32Array(particleCount*3);for(let i=0;i<particleCount;i++){positions[i*3]=Math.sin(i*7.31)*18;positions[i*3+1]=Math.cos(i*4.2)*9;positions[i*3+2]=-8-i*1.8}pointsGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometries.push(pointsGeometry);const pointsMaterial=new THREE.PointsMaterial({color:ORANGE,size:.07,sizeAttenuation:true});materials.push(pointsMaterial);const particles=new THREE.Points(pointsGeometry,pointsMaterial);scene.add(particles);
 const keyframes=[{p:0,pos:[0,.3,11],look:[0,0,0]},{p:.06,pos:[.8,.5,11.5],look:[0,0,0]},{p:.14,pos:[0,1,12],look:[0,0,-2]},{p:.24,pos:[-1.5,1,5],look:[0,0,-12]},{p:.34,pos:[2.5,1.4,-1.5],look:[0,0,-12]},{p:.42,pos:[.3,.4,-8],look:[0,0,-18]},{p:.49,pos:[0,.1,-17],look:[0,0,-31]},{p:.55,pos:[1,1,-23],look:[0,0,-36]},{p:.64,pos:[-1,.7,-32],look:[0,0,-46]},{p:.74,pos:[1,1,-43],look:[0,0,-59]},{p:.88,pos:[0,3,mobile?39:17],look:[0,1,-25]},{p:1,pos:[0,3,mobile?39:17],look:[0,1,-25]}];
 const lookAt=new THREE.Vector3(),pointer=new THREE.Vector2();const nodeEnd=new THREE.Vector3(),direction=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);let contextHealthy=true;let progress=0,raf=0,alive=true,inView=true,last=0,qualityMeasured=false,slow=0,frames=0;const initialTime=performance.now();
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<700?59:48;camera.setViewOffset(w,h,w<700?0:-w*.20,w<700?h*.16:0,w,h);camera.updateProjectionMatrix()}
 const ro=new ResizeObserver(resize);ro.observe(host);resize();
 function pointerMove(e:PointerEvent){if(!matchMedia('(hover:hover)').matches)return;pointer.set((e.clientX/innerWidth-.5)*2,(e.clientY/innerHeight-.5)*2)}window.addEventListener('pointermove',pointerMove,{passive:true});
 function frame(now:number){if(!alive||!contextHealthy)return;raf=0;if(!inView||document.hidden)return;const dt=last?now-last:16;last=now;const t=(now-initialTime)/1000;
 if(!qualityMeasured){frames++;if(dt>27)slow++;if(frames===120){qualityMeasured=true;if(slow>55){renderer.setPixelRatio(1);renderer.shadowMap.enabled=false;resize()}}}
 let index=0;while(index<keyframes.length-2&&progress>keyframes[index+1].p)index++;const a=keyframes[index],b=keyframes[index+1],blend=ease(a.p,b.p,progress);camera.position.set(lerp(a.pos[0],b.pos[0],blend),lerp(a.pos[1],b.pos[1],blend),lerp(a.pos[2],b.pos[2],blend));lookAt.set(lerp(a.look[0],b.look[0],blend),lerp(a.look[1],b.look[1],blend),lerp(a.look[2],b.look[2],blend));camera.position.x+=pointer.x*(mobile?.025:.13);camera.position.y-=pointer.y*.08;camera.lookAt(lookAt);
 const assemble=ease(.18,.32,progress),final=ease(.75,.87,progress);
 const reveal=1-ease(.13,.215,progress)+ease(.765,.835,progress);
 letterMaterial.opacity=clamp(reveal,0,1);letterMaterial.depthWrite=reveal>.98;letter.visible=reveal>.005;
 letter.rotation.set(.16+Math.sin(t*.35)*.035,lerp(-.38,.18,final)+Math.sin(t*.3)*.06+Math.sin(progress*Math.PI)*.22,-.055+Math.sin(t*.23)*.025);
 idea.position.set(0,lerp(Math.sin(t*.65)*.12,core.y,final),lerp(0,core.z,final));
 idea.scale.setScalar(lerp(lerp(1.55,.7,ease(.06,.215,progress)),1.15,final));
 orbits.visible=progress<.20;orbits.rotation.y=t*.07;orbits.rotation.z=Math.sin(t*.15)*.1;orbits.scale.setScalar(mobile?.62:1);orbitMaterial.opacity=.2*(1-ease(.10,.20,progress));
 design.visible=progress>.13;marketing.visible=progress>.28;automation.visible=progress>.48;

 design.position.set(lerp(0,targets[0].x,final),lerp(0,targets[0].y,final),lerp(-12,targets[0].z,final));design.scale.setScalar(lerp(1,.65,final));design.rotation.y=lerp(Math.sin(ease(.26,.35,progress)*Math.PI)*.12,0,final);website.scale.setScalar(lerp(.04,1,assemble));pieces.forEach(({mesh,from,to,spin},i)=>{mesh.visible=progress<.35;mesh.position.lerpVectors(from,to,assemble);mesh.rotation.set(lerp(spin,0,assemble),lerp(-spin,0,assemble),lerp(spin,0,assemble));mesh.position.y+=Math.sin(t*.6+i)*.018;mesh.scale.setScalar(lerp(1,.01,ease(.29,.35,progress)))});
 marketing.position.set(0,0,0);marketing.scale.setScalar(1);
 [search,social,ads].forEach((node,i)=>{const from=[[-5,2,-26],[5,-1,-30],[-4,-3,-34]][i],to=targets[i+1];node.position.set(lerp(from[0],to.x,final),lerp(from[1],to.y,final)+Math.sin(t*.5+i)*.025,lerp(from[2],to.z,final));node.scale.setScalar(lerp(1,.7,final));node.rotation.y=lerp(i===0?.14:i===1?-.2:0,0,final)});
 automation.position.set(0,0,0);nodes.forEach((node,i)=>{nodeEnd.copy(nodeTargets[i]);node.position.lerpVectors(original[i],nodeEnd,final);node.position.y+=Math.sin(t*.7+i)*.025;node.scale.setScalar(lerp(1,.72,final)+Math.sin(t*.65+i)*.003)});
 links.forEach((link,i)=>{const start=nodes[i].position,end=nodes[i+1].position;link.position.copy(start).lerp(end,.5);direction.subVectors(end,start);link.scale.set(1,direction.length(),1);link.quaternion.setFromUnitVectors(up,direction.normalize());pulses[i].position.copy(start).lerp(end,(t*.18+i*.16)%1)});finalLinks.visible=final>.02;if(finalLinks.visible){scene.updateMatrixWorld(true);synapses.forEach(({mesh,pulse,a,b},i)=>{a.getWorldPosition(startPoint);b.getWorldPosition(endPoint);endPoint.lerp(startPoint,1-ease(.76,.94,progress));mesh.position.copy(startPoint).lerp(endPoint,.5);direction.subVectors(endPoint,startPoint);mesh.scale.set(1,Math.max(.0001,direction.length()),1);mesh.quaternion.setFromUnitVectors(up,direction.normalize());pulse.position.copy(startPoint).lerp(endPoint,(t*.12+i*.09)%1)})}
 particles.rotation.y=Math.sin(t*.04)*.015;light.intensity=3.8+Math.sin(t*.4)*.04;renderer.render(scene,camera);raf=requestAnimationFrame(frame)}
 function wake(){if(alive&&contextHealthy&&inView&&!document.hidden&&!raf){last=0;raf=requestAnimationFrame(frame)}}const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView&&raf){cancelAnimationFrame(raf);raf=0}wake()});observer.observe(host);document.addEventListener('visibilitychange',wake);
 const contextLost=(e:Event)=>{e.preventDefault();contextHealthy=false;host.closest('.cinema')?.classList.add('webgl-fallback');host.closest('.cinema')?.classList.remove('webgl-ready');if(raf)cancelAnimationFrame(raf);raf=0};renderer.domElement.addEventListener('webglcontextlost',contextLost);
 wake();return {ready,setProgress(p:number){progress=clamp(p,0,1);wake()},dispose(){if(!alive)return;alive=false;disposed=true;cancelAnimationFrame(raf);ro.disconnect();observer.disconnect();window.removeEventListener('pointermove',pointerMove);document.removeEventListener('visibilitychange',wake);renderer.domElement.removeEventListener('webglcontextlost',contextLost);textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove()}};
}
