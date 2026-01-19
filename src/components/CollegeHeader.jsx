import React, { useEffect, useState } from "react";

const CollegeHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 25);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-[9999] w-full">
      {/* ✅ Outer spacing */}
      <div className="pt-2 sm:pt-3 px-2 sm:px-3">
        <div
          className={`
            relative mx-auto w-full
            max-w-[95%] sm:max-w-[96%] md:max-w-7xl
            rounded-2xl sm:rounded-3xl overflow-hidden
            border border-white/20
            shadow-[0_12px_50px_rgba(0,0,0,0.55)]
            transition-all duration-500 ease-out
            ${scrolled ? "bg-black/70 backdrop-blur-3xl" : "bg-black/40 backdrop-blur-2xl"}
          `}
        >
          {/* ✅ Animated Glow Border */}
          <div className="absolute inset-0 z-[0] pointer-events-none">
            <div
              className={`
                absolute -inset-[2px]
                rounded-[22px] sm:rounded-[28px]
                opacity-60 blur-md
                bg-gradient-to-r from-cyan-300/10 via-white/20 to-pink-300/10
                animate-[pulse_3.5s_ease-in-out_infinite]
              `}
            />
          </div>

          {/* ✅ Glass highlight overlay */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-white/18 via-white/5 to-white/12" />

          {/* ✅ Top thin shine */}
          <div className="absolute top-0 left-0 w-full h-[2px] z-[2] pointer-events-none bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70" />

          {/* ✅ Side gradients for depth */}
          <div className="absolute left-0 top-0 h-full w-[24%] sm:w-[30%] z-[2] pointer-events-none bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-[24%] sm:w-[30%] z-[2] pointer-events-none bg-gradient-to-l from-black/80 via-black/40 to-transparent" />

          {/* ✅ Shine sweep animation */}
          <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
            <div className="absolute -left-[40%] top-0 h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent animate-[shine_7s_linear_infinite]" />
          </div>

          {/* ✅ Content */}
          <div
            className={`
              relative z-[5]
              px-3 sm:px-8 md:px-12
              py-3 sm:py-5 md:py-6
              grid grid-cols-[auto_1fr_auto]
              items-center
              gap-3 sm:gap-6 md:gap-10
              text-white
              transition-all duration-500
              ${scrolled ? "py-2 sm:py-4 md:py-5" : ""}
            `}
          >
            {/* LEFT LOGO */}
            <div className="flex justify-start items-center">
              <img
                src="/collegeleft.png"
                alt="St. Joseph College Logo"
                aria-label="St. Joseph College of Engineering Logo"
                loading="lazy"
                draggable="false"
                className="
                  object-contain w-auto
                  h-[44px] sm:h-[70px] md:h-[92px] lg:h-[100px]
                  drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]
                  transition-transform duration-300
                  hover:scale-[1.06] active:scale-[0.98]
                "
              />
            </div>

            {/* CENTER TEXT */}
            <div className="text-center min-w-0 leading-tight">
              <h1
                className="
                  font-serif font-extrabold tracking-wide
                  text-[13px] sm:text-[24px] md:text-[36px] lg:text-[47px]
                  drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]
                  break-words
                "
              >
                St. Joseph College of Engineering
              </h1>

              <div className="mt-1 sm:mt-2 h-[1px] w-[92%] sm:w-[min(580px,92%)] mx-auto bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-90" />

              <p className="mt-1 sm:mt-2 font-semibold text-white/90 text-[9px] sm:text-[12px] md:text-[15px]">
                Approved by AICTE · Affiliated to Anna University
              </p>

              <p className="hidden sm:block mt-1 font-medium text-white/85 text-[9px] sm:text-[11px] md:text-[14px]">
                Under Section 2(f) & 12(B) of UGC Act 1956
              </p>

              <p className="mt-0.5 sm:mt-1 font-light text-white/75 text-[8px] sm:text-[10px] md:text-[13px]">
                Sriperumbudur, Chennai, Tamil Nadu
              </p>
            </div>

            {/* RIGHT LOGO */}
            <div className="flex justify-end items-center">
              <img
                src="/college-right.png"
                alt="Accreditation Logo"
                aria-label="Accreditation Logo"
                loading="lazy"
                draggable="false"
                className="
                  object-contain w-auto
                  h-[40px] sm:h-[60px] md:h-[78px] lg:h-[90px]
                  drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]
                  transition-transform duration-300
                  hover:scale-[1.06] active:scale-[0.98]
                "
              />
            </div>
          </div>

          {/* ✅ Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-4 sm:h-6 z-[3] pointer-events-none bg-gradient-to-b from-transparent to-black/35" />
        </div>
      </div>

      {/* ✅ Keyframes */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-150%) rotate(12deg); opacity: 0; }
            15% { opacity: 0.65; }
            55% { opacity: 0.25; }
            100% { transform: translateX(350%) rotate(12deg); opacity: 0; }
          }
        `}
      </style>
    </header>
  );
};

export default CollegeHeader;
