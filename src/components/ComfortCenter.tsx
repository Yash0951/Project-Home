import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { COMFORT_BUTTONS, COMFORT_MESSAGES } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const comfortButtons = COMFORT_BUTTONS;

// Visual effects

function RainEffect() {
  return (
    <div className="rain-container">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${15 + Math.random() * 25}px`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function StarsEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
        />
      ))}
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 rounded-full bg-moonlight/80"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ animation: 'moon-glow 4s ease-in-out infinite' }}
      />
    </div>
  );
}

function FireflyEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

// Theme config per experience type
const themeConfig: Record<string, {
  bg: string;
  isDark: boolean;
  effect: React.ReactNode;
  emoji: string;
  headingStyle: string;
  textStyle: string;
  highlightStyle: string;
  btnStyle: string;
}> = {
  miss:  { bg: 'from-blush/95 to-lavender/95',    isDark: false, effect: <FireflyEffect />, emoji: '🤗', headingStyle: 'text-rose-gold', textStyle: 'text-warm-brown/80', highlightStyle: 'text-rose-gold', btnStyle: 'glass text-rose-gold' },
  hard:  { bg: 'from-night-blue/95 to-deep-night/95', isDark: true,  effect: <RainEffect />,  emoji: '🌧️', headingStyle: 'text-moonlight', textStyle: 'text-moonlight/80', highlightStyle: 'text-starlight', btnStyle: 'glass-dark text-moonlight' },
  hug:   { bg: 'from-cream/95 to-blush/95',       isDark: false, effect: null,              emoji: '🫂', headingStyle: 'text-rose-gold', textStyle: 'text-warm-brown/80', highlightStyle: 'text-rose-gold', btnStyle: 'glass text-rose-gold' },
  sleep: { bg: 'from-deep-night/98 to-night-blue/95', isDark: true, effect: <StarsEffect />,  emoji: '🌙', headingStyle: 'text-moonlight', textStyle: 'text-moonlight/80', highlightStyle: 'text-starlight', btnStyle: 'glass-dark text-moonlight' },
  lost:  { bg: 'from-lavender/95 to-cream/95',    isDark: false, effect: <FireflyEffect />, emoji: '🧭', headingStyle: 'text-rose-gold', textStyle: 'text-warm-brown/80', highlightStyle: 'text-rose-gold', btnStyle: 'glass text-rose-gold' },
  mock:  { bg: 'from-night-blue/95 to-deep-night/95', isDark: true,  effect: <RainEffect />,  emoji: '📝', headingStyle: 'text-moonlight', textStyle: 'text-moonlight/80', highlightStyle: 'text-starlight', btnStyle: 'glass-dark text-moonlight' },
  home:  { bg: 'from-blush/95 to-beige/95',       isDark: false, effect: null,              emoji: '🏡', headingStyle: 'text-rose-gold', textStyle: 'text-warm-brown/80', highlightStyle: 'text-rose-gold', btnStyle: 'glass text-rose-gold' },
};

// Generic experience component that reads from COMFORT_MESSAGES
function ComfortExperience({ id, onClose }: { id: string; onClose: () => void }) {
  const theme = themeConfig[id];
  const data = COMFORT_MESSAGES[id as keyof typeof COMFORT_MESSAGES];
  if (!theme || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b ${theme.bg} px-4`}
      onClick={onClose}
      style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
    >
      {theme.effect}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md text-center space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Emoji */}
        {id === 'hug' ? (
          <motion.div
            initial={{ scale: 0.3 }}
            animate={{ scale: [0.3, 1.4, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-8xl"
          >
            {theme.emoji}
          </motion.div>
        ) : id === 'sleep' ? (
          <motion.div
            className="text-6xl"
            animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {theme.emoji}
          </motion.div>
        ) : (
          <div className="text-5xl">{theme.emoji}</div>
        )}

        {/* Heading */}
        <h3 className={`font-[Great_Vibes] text-3xl ${theme.headingStyle}`}>
          {data.heading}
        </h3>

        {/* Lines */}
        <div className={`space-y-3 font-[Poppins] ${theme.textStyle} text-sm leading-relaxed`}>
          {data.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          {/* Highlight */}
          {typeof data.highlight === 'string' ? (
            <>
              {data.highlight.split('.').filter(s => s.trim()).map((sentence, i) => (
                <p key={`hl-${i}`} className={`font-[Dancing_Script] text-xl ${theme.highlightStyle} ${i === 0 ? 'mt-4' : ''}`}>
                  {sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}
                </p>
              ))}
            </>
          ) : null}
        </div>

        {/* Extra memories (for miss) */}
        {'memories' in data && data.memories ? (
          <div className="flex flex-col gap-2 text-sm text-warm-brown/60">
            {(data as { memories?: string[] }).memories!.map((m: string, i: number) => <p key={i}>{m}</p>)}
          </div>
        ) : null}

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className={`px-6 py-3 rounded-full ${theme.btnStyle} font-[Dancing_Script] text-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {data.closeText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function ComfortCenter() {
  const { comfortMode } = useApp();
  const [activeExp, setActiveExp] = useState<string | null>(null);
  useScrollLock(activeExp !== null);

  return (
    <section id="comfort" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Emotional Support Center
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          whatever you're feeling right now... click it. i'm here.
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto flex flex-col gap-4">
        {comfortButtons.map((btn, i) => (
          <motion.button
            key={btn.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            onClick={() => setActiveExp(btn.id)}
            className={`w-full py-4 px-6 rounded-2xl text-left flex items-center gap-4
              ${comfortMode ? 'glass-card-dark text-moonlight hover:bg-white/10' 
                           : 'glass-card text-warm-brown hover:bg-rose-gold/5'}
              transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ animation: `float-slow ${3 + i * 0.5}s ease-in-out infinite` }}
          >
            <span className="text-2xl">{btn.emoji}</span>
            <span className="font-[Poppins] text-lg">{btn.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeExp && (
          <ComfortExperience id={activeExp} onClose={() => setActiveExp(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
