(() => {
const boot=()=>{
const hero=document.querySelector(".hero-copy"); if(!hero)return false;
document.documentElement.classList.add("helmet-cursor");
const notes=[
["ASK WHY. THEN GO.","I start with people, not assumptions."],
["FIND THE RACING LINE.","Make the next step feel clear and natural."],
["BETTER WITH A PIT CREW.","Share early. Listen closely. Improve together."]
];
const enhanceNotes=()=>{
const cards=[...document.querySelectorAll("#story .pit-thought")];if(cards.length!==3)return;
cards.forEach((card,i)=>{if(card.dataset.refined)return;card.dataset.refined="true";card.tabIndex=0;card.setAttribute("role","button");card.removeAttribute("aria-hidden");card.setAttribute("aria-expanded","false");card.querySelector("span").textContent=notes[i][0];const detail=document.createElement("small");detail.className="thought-detail";detail.textContent=notes[i][1];card.querySelector("span").append(detail);
const flip=()=>{const open=card.classList.toggle("is-open");card.setAttribute("aria-expanded",String(open))};card.addEventListener("click",flip);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}})});
};
enhanceNotes();const observer=new MutationObserver(enhanceNotes);observer.observe(document.getElementById("root"),{childList:true,subtree:true});return true;
};
if(!boot()){const observer=new MutationObserver(()=>{if(boot())observer.disconnect()});observer.observe(document.getElementById("root")||document.body,{childList:true,subtree:true})}
})();