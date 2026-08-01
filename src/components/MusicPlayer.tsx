// import { useState, useRef, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';

// export default function MusicPlayer() {
//   const { musicPlaying, setMusicPlaying, musicVolume, setMusicVolume, comfortMode } = useApp();
//   const [expanded, setExpanded] = useState(false);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const oscillatorRef = useRef<OscillatorNode | null>(null);
//   const gainRef = useRef<GainNode | null>(null);

//   const createAmbientSound = useCallback(() => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new AudioContext();
//     }
//     const ctx = audioContextRef.current;
    
//     // Create a gentle ambient oscillator
//     const osc = ctx.createOscillator();
//     const gain = ctx.createGain();
//     const filter = ctx.createBiquadFilter();
    
//     osc.type = 'sine';
//     osc.frequency.value = comfortMode ? 220 : 440; // Lower tone for comfort mode
//     filter.type = 'lowpass';
//     filter.frequency.value = 800;
    
//     gain.gain.value = musicVolume * 0.05; // Very quiet
    
//     osc.connect(filter);
//     filter.connect(gain);
//     gain.connect(ctx.destination);
    
//     osc.start();
//     oscillatorRef.current = osc;
//     gainRef.current = gain;
//   }, [comfortMode, musicVolume]);

//   useEffect(() => {
//     if (musicPlaying) {
//       createAmbientSound();
//     } else {
//       if (oscillatorRef.current) {
//         oscillatorRef.current.stop();
//         oscillatorRef.current = null;
//       }
//       if (gainRef.current) {
//         gainRef.current = null;
//       }
//     }
//   }, [musicPlaying, createAmbientSound]);

//   useEffect(() => {
//     if (gainRef.current && audioContextRef.current) {
//       gainRef.current.gain.setValueAtTime(musicVolume * 0.05, audioContextRef.current.currentTime);
//     }
//   }, [musicVolume]);

//   // Clean up on unmount
//   useEffect(() => {
//     return () => {
//       if (oscillatorRef.current) {
//         try { oscillatorRef.current.stop(); } catch {}
//       }
//       if (audioContextRef.current) {
//         try { audioContextRef.current.close(); } catch {}
//       }
//     };
//   }, []);

//   return (
//     <motion.div
//       className="fixed bottom-4 right-4 z-40"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Toggle Button */}
//       <motion.button
//         onClick={() => setExpanded(!expanded)}
//         className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
//           ${comfortMode ? 'glass-dark text-moonlight' : 'glass text-rose-gold'}`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         {musicPlaying ? '🎵' : '🔇'}
//       </motion.button>

//       {/* Expanded Panel */}
//       <AnimatePresence>
//         {expanded && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.9 }}
//             transition={{ duration: 0.2 }}
//             className={`absolute bottom-14 right-0 p-4 rounded-2xl w-48
//               ${comfortMode ? 'glass-dark' : 'glass'}`}
//           >
//             {/* Play/Pause */}
//             <div className="flex items-center justify-between mb-3">
//               <span className={`font-[Dancing_Script] text-sm
//                 ${comfortMode ? 'text-moonlight' : 'text-rose-gold'}`}>
//                 {comfortMode ? '🌙 Night Mode' : '☀️ Ambient'}
//               </span>
//               <motion.button
//                 onClick={() => setMusicPlaying(!musicPlaying)}
//                 className={`px-3 py-1 rounded-full text-xs font-[Poppins]
//                   ${musicPlaying 
//                     ? 'bg-rose-gold/20 text-rose-gold' 
//                     : comfortMode ? 'bg-white/10 text-moonlight' : 'bg-white/20 text-warm-brown'}`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {musicPlaying ? 'Pause' : 'Play'}
//               </motion.button>
//             </div>

//             {/* Volume Slider */}
//             <div className="flex items-center gap-2">
//               <span className={`text-xs ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
//                 🔈
//               </span>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.05"
//                 value={musicVolume}
//                 onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
//                 className="w-full h-1 rounded-full appearance-none cursor-pointer
//                   accent-rose-gold"
//                 style={{
//                   background: `linear-gradient(to right, ${comfortMode ? '#C9B8E8' : '#B76E79'} ${musicVolume * 100}%, ${comfortMode ? '#3A3A5A' : '#E8D5B7'} ${musicVolume * 100}%)`,
//                 }}
//               />
//               <span className={`text-xs ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
//                 🔊
//               </span>
//             </div>

//             {/* Visual wave indicator */}
//             {musicPlaying && (
//               <div className="flex items-center justify-center gap-0.5 mt-3 h-4">
//                 {[...Array(12)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="w-1 rounded-full"
//                     style={{ backgroundColor: comfortMode ? '#C9B8E8' : '#B76E79' }}
//                     animate={{ height: [2, 8 + Math.random() * 8, 2] }}
//                     transition={{
//                       duration: 0.4 + Math.random() * 0.2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function MusicPlayer() {
  const { musicPlaying, setMusicPlaying, musicVolume, setMusicVolume, comfortMode, isVoiceNotePlaying } = useApp();
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  // 1-second fade effect when voice note starts/stops
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval();

    if (isVoiceNotePlaying) {
      // Fade OUT background music over 1 second
      const startVolume = audio.volume;
      const steps = 15;
      const stepTime = 300 / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const newVol = Math.max(0, startVolume * (1 - currentStep / steps));
        audio.volume = newVol;

        if (currentStep >= steps) {
          clearFadeInterval();
          audio.pause();
        }
      }, stepTime);
    } else if (musicPlaying) {
      // Fade IN background music over 1 second
      audio.play().catch(() => {});
      audio.volume = 0;
      const targetVolume = musicVolume;
      const steps = 20;
      const stepTime = 1000 / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const newVol = Math.min(targetVolume, (targetVolume * currentStep) / steps);
        audio.volume = newVol;

        if (currentStep >= steps) {
          clearFadeInterval();
        }
      }, stepTime);
    }
  }, [isVoiceNotePlaying, musicPlaying, musicVolume]);

  // Standard Play/Pause state handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isVoiceNotePlaying) return;

    if (musicPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicPlaying, isVoiceNotePlaying]);

  // Sync general volume changes
  useEffect(() => {
    if (audioRef.current && !isVoiceNotePlaying) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume, isVoiceNotePlaying]);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <audio
        ref={audioRef}
        src="/Chahun Main Ya Naa (full).mp3"
        loop
        preload="auto"
      />

      <motion.button
        onClick={() => setExpanded(!expanded)}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
          ${comfortMode ? 'glass-dark text-moonlight' : 'glass text-rose-gold'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying && !isVoiceNotePlaying ? '🎵' : '🔇'}
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-14 right-0 p-4 rounded-2xl w-48
              ${comfortMode ? 'glass-dark' : 'glass'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`font-[Dancing_Script] text-sm
                ${comfortMode ? 'text-moonlight' : 'text-rose-gold'}`}>
                {comfortMode ? '🌙 Night Music' : '✨ Music'}
              </span>
              <motion.button
                onClick={() => setMusicPlaying(!musicPlaying)}
                className={`px-3 py-1 rounded-full text-xs font-[Poppins]
                  ${musicPlaying 
                    ? 'bg-rose-gold/20 text-rose-gold' 
                    : comfortMode ? 'bg-white/10 text-moonlight' : 'bg-white/20 text-warm-brown'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {musicPlaying ? 'Pause' : 'Play'}
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
                🔈
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer accent-rose-gold"
                style={{
                  background: `linear-gradient(to right, ${comfortMode ? '#C9B8E8' : '#B76E79'} ${musicVolume * 100}%, ${comfortMode ? '#3A3A5A' : '#E8D5B7'} ${musicVolume * 100}%)`,
                }}
              />
              <span className={`text-xs ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
                🔊
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}