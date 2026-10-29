/* Contact invitation with a delayed F1-style callout. */
(() => {
const setup=()=>{
 const section=document.querySelector('#contact'),content=section?.querySelector('.contact-content'),heading=content?.querySelector('h2');
 if(!heading)return false;if(section.dataset.radioInvite)return true;section.dataset.radioInvite='true';
 heading.innerHTML='Hiring for product,<br>UX or experience<br>design? Let’s <em>talk.</em>';
 const row=document.createElement('div');row.className='contact-invite-row';
 heading.before(row);row.append(heading);
 const intro=content.querySelector(':scope > p:not(.eyebrow)');if(intro)intro.remove();
 const callout=document.createElement('div');callout.className='contact-say-hi';
 const link=document.createElement('a');link.className='contact-say-hi-link';
 link.href=section.querySelector('.key-M')?.getAttribute('href')||section.querySelector('a[href^="mailto:"]')?.href||'#contact';
 link.setAttribute('aria-label','Say hi to Hiya by email');
 link.innerHTML='<span>Say hi</span>';
 callout.append(link);row.append(callout);

 const prompts=['Have a role?','A project?','A good question?'].map((label,index)=>{
   const wrapper=document.createElement('div');wrapper.className='contact-say-hi contact-prompt contact-prompt-'+(index+1);
   const anchor=document.createElement('a');anchor.className='contact-say-hi-link contact-prompt-link';anchor.href=link.href;anchor.textContent=label;
   wrapper.append(anchor);row.append(wrapper);return wrapper;
 });
 const reveal=()=>{
   setTimeout(()=>callout.classList.add('is-visible'),900);
   prompts.forEach((prompt,index)=>setTimeout(()=>prompt.classList.add('is-visible'),1200+index*350));
 };
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}},{threshold:.25});observer.observe(row);}else reveal();
 return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});}
})();
