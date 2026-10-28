(() => {
const style=document.createElement("style");style.textContent=`
#about .moodboard .about-note.design-joke-flip{padding:0!important;background:transparent!important;border:0!important;perspective:1100px;cursor:default}
.design-joke-inner{position:relative;transform-style:preserve-3d;transition:transform 650ms cubic-bezier(.22,1,.36,1)}
.design-joke-front,.design-joke-back{box-sizing:border-box;background:#2b2322;border:1px solid #ef3c3466;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.design-joke-front{position:relative}
.design-joke-back{position:absolute;inset:0;transform:rotateY(180deg);display:flex;flex-direction:column;justify-content:center;gap:20px}
#about .moodboard .about-note.design-joke-flip:hover .design-joke-inner,#about .moodboard .about-note.design-joke-flip:focus-visible .design-joke-inner{transform:rotateY(180deg)}
#about .design-joke-back .joke-label{color:#ef3c34;font-size:10px;letter-spacing:.18em;font-weight:700}
#about .design-joke-back h3{font-size:clamp(28px,3vw,46px);line-height:1.05;margin:0}
#about .design-joke-back h3 em{font-style:normal;color:#ef3c34}
#about .design-joke-back p{font-size:14px;line-height:1.5;margin:0;color:#d7cfc8}
#about .design-joke-back .joke-timing{font:11px/1.5 monospace;letter-spacing:.06em;color:#f4d84b;border-top:1px solid #ffffff24;padding-top:18px}
@media(prefers-reduced-motion:reduce){.design-joke-inner{transition:none}}
`;document.head.append(style);
const setup=()=>{const card=document.querySelector("#about .about-note");if(!card)return false;if(card.dataset.jokeFlip)return true;card.dataset.jokeFlip="true";
const padding=getComputedStyle(card).padding;
const inner=document.createElement("div");inner.className="design-joke-inner";
const front=document.createElement("div");front.className="design-joke-front";front.style.padding=padding;while(card.firstChild)front.append(card.firstChild);
const back=document.createElement("div");back.className="design-joke-back";back.style.padding=padding;
back.innerHTML='<span class="joke-label">A LITTLE REMINDER</span><h3>Keep calm.<br><em>Trust the process.</em></h3><p>Good ideas take a few practice laps.</p><span class="joke-timing">TRY → LEARN → MAKE IT BETTER</span>';
inner.append(front,back);card.append(inner);card.classList.add("design-joke-flip");card.tabIndex=0;return true};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();