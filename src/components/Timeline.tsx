import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { TIMELINE_MILESTONES } from '../data';

const milestones = TIMELINE_MILESTONES;

export default function Timeline() {
  const { comfortMode } = useApp();

  return (
    <section id="timeline" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          The Timeline of Your Dream
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          every step matters. every single one.
        </p>
      </motion.div>

      <div className="max-w-md mx-auto relative">
        {/* Central line */}
        <div className={`absolute left-8 top-0 bottom-0 w-0.5 
          ${comfortMode ? 'bg-lavender/20' : 'bg-rose-gold/20'}`} />

        {milestones.map((ms, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-30px" });

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-start gap-6 mb-10"
            >
              {/* Dot on line */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0
                  ${ms.highlight 
                    ? comfortMode 
                      ? 'bg-starlight/30 text-starlight shadow-[0_0_15px_rgba(255,228,181,0.4)]' 
                      : 'bg-rose-gold/20 text-rose-gold shadow-[0_0_15px_rgba(183,110,121,0.4)]'
                    : comfortMode
                      ? 'bg-night-blue text-moonlight'
                      : 'bg-cream text-warm-brown'
                  }`}
              >
                <span className="text-lg">{ms.emoji}</span>
              </motion.div>

              {/* Content */}
              <div className={`flex-1 py-2 ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}`}>
                <h3 className={`font-[Dancing_Script] text-xl mb-1
                  ${ms.highlight 
                    ? comfortMode ? 'text-starlight' : 'text-rose-gold' 
                    : ''}`}>
                  {ms.label}
                </h3>
                <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-moonlight/60' : 'text-warm-brown/60'}`}>
                  {ms.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
