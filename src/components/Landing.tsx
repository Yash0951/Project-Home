// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { LANDING } from '../data';

// const lines = LANDING.lines;

// export default function Landing() {
//   const { setHasEntered, setMusicPlaying, comfortMode } = useApp();
//   const [currentLine, setCurrentLine] = useState(-1);
//   const [showButton, setShowButton] = useState(false);
//   const [exiting, setExiting] = useState(false);

//   useEffect(() => {
//     const timers: ReturnType<typeof setTimeout>[] = [];
//     timers.push(setTimeout(() => setCurrentLine(0), 1500));
//     timers.push(setTimeout(() => setCurrentLine(1), 4000));
//     timers.push(setTimeout(() => setCurrentLine(2), 6500));
//     timers.push(setTimeout(() => setShowButton(true), 9000));
//     return () => timers.forEach(t => clearTimeout(t));
//   }, []);

//   const handleEnter = () => {
//     setExiting(true);
//     setTimeout(() => {
//       setHasEntered(true);
//       setMusicPlaying(true);
//     }, 1000);
//   };

//   return (
//     <AnimatePresence>
//       {!exiting ? (
//         <motion.div
//           className="fixed inset-0 z-50 flex flex-col items-center justify-center"
//           style={{ background: comfortMode ? '#0F0F1A' : '#000000' }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1.5 }}
//         >
//           {/* Subtle background particles */}
//           <div className="absolute inset-0 overflow-hidden">
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 rounded-full"
//                 style={{
//                   background: comfortMode ? 'rgba(200,180,230,0.3)' : 'rgba(183,110,121,0.15)',
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   opacity: [0.2, 0.6, 0.2],
//                   scale: [1, 1.5, 1],
//                 }}
//                 transition={{
//                   duration: 3 + Math.random() * 2,
//                   repeat: Infinity,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Text lines */}
//           <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-lg">
//             {lines.map((line, i) => (
//               <AnimatePresence key={i}>
//                 {currentLine >= i && (
//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 2, ease: "easeOut" }}
//                     className={`text-center ${
//                       i === 0
//                         ? 'text-2xl md:text-4xl font-[Great_Vibes] text-rose-gold'
//                         : 'text-base md:text-lg font-[Poppins] leading-relaxed'
//                     } ${comfortMode ? 'text-moonlight' : 'text-petal'}`}
//                   >
//                     {line}
//                   </motion.p>
//                 )}
//               </AnimatePresence>
//             ))}
//           </div>

//           {/* Enter button */}
//           <AnimatePresence>
//             {showButton && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1.5, ease: "easeOut" }}
//                 onClick={handleEnter}
//                 className="relative z-10 mt-12 px-8 py-4 rounded-full font-[Dancing_Script] text-xl
//                   bg-rose-gold/20 border border-rose-gold/40 
//                   text-rose-gold hover:bg-rose-gold/30
//                   transition-all duration-500"
//                 style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
//               >
//                 {LANDING.enterButtonText}
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ) : null}
//     </AnimatePresence>
//   );
// }

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { LANDING } from '../data';

const lines = LANDING.lines;

export default function Landing() {
  const { setHasEntered, setMusicPlaying, comfortMode } = useApp();
  const [currentLine, setCurrentLine] = useState(-1);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Enable music as soon as landing page loads
  useEffect(() => {
    setMusicPlaying(true);
  }, [setMusicPlaying]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setCurrentLine(0), 1500));
    timers.push(setTimeout(() => setCurrentLine(1), 4000));
    timers.push(setTimeout(() => setCurrentLine(2), 6500));
    timers.push(setTimeout(() => setShowButton(true), 9000));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      setHasEntered(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: comfortMode ? '#0F0F1A' : '#000000' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Subtle background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: comfortMode ? 'rgba(200,180,230,0.3)' : 'rgba(183,110,121,0.15)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Text lines */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-lg">
            {lines.map((line, i) => (
              <AnimatePresence key={i}>
                {currentLine >= i && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`text-center ${
                      i === 0
                        ? 'text-2xl md:text-4xl font-[Great_Vibes] text-rose-gold'
                        : 'text-base md:text-lg font-[Poppins] leading-relaxed'
                    } ${comfortMode ? 'text-moonlight' : 'text-petal'}`}
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Enter button */}
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                onClick={handleEnter}
                className="relative z-10 mt-12 px-8 py-4 rounded-full font-[Dancing_Script] text-xl
                  bg-rose-gold/20 border border-rose-gold/40 
                  text-rose-gold hover:bg-rose-gold/30
                  transition-all duration-500"
                style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
              >
                {LANDING.enterButtonText}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}