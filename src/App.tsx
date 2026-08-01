import { motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { SITE_INFO } from './data';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import LetterSection from './components/LetterSection';
import ComfortCenter from './components/ComfortCenter';
import Timeline from './components/Timeline';
import MotivationWall from './components/MotivationWall';
// import MemoryMuseum from './components/MemoryMuseum';
import PrideSection from './components/PrideSection';
import ProgressTree from './components/ProgressTree';
import DistanceSection from './components/DistanceSection';
import EmergencyButton from './components/EmergencyButton';
import VoiceNotes from './components/VoiceNotes';
// import OurUniverse from './components/OurUniverse';
import FinalSection from './components/FinalSection';
import MusicPlayer from './components/MusicPlayer';
import InteractiveFeatures from './components/InteractiveFeatures';
import EasterEggs from './components/EasterEggs';

function MainContent() {
  const { comfortMode, hasEntered } = useApp();

  if (!hasEntered) {
    return <Landing />;
  }

  return (
    <div className={`comfort-transition relative min-h-screen
      ${comfortMode ? 'bg-night-gradient' : 'bg-warm-gradient'}`}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {comfortMode ? (
          // Night mode - fireflies
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firefly-${i}`}
                className="firefly"
                animate={{
                  x: [0, Math.random() * 100, Math.random() * -50, 0],
                  y: [0, Math.random() * -30, Math.random() * 30, 0],
                  opacity: [0, 0.6, 0.3, 0.6, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </>
        ) : (
          // Day mode - floating petals
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute text-lg opacity-10"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 5, -5, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {['🌸', '✿', '❀', '💮'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* Home - Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-md"
          >
            <motion.p
              className={`font-[Great_Vibes] text-5xl md:text-7xl mb-4
                ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Mashy, mashyash, Maya, My🧿
            </motion.p>
            <motion.p
              className={`font-[Dancing_Script] text-xl md:text-2xl mb-8
                ${comfortMode ? 'text-starlight/70' : 'text-warm-brown/70'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              "{SITE_INFO.tagline}"
            </motion.p>
            <motion.p
              className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/40' : 'text-warm-brown/40'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              A comfort space. A motivation hub. A safe place.
              <br />Always here when you need it.
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              className="mt-12"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className={`font-[Poppins] text-xs ${comfortMode ? 'text-lavender/30' : 'text-warm-brown/30'}`}>
                Scroll down to begin ↓
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Decorative divider */}
        <SectionDivider />

        {/* Letter Section */}
        <LetterSection />
        <SectionDivider />

        {/* Comfort Center */}
        <ComfortCenter />
        <SectionDivider />

        {/* Timeline */}
        <Timeline />
        <SectionDivider />

        {/* Motivation Wall */}
        <MotivationWall />
        <SectionDivider />

        {/* Memory Museum */}
        {/* <MemoryMuseum />
        <SectionDivider /> */}

        {/* Pride Section */}
        <PrideSection />
        <SectionDivider />

        {/* Progress Tree */}
        <ProgressTree />
        <SectionDivider />

        {/* Distance */}
        <DistanceSection />
        <SectionDivider />

        {/* Emergency Button */}
        <EmergencyButton />
        <SectionDivider />

        {/* Voice Notes */}
        <VoiceNotes />
        <SectionDivider />

        {/* Our Universe */}
        {/* <OurUniverse />
        <SectionDivider /> */}

        {/* Final Section */}
        <FinalSection />
      </div>

      {/* Fixed UI Elements */}
      <MusicPlayer />
      <InteractiveFeatures />
      <EasterEggs />
    </div>
  );
}

function SectionDivider() {
  const { comfortMode } = useApp();
  
  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        className={`flex items-center gap-3 opacity-30
          ${comfortMode ? 'text-lavender' : 'text-rose-gold'}`}
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-xs">✿</span>
        <span className="text-sm">~</span>
        <span className="text-xs">✿</span>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
