import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { EASTER_EGG } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const triggerWord = EASTER_EGG.triggerWord.toLowerCase();

export default function EasterEggs() {
  const { flowerRain, setFlowerRain } = useApp();
  const [cuckooBuffer, setCuckooBuffer] = useState('');
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [konamiMessage, setKonamiMessage] = useState(false);
  const [moonStars, setMoonStars] = useState(false);
  useScrollLock(konamiMessage);

  // Cuckoo code - typing "cuckoo" starts flower rain
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newBuffer = (cuckooBuffer + e.key).slice(-6);
    setCuckooBuffer(newBuffer);
    if (newBuffer.toLowerCase() === triggerWord) {
      setFlowerRain(true);
      setTimeout(() => setFlowerRain(false), 8000);
      setCuckooBuffer('');
    }
  }, [cuckooBuffer, setFlowerRain]);

  // Konami code
  const handleKonami = useCallback((e: KeyboardEvent) => {
    if (e.key === KONAMI_CODE[konamiProgress]) {
      const next = konamiProgress + 1;
      setKonamiProgress(next);
      if (next === KONAMI_CODE.length) {
        setKonamiMessage(true);
        setTimeout(() => setKonamiMessage(false), 5000);
        setKonamiProgress(0);
      }
    } else {
      setKonamiProgress(0);
    }
  }, [konamiProgress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKonami);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKonami);
    };
  }, [handleKeyDown, handleKonami]);

  // Click moon to multiply stars
  const handleMoonClick = () => {
    setMoonStars(true);
    setTimeout(() => setMoonStars(false), 5000);
  };

  return (
    <>
      {/* Flower Rain */}
      <AnimatePresence>
        {flowerRain && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="flower"
                initial={{ 
                  opacity: 1, 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                }}
                animate={{ 
                  opacity: [1, 1, 0],
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 360,
                }}
                transition={{ 
                  duration: 3 + Math.random() * 3,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
                style={{
                  fontSize: `${16 + Math.random() * 16}px`,
                }}
              >
                {['🌸', '🌺', '🌷', '🌹', '💐', '🌻'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Konami Code Message */}
      <AnimatePresence>
        {konamiMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-cream/95 to-blush/95"
            onClick={() => setKonamiMessage(false)}
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="font-[Great_Vibes] text-4xl md:text-6xl text-rose-gold glow-text">
                I love you endlessly.
              </p>
              <p className="font-[Dancing_Script] text-xl text-warm-brown/60 mt-4">
                {EASTER_EGG.konamiMessage}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moon Stars (clickable moon) */}
      {/* This is handled by the moon in the Sleep experience and Comfort mode */}
      {moonStars && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Invisible moon click target */}
      <div 
        className="fixed top-4 right-4 z-20 cursor-pointer opacity-0 hover:opacity-10 transition-opacity"
        onClick={handleMoonClick}
        title="Click the moon ✨"
      >
        🌙
      </div>
    </>
  );
}
