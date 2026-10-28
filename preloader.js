/* F1 start-lights intro. Plays once per visit, before the home page, then fades out. */
(() => {
  const KEY = "hiya-lights-out";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function play(replay = false) {
  if (document.getElementById("lights-out")) return;


  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STEP = reduce ? 60 : 175;   // gap between each red light
  const HOLD = reduce ? 75 : 175;   // all five lit, engines screaming
  const AFTER = reduce ? 100 : 275;  // lights out, then the handover to the site

  const STATUS = [
    "Warming up the tyres…",
    "Reading the pit-wall notes…",
    "Brake bias set. Mind the apex.",
    "Formation lap done.",
    "Hold the grid…"
  ];
  const GO = "Lights out. Go, go, go.";

  const css = `
#lights-out{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(26px,5vh,46px);padding:24px;box-sizing:border-box;background:radial-gradient(120% 90% at 50% 40%,#25201d 0%,#141211 62%,#0d0c0c 100%);color:#f7f1e8;transition:opacity .55s ease,transform .55s cubic-bezier(.22,1,.36,1)}
#lights-out.lo-leave{opacity:0;transform:scale(1.025);pointer-events:none}
#lights-out .lo-gantry{display:flex;gap:clamp(10px,2.2vw,24px);padding:clamp(16px,3.4vw,44px);border:2px solid #ffffff2b;border-radius:clamp(20px,3vw,30px);background:#0a0a0a;box-shadow:0 30px 70px #0009}
#lights-out .lo-gantry i{display:block;width:clamp(42px,9vw,96px);aspect-ratio:1;border-radius:50%;background:#37150f;transition:background .12s ease,box-shadow .12s ease}
#lights-out .lo-gantry i.on{background:#ef3c34;box-shadow:0 0 30px 6px #ef3c3499,inset 0 0 20px #ff9a90aa}
#lights-out .lo-title{margin:0;font-family:"Barlow Condensed",Impact,"Arial Narrow",sans-serif;font-weight:700;font-size:clamp(40px,8vw,78px);line-height:1;letter-spacing:.01em;text-transform:uppercase;text-align:center}
#lights-out .lo-status{margin:calc(clamp(26px,5vh,46px) * -.5) 0 0;min-height:1.5em;font:500 clamp(12px,1.6vw,14px)/1.5 ui-monospace,"JetBrains Mono",SFMono-Regular,Menlo,monospace;letter-spacing:.06em;color:#b9b1a8;text-align:center}
#lights-out.lo-go .lo-status{color:#ef3c34}
#lights-out .lo-skip{display:inline-flex;align-items:center;gap:14px;padding:10px 14px;border:0;border-radius:999px;background:none;color:#cfc8bf;font:500 clamp(16px,2vw,20px)/1 system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer;transition:color .2s ease}
#lights-out .lo-skip svg{width:34px;height:20px;transition:transform .25s cubic-bezier(.22,1,.36,1)}
#lights-out .lo-skip:hover,#lights-out .lo-skip:focus-visible{color:#fff}
#lights-out .lo-skip:hover svg,#lights-out .lo-skip:focus-visible svg{transform:translateX(5px)}
#lights-out .lo-skip:focus-visible{outline:2px solid #ef3c34;outline-offset:3px}
#lights-out{gap:70px}
#lights-out .lo-gantry{gap:24px;padding:44px;border-radius:36px;box-shadow:none}
#lights-out .lo-gantry i{width:96px}
#lights-out .lo-title{font-size:64px}
#lights-out .lo-status{display:none}
#lights-out .lo-skip{font-size:24px}
#lights-out.lo-enter{animation:loReplayIn 400ms ease both}
@keyframes loReplayIn{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:none}}
@media(max-width:740px){#lights-out{gap:40px}#lights-out .lo-gantry{gap:clamp(8px,3vw,18px);padding:24px;border-radius:24px}#lights-out .lo-gantry i{width:clamp(34px,11vw,72px)}#lights-out .lo-title{font-size:clamp(32px,7vw,54px)}#lights-out .lo-skip{font-size:18px}}
@media(prefers-reduced-motion:reduce){#lights-out.lo-enter{animation:none}#lights-out,#lights-out .lo-gantry i,#lights-out .lo-skip svg{transition:none}}
`;

  const sizing = `
#lights-out{justify-content:center;align-items:center;gap:clamp(30px,5.5vh,64px);padding:24px;transition:opacity .4s ease,transform .4s cubic-bezier(.22,1,.36,1)}
#lights-out .lo-gantry{width:min(50vw,668px);box-sizing:border-box;gap:3.6%;padding:6.6%;padding:clamp(18px,3.3vw,44px);border-radius:clamp(18px,2.7vw,36px);flex-shrink:0}
#lights-out .lo-gantry i{width:auto;flex:1;min-width:0;aspect-ratio:1}
#lights-out .lo-title{font-size:clamp(28px,4.6vw,64px);max-width:90vw}
#lights-out .lo-skip{font-size:clamp(14px,1.8vw,24px);display:inline-flex}
#lights-out.lo-leave{opacity:0;transform:scale(1.015)}
html.lights-intro-running main{opacity:0;transform:translateY(12px)}
html.lights-intro-reveal main{opacity:1;transform:none;transition:opacity 450ms ease,transform 450ms cubic-bezier(.22,1,.36,1)}
@media(max-width:600px){#lights-out .lo-gantry{width:min(86vw,420px);gap:4%;padding:20px}#lights-out .lo-title{font-size:clamp(27px,6vw,36px)}}
@media(prefers-reduced-motion:reduce){html.lights-intro-running main{transform:none}html.lights-intro-reveal main{transition:none}#lights-out{transition:none}}
`;
  const style = document.createElement("style");
  style.textContent = css + sizing + `
#lights-out{gap:38px!important}
#lights-out .lo-gantry{width:min(420px,70vw)!important;padding:24px!important;gap:16px!important;border-radius:22px!important}
#lights-out .lo-gantry i{width:0!important;flex:1!important}
#lights-out .lo-title{font-size:clamp(25px,3.3vw,38px)!important}
#lights-out .lo-skip{display:none!important}
@media(max-width:500px){#lights-out .lo-gantry{width:82vw!important;padding:18px!important;gap:10px!important}}
`;

  const overlay = document.createElement("div");
  overlay.id = "lights-out";
  if (replay) overlay.classList.add("lo-enter");
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-label", "Loading Hiya Patel’s portfolio");
  overlay.innerHTML =
    '<div class="lo-gantry" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="lo-title">Lights out. Let’s go.</div>' +
    '<p class="lo-status" aria-live="polite">' + STATUS[0] + "</p>" +
    '<button type="button" class="lo-skip">Skip to work ' +
    '<svg viewBox="0 0 34 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 10h31M23 2l9 8-9 8"/></svg></button>';

  const root = document.documentElement;
  root.append(style, overlay);
  const prevOverflow = root.style.overflow;
  root.style.overflow = "hidden";
  root.classList.remove("lights-intro-reveal");
  root.classList.add("lights-intro-running");

  const lights = overlay.querySelectorAll(".lo-gantry i");
  const status = overlay.querySelector(".lo-status");
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    history.replaceState(null,"",location.pathname+location.search+"#top");
    window.scrollTo({top:0,left:0,behavior:"instant"});
    document.querySelectorAll("dialog[open]").forEach(dialog=>dialog.close());
    root.classList.remove("lights-intro-running");
    root.classList.add("lights-intro-reveal");
    overlay.classList.add("lo-leave");
    setTimeout(() => {
      overlay.remove();
      style.remove();
      root.style.overflow = prevOverflow;
      window.scrollTo({top:0,left:0,behavior:"instant"});
    }, reduce ? 0 : 475);
  };

  lights.forEach((light, i) => {
    later(() => {
      light.classList.add("on");
      status.textContent = STATUS[i];
    }, 225 + i * STEP);
  });

  const allLit = 225 + (lights.length - 1) * STEP;
  later(() => {
    lights.forEach((l) => l.classList.remove("on"));
    overlay.classList.add("lo-go");
    status.textContent = GO;
  }, allLit + HOLD);
  later(finish, allLit + HOLD + AFTER);

  overlay.querySelector(".lo-skip")?.remove();
  const onEscape = (event) => { if(event.key === "Escape") { finish(); document.removeEventListener("keydown",onEscape); } };
  document.addEventListener("keydown",onEscape);
  later(()=>document.removeEventListener("keydown",onEscape),allLit+HOLD+AFTER+700);
  }
  document.addEventListener("click",event=>{
    const mark=event.target.closest?.(".topbar .monogram, .footer-mark");
    if(!mark)return;
    event.preventDefault();event.stopImmediatePropagation();
    if(mark.matches(".footer-mark")){play(true);return;}
    document.querySelectorAll("dialog[open]").forEach(dialog=>dialog.close());
    history.replaceState(null,"",location.pathname+location.search+"#top");
    window.scrollTo({top:0,left:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"instant":"smooth"});
  },true);
  play();
})();