import React from "react";

import StarNetwork from "./components/StarNetwork";
import CollegeHeader from "./components/CollegeHeader";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Timeline from "./components/Timeline";
import Coordinators from "./components/Coordinators";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden scroll-smooth">
      {/* ✅ Layer 0: Star Network Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarNetwork />
      </div>

      {/* ✅ Layer 1: Global Overlay + Vignette + Grain */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {/* Global dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.70)_80%)]" />

        {/* Optional Premium Grain */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('/noise.png')]" />
      </div>

      {/* ✅ Layer 2: Header */}
      <div className="relative z-[9999]">
        <CollegeHeader />
      </div>

      {/* ✅ Layer 3: Content */}
      <main className="relative z-10 pt-[155px] sm:pt-[170px] md:pt-[190px]">
        <Hero />
        <Events />
        <Timeline />
        <Coordinators />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
