import React from "react";

const GlobalOverlay = () => {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none">
      {/* subtle neon atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b 
        from-cyan-400/5 
        via-purple-500/5 
        to-indigo-600/5" />
    </div>
  );
};

export default GlobalOverlay;
