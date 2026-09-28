(() => {
 const section=document.querySelector('.modality-journey');
 if(!section)return;
 const panels=[...section.querySelectorAll('.modality-panel')];
 const buttons=[...section.querySelectorAll('[data-modality-step]')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let start=0,travel=1,pending=false;
 const enabled=()=>!reduced.matches;
 const render=()=>{
  pending=false;
  const progress=Math.max(0,Math.min(1,(scrollY-start)/travel));
  document.body.classList.toggle('modality-traversing',enabled()&&scrollY>=start-2&&scrollY<=start+travel+2);
  section.style.setProperty('--journey-progress',enabled()?progress:0);
  const active=Math.round(progress*(panels.length-1));
  panels.forEach((panel,i)=>{panel.inert=enabled()&&i!==active;});
  buttons.forEach((button,i)=>{if(i===active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
 };
 const measure=()=>{
  section.classList.toggle('is-scroll-journey',enabled());
  start=section.getBoundingClientRect().top+scrollY-70;
  travel=Math.max(1,section.offsetHeight-(innerHeight-70));
  render();
 };
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(render);}};
 buttons.forEach((button,i)=>button.addEventListener('click',()=>{
  if(enabled())scrollTo({top:start+travel*i/Math.max(1,panels.length-1),behavior:reduced.matches?'instant':'smooth'});
 }));
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',measure,{passive:true});
 addEventListener('load',measure,{once:true});
 const restoreHash=()=>{if(location.hash==='#centargo'&&enabled())scrollTo({top:start+travel,behavior:'instant'});};
 addEventListener('hashchange',restoreHash);
 addEventListener('load',()=>{measure();restoreHash();},{once:true});
 reduced.addEventListener('change',measure);
 document.fonts?.ready.then(measure);
 measure();
})();
