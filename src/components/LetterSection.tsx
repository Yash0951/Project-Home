import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { LETTER_MESSAGES } from '../data';

const letterMessages = LETTER_MESSAGES;

export default function LetterSection() {
  const { comfortMode } = useApp();

  return (
    <section id="letters" className="relative min-h-screen py-20 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          A Letter From Me
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          scroll gently... each word finds you when it's ready
        </p>
      </motion.div>

      {/* Messages */}
      <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
        {letterMessages.map((msg, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });
          const isHighlight = msg.includes("❤️") || msg.includes("Please") || msg.includes("Because I believe") || msg.includes("Always");
          
          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.1,
              }}
              className={`text-center leading-relaxed ${
                isHighlight
                  ? comfortMode 
                    ? 'font-[Dancing_Script] text-2xl md:text-3xl text-starlight glow-text-light' 
                    : 'font-[Dancing_Script] text-2xl md:text-3xl text-rose-gold glow-text'
                  : comfortMode
                    ? 'font-[Poppins] text-lg text-moonlight/80'
                    : 'font-[Poppins] text-lg text-warm-brown/80'
              }`}
            >
              {msg}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative floating flower */}
      <motion.div
        className="absolute bottom-10 right-10 text-4xl opacity-30"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🌸
      </motion.div>
    </section>
  );
}
