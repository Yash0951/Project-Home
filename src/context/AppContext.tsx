// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { LOVE_NOTES as LOVE_NOTES_DATA, MEMORIES as MEMORIES_DATA } from '../data';

// interface JournalEntry {
//   date: string;
//   text: string;
//   mood: string;
// }

// interface AppState {
//   comfortMode: boolean;
//   setComfortMode: (mode: boolean) => void;
//   musicPlaying: boolean;
//   setMusicPlaying: (playing: boolean) => void;
//   musicVolume: number;
//   setMusicVolume: (vol: number) => void;
//   hasEntered: boolean;
//   setHasEntered: (entered: boolean) => void;
//   studyStreak: number;
//   studyDates: string[];
//   markStudiedToday: () => void;
//   journalEntries: JournalEntry[];
//   addJournalEntry: (entry: JournalEntry) => void;
//   moodLog: { date: string; mood: string }[];
//   logMood: (mood: string) => void;
//   flowerRain: boolean;
//   setFlowerRain: (rain: boolean) => void;
//   activeExperience: string | null;
//   setActiveExperience: (exp: string | null) => void;
//   showEmergency: boolean;
//   setShowEmergency: (show: boolean) => void;
//   randomLoveNote: string;
//   randomMemory: string;
// }

// const AppContext = createContext<AppState | null>(null);

// const LOVE_NOTES = LOVE_NOTES_DATA;

// const MEMORIES = MEMORIES_DATA.map(m => m.caption);

// export function AppProvider({ children }: { children: React.ReactNode }) {
//   const [comfortMode, setComfortMode] = useState(() => {
//     try { return localStorage.getItem('comfortMode') === 'true'; } catch { return false; }
//   });
//   const [musicPlaying, setMusicPlaying] = useState(false);
//   const [musicVolume, setMusicVolume] = useState(0.5);
//   const [hasEntered, setHasEntered] = useState(false);
//   const [studyStreak, setStudyStreak] = useState(0);
//   const [studyDates, setStudyDates] = useState<string[]>([]);
//   const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
//   const [moodLog, setMoodLog] = useState<{ date: string; mood: string }[]>([]);
//   const [flowerRain, setFlowerRain] = useState(false);
//   const [activeExperience, setActiveExperience] = useState<string | null>(null);
//   const [showEmergency, setShowEmergency] = useState(false);
//   const [randomLoveNote, setRandomLoveNote] = useState(() => 
//     LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)]
//   );
//   const [randomMemory, setRandomMemory] = useState(() =>
//     MEMORIES[Math.floor(Math.random() * MEMORIES.length)]
//   );

//   useEffect(() => {
//     try {
//       const savedStreak = localStorage.getItem('studyStreak');
//       const savedDates = localStorage.getItem('studyDates');
//       const savedJournal = localStorage.getItem('journalEntries');
//       const savedMood = localStorage.getItem('moodLog');
//       if (savedStreak) setStudyStreak(parseInt(savedStreak));
//       if (savedDates) setStudyDates(JSON.parse(savedDates));
//       if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
//       if (savedMood) setMoodLog(JSON.parse(savedMood));
//     } catch {}
//   }, []);

//   useEffect(() => {
//     try { localStorage.setItem('comfortMode', comfortMode.toString()); } catch {}
//     if (comfortMode) {
//       document.body.classList.add('comfort-mode');
//     } else {
//       document.body.classList.remove('comfort-mode');
//     }
//   }, [comfortMode]);

//   const markStudiedToday = useCallback(() => {
//     const today = new Date().toISOString().split('T')[0];
//     if (studyDates.includes(today)) return;
//     const newDates = [...studyDates, today];
//     // Calculate streak
//     let streak = 1;
//     const sorted = [...newDates].sort().reverse();
//     let current = new Date(today);
//     for (let i = 1; i < sorted.length; i++) {
//       const prevDate = new Date(sorted[i]);
//       const diff = (current.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
//       if (diff <= 1.5) {
//         streak++;
//         current = prevDate;
//       } else break;
//     }
//     setStudyStreak(streak);
//     setStudyDates(newDates);
//     try {
//       localStorage.setItem('studyStreak', streak.toString());
//       localStorage.setItem('studyDates', JSON.stringify(newDates));
//     } catch {}
//   }, [studyDates]);

//   const addJournalEntry = useCallback((entry: JournalEntry) => {
//     const newEntries = [...journalEntries, entry];
//     setJournalEntries(newEntries);
//     try { localStorage.setItem('journalEntries', JSON.stringify(newEntries)); } catch {}
//   }, [journalEntries]);

//   const logMood = useCallback((mood: string) => {
//     const today = new Date().toISOString().split('T')[0];
//     const newLog = [...moodLog.filter(m => m.date !== today), { date: today, mood }];
//     setMoodLog(newLog);
//     try { localStorage.setItem('moodLog', JSON.stringify(newLog)); } catch {}
//   }, [moodLog]);

//   // Refresh random note on each visit
//   useEffect(() => {
//     setRandomLoveNote(LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)]);
//     setRandomMemory(MEMORIES[Math.floor(Math.random() * MEMORIES.length)]);
//   }, []);

//   return (
//     <AppContext.Provider value={{
//       comfortMode, setComfortMode,
//       musicPlaying, setMusicPlaying,
//       musicVolume, setMusicVolume,
//       hasEntered, setHasEntered,
//       studyStreak, studyDates, markStudiedToday,
//       journalEntries, addJournalEntry,
//       moodLog, logMood,
//       flowerRain, setFlowerRain,
//       activeExperience, setActiveExperience,
//       showEmergency, setShowEmergency,
//       randomLoveNote, randomMemory,
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useApp() {
//   const context = useContext(AppContext);
//   if (!context) throw new Error('useApp must be used within AppProvider');
//   return context;
// }

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LOVE_NOTES as LOVE_NOTES_DATA, MEMORIES as MEMORIES_DATA } from '../data';

interface JournalEntry {
  date: string;
  text: string;
  mood: string;
}

interface AppState {
  comfortMode: boolean;
  setComfortMode: (mode: boolean) => void;
  musicPlaying: boolean;
  setMusicPlaying: (playing: boolean) => void;
  musicVolume: number;
  setMusicVolume: (vol: number) => void;
  hasEntered: boolean;
  setHasEntered: (entered: boolean) => void;
  isVoiceNotePlaying: boolean;
  setIsVoiceNotePlaying: (playing: boolean) => void;
  studyStreak: number;
  studyDates: string[];
  markStudiedToday: () => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  moodLog: { date: string; mood: string }[];
  logMood: (mood: string) => void;
  flowerRain: boolean;
  setFlowerRain: (rain: boolean) => void;
  activeExperience: string | null;
  setActiveExperience: (exp: string | null) => void;
  showEmergency: boolean;
  setShowEmergency: (show: boolean) => void;
  randomLoveNote: string;
  randomMemory: string;
}

const AppContext = createContext<AppState | null>(null);

const LOVE_NOTES = LOVE_NOTES_DATA;
const MEMORIES = MEMORIES_DATA.map(m => m.caption);

// Helper: Get YYYY-MM-DD string in local time to avoid UTC timezone bugs
const getLocalDateString = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper: Calculate active streak of consecutive daily study sessions
const calculateStreak = (dates: string[]): number => {
  if (!dates || dates.length === 0) return 0;
  
  const uniqueDates = Array.from(new Set(dates)).sort().reverse();
  const today = getLocalDateString();
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  // If latest study date is neither today nor yesterday, active streak is broken
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let expectedDate = new Date(uniqueDates[0] + 'T00:00:00');

  for (const dateStr of uniqueDates) {
    const currentDate = new Date(dateStr + 'T00:00:00');
    const diffTime = expectedDate.getTime() - currentDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      expectedDate = currentDate;
    } else {
      break;
    }
  }

  return streak;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [comfortMode, setComfortMode] = useState(() => {
    try { return localStorage.getItem('comfortMode') === 'true'; } catch { return false; }
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVoiceNotePlaying, setIsVoiceNotePlaying] = useState(false);
  const [studyStreak, setStudyStreak] = useState(0);
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [moodLog, setMoodLog] = useState<{ date: string; mood: string }[]>([]);
  const [flowerRain, setFlowerRain] = useState(false);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [randomLoveNote, setRandomLoveNote] = useState(() => 
    LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)]
  );
  const [randomMemory, setRandomMemory] = useState(() =>
    MEMORIES[Math.floor(Math.random() * MEMORIES.length)]
  );

  // Synchronize streak cleanly on initial load
  useEffect(() => {
    try {
      const savedDates = localStorage.getItem('studyDates');
      const savedJournal = localStorage.getItem('journalEntries');
      const savedMood = localStorage.getItem('moodLog');
      
      let parsedDates: string[] = [];
      if (savedDates) {
        parsedDates = JSON.parse(savedDates);
        setStudyDates(parsedDates);
      }
      
      const activeStreak = calculateStreak(parsedDates);
      setStudyStreak(activeStreak);
      localStorage.setItem('studyStreak', activeStreak.toString());

      if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
      if (savedMood) setMoodLog(JSON.parse(savedMood));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('comfortMode', comfortMode.toString()); } catch {}
    if (comfortMode) {
      document.body.classList.add('comfort-mode');
    } else {
      document.body.classList.remove('comfort-mode');
    }
  }, [comfortMode]);

  const markStudiedToday = useCallback(() => {
    const today = getLocalDateString();
    if (studyDates.includes(today)) return;

    const newDates = [...studyDates, today];
    const newStreak = calculateStreak(newDates);

    setStudyStreak(newStreak);
    setStudyDates(newDates);

    try {
      localStorage.setItem('studyStreak', newStreak.toString());
      localStorage.setItem('studyDates', JSON.stringify(newDates));
    } catch {}
  }, [studyDates]);

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    const newEntries = [...journalEntries, entry];
    setJournalEntries(newEntries);
    try { localStorage.setItem('journalEntries', JSON.stringify(newEntries)); } catch {}
  }, [journalEntries]);

  const logMood = useCallback((mood: string) => {
    const today = getLocalDateString();
    const newLog = [...moodLog.filter(m => m.date !== today), { date: today, mood }];
    setMoodLog(newLog);
    try { localStorage.setItem('moodLog', JSON.stringify(newLog)); } catch {}
  }, [moodLog]);

  useEffect(() => {
    setRandomLoveNote(LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)]);
    setRandomMemory(MEMORIES[Math.floor(Math.random() * MEMORIES.length)]);
  }, []);

  return (
    <AppContext.Provider value={{
      comfortMode, setComfortMode,
      musicPlaying, setMusicPlaying,
      musicVolume, setMusicVolume,
      hasEntered, setHasEntered,
      isVoiceNotePlaying, setIsVoiceNotePlaying,
      studyStreak, studyDates, markStudiedToday,
      journalEntries, addJournalEntry,
      moodLog, logMood,
      flowerRain, setFlowerRain,
      activeExperience, setActiveExperience,
      showEmergency, setShowEmergency,
      randomLoveNote, randomMemory,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}