import { motion } from "framer-motion";

export default function Coordinators() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* ================= BACKGROUND VIDEO ================= */}
     

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 py-28 px-4 sm:px-6">
        
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            text-center
            text-3xl sm:text-4xl
            font-extrabold
            tracking-wide
            text-cyan-400
            mb-16
          "
        >
          Coordinators
        </motion.h2>

        {/* COORDINATOR CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* STAFF COORDINATOR */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
              bg-black/45
              backdrop-blur-xl
              border border-white/15
              rounded-2xl
              p-8
              text-center
              shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            "
          >
            <h3 className="text-xl font-bold tracking-wide text-white mb-3">
              Staff Coordinator
            </h3>

            <p className="text-gray-200 font-medium">
              AMSAMANI E
            </p>
            <p className="text-gray-200 font-medium">
              PAUL T JABA
            </p>

            <p className="mt-3 text-sm tracking-wide text-gray-400 uppercase">
              Assistant Professor
            </p>
          </motion.div>

          {/* STUDENT COORDINATOR */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="
              bg-black/45
              backdrop-blur-xl
              border border-white/15
              rounded-2xl
              p-8
              text-center
              shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            "
          >
            <h3 className="text-xl font-bold tracking-wide text-white mb-3">
              Student Coordinators
            </h3>

            <p className="text-gray-200 font-medium">
              J GAVIN JOES
            </p>
            <p className="text-sm text-gray-400 mb-2">
              3rd Year – B.E (CSE)
            </p>

            <p className="text-gray-200 font-medium">
              J SOMUSEKHAR
            </p>
            <p className="text-sm text-gray-400">
              3rd Year – B.E (CSE)
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
