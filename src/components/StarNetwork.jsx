import React, { useEffect, useRef } from "react";

export default function StarNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = 1; // low-end safe
    let w = 0,
      h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const rand = (a, b) => Math.random() * (b - a) + a;

    /* =====================
       STARS
    ===================== */
    const STAR_COUNT =
      w < 480 ? 50 : w < 768 ? 70 : w < 1024 ? 90 : 110;

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      r: rand(1.6, 2.6),
    }));

    /* =====================
       INTERACTION
    ===================== */
    const REPULSE_RADIUS = 120;
    const REPULSE_FORCE = 4;

    const LINK_DIST = w < 768 ? 120 : 160;
    const MAX_LINKS = 3;

    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      },
      { passive: true }
    );

    /* =====================
       STAR GRADIENT
       (Neon + Silver mix)
    ===================== */
    const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 4);
    starGradient.addColorStop(0, "rgba(255,255,255,1)");
    starGradient.addColorStop(0.35, "rgba(180,220,255,0.95)");
    starGradient.addColorStop(0.6, "rgba(0,255,240,0.65)");
    starGradient.addColorStop(1, "rgba(140,0,255,0)");

    /* =====================
       FPS CAP
    ===================== */
    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    function animate(time) {
      if (time - lastTime < interval) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      /* =====================
         GALAXY BACKGROUND
      ===================== */
      ctx.fillStyle = "rgba(6,4,20,0.22)";
      ctx.fillRect(0, 0, w, h);

      /* =====================
         MOVE STARS
      ===================== */
      for (let s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const dx = s.x - mouse.current.x;
        const dy = s.y - mouse.current.y;
        const d2 = dx * dx + dy * dy;

        if (d2 < REPULSE_RADIUS * REPULSE_RADIUS) {
          const d = Math.sqrt(d2) || 1;
          const f = (REPULSE_RADIUS - d) / REPULSE_RADIUS;
          s.x += (dx / d) * f * REPULSE_FORCE;
          s.y += (dy / d) * f * REPULSE_FORCE;
        }
      }

      /* =====================
         NETWORK LINES
         (Neon Violet + Blue)
      ===================== */
      for (let i = 0; i < stars.length; i++) {
        let links = 0;
        const a = stars[i];

        for (let j = i + 1; j < stars.length && links < MAX_LINKS; j++) {
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < LINK_DIST * LINK_DIST) {
            const t = Math.sqrt(d2) / LINK_DIST;
            ctx.globalAlpha = 0.55 * (1 - t);
            ctx.strokeStyle = "rgba(150,120,255,1)";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links++;
          }
        }
      }

      ctx.globalAlpha = 1;

      /* =====================
         DRAW STARS
      ===================== */
      for (let s of stars) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = starGradient;
        ctx.beginPath();
        ctx.arc(0, 0, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
