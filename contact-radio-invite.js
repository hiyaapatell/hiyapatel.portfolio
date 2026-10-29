/* Contact invitation with a delayed F1-style callout. */
(() => {
const setup=()=>{
 const section=document.querySelector('#contact'),content=section?.querySelector('.contact-content'),heading=content?.querySelector('h2');
 if(!heading)return false;if(section.dataset.radioInvite)return true;section.dataset.radioInvite='true';
 heading.innerHTML='Hiring for product,<br>UX or experience<br>design? Let’s <em>talk.</em>';
 const row=document.createElement('div');row.className='contact-invite-row';
 heading.before(row);row.append(heading);
 const intro=content.querySelector(':scope > p:not(.eyebrow)');if(intro)intro.textContent=intro.textContent.replace('Let’s talk.','').trim();
 const callout=document.createElement('div');callout.className='contact-say-hi';
 const link=document.createElement('a');link.className='contact-say-hi-link';
 link.href=section.querySelector('.key-M')?.getAttribute('href')||section.querySelector('a[href^="mailto:"]')?.href||'#contact';
 link.setAttribute('aria-label','Say hi to Hiya by email');
 link.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 21V3m0 1c5-3 9 3 14 0v10c-5 3-9-3-14 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5h4v4H6zm4 4h4v4h-4zm4-4h4v4h-4" fill="currentColor"/></svg><span>Say hi</span>';
 callout.append(link);row.append(callout);
 const reveal=()=>setTimeout(()=>callout.classList.add('is-visible'),900);
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}},{threshold:.25});observer.observe(row);}else reveal();
 return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});}
})();
