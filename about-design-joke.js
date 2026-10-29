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

.radio-channel{display:flex;align-items:center;justify-content:space-between;gap:12px;color:#ef3c34;font:700 10px/1.4 monospace;letter-spacing:.14em;text-transform:uppercase}
.radio-signal{display:flex;align-items:center;gap:3px;height:20px}
.radio-signal i{display:block;width:3px;height:8px;background:currentColor;border-radius:2px}
.radio-signal i:nth-child(2n){height:16px}.radio-signal i:nth-child(3n){height:22px}
#about .design-joke-back .radio-speaker{display:block;color:#ef3c34;font:700 10px/1.4 monospace;letter-spacing:.12em;margin:0 0 8px}
#about .design-joke-back .radio-reply{border-left:2px solid #ef3c3466;padding-left:16px}
#about .design-joke-front .eyebrow{display:flex;align-items:center;gap:10px}
#about .design-joke-front .eyebrow svg{width:18px;height:18px}
@media(prefers-reduced-motion:reduce){.design-joke-inner{transition:none}}
`;document.head.append(style);
const setup=()=>{const card=document.querySelector("#about .about-note");if(!card)return false;if(card.dataset.jokeFlip)return true;card.dataset.jokeFlip="true";
const padding=getComputedStyle(card).padding;
const inner=document.createElement("div");inner.className="design-joke-inner";
const front=document.createElement("div");front.className="design-joke-front";front.style.padding=padding;while(card.firstChild)front.append(card.firstChild);
const back=document.createElement("div");back.className="design-joke-back";back.style.padding=padding;
back.innerHTML='<div class="radio-channel"><span>TEAM RADIO · CH 01</span><span class="radio-signal" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div><div><span class="radio-speaker">PIT WALL</span><h3>Keep calm.<br><em>Trust the process.</em></h3></div><div class="radio-reply"><span class="radio-speaker">HIYA</span><p>Copy that. One idea at a time.<br>Test it. Learn. Go again.</p></div><span class="joke-timing">RADIO CHECK → ALL CLEAR → LET’S GO</span>';
const label=front.querySelector(".eyebrow");
if(label)label.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2M6 10v9H5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h1Zm12 0v9h1a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-1ZM19 19c0 2-3 3-5 3"/></svg>TEAM RADIO / A LITTLE ABOUT ME';
inner.append(front,back);card.append(inner);card.classList.add("design-joke-flip");card.tabIndex=0;return true};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();