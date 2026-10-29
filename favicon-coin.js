/* Round HP coin favicon: pause, flip once, then pause again. */
(() => {
  const link=document.querySelector('link[data-hp-coin]');if(!link)return;
  const image=new Image();image.src='./favicon-coin-red.png?v=20261029-smooth';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let timer,frame;
  const rest=()=>{link.href=image.src;};
  const schedule=()=>{clearTimeout(timer);if(!document.hidden&&!reduce.matches)timer=setTimeout(flip,6000);};
  const flip=()=>{
    if(document.hidden||reduce.matches){rest();schedule();return;}
    const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const start=performance.now();let last=-100;
    const tick=now=>{
      const progress=Math.min(1,(now-start)/1800);
      if(document.hidden||reduce.matches){rest();schedule();return;}
      if(now-last>=30||progress===1){
        last=now;ctx.clearRect(0,0,64,64);
        const eased=.5-.5*Math.cos(progress*Math.PI);
        const angle=eased*Math.PI*2;
        const width=Math.max(.055,Math.abs(Math.cos(angle)));
        ctx.save();ctx.translate(32,32);ctx.scale(width,1);
        ctx.drawImage(image,-32,-32,64,64);ctx.restore();
        link.href=canvas.toDataURL('image/png');
      }
      if(progress<1)frame=requestAnimationFrame(tick);else{rest();schedule();}
    };
    frame=requestAnimationFrame(tick);
  };
  image.onload=()=>{rest();schedule();};
  document.addEventListener('visibilitychange',()=>{clearTimeout(timer);cancelAnimationFrame(frame);rest();schedule();});
  reduce.addEventListener?.('change',()=>{clearTimeout(timer);cancelAnimationFrame(frame);rest();schedule();});
})();
