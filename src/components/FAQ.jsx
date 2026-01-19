import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "Can I participate in multiple events?",
      a: "Yes. Participants are allowed to register for and participate in multiple events, provided there are no schedule conflicts.",
    },
    {
      q: "Is this event open to students from other colleges?",
      a: "Yes. Students from all colleges are welcome to participate in Astranova 26.",
    },
    {
      q: "Will certificates be provided?",
      a: "Yes. Participation and winner certificates will be provided for all registered events.",
    },
    {
      q: "Do I need to bring my own laptop?",
      a: "For technical events, participants are advised to bring their own laptops fully charged.",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
     

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
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ LIST */}
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((item, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                group
                bg-black/45
                backdrop-blur-xl
                border border-white/15
                rounded-xl
                p-5
                shadow-[0_15px_40px_rgba(0,0,0,0.6)]
              "
            >
              <summary
                className="
                  cursor-pointer
                  list-none
                  font-semibold
                  text-white
                  tracking-wide
                  flex justify-between items-center
                "
              >
                {item.q}
                <span className="
                  text-cyan-400
                  transform transition-transform
                  group-open:rotate-45
                ">
                  +
                </span>
              </summary>

              <p className="mt-3 text-gray-300 leading-relaxed text-sm sm:text-base">
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
