import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import StarNetwork from "./StarNetwork";
import GalaxyBackground from "./GalaxyBackground";

const Hero = () => {
  const scrollToEvent = useCallback(() => {
    document
      .getElementById("event")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ Adaptive particle count (mobile friendly)
  const particleOptions = useMemo(() => {
    const isMobile = window.innerWidth < 640;

    return {
      fullScreen: { enable: false },
      fpsLimit: 45,
      detectRetina: true,

      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          repulse: { distance: isMobile ? 80 : 120, duration: 0.3 },
        },
      },

      particles: {
        number: { value: isMobile ? 35 : 60, density: { enable: true, area: 900 } },
        color: { value: ["#22d3ee", "#a855f7", "#ec4899"] },
        shape: { type: "circle" },
        opacity: { value: 0.35 },
        size: { value: { min: 1, max: isMobile ? 2 : 2.5 } },

        move: { enable: true, speed: isMobile ? 0.35 : 0.55 },

        links: {
          enable: true,
          distance: isMobile ? 110 : 150,
          opacity: 0.16,
          width: 1,
        },
      },
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* ✅ Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarNetwork />
      </div>

      <div className="absolute inset-0 z-[1] opacity-80 pointer-events-none">
        <GalaxyBackground />
      </div>

      {/* ✅ Extra Spotlight Glow (Premium Depth) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12)_0%,rgba(0,0,0,0.85)_70%)]" />
      </div>

      {/* ✅ Particles */}
      <Particles
        className="absolute inset-0 z-[3] pointer-events-none"
        options={particleOptions}
      />

      {/* ✅ Content */}
      <motion.div
        initial={{ opacity: 0, y: 45, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center px-4"
      >
        <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl text-center px-4 sm:px-8 md:px-12">
          {/* ✅ Logo Float + Glow */}
          <motion.img
            src="/logo1.png"
            alt="ASTRANOVA 26"
            className="
              mx-auto w-72 sm:w-80 md:w-96 lg:w-[420px]
              object-contain
              drop-shadow-[0_0_22px_rgba(0,255,255,0.40)]
            "
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ✅ Department */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="mt-4 sm:mt-6 text-[14px] sm:text-base md:text-lg font-serif font-medium text-white/95 leading-snug"
          >
            Department of Computer Science & Engineering
          </motion.p>

          {/* ✅ Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="
              mt-2 text-[12px] sm:text-sm
              uppercase tracking-[0.35em]
              font-semibold text-cyan-200
            "
          >
            Innovate • Compete • Elevate
          </motion.p>

          {/* ✅ CTA Button (Premium Glow + Shine) */}
          <motion.button
            onClick={scrollToEvent}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative mt-7 sm:mt-10
              px-10 py-3 rounded-full overflow-hidden
              bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
              text-sm sm:text-base text-white font-bold tracking-widest
              shadow-[0_0_35px_rgba(168,85,247,0.65)]
              transition-all duration-300
              ring-1 ring-white/20
              hover:ring-white/40
            "
          >
            {/* Shine Sweep */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="absolute -left-[40%] top-0 h-full w-[35%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_2.8s_linear_infinite]" />
            </span>

            {/* Hover Glow */}
            <span className="absolute inset-0 bg-white/10 blur-md opacity-0 hover:opacity-100 transition duration-300" />

            <span className="relative z-10">REGISTER NOW</span>
          </motion.button>

          {/* ✅ Bottom Glow Divider */}
          <div className="mt-10 h-[2px] w-44 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-80" />
        </div>
      </motion.div>

      {/* ✅ Animation Keyframes */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-160%) rotate(12deg); opacity: 0; }
            20% { opacity: 0.75; }
            60% { opacity: 0.25; }
            100% { transform: translateX(360%) rotate(12deg); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
