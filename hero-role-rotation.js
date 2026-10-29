/* Cycle the landing role line with sequential typing dots between messages. */
(() => {
const messages=['PRODUCT · UX · EXPERIENCE DESIGNER','Open to full-time roles · May 2027','MDes @MassArt | MIT'];
const phases=[{text:messages[0],delay:3800},{text:'.',delay:300},{text:'..',delay:300},{text:'...',delay:600},{text:messages[1],delay:3800},{text:'.',delay:300},{text:'..',delay:300},{text:'...',delay:600},{text:messages[2],delay:3800}];
const setup=()=>{
 const kicker=document.querySelector('.hero .hero-kicker');if(!kicker)return false;
 if(kicker.dataset.roleRotation)return true;kicker.dataset.roleRotation='true';
 const node=Array.from(kicker.childNodes).find(n=>n.nodeType===3&&n.textContent.includes('PRODUCT DESIGNER'));
 if(!node)return true;node.textContent='';
 const slot=document.createElement('span');slot.className='hero-role-status';slot.setAttribute('role','img');slot.setAttribute('aria-label',messages.join('. '));slot.title=messages.join(' · ');
 const text=document.createElement('span');text.className='hero-role-message';text.setAttribute('aria-hidden','true');text.textContent=messages[0];slot.append(text);kicker.append(slot);
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let phase=0,timer,visible=true;
 const allowed=()=>visible&&!document.hidden&&!reduce.matches&&!document.getElementById('lights-out');
 const next=()=>{
   if(!allowed()){timer=setTimeout(next,700);return;}
   phase=(phase+1)%phases.length;text.textContent=phases[phase].text;slot.classList.toggle('is-typing',phases[phase].text[0]==='.');
   timer=setTimeout(next,phases[phase].delay);
 };
 const resume=()=>{clearTimeout(timer);if(!reduce.matches)timer=setTimeout(next,phases[phase].delay);};
 document.addEventListener('visibilitychange',resume);
 reduce.addEventListener?.('change',()=>{clearTimeout(timer);if(reduce.matches){phase=0;text.textContent=messages[0];slot.classList.remove('is-typing');}else resume();});
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;clearTimeout(timer);if(visible)resume();},{threshold:.15});observer.observe(kicker.closest('.hero'));}
 resume();return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});}
})();
