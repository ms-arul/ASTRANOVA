// src/components/GalaxyBackground.jsx
import React, { useEffect, useRef } from "react";

const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId;

    // ✅ FPS control (big boost)
    const isMobile = window.innerWidth < 768;
    const FPS = isMobile ? 30 : 45;
    const frameInterval = 1000 / FPS;
    let lastTime = 0;

    let bgGradient = null;

    // ✅ Resize (optimized retina)
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // ✅ limit DPR for performance
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ✅ create gradient only ONCE (not every frame)
      bgGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGradient.addColorStop(0, "rgba(0, 40, 80, 0.22)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.88)");
    };

    resize();
    window.addEventListener("resize", resize);

    // ✅ Mouse move (passive)
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      if (!e.touches?.length) return;
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // =========================
    // ⭐ STAR FIELD (FAST)
    // =========================
    class Star {
      constructor(glow = false) {
        this.glow = glow;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 1.6 + 0.2;
        this.speed = Math.random() * 0.28 + 0.04;
        this.baseOpacity = Math.random() * 0.55 + 0.18;
        this.opacity = this.baseOpacity;
        this.tw = Math.random() * 0.03 + 0.004;
      }

      update() {
        this.y -= this.speed;
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
        this.opacity += this.tw;
        if (this.opacity > 1 || this.opacity < 0.18) this.tw *= -1;
      }

      draw() {
        // ✅ only few stars glow
        if (this.glow) {
          ctx.save();
          ctx.shadowColor = "rgba(255,255,255,0.6)";
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return;
        }

        // ✅ normal stars no shadow
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // =========================
    // 🌠 Shooting Star (light)
    // =========================
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.25;
        this.len = Math.random() * 90 + 60;
        this.speed = Math.random() * 7 + 5;
        this.alpha = 0;
        this.active = false;
        this.angle = Math.PI * (Math.random() * 0.12 + 1.15);
      }

      trigger() {
        this.active = true;
        this.alpha = 1;
      }

      update() {
        if (!this.active) return;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;

        if (
          this.alpha <= 0 ||
          this.x < -200 ||
          this.y > height + 200 ||
          this.x > width + 200
        ) {
          this.active = false;
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;

        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.strokeStyle = "rgba(0,255,240,0.75)";
        ctx.shadowColor = "rgba(0,255,240,0.9)";
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // =========================
    // 💠 Floating Tech Icons (optimized)
    // =========================
    const techIcons = ["💻", "⚡", "🌐", "📡", "🧠", "🛰️", "🔗", "⚙️"];

    class TechParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.icon = techIcons[(Math.random() * techIcons.length) | 0];
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.size = Math.random() * 18 + 14;
        this.opacity = Math.random() * 0.22 + 0.18;

        // ✅ smaller repel on mobile
        this.avoidRadius = isMobile ? rand(70, 110) : rand(90, 140);
        this.avoidStrength = isMobile ? rand(0.7, 1.1) : rand(0.9, 1.3);

        this.wobble = Math.random() * 0.02 + 0.005;
        this.phase = Math.random() * Math.PI * 2;

        if (!initial) {
          if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? -40 : width + 40;
            this.y = Math.random() * height;
          } else {
            this.y = Math.random() > 0.5 ? -40 : height + 40;
            this.x = Math.random() * width;
          }
        }
      }

      update(mouse) {
        this.phase += this.wobble;
        this.x += this.vx + Math.cos(this.phase) * 0.06;
        this.y += this.vy + Math.sin(this.phase) * 0.06;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < this.avoidRadius * this.avoidRadius) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (this.avoidRadius - dist) / this.avoidRadius;
          this.x += (dx / dist) * force * 6 * this.avoidStrength;
          this.y += (dy / dist) * force * 6 * this.avoidStrength;
        }

        if (
          this.x < -80 ||
          this.x > width + 80 ||
          this.y < -80 ||
          this.y > height + 80
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // ✅ reduced glow
        ctx.shadowColor = "rgba(0,255,240,0.6)";
        ctx.shadowBlur = isMobile ? 8 : 12;

        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = "rgba(0,255,240,0.85)";
        ctx.fillText(this.icon, this.x, this.y);

        ctx.restore();
      }
    }

    // ✅ helper rand
    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    // ✅ Dynamic counts (safe for mobile)
    const STAR_COUNT = Math.min(260, Math.floor((width * height) / (isMobile ? 7000 : 5000)));
    const TECH_COUNT = Math.min(35, Math.floor((width * height) / (isMobile ? 50000 : 35000)) + 12);

    // ✅ only some stars glow
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => new Star(i % 12 === 0));
    const techParticles = Array.from({ length: TECH_COUNT }, () => new TechParticle());
    const shootingStars = Array.from({ length: 3 }, () => new ShootingStar());

    // ✅ Animation loop (FPS capped)
    const animate = (time) => {
      const delta = time - lastTime;
      if (delta < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // ✅ background gradient
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      // Shooting stars trigger (less frequent)
      if (Math.random() < (isMobile ? 0.003 : 0.005)) {
        const s = shootingStars[(Math.random() * shootingStars.length) | 0];
        if (!s.active) s.trigger();
      }

      for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].update();
        shootingStars[i].draw();
      }

      // Tech particles
      const mouse = mouseRef.current;
      for (let i = 0; i < techParticles.length; i++) {
        techParticles[i].update(mouse);
        techParticles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default GalaxyBackground;
