import { motion } from "framer-motion";

export default function Timeline() {
  const steps = [
    {
      title: "Registration",
      subtitle: "Participant onboarding & check-in",
      icon: "📝",
    },
    {
      title: "Inauguration",
      subtitle: "Opening ceremony & keynote",
      icon: "🎤",
    },
    {
      title: "Technical & Non-Technical Events",
      subtitle: "Competitions, challenges & fun",
      icon: "🚀",
    },
    {
      title: "Valediction",
      subtitle: "Winners, certificates & closing",
      icon: "🏆",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
    

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 py-28 px-4 sm:px-6">
        
        {/* DATE BADGE */}
        <div className="flex justify-center mb-6">
          <span className="
            px-6 py-2 rounded-full
            bg-cyan-400/10
            border border-cyan-400/30
            text-cyan-300
            text-sm font-semibold tracking-wide
          ">
            📅 February 12, 2026
          </span>
        </div>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            text-center
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold tracking-wide
            text-cyan-400
            mb-20
          "
        >
          Event Timeline
        </motion.h2>

        {/* ================= DESKTOP TIMELINE ================= */}
        <div className="hidden md:block max-w-6xl mx-auto relative">
          
          {/* ANIMATED HORIZONTAL LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
            className="
              absolute top-1/2 left-0 right-0
              h-px
              bg-gradient-to-r
              from-transparent via-cyan-400/40 to-transparent
            "
          />

          <div className="flex justify-between items-center gap-16">
            {steps.map((step, index) => (
              <TimelineItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* ================= MOBILE TIMELINE ================= */}
        <div className="md:hidden max-w-md mx-auto relative">
          
          {/* ANIMATED VERTICAL LINE */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ originY: 0 }}
            className="
              absolute left-4 top-0 bottom-0
              w-px
              bg-gradient-to-b
              from-transparent via-cyan-400/40 to-transparent
            "
          />

          <div className="flex flex-col gap-16 pl-10">
            {steps.map((step, index) => (
              <TimelineItem
                key={index}
                step={step}
                index={index}
                vertical
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= TIMELINE ITEM ================= */
function TimelineItem({ step, index, vertical = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`relative flex flex-col ${
        vertical ? "items-start text-left" : "items-center text-center"
      }`}
    >
      {/* STEP NUMBER */}
      <span className="
        absolute -top-8
        text-xs font-bold tracking-widest
        text-cyan-300/70
      ">
        STEP {index + 1}
      </span>

      {/* DOT */}
      <div className="
        w-4 h-4
        rounded-full
        bg-cyan-400
        shadow-[0_0_0_8px_rgba(34,211,238,0.18)]
      " />

      {/* CARD */}
      <div className="
        mt-7
        px-7 py-6
        rounded-2xl
        bg-black/45
        backdrop-blur-xl
        border border-white/15
        shadow-[0_20px_50px_rgba(0,0,0,0.65)]
        max-w-[240px]
      ">
        <div className="text-3xl mb-3">{step.icon}</div>

        <p className="text-base sm:text-lg font-bold tracking-wide text-white">
          {step.title}
        </p>

        <p className="mt-1 text-xs sm:text-sm text-gray-400 leading-relaxed">
          {step.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
