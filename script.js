// Enhanced hover effects with JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const devLink = document.querySelector(".nav-dev");
  const musicLink = document.querySelector(".nav-music");

  // Dev link hover effects
  if (devLink) {
    devLink.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
    });

    devLink.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  // Music link hover effects
  if (musicLink) {
    musicLink.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
    });

    musicLink.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }
});

// // Matrix rain effect for Dev section
// (() => {
//   const canvas = document.getElementById("matrixCanvas");
//   const ctx = canvas.getContext("2d");
//   // position canvas to match wrapper size — adjust on resize
//   const resize = () => {
//     const rect = canvas.parentElement.getBoundingClientRect();
//     canvas.width = Math.min(600, rect.width * 1.8); // width control
//     canvas.height = 220;
//   };
//   resize();
//   window.addEventListener("resize", resize);

//   const letters =
//     "アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const fontSize = 14;
//   const columns = Math.floor(canvas.width / fontSize);
//   let drops = new Array(columns).fill(0);

//   // create a fresh drops array (in case width/columns changed)
//   function resetDrops() {
//     const cols = Math.floor(canvas.width / fontSize);
//     drops = new Array(cols).fill(1).map((_) => Math.floor(Math.random() * -50));
//   }

//   resetDrops();

//   let rafId = null;
//   let running = false;

//   function draw() {
//     // translucent background for trail effect
//     ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.font = fontSize + "px monospace";
//     for (let i = 0; i < drops.length; i++) {
//       const text = letters.charAt(Math.floor(Math.random() * letters.length));
//       const x = i * fontSize;
//       const y = drops[i] * fontSize;

//       // brighter head
//       ctx.fillStyle = "rgba(180,255,180,1)";
//       ctx.fillText(text, x, y);

//       // trailing dimmer characters (draw a second dimmer char slightly above)
//       ctx.fillStyle = "rgba(0,180,0,0.6)";
//       ctx.fillText(text, x, y - fontSize * 0.6);

//       drops[i] += 0.5 + Math.random() * 1.5;
//       if (drops[i] * fontSize > canvas.height + 50) {
//         drops[i] = Math.random() * -20;
//       }
//     }
//     rafId = requestAnimationFrame(draw);
//   }

//   function startRain() {
//     if (running) return;
//     running = true;
//     resetDrops();
//     draw();
//     // fade in canvas visually
//     canvas.style.opacity = 1;
//   }

//   function stopRain() {
//     if (!running) return;
//     running = false;
//     if (rafId) cancelAnimationFrame(rafId);
//     rafId = null;
//     // quick fade out of the canvas drawing
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }

//   // hook to hover of link — start on mouseenter, stop on mouseleave
//   const link = document.querySelector(".nav-dev");
//   if (link) {
//     link.addEventListener("mouseenter", startRain);
//     link.addEventListener("mouseleave", stopRain);

//     // touch support: start on touchstart, stop on touchend
//     link.addEventListener(
//       "touchstart",
//       (e) => {
//         e.preventDefault();
//         startRain();
//       },
//       { passive: false }
//     );
//     link.addEventListener("touchend", stopRain);
//   }
// })();
