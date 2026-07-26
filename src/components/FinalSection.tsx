import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FINAL_MESSAGES, FINAL_LINE } from '../data';

export default function FinalSection() {
  const { comfortMode } = useApp();
  const [phase, setPhase] = useState<'idle' | 'reading' | 'heart' | 'final'>('idle');
  const [visibleCount, setVisibleCount] = useState(0);

  const startReading = () => {
    setPhase('reading');
    setVisibleCount(0);
    FINAL_MESSAGES.forEach((_, i) => {
      const delay = i <= 3 ? i * 3000 : 12000 + (i - 4) * 2000;
      setTimeout(() => setVisibleCount(i + 1), delay);
    });
    setTimeout(() => setPhase('heart'), 18000);
  };

  const reset = () => {
    setPhase('idle');
    setVisibleCount(0);
  };

  return (
    <section id="forever" className="relative min-h-screen py-20 px-4">
      {/* Dark background overlay — ensures text is ALWAYS visible */}
      <div className={`absolute inset-0 z-0 ${
        comfortMode 
          ? 'bg-gradient-to-b from-deep-night via-night-blue to-[#1A2A4A]' 
          : 'bg-gradient-to-b from-[#1A1A30] via-[#2A2040] to-[#1A1A30]'
      }`} />

      {/* Star field on top of dark bg */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: comfortMode ? 'rgba(200,180,230,0.9)' : 'rgba(255,228,181,0.5)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto text-center min-h-screen flex flex-col items-center justify-center">
        {/* IDLE — Start button */}
        {phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <p className="font-[Great_Vibes] text-3xl mb-8 text-moonlight glow-text-light">
              Before you go...
            </p>
            <motion.button
              onClick={startReading}
              className="px-8 py-4 rounded-full font-[Dancing_Script] text-xl
                bg-white/10 border border-lavender/30 text-moonlight
                hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ animation: 'glow-pulse 3s ease-in-out infinite', backdropFilter: 'blur(8px)' }}
            >
              Read my final words ✨
            </motion.button>
          </motion.div>
        )}

        {/* READING — Messages appear one by one */}
        {phase === 'reading' && (
          <div className="space-y-6">
            {FINAL_MESSAGES.slice(0, visibleCount).map((msg, i) => (
              <motion.p
                key={`msg-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={`font-[Poppins] text-base md:text-lg leading-relaxed text-moonlight
                  ${i >= 4 ? 'font-[Dancing_Script] text-xl md:text-2xl' : ''}
                  ${i === FINAL_MESSAGES.length - 1 
                    ? 'glow-text-light text-starlight' : ''}`}
              >
                {msg}
              </motion.p>
            ))}
          </div>
        )}

        {/* HEART — Glowing heart appears */}
        {phase === 'heart' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {FINAL_MESSAGES.map((msg, i) => (
              <p
                key={`final-${i}`}
                className={`font-[Poppins] text-base md:text-lg leading-relaxed text-moonlight
                  ${i >= 4 ? 'font-[Dancing_Script] text-xl md:text-2xl' : ''}
                  ${i === FINAL_MESSAGES.length - 1 
                    ? 'glow-text-light text-starlight' : ''}`}
              >
                {msg}
              </p>
            ))}

            {/* The glowing heart */}
            <motion.div className="mt-8">
              <motion.button
                onClick={() => setPhase('final')}
                className="text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              >
                ❤️
              </motion.button>
              <p className="font-[Poppins] text-xs mt-3 text-lavender/40">
                click the heart
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* FINAL — The last line revealed, with a way to go back */}
        {phase === 'final' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="space-y-6"
          >
            {/* Show all the messages (dimmed) */}
            {FINAL_MESSAGES.map((msg, i) => (
              <p
                key={`final2-${i}`}
                className={`font-[Poppins] text-sm md:text-base leading-relaxed text-moonlight/40
                  ${i >= 4 ? 'font-[Dancing_Script] text-lg md:text-xl' : ''}`}
              >
                {msg}
              </p>
            ))}

            {/* The final line */}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3 }}
              className="font-[Great_Vibes] text-2xl md:text-3xl mt-6 text-starlight glow-text-light"
            >
              {FINAL_LINE}
            </motion.p>

            {/* ❤️ Heart — now static */}
            <div className="text-4xl mt-4">❤️</div>

            {/* Way to go back */}
            <motion.button
              onClick={reset}
              className="mt-8 px-6 py-3 rounded-full font-[Dancing_Script] text-lg
                bg-white/10 text-moonlight border border-lavender/20
                hover:bg-white/15 transition-all duration-300"
              style={{ backdropFilter: 'blur(8px)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ↻ Read again from the start
            </motion.button>

            {/* Scroll up hint */}
            <motion.p
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-[Poppins] text-xs mt-4 text-lavender/25"
            >
              ↑ Scroll up to revisit any section
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
