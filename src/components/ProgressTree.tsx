import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

// Leaf positions on the tree — each represents one study day
const LEAF_POSITIONS = [
  { x: 100, y: 80 }, { x: 75, y: 90 }, { x: 125, y: 90 },
  { x: 50, y: 130 }, { x: 150, y: 130 }, { x: 68, y: 108 },
  { x: 132, y: 108 }, { x: 42, y: 98 }, { x: 158, y: 98 },
  { x: 65, y: 72 }, { x: 135, y: 72 }, { x: 88, y: 76 },
  { x: 112, y: 76 }, { x: 78, y: 84 }, { x: 122, y: 84 },
  { x: 55, y: 118 }, { x: 145, y: 118 }, { x: 83, y: 102 },
  { x: 117, y: 102 }, { x: 48, y: 128 }, { x: 152, y: 128 },
  { x: 100, y: 68 }, { x: 80, y: 68 }, { x: 120, y: 68 },
  { x: 70, y: 78 }, { x: 130, y: 78 }, { x: 92, y: 62 },
  { x: 108, y: 62 }, { x: 60, y: 92 }, { x: 140, y: 92 },
  { x: 40, y: 112 }, { x: 160, y: 112 }, { x: 100, y: 55 },
  { x: 85, y: 55 }, { x: 115, y: 55 }, { x: 95, y: 48 },
  { x: 105, y: 48 }, { x: 72, y: 65 }, { x: 128, y: 65 },
  { x: 90, y: 52 }, { x: 110, y: 52 },
];

const FLOWER_POSITIONS = [
  { x: 50, y: 128 }, { x: 150, y: 128 }, { x: 65, y: 70 },
  { x: 135, y: 70 }, { x: 100, y: 63 }, { x: 80, y: 75 },
  { x: 120, y: 75 }, { x: 42, y: 100 },
];

function TreeSVG({ streak, newLeafIndex, comfortMode }: { streak: number; newLeafIndex: number; comfortMode: boolean }) {
  const leaves = Math.min(streak, LEAF_POSITIONS.length);
  const flowers = streak >= 7 ? Math.min(Math.floor((streak - 7) / 5) + 1, FLOWER_POSITIONS.length) : 0;
  const birds = streak >= 14 ? Math.min(Math.floor(streak / 14), 5) : 0;

  const trunkColor = comfortMode ? '#4A4A6A' : '#8B6F47';
  const leafColor = comfortMode ? '#90BE6D' : '#6AAF3D';
  const leafShadow = comfortMode ? '#70AD47' : '#5A9F35';
  const flowerColor = comfortMode ? '#F8BBD0' : '#F06292';
  const flowerCenter = '#FFE082';

  return (
    <svg viewBox="0 0 200 280" className="w-full max-w-xs mx-auto">
      {/* Ground shadow */}
      <ellipse cx="100" cy="268" rx="70" ry="8" fill={comfortMode ? '#2A2A4E' : '#D4C4A8'} opacity="0.4" />
      {/* Grass */}
      <ellipse cx="100" cy="265" rx="60" ry="6" fill={comfortMode ? '#3A4A2E' : '#7CB342'} opacity="0.3" />

      {/* Trunk */}
      <path
        d="M94,268 Q92,220 88,180 Q84,150 88,130 Q92,115 100,108 Q108,115 112,130 Q116,150 112,180 Q108,220 106,268"
        fill={trunkColor}
        stroke={comfortMode ? '#3A3A5A' : '#6B4F3A'}
        strokeWidth="1.5"
      />
      {/* Bark texture */}
      <line x1="97" y1="240" x2="99" y2="250" stroke={comfortMode ? '#3A3A5A' : '#5A3F2A'} strokeWidth="0.5" opacity="0.3" />
      <line x1="102" y1="200" x2="103" y2="210" stroke={comfortMode ? '#3A3A5A' : '#5A3F2A'} strokeWidth="0.5" opacity="0.3" />

      {/* Branches — appear as tree grows */}
      {streak >= 3 && (
        <path d="M88,145 Q68,128 48,135" fill="none" stroke={trunkColor} strokeWidth="2.5" strokeLinecap="round" />
      )}
      {streak >= 6 && (
        <path d="M112,145 Q132,125 152,132" fill="none" stroke={trunkColor} strokeWidth="2.5" strokeLinecap="round" />
      )}
      {streak >= 9 && (
        <path d="M94,120 Q64,100 44,108" fill="none" stroke={trunkColor} strokeWidth="2" strokeLinecap="round" />
      )}
      {streak >= 12 && (
        <path d="M106,120 Q136,95 156,102" fill="none" stroke={trunkColor} strokeWidth="2" strokeLinecap="round" />
      )}
      {streak >= 15 && (
        <path d="M100,108 Q78,85 63,90" fill="none" stroke={trunkColor} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {streak >= 18 && (
        <path d="M100,108 Q122,82 137,88" fill="none" stroke={trunkColor} strokeWidth="1.5" strokeLinecap="round" />
      )}

      {/* Leaves — each one animates individually */}
      {LEAF_POSITIONS.slice(0, leaves).map((pos, i) => {
        const isNew = i === newLeafIndex;
        const r = 4 + (i < 10 ? 2 : i < 20 ? 1 : 0);
        const leafR = Math.min(r, 6);
        
        return (
          <motion.ellipse
            key={`leaf-${i}`}
            cx={pos.x}
            cy={pos.y}
            rx={leafR}
            ry={leafR * 0.8}
            fill={i % 3 === 0 ? leafShadow : leafColor}
            opacity={0.85}
            initial={isNew ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={isNew 
              ? { duration: 0.6, ease: "easeOut" } 
              : { duration: 0.3 }
            }
            style={isNew ? { filter: 'drop-shadow(0 0 4px rgba(106,175,61,0.6))' } : {}}
          />
        );
      })}

      {/* Flowers — bloom after streak >= 7 */}
      {FLOWER_POSITIONS.slice(0, flowers).map((pos, i) => (
        <motion.g key={`flower-${i}`}>
          {/* Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, j) => (
            <motion.ellipse
              key={`petal-${i}-${j}`}
              cx={pos.x + Math.cos(angle * Math.PI / 180) * 3}
              cy={pos.y - 4 + Math.sin(angle * Math.PI / 180) * 3}
              rx={2.5}
              ry={1.5}
              fill={flowerColor}
              opacity={0.9}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.3 + j * 0.05 }}
            />
          ))}
          {/* Center */}
          <motion.circle
            cx={pos.x}
            cy={pos.y - 4}
            r={1.5}
            fill={flowerCenter}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.3 + 0.3 }}
          />
        </motion.g>
      ))}

      {/* Birds */}
      {birds > 0 && [...Array(birds)].map((_, i) => {
        const bx = 15 + i * 40;
        const by = 15 + i * 10;
        return (
          <motion.g key={`bird-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, 3, 0] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity }}>
            <path d={`M${bx},${by} Q${bx-4},${by-3} ${bx-7},${by} M${bx},${by} Q${bx+4},${by-3} ${bx+7},${by}`}
              fill="none" stroke={comfortMode ? '#C9B8E8' : '#8B6F47'} strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>
        );
      })}

      {/* Fireflies for high streaks */}
      {streak >= 21 && [...Array(Math.min(streak - 20, 8))].map((_, i) => (
        <motion.circle
          key={`firefly-${i}`}
          cx={20 + Math.random() * 160}
          cy={30 + Math.random() * 80}
          r={1.5}
          fill={comfortMode ? '#FFE4B5' : '#FFE082'}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.2, 0.8, 0], scale: [0.5, 1.2, 0.8, 1.2, 0.5] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

export default function ProgressTree() {
  const { comfortMode, studyStreak, studyDates, markStudiedToday } = useApp();
  const [justMarked, setJustMarked] = useState(false);
  const [newLeafIndex, setNewLeafIndex] = useState(-1);
  const today = new Date().toISOString().split('T')[0];
  const studiedToday = studyDates.includes(today);

  const handleMarkStudied = () => {
    const nextStreak = studyStreak + 1;
    setNewLeafIndex(Math.min(nextStreak - 1, LEAF_POSITIONS.length - 1));
    markStudiedToday();
    setJustMarked(true);
    setTimeout(() => setJustMarked(false), 3000);
    setTimeout(() => setNewLeafIndex(-1), 2000);
  };

  return (
    <section id="progress" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Progress Tree 🌱
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          every day you study, this tree grows
        </p>
      </motion.div>

      <div className="max-w-md mx-auto">
        {/* Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`p-6 rounded-2xl mb-8 ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
        >
          <TreeSVG streak={studyStreak} newLeafIndex={newLeafIndex} comfortMode={comfortMode} />

          <div className="text-center mt-4">
            <p className={`font-[Dancing_Script] text-xl
              ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
              {studyStreak === 0 ? "Your tree is waiting for its first leaf 🌱" 
                : studyStreak < LEAF_POSITIONS.length 
                  ? `${studyStreak} leaves — keep growing! 🌿`
                  : "Your tree is in full bloom! 🌳✨"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {studyStreak >= 3 && <span className="text-xs">🌿 Branches</span>}
              {studyStreak >= 7 && <span className="text-xs">🌸 Flowers</span>}
              {studyStreak >= 14 && <span className="text-xs">🐦 Birds</span>}
              {studyStreak >= 21 && <span className="text-xs">✨ Fireflies</span>}
            </div>
          </div>
        </motion.div>

        {/* Study Button */}
        <motion.button
          onClick={handleMarkStudied}
          disabled={studiedToday}
          className={`w-full py-4 px-6 rounded-2xl font-[Dancing_Script] text-xl
            ${studiedToday 
              ? 'bg-green-500/15 text-green-400 border border-green-400/30 cursor-default'
              : comfortMode 
                ? 'glass-dark text-moonlight hover:bg-white/10 border border-lavender/20' 
                : 'glass text-rose-gold hover:bg-rose-gold/10 border border-rose-gold/20'
            } transition-all duration-300`}
          whileHover={!studiedToday ? { scale: 1.03 } : {}}
          whileTap={!studiedToday ? { scale: 0.97 } : {}}
        >
          {studiedToday ? '✅ Studied today! A new leaf appeared.' : '🌱 I studied today'}
        </motion.button>

        <AnimatePresence>
          {justMarked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="font-[Dancing_Script] text-lg text-green-400"
              >
                🌿 A new leaf appeared on your tree!
              </motion.p>
              {studyStreak >= 7 && (
                <p className="text-xs text-center mt-1 text-pink-300">🌸 A flower bloomed!</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak counter */}
        <div className={`mt-6 p-4 rounded-xl text-center ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}>
          <p className={`font-[Poppins] text-xs ${comfortMode ? 'text-moonlight/40' : 'text-warm-brown/40'}`}>
            Study streak
          </p>
          <p className={`font-[Great_Vibes] text-3xl ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
            {studyStreak} {studyStreak === 1 ? 'day' : 'days'} 🔥
          </p>
        </div>
      </div>
    </section>
  );
}
