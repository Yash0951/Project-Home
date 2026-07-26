import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { VOICE_NOTES, SITE_INFO } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const voiceCards = VOICE_NOTES;

export default function VoiceNotes() {
  const { comfortMode } = useApp();
  const [showComingSoon, setShowComingSoon] = useState(false);
  useScrollLock(showComingSoon);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleCardClick = (card: { id: string; emoji: string; title: string; desc: string; transcript: string }) => {
    setSelectedEmoji(card.emoji);
    setSelectedTitle(card.title);
    setShowComingSoon(true);
  };

  return (
    <section className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Voice Notes
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          my words, whenever you need to hear them
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto grid grid-cols-1 gap-4">
        {voiceCards.map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => handleCardClick(card)}
            className={`w-full py-4 px-6 rounded-2xl flex items-center gap-4
              ${comfortMode ? 'glass-card-dark text-moonlight' : 'glass-card text-warm-brown'}
              transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl">{card.emoji}</span>
            <div className="flex-1">
              <p className="font-[Dancing_Script] text-lg">{card.title}</p>
              <p className={`font-[Poppins] text-xs ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
                {card.desc}
              </p>
            </div>
            <span className="text-lg opacity-50">▶</span>
          </motion.button>
        ))}
      </div>

      {/* Coming Soon overlay */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 flex items-center justify-center px-4
              ${comfortMode 
                ? 'bg-deep-night/80' 
                : 'bg-cream/80'}`}
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative max-w-sm w-full p-8 rounded-2xl text-center
                ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Emoji */}
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {selectedEmoji}
              </motion.div>

              {/* Title */}
              <h3 className={`font-[Great_Vibes] text-2xl mb-4
                ${comfortMode ? 'text-moonlight' : 'text-rose-gold'}`}>
                {selectedTitle}
              </h3>

              {/* Coming Soon message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`p-4 rounded-xl mb-4
                  ${comfortMode ? 'bg-night-blue/30' : 'bg-blush/20'}`}>
                  <p className={`font-[Dancing_Script] text-xl mb-2
                    ${comfortMode ? 'text-starlight glow-text-light' : 'text-rose-gold glow-text'}`}>
                    Coming Soon 🎙️
                  </p>
                  <p className={`font-[Poppins] text-sm leading-relaxed
                    ${comfortMode ? 'text-moonlight/60' : 'text-warm-brown/60'}`}>
                    I'm recording something special for you, {SITE_INFO.petName}.
                    This voice note will be here soon — filled with love, 
                    just for the moments when you need to hear my voice.
                  </p>
                </div>

                {/* Preview transcript */}
                <p className={`font-[Poppins] text-xs mb-4
                  ${comfortMode ? 'text-lavender/30' : 'text-warm-brown/30'}`}>
                  💡 Preview of what's coming:
                </p>
                <div className={`p-3 rounded-xl text-sm font-[Poppins] leading-relaxed
                  ${comfortMode ? 'bg-night-blue/20 text-moonlight/40' : 'bg-cream/30 text-warm-brown/40'}`}>
                  {voiceCards.find(c => c.title === selectedTitle)?.transcript}
                </div>
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={() => setShowComingSoon(false)}
                className={`mt-6 px-6 py-3 rounded-full font-[Dancing_Script] text-lg
                  ${comfortMode ? 'glass-dark text-moonlight border border-lavender/20' : 'glass text-rose-gold border border-rose-gold/20'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I can't wait 🤍
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
