(() => {
const style=document.createElement("style");
style.textContent=`
.adobe-role-dialog{width:min(620px,calc(100vw - 40px));max-height:calc(100dvh - 48px);box-sizing:border-box;overflow:auto;padding:40px;border:1px solid #ffffff30;border-top:4px solid #ef3c34;border-radius:12px;background:#171c18;color:#f6efe3;box-shadow:0 30px 90px #0009}
.adobe-role-dialog::backdrop{background:#000b;backdrop-filter:blur(7px)}
.adobe-role-dialog h2{font-size:clamp(25px,4vw,36px);line-height:1.15;margin:12px 35px 24px 0}
.adobe-role-dialog .role-date,.adobe-role-dialog .role-location{font-size:15px;font-weight:700;margin:8px 0;color:#d2d1c9}
.adobe-role-dialog ul{margin:26px 0 0;padding:24px 0 0 21px;border-top:1px solid #ffffff25}
.adobe-role-dialog li{font-size:16px;line-height:1.65;margin:0 0 14px;padding-left:4px}
.adobe-role-dialog .adobe-close{position:absolute;right:18px;top:16px;border:1px solid #ffffff40;border-radius:50%;width:34px;height:34px;color:#fff;background:#ffffff08;font:24px/1 sans-serif;cursor:pointer}
.adobe-role-dialog[open]{animation:adobePopupIn 220ms ease-out}
#experience .experience-entry:first-child{cursor:pointer}
@keyframes adobePopupIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
@media(max-width:600px){.adobe-role-dialog{padding:30px 24px}}
@media(prefers-reduced-motion:reduce){.adobe-role-dialog[open]{animation:none}}
`;document.head.append(style);
const cueStyle=document.createElement("style");cueStyle.textContent=`
#experience .experience-entry:first-child .adobe-popup-cue{position:absolute;right:24px;bottom:24px;width:42px;height:42px;border-radius:12px;border:1px solid #ef3c3466;background:#ef3c340d;color:#ef3c34;display:grid;place-items:center;pointer-events:none;transition:background .3s,border-color .3s,transform .3s;animation:adobeCuePulse 3.4s ease-in-out infinite}
.adobe-popup-cue svg{width:32px;height:32px;overflow:visible}.adobe-popup-cue rect,.adobe-popup-cue path{stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.adobe-popup-cue .cue-sheet-back{opacity:.45}.adobe-popup-cue .cue-sheet-front{fill:#1b201b}.adobe-popup-cue .cue-arrow{transition:transform .3s}
#experience .experience-entry:first-child:hover .adobe-popup-cue,#experience .experience-entry:first-child:focus-visible .adobe-popup-cue{background:#ef3c3420;border-color:#ef3c34;animation:none;transform:translateY(-3px)}
#experience .experience-entry:first-child:hover .cue-arrow{transform:translate(1px,-1px)}
@keyframes adobeCuePulse{0%,75%,100%{box-shadow:0 0 0 0 #ef3c3400}85%{box-shadow:0 0 0 6px #ef3c3418}}
@media(prefers-reduced-motion:reduce){#experience .experience-entry:first-child .adobe-popup-cue{animation:none;transition:none}}
`;document.head.append(cueStyle);
const subtle=document.createElement("style");subtle.textContent=`
#experience .experience-entry:first-child .adobe-popup-cue,
#experience .experience-entry:first-child:hover .adobe-popup-cue,
#experience .experience-entry:first-child:focus-visible .adobe-popup-cue{width:24px;height:24px;right:26px;bottom:27px;border:0;background:transparent;border-radius:0;box-shadow:none;animation:none;color:#f6efe366;transform:none;transition:color 220ms ease,transform 220ms ease}
#experience .experience-entry:first-child .adobe-popup-cue svg{width:20px;height:20px}
#experience .experience-entry:first-child .adobe-popup-cue path{stroke-width:1.4}
#experience .experience-entry:first-child:hover .adobe-popup-cue{color:#f6efe3bb;transform:translate(2px,-2px)}
@media(prefers-reduced-motion:reduce){#experience .experience-entry:first-child:hover .adobe-popup-cue{transform:none}}
`;document.head.append(subtle);
const brandStyle=document.createElement("style");brandStyle.textContent=`
#experience .experience-entry:first-child .adobe-brand-mark{position:absolute;right:26px;top:36px;width:40px;height:40px;display:block;color:#f6efe3;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity 260ms ease,transform 300ms ease}
#experience .experience-entry:first-child .adobe-brand-mark svg{width:100%;height:100%}
#experience .experience-entry:first-child:hover .adobe-brand-mark,#experience .experience-entry:first-child:focus-within .adobe-brand-mark{opacity:.4;transform:none}
@media(hover:none){#experience .experience-entry:first-child .adobe-brand-mark{opacity:.4;transform:none}}
@media(prefers-reduced-motion:reduce){#experience .experience-entry:first-child .adobe-brand-mark{transition:none}}
`;document.head.append(brandStyle);
const setup=()=>{
const card=document.querySelector("#experience .experience-entry");if(!card)return false;
if(card.dataset.adobePopup)return true;card.dataset.adobePopup="true";
const cue=document.createElement("span");cue.className="adobe-popup-cue";cue.setAttribute("aria-hidden","true");
cue.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M7 6h11v11"/></svg>';card.append(cue);
const logo=document.createElement("span");logo.className="adobe-brand-mark";logo.setAttribute("aria-hidden","true");
logo.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h8.8L0 21V0Zm15.2 0H24v21L15.2 0ZM12 7.7 17.6 21h-3.8l-1.6-4.2H8.1L12 7.7Z"/></svg>';card.append(logo);
const dialog=document.createElement("dialog");dialog.className="adobe-role-dialog";dialog.setAttribute("aria-labelledby","adobe-role-title");
dialog.innerHTML='<button type="button" class="adobe-close" aria-label="Close Adobe experience">×</button><h2 id="adobe-role-title">Adobe Student Ambassador | Adobe</h2><p class="role-date">Jul 2026 – Present</p><p class="role-location">Boston, MA</p><ul><li>Drive student engagement and tool adoption across campus by promoting Adobe Creative Cloud resources.</li><li>Create targeted social media content to educate students on design tools and workflows.</li></ul>';
document.body.append(dialog);
card.setAttribute("role","button");card.setAttribute("aria-haspopup","dialog");card.setAttribute("aria-label","View Adobe Student Ambassador experience");card.tabIndex=0;
const open=()=>{if(!dialog.open)dialog.showModal()};
card.addEventListener("click",open);card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open()}});
dialog.querySelector("button").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()});
dialog.addEventListener("close",()=>card.focus({preventScroll:true}));
return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();