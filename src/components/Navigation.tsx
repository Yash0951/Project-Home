import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useScrollLock } from '../hooks/useScrollLock';

const navItems = [
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'letters', emoji: '💌', label: 'Letters' },
  { id: 'comfort', emoji: '🌸', label: 'Comfort' },
  { id: 'timeline', emoji: '📅', label: 'Timeline' },
  { id: 'motivation', emoji: '✨', label: 'Motivation' },
  { id: 'memories', emoji: '📸', label: 'Memories' },
  { id: 'progress', emoji: '🌱', label: 'Progress' },
  { id: 'distance', emoji: '🌍', label: 'Distance' },
  { id: 'universe', emoji: '🌌', label: 'Universe' },
  { id: 'forever', emoji: '❤️', label: 'Forever' },
];

export default function Navigation() {
  const { comfortMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollLock(isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Logo badge — always visible */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-3 left-3 z-50 px-4 py-2 rounded-full font-[Great_Vibes] text-base cursor-pointer
          transition-all duration-500 select-none
          ${scrolled 
            ? comfortMode 
              ? 'bg-deep-night/90 text-moonlight shadow-lg shadow-lavender/10 border border-lavender/20' 
              : 'bg-cream/90 text-rose-gold shadow-lg shadow-rose-gold/10 border border-rose-gold/20'
            : comfortMode 
              ? 'bg-deep-night/60 text-moonlight border border-lavender/10' 
              : 'bg-cream/60 text-rose-gold border border-rose-gold/10'
          }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        ♡ Project Home
      </motion.div>

      {/* Menu button — always visible */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`fixed top-3 right-3 z-50 w-10 h-10 rounded-full flex items-center justify-center text-base
          transition-all duration-500 select-none
          ${scrolled 
            ? comfortMode 
              ? 'bg-deep-night/90 text-moonlight shadow-lg shadow-lavender/10 border border-lavender/20' 
              : 'bg-cream/90 text-warm-brown shadow-lg shadow-rose-gold/10 border border-rose-gold/20'
            : comfortMode 
              ? 'bg-deep-night/60 text-moonlight border border-lavender/10' 
              : 'bg-cream/60 text-warm-brown border border-rose-gold/10'
          }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        {isOpen ? '✕' : '☰'}
      </motion.button>

      {/* Full overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex items-center justify-center
              ${comfortMode ? 'bg-deep-night/95' : 'bg-cream/95'}`}
            onClick={() => setIsOpen(false)}
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-sm w-full px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <p className={`font-[Great_Vibes] text-2xl text-center mb-6
                ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
                Navigate
              </p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl
                      ${comfortMode 
                        ? 'hover:bg-lavender/10 text-moonlight active:bg-lavender/20' 
                        : 'hover:bg-rose-gold/10 text-warm-brown active:bg-rose-gold/20'}
                      transition-colors duration-200`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-[Poppins]">{item.label}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className={`mt-8 w-full py-3 rounded-xl text-center font-[Poppins] text-sm
                  ${comfortMode ? 'text-lavender/40' : 'text-warm-brown/40'}`}
                whileHover={{ scale: 1.02 }}
              >
                ✕ Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
