import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MEMORIES } from '../data';

const gradientColors = [
  "from-rose-gold/20 to-blush/30",
  "from-lavender/20 to-cream/30",
  "from-blush/20 to-beige/30",
  "from-rose-gold/15 to-lavender/25",
  "from-lavender/20 to-moonlight/20",
  "from-beige/20 to-lavender/20",
  "from-rose-gold/20 to-starlight/15",
  "from-rose-gold/25 to-blush/30",
  "from-beige/25 to-cream/30",
  "from-lavender/25 to-starlight/20",
];

export default function MemoryMuseum() {
  const { comfortMode, randomMemory } = useApp();

  return (
    <section id="memories" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Memory Museum
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          our little museum of moments that matter
        </p>
      </motion.div>

      {/* Random memory highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`max-w-md mx-auto mb-12 p-6 rounded-2xl text-center
          ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}
      >
        <p className={`font-[Dancing_Script] text-xl mb-2
          ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
          Today's random memory ✨
        </p>
        <p className={`font-[Poppins] text-lg ${comfortMode ? 'text-moonlight/80' : 'text-warm-brown/80'}`}>
          {randomMemory}
        </p>
      </motion.div>

      {/* Proper grid — always 2 on mobile, 3 on desktop */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {MEMORIES.map((mem, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });
          const color = gradientColors[i % gradientColors.length];
          const isPortrait = mem.orientation === 'portrait';

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="polaroid"
              style={{ transform: `rotate(${mem.angle}deg)` }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              {/* Photo area — aspect ratio changes based on orientation */}
              {mem.imageUrl ? (
                <img
                  src={mem.imageUrl}
                  alt={mem.caption}
                  className={`w-full rounded-sm object-cover
                    ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                  loading="lazy"
                />
              ) : (
                <div className={`w-full rounded-sm bg-gradient-to-br ${color}
                  flex flex-col items-center justify-center gap-2
                  ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <span className={`text-3xl ${isPortrait ? 'text-4xl' : ''}`}>
                    {mem.caption.split(' ').pop()}
                  </span>
                  <span className="text-[10px] text-warm-brown/30 font-[Poppins]">
                    add photo in data.ts
                  </span>
                </div>
              )}
              <p className="polaroid-caption">{mem.caption}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
