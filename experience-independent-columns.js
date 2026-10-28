(() => {
const style=document.createElement("style");
style.textContent=`
#experience .experience-list.independent-columns{display:block!important;position:relative!important}
#experience .experience-list.independent-columns .experience-entry{position:absolute!important;left:var(--column-left)!important;top:var(--column-top)!important;width:var(--column-width)!important;box-sizing:border-box!important;transition:height 480ms cubic-bezier(.22,1,.36,1),top 100ms linear,transform 320ms cubic-bezier(.22,1,.36,1),box-shadow 320ms ease,background 250ms ease!important}
@media(prefers-reduced-motion:reduce){#experience .experience-list.independent-columns .experience-entry{transition:none!important}}
`;document.head.append(style);
const setup=()=>{
const list=document.querySelector("#experience .experience-list");if(!list)return false;
const cards=[...list.querySelectorAll(".experience-entry")];if(cards.length!==7)return false;
list.classList.add("independent-columns");
let frame=0;
const layout=()=>{
frame=0;
const cols=window.innerWidth<=640?1:window.innerWidth<=1000?2:3;
const gap=window.innerWidth<=640?18:24;
const width=(list.clientWidth-gap*(cols-1))/cols;
const heights=Array(cols).fill(0);
cards.forEach((card,i)=>{
const col=i%cols;
card.style.setProperty("--column-left",(col*(width+gap))+"px");
card.style.setProperty("--column-width",width+"px");
card.style.setProperty("--column-top",heights[col]+"px");
heights[col]+=card.getBoundingClientRect().height+gap;
});
list.style.height=(Math.max(...heights)-gap)+"px";
};
const schedule=()=>{if(!frame)frame=requestAnimationFrame(layout)};
const observer=new ResizeObserver(schedule);observer.observe(list);cards.forEach(card=>observer.observe(card));
window.addEventListener("resize",schedule);document.fonts.ready.then(schedule);layout();return true;
};
if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();