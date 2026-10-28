(() => {
const roles=[
{title:"Graduate Research Assistant | MassArt",bullets:["Conduct qualitative user research across entrepreneurship, international education, and sustainability domains.","Synthesize research findings into actionable design recommendations to support institutional projects."]},
{title:"Social Media Designer Intern | NYSERDA",bullets:["Designed visual assets using Adobe Creative Cloud tailored to target audience preferences and strategic goals.","Translated user insights into effective visual communication and digital content strategies."]},
{title:"UI/UX Designer | Le Panthère",bullets:["Redesigned website navigation architecture to improve overall usability and user flow.","Developed and refined Figma wireframes and high-fidelity interfaces based on usability testing and stakeholder input."]},
{title:"Freelance Graphic Designer & UX Researcher | Upwork",bullets:["Executed user interviews, competitive analysis, journey mapping, and usability testing to identify friction points.","Built intuitive user flows and interface designs informed directly by primary user research."]},
{title:"Graphic Design Intern | SolidSalt Communication Pvt Ltd",bullets:["Designed digital interfaces for Indo GSP prioritizing layout structure, usability, and clear visual hierarchy.","Created brand-aligned product packaging for Nirbelo, ensuring consistent visual identity."]},
{title:"Branding & Concept Designer | Blue Chisel",bullets:["Created complete visual brand identities for Mementos and Grow & Grub.","Produced visual guidelines including custom typography, color palettes, and illustration assets."]}
];
const style=document.createElement("style");style.textContent=`
#experience .experience-entry{cursor:pointer}
#experience .experience-entry .experience-popup-cue{position:absolute;right:26px;bottom:27px;width:24px;height:24px;color:#f6efe366;pointer-events:none;transition:color 220ms ease,transform 220ms ease}
#experience .experience-entry .experience-popup-cue svg{display:block;width:20px;height:20px;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
#experience .experience-entry:hover .experience-popup-cue,#experience .experience-entry:focus-visible .experience-popup-cue{color:#f6efe3bb;transform:translate(2px,-2px)}
@media(prefers-reduced-motion:reduce){#experience .experience-entry .experience-popup-cue{transition:none;transform:none!important}}
`;document.head.append(style);
const brandStyle=document.createElement("style");brandStyle.textContent=`
#experience .experience-entry .experience-brand-mark{position:absolute;top:36px;right:26px;width:64px;height:42px;display:flex;align-items:center;justify-content:center;color:#f6efe3;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity 260ms ease,transform 300ms ease}
#experience .experience-entry .experience-brand-mark img{max-width:64px;max-height:40px;object-fit:contain;filter:grayscale(1) brightness(0) invert(.92);display:block}
#experience .experience-entry .experience-brand-mark span{font-size:12px;font-weight:800;line-height:1.1;text-align:center;letter-spacing:-.03em}
#experience .experience-entry:hover .experience-brand-mark,#experience .experience-entry:focus-within .experience-brand-mark{opacity:.4;transform:none}
@media(hover:none){#experience .experience-entry .experience-brand-mark{opacity:.4;transform:none}}
@media(prefers-reduced-motion:reduce){#experience .experience-entry .experience-brand-mark{transition:none}}
`;document.head.append(brandStyle);
const suppliedStyle=document.createElement("style");suppliedStyle.textContent=`
.adobe-role-dialog h2 .role-company{color:#ef3c34}
#experience .experience-entry .experience-brand-mark.supplied-brand img{filter:grayscale(1) contrast(3);mix-blend-mode:screen}
#experience .experience-entry .experience-brand-mark.brand-massart img{filter:brightness(0) invert(.94);mix-blend-mode:normal}
#experience .experience-entry .experience-brand-mark.brand-upwork img{border-radius:50%;filter:grayscale(1) contrast(3)}
#experience .experience-entry .experience-brand-mark.brand-nyserda img{filter:grayscale(1) contrast(8)}
`;document.head.append(suppliedStyle);
const logoSizeStyle=document.createElement("style");logoSizeStyle.textContent=`
#experience .experience-entry .experience-brand-mark.supplied-brand{width:64px;height:56px;right:26px;top:30px;background:transparent!important;border:0!important;box-shadow:none!important;mix-blend-mode:screen}
#experience .experience-entry .experience-brand-mark.supplied-brand img{width:64px;height:56px;max-width:64px;max-height:56px;object-fit:contain;mix-blend-mode:normal;filter:grayscale(1) contrast(8);background:transparent;border:0;box-shadow:none}
#experience .experience-entry .experience-brand-mark.brand-massart img{filter:brightness(0) invert(.94)}
#experience .experience-entry .experience-brand-mark.brand-upwork img{width:48px;height:48px;border-radius:50%;filter:grayscale(1) contrast(8)}
#experience .experience-entry .experience-brand-mark.brand-le-panthere img{width:64px;height:64px;max-height:64px;filter:grayscale(1) contrast(10)}
#experience .experience-entry .experience-brand-mark.brand-solidsalt img{width:52px;height:56px;filter:grayscale(1) contrast(10)}
#experience .experience-entry .experience-brand-mark.brand-nyserda img{filter:grayscale(1) contrast(12)}
`;document.head.append(logoSizeStyle);
const setup=()=>{
const cards=[...document.querySelectorAll("#experience .experience-entry")];if(cards.length!==7)return false;
cards.slice(1).forEach((card,i)=>{
if(card.dataset.rolePopup)return;card.dataset.rolePopup="true";
const brandNames=["MassArt","NYSERDA","Le Panthère","Upwork","SolidSalt","Blue Chisel"];
const files=["massart","nyserda","le-panthere","upwork","solidsalt",null];
const mark=document.createElement("span");mark.className="experience-brand-mark supplied-brand brand-"+(files[i]||"bluechisel");mark.setAttribute("aria-hidden","true");
const img=document.createElement("img");img.alt="";img.src=files[i]?"./assets/experience-"+files[i]+"-supplied.png":"https://bluechisel.com/theme_bluechisel/static/src/img/bluechisel_white_logo.png";mark.append(img);card.append(mark);
const role=roles[i];const dialog=document.createElement("dialog");dialog.className="adobe-role-dialog";const titleId="experience-popup-title-"+(i+2);dialog.setAttribute("aria-labelledby",titleId);
const close=document.createElement("button");close.type="button";close.className="adobe-close";close.setAttribute("aria-label","Close experience details");close.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const heading=document.createElement("h2");heading.id=titleId;const [roleName,company]=role.title.split(' | ');heading.append(document.createTextNode(roleName+' | '));const companyText=document.createElement('span');companyText.className='role-company';companyText.textContent=company;heading.append(companyText);dialog.append(close,heading);
const meta=[...card.querySelectorAll(".experience-meta p")];meta.forEach((source,j)=>{const p=document.createElement("p");p.className=j===0?"role-date":"role-location";p.textContent=source.textContent;dialog.append(p)});
const ul=document.createElement("ul");role.bullets.forEach(text=>{const li=document.createElement("li");li.textContent=text;ul.append(li)});dialog.append(ul);document.body.append(dialog);
const cue=document.createElement("span");cue.className="experience-popup-cue";cue.setAttribute("aria-hidden","true");cue.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M7 6h11v11"/></svg>';card.append(cue);
card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-haspopup","dialog");card.setAttribute("aria-label","View "+role.title+" experience");
const open=()=>{if(!dialog.open)dialog.showModal()};
card.addEventListener("click",open);card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open()}});
close.addEventListener("click",()=>dialog.close());dialog.addEventListener("click",event=>{if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close()});dialog.addEventListener("close",()=>card.focus({preventScroll:true}));
});return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();