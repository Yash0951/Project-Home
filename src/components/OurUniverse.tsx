import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { UNIVERSE_PLANETS } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const planets = UNIVERSE_PLANETS;

export default function OurUniverse() {
  const { comfortMode } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  useScrollLock(selectedPlanet !== null);

  return (
    <section id="universe" className="relative py-20 px-4" style={{ minHeight: '100vh' }}>
      {/* Galaxy background */}
      <div className="absolute inset-0 overflow-hidden rounded-none">
        {/* Deep space gradient */}
        <div className={`absolute inset-0
          ${comfortMode ? 'bg-gradient-to-b from-deep-night via-night-blue to-[#1A2A4A]' : 'bg-gradient-to-b from-[#2A2040] via-[#3A2850] to-[#1A1A30]'}`}
        />
        {/* Stars */}
        {[...Array(120)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: comfortMode ? 'rgba(200,180,230,0.7)' : 'rgba(183,110,121,0.4)',
            }}
          />
        ))}
        {/* Nebula glow */}
        <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-[80px]
          ${comfortMode ? 'bg-lavender' : 'bg-rose-gold'}`}
        />
        <div className={`absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full opacity-5 blur-[60px]
          ${comfortMode ? 'bg-moonlight' : 'bg-starlight'}`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h2 className="font-[Great_Vibes] text-4xl md:text-5xl mb-2 text-moonlight glow-text-light">
            Our Little Universe
          </h2>
          <p className="font-[Poppins] text-sm text-lavender/50">
            each planet holds a story of us — tap to explore
          </p>
        </motion.div>

        {/* Interactive galaxy scene */}
        <div className="max-w-lg mx-auto">
          {/* Central glow / sun */}
          <div className="relative flex items-center justify-center mb-16">
            <motion.div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                background: `radial-gradient(circle at 35% 35%, ${comfortMode ? '#FFE4B5' : '#D4A574'}, ${comfortMode ? '#C9B8E8' : '#B76E79'})`,
                boxShadow: `0 0 30px ${comfortMode ? '#C9B8E840' : '#B76E7940'}, 0 0 60px ${comfortMode ? '#C9B8E820' : '#B76E7920'}`,
              }}
            >
              <span className="text-2xl">💫</span>
            </motion.div>
            <motion.p
              className="absolute -bottom-6 font-[Dancing_Script] text-sm text-moonlight/60"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Our love
            </motion.p>
          </div>

          {/* Planet cards */}
          <div className="grid grid-cols-2 gap-6">
            {planets.map((planet, i) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative cursor-pointer rounded-2xl p-6 text-center
                  ${comfortMode ? 'glass-card-dark' : 'bg-white/5 border border-lavender/15 rounded-2xl'}`}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlanet(planet.id)}
              >
                {/* Planet orb */}
                <motion.div
                  className="mx-auto mb-4 rounded-full flex items-center justify-center"
                  animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    background: `radial-gradient(circle at 30% 30%, ${planet.color}60, ${planet.color}20, transparent)`,
                    boxShadow: `0 0 ${planet.size}px ${planet.color}30, 0 0 ${planet.size * 1.5}px ${planet.color}15`,
                  }}
                >
                  <span className="text-xl">{planet.emoji}</span>
                </motion.div>

                <h3 className="font-[Dancing_Script] text-lg text-moonlight mb-1">
                  {planet.title}
                </h3>
                <p className="font-[Poppins] text-xs text-lavender/50 leading-relaxed">
                  "{planet.desc}"
                </p>

                {/* URL indicator */}
                {planet.url && (
                  <p className="font-[Poppins] text-[10px] text-starlight/40 mt-2">
                    🔗 has a link
                  </p>
                )}

                {/* Orbit ring decoration */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-dashed opacity-10"
                  style={{ borderColor: planet.color }}
                  animate={{ opacity: [0.05, 0.15, 0.05], rotate: [0, 360] }}
                  transition={{ opacity: { duration: 3, repeat: Infinity }, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Planet detail overlay — closes on backdrop click */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4
              bg-deep-night/80"
            onClick={() => setSelectedPlanet(null)}
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-md text-center px-8 py-10 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: comfortMode ? 'rgba(26,26,46,0.85)' : 'rgba(26,26,46,0.9)',
                boxShadow: `0 0 40px ${planets.find(p => p.id === selectedPlanet)?.color}30`,
                border: `1px solid ${planets.find(p => p.id === selectedPlanet)?.color}30`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Planet orb */}
              <motion.div
                className="mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${planets.find(p => p.id === selectedPlanet)?.color}50, transparent)`,
                  boxShadow: `0 0 30px ${planets.find(p => p.id === selectedPlanet)?.color}30`,
                }}
              >
                <span className="text-4xl">{planets.find(p => p.id === selectedPlanet)?.emoji}</span>
              </motion.div>

              <h3 className="font-[Great_Vibes] text-3xl text-moonlight mb-3">
                {planets.find(p => p.id === selectedPlanet)?.title}
              </h3>
              <p className="font-[Dancing_Script] text-xl text-starlight mb-6">
                "{planets.find(p => p.id === selectedPlanet)?.desc}"
              </p>
              <p className="font-[Poppins] text-sm text-moonlight/50 leading-relaxed mb-6">
                Each of these represents a chapter in our story.
                A moment where our love grew deeper, stronger, more beautiful.
                This planet orbits around our love — just like we do.
              </p>

              {/* Visit link button — only shown if url is set */}
              {planets.find(p => p.id === selectedPlanet)?.url && (
                <motion.a
                  href={planets.find(p => p.id === selectedPlanet)?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-full font-[Dancing_Script] text-lg
                    glass-dark text-moonlight border border-lavender/20 mb-4
                    hover:bg-lavender/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔗 Visit this planet →
                </motion.a>
              )}

              {/* No URL set message */}
              {!planets.find(p => p.id === selectedPlanet)?.url && (
                <p className="font-[Poppins] text-xs text-lavender/30 mb-4">
                  💡 Add a live URL for this planet in data.ts
                </p>
              )}

              <motion.button
                onClick={() => setSelectedPlanet(null)}
                className="px-6 py-3 rounded-full glass-dark text-moonlight font-[Dancing_Script] text-lg
                  border border-lavender/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to our universe ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
