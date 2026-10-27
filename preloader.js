/* F1 start-lights intro. Plays once per visit, before the home page, then fades out. */
(() => {
  const KEY = "hiya-lights-out";
  try { if (sessionStorage.getItem(KEY) === "1") return; } catch (e) {}

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STEP = reduce ? 160 : 650;   // gap between each red light
  const HOLD = reduce ? 200 : 750;   // all five lit, engines screaming
  const AFTER = reduce ? 350 : 950;  // lights out, then the handover to the site

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
@media(prefers-reduced-motion:reduce){#lights-out,#lights-out .lo-gantry i,#lights-out .lo-skip svg{transition:none}}
`;

  const style = document.createElement("style");
  style.textContent = css;

  const overlay = document.createElement("div");
  overlay.id = "lights-out";
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
    overlay.classList.add("lo-leave");
    setTimeout(() => {
      overlay.remove();
      style.remove();
      root.style.overflow = prevOverflow;
    }, reduce ? 0 : 600);
  };

  lights.forEach((light, i) => {
    later(() => {
      light.classList.add("on");
      status.textContent = STATUS[i];
    }, 450 + i * STEP);
  });

  const allLit = 450 + (lights.length - 1) * STEP;
  later(() => {
    lights.forEach((l) => l.classList.remove("on"));
    overlay.classList.add("lo-go");
    status.textContent = GO;
  }, allLit + HOLD);
  later(finish, allLit + HOLD + AFTER);

  overlay.querySelector(".lo-skip").addEventListener("click", finish);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") finish(); }, { once: true });
})();
