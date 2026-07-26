import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { PRIDE_CARDS } from '../data';

const prideCards = PRIDE_CARDS;

export default function PrideSection() {
  const { comfortMode } = useApp();

  return (
    <section className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Why I'm Proud Of You
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          not why i love you. why i'm proud.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {prideCards.map((card, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`p-6 rounded-2xl
                ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
              style={{ animation: `float-slow ${3 + i * 0.4}s ease-in-out infinite` }}
            >
              <div className="text-3xl mb-3">{card.emoji}</div>
              <h3 className={`font-[Dancing_Script] text-xl mb-2
                ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
                {card.message}
              </h3>
              <p className={`font-[Poppins] text-sm leading-relaxed
                ${comfortMode ? 'text-moonlight/60' : 'text-warm-brown/60'}`}>
                {card.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
