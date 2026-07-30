// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { EXAM_CONFIG, AFFIRMATIONS } from '../data';
// import { useScrollLock } from '../hooks/useScrollLock';

// const moods = [
//   { emoji: '😊', label: 'Happy', color: 'bg-yellow-400/20' },
//   { emoji: '😌', label: 'Calm', color: 'bg-blue-400/20' },
//   { emoji: '💪', label: 'Motivated', color: 'bg-green-400/20' },
//   { emoji: '😔', label: 'Sad', color: 'bg-purple-400/20' },
//   { emoji: '😤', label: 'Frustrated', color: 'bg-red-400/20' },
//   { emoji: '😴', label: 'Tired', color: 'bg-indigo-400/20' },
//   { emoji: '🥺', label: 'Need Love', color: 'bg-pink-400/20' },
//   { emoji: '🧠', label: 'Focused', color: 'bg-teal-400/20' },
// ];

// const affirmations = AFFIRMATIONS;

// export default function InteractiveFeatures() {
//   const { comfortMode, setComfortMode, studyStreak, randomLoveNote, moodLog, logMood, journalEntries, addJournalEntry } = useApp();
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState('');
//   const [journalText, setJournalText] = useState('');
//   const [todayAffirmation, setTodayAffirmation] = useState('');

//   // Lock background scroll when panel is open
//   useScrollLock(panelOpen);

//   const examDate = new Date(EXAM_CONFIG.examDate);
//   const daysUntilExam = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
//     setTodayAffirmation(affirmations[dayOfYear % affirmations.length]);
//   }, []);

//   const handleAddJournal = () => {
//     if (!journalText.trim()) return;
//     addJournalEntry({
//       date: new Date().toISOString().split('T')[0],
//       text: journalText,
//       mood: moodLog.find(m => m.date === new Date().toISOString().split('T')[0])?.mood || '📝',
//     });
//     setJournalText('');
//   };

//   return (
//     <>
//       {/* Toggle Button - Left side */}
//       <motion.button
//         className={`fixed bottom-4 left-4 z-40 w-12 h-12 rounded-full flex items-center justify-center text-lg
//           ${comfortMode ? 'glass-dark text-moonlight' : 'glass text-rose-gold'}`}
//         onClick={() => setPanelOpen(!panelOpen)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         ⏱
//       </motion.button>

//       {/* Comfort Mode Toggle — NO popup, just smooth transition */}
//       <motion.button
//         className={`fixed bottom-4 left-16 z-40 w-12 h-12 rounded-full flex items-center justify-center text-lg
//           ${comfortMode ? 'glass-dark text-starlight' : 'glass text-rose-gold'}`}
//         onClick={() => setComfortMode(!comfortMode)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
//       >
//         {comfortMode ? '🌞' : '🌙'}
//       </motion.button>

//       {/* Panel with backdrop */}
//       <AnimatePresence>
//         {panelOpen && (
//           <>
//             {/* Backdrop — blurs + dims background, closes panel on click */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 z-[39]"
//               style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.3)' }}
//               onClick={() => setPanelOpen(false)}
//             />

//             {/* Panel itself — can scroll inside */}
//             <motion.div
//               initial={{ opacity: 0, y: 20, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//               className="fixed bottom-16 left-4 right-4 z-40 max-w-sm mx-auto p-6 rounded-2xl
//                 max-h-[70vh] overflow-y-auto"
//               data-scrollable
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 background: comfortMode ? 'rgba(26,26,46,0.85)' : 'rgba(250,245,239,0.85)',
//                 border: comfortMode ? '1px solid rgba(200,180,230,0.2)' : '1px solid rgba(183,110,121,0.2)',
//                 backdropFilter: 'blur(20px)',
//                 WebkitBackdropFilter: 'blur(20px)',
//               }}
//             >
//               {/* Live Clock */}
//               <div className="text-center mb-4">
//                 <p className={`font-[Poppins] text-2xl font-light
//                   ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}`}>
//                   {currentTime}
//                 </p>
//               </div>

//               {/* Countdown */}
//               <div className={`p-3 rounded-xl mb-4 text-center
//                 ${comfortMode ? 'bg-night-blue/50 text-moonlight' : 'bg-cream/50 text-warm-brown'}`}>
//                 <p className="font-[Poppins] text-xs opacity-60 mb-1">{EXAM_CONFIG.countdownLabel}</p>
//                 <p className="font-[Dancing_Script] text-2xl">
//                   {daysUntilExam} days 📅
//                 </p>
//               </div>

//               {/* Study Streak */}
//               <div className={`p-3 rounded-xl mb-4 text-center
//                 ${comfortMode ? 'bg-night-blue/50 text-moonlight' : 'bg-cream/50 text-warm-brown'}`}>
//                 <p className="font-[Poppins] text-xs opacity-60 mb-1">Study streak</p>
//                 <p className="font-[Dancing_Script] text-2xl">
//                   {studyStreak} days 🔥
//                 </p>
//               </div>

//               {/* Random Love Note */}
//               <div className={`p-3 rounded-xl mb-4 text-center
//                 ${comfortMode ? 'bg-night-blue/50' : 'bg-blush/30'}`}>
//                 <p className={`font-[Dancing_Script] text-sm
//                   ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
//                   💕 {randomLoveNote}
//                 </p>
//               </div>

//               {/* Daily Affirmation */}
//               <div className={`p-3 rounded-xl mb-4 text-center
//                 ${comfortMode ? 'bg-night-blue/50' : 'bg-cream/50'}`}>
//                 <p className={`font-[Poppins] text-xs opacity-60 mb-1`}>Daily affirmation</p>
//                 <p className={`font-[Dancing_Script] text-sm
//                   ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}`}>
//                   {todayAffirmation}
//                 </p>
//               </div>

//               {/* Mood Tracker */}
//               <div className="mb-4">
//                 <p className={`font-[Poppins] text-xs opacity-60 mb-2`}>
//                   How are you feeling today?
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {moods.map((mood) => (
//                     <motion.button
//                       key={mood.label}
//                       onClick={() => logMood(mood.emoji)}
//                       className={`px-3 py-1.5 rounded-full text-xs font-[Poppins]
//                         ${mood.color} ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}
//                         hover:scale-105 transition-transform`}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       {mood.emoji} {mood.label}
//                     </motion.button>
//                   ))}
//                 </div>
//                 {moodLog.length > 0 && (
//                   <p className={`font-[Poppins] text-xs mt-2 opacity-50`}>
//                     Today's mood: {moodLog.find(m => m.date === new Date().toISOString().split('T')[0])?.mood || 'Not logged'}
//                   </p>
//                 )}
//               </div>

//               {/* Mini Journal */}
//               <div className="mb-4">
//                 <p className={`font-[Poppins] text-xs opacity-60 mb-2`}>
//                   Quick journal entry
//                 </p>
//                 <textarea
//                   value={journalText}
//                   onChange={(e) => setJournalText(e.target.value)}
//                   placeholder="How was your study session today?..."
//                   className={`w-full p-3 rounded-xl text-sm font-[Poppins] resize-none h-20
//                     ${comfortMode 
//                       ? 'bg-night-blue/50 text-moonlight placeholder:text-lavender/30 border border-lavender/10' 
//                       : 'bg-cream/50 text-warm-brown placeholder:text-warm-brown/30 border border-rose-gold/10'}
//                     focus:outline-none focus:ring-1 focus:ring-rose-gold/30`}
//                 />
//                 <motion.button
//                   onClick={handleAddJournal}
//                   className="mt-2 px-4 py-2 rounded-xl text-xs font-[Poppins]
//                     bg-rose-gold/20 text-rose-gold hover:bg-rose-gold/30 transition-colors"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Save Entry ✍️
//                 </motion.button>
//                 {journalEntries.length > 0 && (
//                   <p className={`font-[Poppins] text-xs mt-1 opacity-40`}>
//                     {journalEntries.length} entries saved
//                   </p>
//                 )}
//               </div>

//               {/* Close */}
//               <motion.button
//                 onClick={() => setPanelOpen(false)}
//                 className="text-center w-full text-xs opacity-40 font-[Poppins] mt-2"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 ✕ Close
//               </motion.button>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { EXAM_CONFIG, AFFIRMATIONS } from '../data';
import { useScrollLock } from '../hooks/useScrollLock';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-400/20' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-400/20' },
  { emoji: '💪', label: 'Motivated', color: 'bg-green-400/20' },
  { emoji: '😔', label: 'Sad', color: 'bg-purple-400/20' },
  { emoji: '😤', label: 'Frustrated', color: 'bg-red-400/20' },
  { emoji: '😴', label: 'Tired', color: 'bg-indigo-400/20' },
  { emoji: '🥺', label: 'Need Love', color: 'bg-pink-400/20' },
  { emoji: '🧠', label: 'Focused', color: 'bg-teal-400/20' },
];

const affirmations = AFFIRMATIONS;

export default function InteractiveFeatures() {
  const { 
    comfortMode, 
    setComfortMode, 
    studyStreak, 
    randomLoveNote, 
    moodLog, 
    logMood, 
    journalEntries, 
    addJournalEntry,
    setShowEmergency 
  } = useApp();

  const [panelOpen, setPanelOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [journalText, setJournalText] = useState('');
  const [todayAffirmation, setTodayAffirmation] = useState('');

  // Lock background scroll when interactive panel is open
  useScrollLock(panelOpen);

  const examDate = new Date(EXAM_CONFIG.examDate);
  const daysUntilExam = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setTodayAffirmation(affirmations[dayOfYear % affirmations.length]);
  }, []);

  const handleAddJournal = () => {
    if (!journalText.trim()) return;
    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      text: journalText,
      mood: moodLog.find(m => m.date === new Date().toISOString().split('T')[0])?.mood || '📝',
    });
    setJournalText('');
  };

  return (
    <>
      {/* Vertically Aligned Dock - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-3 items-center">
        {/* 1. Interactive Panel Trigger */}
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg
            ${comfortMode ? 'glass-dark text-moonlight' : 'glass text-rose-gold'}`}
          onClick={() => setPanelOpen(!panelOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Interactive Panel"
        >
          ⏱
        </motion.button>

        {/* 2. Emergency Feature Trigger */}
        <motion.button
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg bg-red-500/20 border border-red-500/40 text-red-400"
          onClick={() => setShowEmergency(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
          title="Emergency Support"
        >
          🚨
        </motion.button>

        {/* 3. Theme / Comfort Mode Toggle */}
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg
            ${comfortMode ? 'glass-dark text-starlight' : 'glass text-rose-gold'}`}
          onClick={() => setComfortMode(!comfortMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
          title="Toggle Comfort Mode"
        >
          {comfortMode ? '🌞' : '🌙'}
        </motion.button>
      </div>

      {/* Sliding Interactive Panel */}
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[39]"
              style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.3)' }}
              onClick={() => setPanelOpen(false)}
            />

            {/* Panel Content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 left-4 right-4 z-40 max-w-sm mx-auto p-6 rounded-2xl max-h-[70vh] overflow-y-auto"
              data-scrollable
              onClick={(e) => e.stopPropagation()}
              style={{
                background: comfortMode ? 'rgba(26,26,46,0.85)' : 'rgba(250,245,239,0.85)',
                border: comfortMode ? '1px solid rgba(200,180,230,0.2)' : '1px solid rgba(183,110,121,0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Live Clock */}
              <div className="text-center mb-4">
                <p className={`font-[Poppins] text-2xl font-light ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}`}>
                  {currentTime}
                </p>
              </div>

              {/* Countdown */}
              <div className={`p-3 rounded-xl mb-4 text-center ${comfortMode ? 'bg-night-blue/50 text-moonlight' : 'bg-cream/50 text-warm-brown'}`}>
                <p className="font-[Poppins] text-xs opacity-60 mb-1">{EXAM_CONFIG.countdownLabel}</p>
                <p className="font-[Dancing_Script] text-2xl">{daysUntilExam} days 📅</p>
              </div>

              {/* Study Streak */}
              <div className={`p-3 rounded-xl mb-4 text-center ${comfortMode ? 'bg-night-blue/50 text-moonlight' : 'bg-cream/50 text-warm-brown'}`}>
                <p className="font-[Poppins] text-xs opacity-60 mb-1">Study streak</p>
                <p className="font-[Dancing_Script] text-2xl">{studyStreak} days 🔥</p>
              </div>

              {/* Random Love Note */}
              <div className={`p-3 rounded-xl mb-4 text-center ${comfortMode ? 'bg-night-blue/50' : 'bg-blush/30'}`}>
                <p className={`font-[Dancing_Script] text-sm ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
                  💕 {randomLoveNote}
                </p>
              </div>

              {/* Daily Affirmation */}
              <div className={`p-3 rounded-xl mb-4 text-center ${comfortMode ? 'bg-night-blue/50' : 'bg-cream/50'}`}>
                <p className="font-[Poppins] text-xs opacity-60 mb-1">Daily affirmation</p>
                <p className={`font-[Dancing_Script] text-sm ${comfortMode ? 'text-moonlight' : 'text-warm-brown'}`}>
                  {todayAffirmation}
                </p>
              </div>

              {/* Mood Tracker */}
              <div className="mb-4">
                <p className="font-[Poppins] text-xs opacity-60 mb-2">How are you feeling today?</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.label}
                      onClick={() => logMood(mood.emoji)}
                      className={`px-3 py-1.5 rounded-full text-xs font-[Poppins] ${mood.color} ${comfortMode ? 'text-moonlight' : 'text-warm-brown'} hover:scale-105 transition-transform`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {mood.emoji} {mood.label}
                    </motion.button>
                  ))}
                </div>
                {moodLog.length > 0 && (
                  <p className="font-[Poppins] text-xs mt-2 opacity-50">
                    Today's mood: {moodLog.find(m => m.date === new Date().toISOString().split('T')[0])?.mood || 'Not logged'}
                  </p>
                )}
              </div>

              {/* Mini Journal */}
              <div className="mb-4">
                <p className="font-[Poppins] text-xs opacity-60 mb-2">Quick journal entry</p>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="How was your study session today?..."
                  className={`w-full p-3 rounded-xl text-sm font-[Poppins] resize-none h-20 ${
                    comfortMode
                      ? 'bg-night-blue/50 text-moonlight placeholder:text-lavender/30 border border-lavender/10'
                      : 'bg-cream/50 text-warm-brown placeholder:text-warm-brown/30 border border-rose-gold/10'
                  } focus:outline-none focus:ring-1 focus:ring-rose-gold/30`}
                />
                <motion.button
                  onClick={handleAddJournal}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-[Poppins] bg-rose-gold/20 text-rose-gold hover:bg-rose-gold/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Entry ✍️
                </motion.button>
                {journalEntries.length > 0 && (
                  <p className="font-[Poppins] text-xs mt-1 opacity-40">
                    {journalEntries.length} entries saved
                  </p>
                )}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setPanelOpen(false)}
                className="text-center w-full text-xs opacity-40 font-[Poppins] mt-2"
                whileHover={{ scale: 1.02 }}
              >
                ✕ Close
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}