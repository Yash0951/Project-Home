import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MOTIVATION_QUOTES } from '../data';

const quotes = MOTIVATION_QUOTES;

export default function MotivationWall() {
  const { comfortMode } = useApp();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFlipped(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="motivation" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Motivation Wall
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          words that find you when you need them most
        </p>
      </motion.div>

      {/* Main rotating quote */}
      <div className="max-w-lg mx-auto mb-16">
        <motion.div
          className={`p-8 rounded-2xl text-center ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
          style={{ animation: 'glow-pulse 4s ease-in-out infinite' }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 20, rotateX: flipped ? 90 : 0 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: -90 }}
              transition={{ duration: 0.5 }}
              className={`font-[Dancing_Script] text-2xl md:text-3xl leading-relaxed
                ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}
            >
              "{quotes[currentQuote]}"
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-6">
            {quotes.slice(0, 5).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300
                  ${i === currentQuote % 5 
                    ? comfortMode ? 'bg-starlight' : 'bg-rose-gold' 
                    : comfortMode ? 'bg-lavender/30' : 'bg-rose-gold/30'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid of mini quotes */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {quotes.slice(0, 12).map((q, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`p-4 rounded-xl text-center
                ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
              style={{ animation: `float-slow ${3 + i * 0.3}s ease-in-out infinite` }}
            >
              <p className={`font-[Poppins] text-sm leading-relaxed
                ${comfortMode ? 'text-moonlight/80' : 'text-warm-brown/70'}`}>
                {q}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


