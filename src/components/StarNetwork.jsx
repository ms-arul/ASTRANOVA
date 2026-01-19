import React, { useEffect, useRef } from "react";

export default function StarNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);

      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();

    const rand = (min, max) => Math.random() * (max - min) + min;

    // ✅ Auto optimize star count based on screen size
    const getStarCount = () => {
      if (w < 480) return 60;
      if (w < 768) return 85;
      if (w < 1024) return 110;
      return 140;
    };

    const stars = [];
    let STAR_COUNT = getStarCount();

    // ✅ Faster drift
    const makeStar = () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(1.2, 2.8),
      vx: rand(-0.55, 0.55),
      vy: rand(-0.55, 0.55),
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(makeStar());

    const onResize = () => {
      resize();
      stars.length = 0;
      STAR_COUNT = getStarCount();
      for (let i = 0; i < STAR_COUNT; i++) stars.push(makeStar());
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onTouch = (e) => {
      if (!e.touches?.length) return;
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // ✅ Strong Repulse
    const REPULSE_RADIUS = w < 768 ? 130 : 180;
    const REPULSE_FORCE = w < 768 ? 6.5 : 8.5;

    const LINK_DIST = w < 768 ? 120 : 170;
    const MAX_LINKS_PER_STAR = w < 768 ? 3 : 5;

    let lastTime = 0;
    const FPS = w < 768 ? 35 : 55;
    const frameInterval = 1000 / FPS;

    function animate(time) {
      const delta = time - lastTime;
      if (delta < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      // ✅ soft trail
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      // ✅ Move + Repulse
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const dx = s.x - mouse.current.x;
        const dy = s.y - mouse.current.y;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < REPULSE_RADIUS * REPULSE_RADIUS) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;

          s.x += (dx / dist) * force * REPULSE_FORCE;
          s.y += (dy / dist) * force * REPULSE_FORCE;

          // small burst
          s.vx += (dx / dist) * force * 0.05;
          s.vy += (dy / dist) * force * 0.05;

          // clamp
          s.vx = Math.max(-0.9, Math.min(0.9, s.vx));
          s.vy = Math.max(-0.9, Math.min(0.9, s.vy));
        }
      }

      // ✅ Draw gradient network lines (Red ↔ Blue)
      ctx.lineWidth = 1;

      for (let i = 0; i < stars.length; i++) {
        let links = 0;
        const a = stars[i];

        for (let j = i + 1; j < stars.length; j++) {
          if (links >= MAX_LINKS_PER_STAR) break;

          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < LINK_DIST * LINK_DIST) {
            const dist = Math.sqrt(dist2);
            const t = dist / LINK_DIST; // 0 near, 1 far

            // ✅ Red -> Purple -> Blue blend
            const r = Math.floor(255 - 120 * t);
            const g = Math.floor(50 + 40 * (1 - t));
            const bl = Math.floor(90 + 165 * t);

            ctx.globalAlpha = 0.45 * (1 - t);
            ctx.strokeStyle = `rgba(${r},${g},${bl},0.95)`;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            links++;
          }
        }
      }

      ctx.globalAlpha = 1;

      // ✅ Stars: White center + red/blue glow
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        ctx.beginPath();
        ctx.shadowBlur = w < 768 ? 14 : 18;
        ctx.shadowColor = "rgba(255,60,60,0.6)"; // 🔴 red glow
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // ✅ tiny blue outer glow (extra premium)
        ctx.beginPath();
        ctx.shadowBlur = w < 768 ? 10 : 14;
        ctx.shadowColor = "rgba(80,120,255,0.55)"; // 🔵 blue glow
        ctx.arc(s.x, s.y, s.r * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    ctx.clearRect(0, 0, w, h);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div
      className="starBgWrap"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
