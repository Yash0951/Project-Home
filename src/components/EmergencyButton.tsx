import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMERGENCY_MESSAGES } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const emergencyMessages = EMERGENCY_MESSAGES.map((text, i) => ({
  text,
  delay: i * 2,
}));

function RainEffect() {
  return (
    <div className="rain-container">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${15 + Math.random() * 25}px`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
            animationDelay: `${Math.random() * 1}s`,
            background: 'linear-gradient(transparent, rgba(200, 180, 230, 0.5))',
          }}
        />
      ))}
    </div>
  );
}

export default function EmergencyButton() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  useScrollLock(showOverlay);

  const handlePress = () => {
    setShowOverlay(true);
    setVisibleMessages(0);
    emergencyMessages.forEach((msg, i) => {
      setTimeout(() => {
        setVisibleMessages(i + 1);
      }, msg.delay * 1000);
    });
  };

  const handleClose = () => {
    setShowOverlay(false);
    setVisibleMessages(0);
  };

  return (
    <>
      {/* Emergency Button */}
      <motion.div
        className="flex justify-center py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={handlePress}
          className="relative px-8 py-6 rounded-full font-[Dancing_Script] text-xl
            bg-red-500/10 border-2 border-red-500/30 text-red-400
            hover:bg-red-500/20 hover:border-red-500/50
            transition-all duration-300 shadow-lg shadow-red-500/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
        >
          <span className="text-2xl mr-2">🚨</span>
          Press only when everything feels impossible
        </motion.button>
      </motion.div>

      {/* Emergency Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-deep-night/80 to-night-blue/80 px-4"
            onClick={handleClose}
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            <RainEffect />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-md text-center space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🫂
              </motion.div>

              {emergencyMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`font-[Poppins] text-sm leading-relaxed text-moonlight/80
                    ${i === emergencyMessages.length - 1 
                      || i === emergencyMessages.length - 2 
                      || i === emergencyMessages.length - 3
                      ? 'font-[Dancing_Script] text-xl text-starlight glow-text-light' 
                      : ''}`}
                >
                  {msg.text}
                </motion.p>
              ))}

              {/* Heartbeat-synced call button — appears after all messages */}
              {visibleMessages >= emergencyMessages.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  {/* Heartbeat animation ring */}
                  <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.2, 0.4, 0.6, 1]
                    }}
                  >
                    {/* Outer pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-400/30"
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    />

                    {/* Second pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-red-400/20"
                      animate={{ 
                        scale: [1, 2.2, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                    />

                    {/* The call button itself */}
                    <a
                      href="tel:+918821927909"
                      className="relative block w-20 h-20 rounded-full flex items-center justify-center
                        bg-red-500/20 border-2 border-red-400/40
                        hover:bg-red-500/30 hover:border-red-400/60
                        transition-colors duration-300 no-underline"
                      style={{ 
                        textDecoration: 'none',
                        boxShadow: '0 0 30px rgba(239,68,68,0.2), 0 0 60px rgba(239,68,68,0.1)',
                      }}
                    >
                      {/* Phone icon with heartbeat */}
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          times: [0, 0.2, 0.4, 0.6, 1]
                        }}
                      >
                        <span className="text-3xl">📞</span>
                      </motion.div>

                      {/* Small heart overlay */}
                      <motion.span
                        className="absolute -top-1 -right-1 text-sm"
                        animate={{ 
                          scale: [1, 1.3, 1, 1.3, 1],
                          opacity: [0.7, 1, 0.7, 1, 0.7],
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          times: [0, 0.2, 0.4, 0.6, 1]
                        }}
                      >
                        💓
                      </motion.span>
                    </a>
                  </motion.div>

                  {/* Call label */}
                  <div className="text-center">
                    <motion.p
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="font-[Dancing_Script] text-lg text-red-300 glow-text-light"
                    >
                      Call me — I'm here for you
                    </motion.p>
                    <p className="font-[Poppins] text-xs text-moonlight/30 mt-1">
                      Tap the phone to reach me anytime
                    </p>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={handleClose}
                    className="mt-4 px-6 py-3 rounded-full glass-dark text-moonlight font-[Dancing_Script] text-lg
                      border border-lavender/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    I'll stand up again tomorrow 💪
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
