(() => {
const slides=[
{src:"./assets/ferrari-red-studio.png",alt:"Ferrari Formula 1 studio artwork",credit:"",url:""},
{src:"https://upload.wikimedia.org/wikipedia/commons/d/d1/FIA_F1_Austria_2019_Nr._16_Leclerc_1.jpg",alt:"Charles Leclerc’s Ferrari at the 2019 Austrian Grand Prix",credit:"Lukas Raich · CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:FIA_F1_Austria_2019_Nr._16_Leclerc_1.jpg",license:"https://creativecommons.org/licenses/by-sa/4.0/"},
{src:"https://upload.wikimedia.org/wikipedia/commons/5/5e/Felipe_Massa_2012_Malaysia_Qualify.jpg",alt:"Felipe Massa’s Ferrari at the 2012 Malaysian Grand Prix",credit:"Morio · CC BY-SA 3.0",url:"https://commons.wikimedia.org/wiki/File:Felipe_Massa_2012_Malaysia_Qualify.jpg",license:"https://creativecommons.org/licenses/by-sa/3.0/"}
];
const style=document.createElement("style");style.textContent=`
#about .photo-note{position:relative}
#about .photo-note>img{transition:opacity 350ms ease}
.ferrari-slideshow-toggle{position:absolute;right:13px;bottom:12px;border:0;background:transparent;color:#272727;cursor:pointer;font:16px/1 sans-serif;padding:5px}
.ferrari-photo-credit{display:block;font:7px/1.3 sans-serif!important;letter-spacing:0!important;color:#555;text-align:center;margin-top:4px;min-height:10px}
.ferrari-photo-credit a{color:inherit}
@media(prefers-reduced-motion:reduce){#about .photo-note>img{transition:none}}
`;document.head.append(style);
const setup=()=>{
const card=document.querySelector("#about .photo-note"),image=card?.querySelector("img");if(!image)return false;
if(card.dataset.slideshow)return true;card.dataset.slideshow="true";
let index=0,visible=false,paused=matchMedia("(prefers-reduced-motion:reduce)").matches,busy=false;
const ready=slides.map((slide,i)=>i===0);
slides.slice(1).forEach((slide,i)=>{const preload=new Image();preload.onload=()=>ready[i+1]=true;preload.src=slide.src});
const credit=document.createElement("small");credit.className="ferrari-photo-credit";card.append(credit);
const button=document.createElement("button");button.type="button";button.className="ferrari-slideshow-toggle";button.setAttribute("aria-label",paused?"Play Ferrari slideshow":"Pause Ferrari slideshow");button.textContent=paused?"▶":"Ⅱ";card.append(button);
button.addEventListener("click",event=>{event.stopPropagation();paused=!paused;button.textContent=paused?"▶":"Ⅱ";button.setAttribute("aria-label",paused?"Play Ferrari slideshow":"Pause Ferrari slideshow")});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting}).observe(card);
setInterval(()=>{
if(paused||!visible||document.hidden||busy)return;
let next=(index+1)%slides.length;while(next!==index&&!ready[next])next=(next+1)%slides.length;if(next===index)return;
busy=true;image.style.opacity="0";
setTimeout(()=>{index=next;const slide=slides[index];image.src=slide.src;image.alt=slide.alt;credit.replaceChildren();if(slide.credit){const source=document.createElement("a");source.href=slide.url;source.target="_blank";source.rel="noreferrer";source.textContent=slide.credit;credit.append(source);const license=document.createElement("a");license.href=slide.license;license.target="_blank";license.rel="license noreferrer";license.textContent=" · license";credit.append(license)}
const show=()=>{image.style.opacity="1";busy=false};if(image.complete)show();else{image.addEventListener("load",show,{once:true});image.addEventListener("error",()=>{image.src=slides[0].src;show()},{once:true})}},350)
},3500);return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();