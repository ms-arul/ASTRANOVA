import { events } from "../data/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const videoRef = useRef(null);

  /* ================= EVENT DATE (FEB 12) ================= */
  const eventDate = new Date("2026-02-12T09:00:00").getTime();

  /* ================= LIVE COUNTDOWN ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(eventDate - now, 0);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  /* ================= PAUSE VIDEO WHEN MODAL OPENS ================= */
  useEffect(() => {
    if (!videoRef.current) return;

    if (selectedEvent) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [selectedEvent]);

  return (
    <section
      id="event"
      className="relative min-h-screen w-full overflow-hidden"
    >
    

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        {/* TITLE */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-wide text-cyan-400 mb-16">
          Competitions
        </h2>

        {/* EVENT CARDS */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {events.map((e, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="
                relative
                flex flex-col sm:flex-row
                items-center
                gap-7
                p-7
                rounded-2xl
                bg-black/45
                backdrop-blur-xl
                border border-white/15
                shadow-[0_20px_50px_rgba(0,0,0,0.6)]
              "
            >
              {/* CATEGORY TAG */}
              {e.category && (
                <span
                  className="
                    absolute top-4 right-4
                    px-3 py-1
                    text-[11px] font-semibold uppercase tracking-wider
                    rounded-full
                    bg-cyan-400/90 text-black
                  "
                >
                  {e.category}
                </span>
              )}

              {/* LOGO */}
              <div className="w-32 h-32 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                <img
                  src={e.icon}
                  alt={e.title}
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* DIVIDER */}
              <div className="hidden sm:block w-px h-28 bg-white/15" />

              {/* CONTENT */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold tracking-wide text-white">
                  {e.title}
                </h3>

                <p className="text-gray-300 mt-2 leading-relaxed max-w-md">
                  {e.desc}
                </p>

                <button
                  onClick={() => setSelectedEvent(e)}
                  className="
                    mt-6
                    px-7 py-2.5
                    rounded-md
                    bg-cyan-400
                    text-black
                    font-bold tracking-wide
                    hover:bg-cyan-300
                    transition
                  "
                >
                  Register
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="
                bg-black/90
                backdrop-blur-xl
                border border-white/20
                rounded-2xl
                p-8
                max-w-lg w-full
                shadow-[0_25px_60px_rgba(0,0,0,0.85)]
              "
            >
              <h3 className="text-2xl font-extrabold tracking-wide text-cyan-400 text-center">
                {selectedEvent.title}
              </h3>

              {/* COUNTDOWN */}
              <div className="flex justify-center gap-5 mt-6 text-white">
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div key={unit} className="text-center">
                    <p className="text-xl font-bold">{timeLeft[unit]}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/70">
                      {unit}
                    </p>
                  </div>
                ))}
              </div>

              {/* GOOGLE FORM */}
              <div className="mt-8">
                <iframe
                  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
                  className="w-full h-[420px] rounded-lg"
                  frameBorder="0"
                  title="Event Registration Form"
                />
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="
                  mt-6 w-full
                  py-2.5 rounded-md
                  bg-cyan-400 text-black
                  font-bold tracking-wide
                  hover:bg-cyan-300
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
