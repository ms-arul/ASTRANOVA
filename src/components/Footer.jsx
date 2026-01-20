import React, { useRef } from "react";

export default function Footer() {
  const linkRef = useRef(null);

  // 🎯 Magnetic hover (desktop only, smooth & subtle)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const el = linkRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    el.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px)`;
  };

  const resetPosition = () => {
    const el = linkRef.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  return (
    <footer className="relative py-8 text-center">
      {/* subtle divider */}
      <div className="mx-auto mb-4 h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <p className="text-sm tracking-wide text-gray-400">
        © <span className="text-white font-semibold">2026</span>{" "}
        <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ASTRANOVA
        </span>
        <span className="mx-2 text-gray-600">|</span>
        Department of CSE
      </p>

      <p className="mt-2 text-xs tracking-[0.25em] text-gray-500 uppercase">
        Designed & Developed by{" "}
        <a
          ref={linkRef}
          href="http://ms-arul-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetPosition}
          className="
            relative inline-block font-medium text-cyan-400
            transition-transform duration-300 ease-out
            focus:outline-none

            hover:text-transparent
            hover:bg-gradient-to-r
            hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500
            hover:bg-clip-text
            focus:text-transparent focus:bg-clip-text
            focus:bg-gradient-to-r focus:from-cyan-400 focus:via-purple-500 focus:to-pink-500

            /* ✨ Glow pulse (hover + focus only) */
            hover:animate-[glow_1.6s_ease-in-out_infinite]
            focus:animate-[glow_1.6s_ease-in-out_infinite]

            /* 🌀 Single underline (center-out) */
            after:absolute after:left-1/2 after:-translate-x-1/2
            after:-bottom-[6px]
            after:h-[1.5px]
            after:w-full
            after:origin-center after:scale-x-0
            after:bg-gradient-to-r after:from-cyan-400 after:via-purple-500 after:to-pink-500
            after:bg-[length:200%_100%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100
            focus:after:scale-x-100
            hover:after:animate-[wave_2.5s_linear_infinite]
          "
        >
          Arulprakash S
        </a>{" "}
        <span className="text-gray-600">
          (3rd Year B.E – CSE)
        </span>
      </p>

      {/* 🔥 Inline animations (single-file, enhanced) */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow:
              0 0 4px rgba(0,255,255,0.35),
              0 0 10px rgba(180,0,255,0.35);
          }
          50% {
            text-shadow:
              0 0 8px rgba(0,255,255,0.65),
              0 0 18px rgba(180,0,255,0.65);
          }
        }

        @keyframes wave {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        /* 🧊 Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          a {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
