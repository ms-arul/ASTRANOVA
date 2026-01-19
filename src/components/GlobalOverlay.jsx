import React from "react";

const GlobalOverlay = () => {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none">
      {/* Dark overlay everywhere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />

      {/* Optional: extra vignette (edges dark) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_75%)]" />
    </div>
  );
};

export default GlobalOverlay;
