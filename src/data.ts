// ╔══════════════════════════════════════════════════════════════════╗
// ║  🌸 PROJECT HOME — YOUR PERSONAL DATA FILE 🌸                  ║
// ║                                                                  ║
// ║  EDIT THIS FILE TO CUSTOMIZE EVERYTHING!                         ║
// ║  All your photos, texts, messages, and personal details          ║
// ║  are right here. No need to dig through other files.             ║
// ║                                                                  ║
// ║  HOW TO ADD PHOTOS:                                              ║
// ║  1. Put your photos in the "public/images/" folder               ║
// ║  2. Reference them as "/images/your-photo.jpg"                   ║
// ║  3. Or use full URLs like "https://example.com/photo.jpg"        ║
// ║                                                                  ║
// ║  💡 Tip: Keep the structure intact, just change the values!      ║
// ╚══════════════════════════════════════════════════════════════════╝

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏠 BASIC INFO — The essentials
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SITE_INFO = {
  // What you call her (nickname, pet name, real name — your choice!)
  petName: "Cuckoo",

  // The site title shown in browser tab
  siteTitle: "Project Home — Wherever Life Takes You",

  // The tagline on the hero section
  tagline: "Wherever Life Takes You, You'll Always Have Me.",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌌 LANDING PAGE — First thing she sees
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LANDING = {
  // These 3 lines appear one by one on the black screen
  // Change them to whatever feels most personal
  lines: [
    `Hey ${SITE_INFO.petName}...`,
    "Before you leave to chase your dreams...",
    "I wanted to leave a little piece of my heart with you.",
  ],

  // Text on the glowing button
  enterButtonText: "❤️ Come Inside",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💌 LETTER SECTION — Scroll-triggered messages
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LETTER_MESSAGES = [
  "I know there'll be difficult days.",
  "Some days you'll doubt yourself.",
  "Some days you'll want to quit.",
  "Some days the syllabus will feel endless.",
  "Some days you'll compare yourself to others.",
  "Some days you'll feel like you're falling behind.",
  "Some days your mind will race at 3 AM.",
  "Please don't give up.",
  "Because I believe in you.",
  "And I always will.",
  "Not just on your good days.",
  "On every single day.",
  "Even the ones where you can't see your own strength.",
  "I can see it.",
  "It's always been there.",
  "You're not alone in this.",
  "You never were.",
  "And you never will be.",
  "Because wherever life takes you...",
  "You'll always have me.",
  "Always. ❤️",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💕 LOVE NOTES — Random note shown on each visit
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LOVE_NOTES = [
  "You make my worst days feel like the best ones.",
  "I think about you more than you'll ever know.",
  "Every moment with you is a moment I treasure.",
  "You're the reason I believe in love.",
  "Even the quiet moments with you are my favorites.",
  "I love how your eyes light up when you talk about your dreams.",
  "You're my favorite notification.",
  "If I could choose anyone in the world, I'd still choose you.",
  "You make the world softer, warmer, kinder.",
  "I fall for you a little more every day.",
  "You're the home I never had to build.",
  "My heart beats your name.",
  "You're the best thing that ever happened to me.",
  "I don't need the stars when I have you.",
  "You're my calm in every storm.",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📸 MEMORY MUSEUM — Your photos + captions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💡 ADD YOUR OWN PHOTOS:
//    - Put photos in public/images/ folder
//    - Set imageUrl to "/images/your-photo.jpg"
//    - Or use a full URL to an image online
//    - If imageUrl is empty, a gradient placeholder shows

export const MEMORIES = [
  {
    caption: "Our first photo together 📸",
    imageUrl: "/images/first.jpg",
    orientation: "landscape",
    angle: 2,
  },
  {
    caption: "The rainy day ~ together 🌧️",
    imageUrl: "/images/cuties.jpeg",
    orientation: "landscape",
    angle: 3,
  },
  {
    caption: "That late-night call 📱",
    imageUrl: "/images/Chaand.jpeg",
    orientation: "portrait",  
    angle: -1,
  },
  {
    caption: "The first candid 🍜",
    imageUrl: "/images/hehe.jpeg",
    orientation: "portrait",
    angle: -2,
  },
  {
    caption: "The happiest chai date ☕",
    imageUrl: "/images/chai.jpeg", // ← ADD YOUR PHOTO HERE! e.g. "/images/chai-date.jpg"
    orientation: "portrait", // "landscape" or "portrait" — matches your photo
    angle: -3,
  },
  {
    caption: "That surprise visit 🎁",
    imageUrl: "/images/random.jpeg",
    orientation: "portrait",
    angle: -1,
  },
  {
    caption: "It started with 🌅",
    imageUrl: "/images/zakir.jpeg",
    orientation: "portrait",
    angle: 3,
  },
  {
    caption: "That song that's now 'ours' 🎵",
    imageUrl: "/images/flowers.jpeg",
    orientation: "portrait",
    angle: -4,
  },
  {
    caption: "The day I realized 😊",
    imageUrl: "/images/couple.jpeg",
    orientation: "landscape",
    angle: -2,
  },
  {
    caption: "Our first 'I love you' ❤️",
    imageUrl: "/images/the-seven.jpeg",
    orientation: "landscape",
    angle: 1,
  },
  {
    caption: "Our stupid laughing session 😂",
    imageUrl: "/images/laugh.jpeg",
    orientation: "landscape",
    angle: 4,
  },
  {
    caption: "The day we said 'forever' ✨",
    imageUrl: "/images/sukoon.jpeg",
    orientation: "landscape",
    angle: 2,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💪 PRIDE CARDS — Why I'm proud of her
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PRIDE_CARDS = [
  { message: "You're disciplined.", emoji: "💪", detail: "You show up even when it's hard." },
  { message: "You're kind.", emoji: "💖", detail: "You care about others even while chasing your dream." },
  { message: "You never stop trying.", emoji: "🔥", detail: "Every setback is just a setup for your comeback." },
  { message: "You're brave.", emoji: "🦁", detail: "Leaving home to chase a dream takes courage most people never find." },
  { message: "You're stronger than you think.", emoji: "🌟", detail: "You've survived every bad day so far. That's a perfect record." },
  { message: "You inspire me.", emoji: "✨", detail: "Watching you fight for your dream makes me want to be better too." },
  { message: "You care deeply.", emoji: "🤗", detail: "You never let ambition make you cold." },
  { message: "You keep showing up.", emoji: "🏃", detail: "Day after day. Page after page. That's not luck. That's grit." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✨ MOTIVATION QUOTES — Shown on the wall
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MOTIVATION_QUOTES = [
  "You're stronger than your worst day.",
  "One chapter more.",
  "Future you is already thanking today's you.",
  "Every topper once felt exactly like this.",
  "One more question. One more page. One more hour. That's all.",
  "You didn't come this far to only come this far.",
  "The pain you feel today is the strength you'll have tomorrow.",
  "Rest if you must, but don't quit.",
  "Your effort is never wasted — even when it feels like it.",
  "The syllabus is big, but your will is bigger.",
  "It's okay to be tired. It's not okay to give up.",
  "You're not falling behind. You're building momentum.",
  "This chapter is hard, but you've read harder ones before.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small progress is still progress.",
  "You don't need motivation every day. You need discipline.",
  "The students who succeed aren't the smartest. They're the ones who don't stop.",
  "One day, this preparation will be your superpower.",
  "You're preparing for a life most people only dream of.",
  "Believe in the process. Trust your preparation.",
  "The gap between where you are and where you want to be is called effort.",
  "Every solved question is a battle won.",
  "Your competition isn't others — it's your own excuses.",
  "The night is darkest before the dawn. And your dawn is coming.",
  "Consistency beats intensity. Keep going.",
  "You're writing a story that ends in success.",
  "Difficult roads lead to beautiful destinations.",
  "The only way to fail is to stop.",
  "Pressure makes diamonds.",
  "Your future self will look back and say: thank you for not quitting.",
  "It's not about being the best. It's about being better than yesterday.",
  "You've already survived 100% of your worst days.",
  "Success isn't built in a day. It's built daily.",
  "The journey matters as much as the destination.",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📅 TIMELINE — Milestones on her journey
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TIMELINE_MILESTONES = [
  { label: "Today",          desc: "The day you decided to give everything.", emoji: "📍", highlight: true },
  { label: "Preparation",    desc: "Hours of focus. Sacrifices made. Quiet determination.", emoji: "📚" },
  { label: "Hard Days",      desc: "Days when nothing went right. But you still showed up.", emoji: "🌧️" },
  { label: "Failures",       desc: "They didn't break you. They taught you.", emoji: "💫" },
  { label: "Comebacks",      desc: "Every time you fell, you rose stronger.", emoji: "🔥" },
  { label: "Final Revision", desc: "The calm before the storm. You're almost there.", emoji: "📝" },
  { label: "Exam Day",       desc: "The day everything you've worked for comes together.", emoji: "🎯", highlight: true },
  { label: "Selection",      desc: "The moment the world sees what I always knew.", emoji: "🏆", highlight: true },
  { label: "Family Proud",  desc: "Their eyes shine with the dream they always had for you.", emoji: "👨‍👩‍👧" },
  { label: "Us Celebrating", desc: "Together. Finally. Forever.", emoji: "🎉", highlight: true },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎙️ VOICE NOTES — Titles, descriptions, transcripts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const VOICE_NOTES = [
  {
    id: "morning",
    emoji: "☀️",
    title: "Good Morning",
    desc: "Start your day with love",
    transcript: `Good morning, ${SITE_INFO.petName}! Rise and shine. Today is another day you're going to crush. I'm so proud of you for waking up and choosing to study. Have a beautiful day, my love. I believe in you.`,
  },
  {
    id: "before-exam",
    emoji: "📝",
    title: "Before Exam",
    desc: "Last minute courage",
    transcript: "Hey, it's me. Before you go into that exam hall, just remember — you've prepared for this. Every hour, every page, every question. You're ready. Trust yourself. I'm cheering for you from here. Go get them!",
  },
  {
    id: "after-mock",
    emoji: "💪",
    title: "After Bad Mock",
    desc: "Reassurance when needed",
    transcript: "So the mock didn't go great? That's okay. Really. It's just practice. The real exam is where it counts, and every bad mock teaches you something. You're learning, growing, getting better. I'm proud of you regardless.",
  },
  {
    id: "before-sleep",
    emoji: "🌙",
    title: "Before Sleeping",
    desc: `Sweet dreams, ${SITE_INFO.petName}`,
    transcript: `Close your eyes, ${SITE_INFO.petName}. Let all the stress melt away. Today is done. You did your best. Tomorrow will be better. Sleep peacefully knowing I'm thinking about you. Goodnight, my love.`,
  },
  {
    id: "miss-me",
    emoji: "💖",
    title: "Whenever You Miss Me",
    desc: "Always here for you",
    transcript: "I miss you too. I wish I could be there with you right now. But until I can, know that my love is with you in every moment. You carry me in your heart, and I carry you in mine. Always.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌌 OUR UNIVERSE — Planets representing your stories
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const UNIVERSE_PLANETS = [
  {
    id: "birthday",
    emoji: "🎂",
    title: "Happy Badda Cutu",
    desc: "The day we celebrated you.",
    color: "#F06292",
    size: 60,
    url: "https://badda-cuckoo.vercel.app/  ", // ← ADD A LIVE URL HERE! e.g. "https://your-birthday-site.com"
  },
  {
    id: "sorry",
    emoji: "🌸",
    title: "Sorrowww naa Cuckoo",
    desc: "The day I realized how much you mean to me.",
    color: "#7CB342",
    size: 45,
    url: "https://sorrowww.vercel.app/",
  },
  {
    id: "anniversary",
    emoji: "❤️",
    title: "Heheheheh Heya",
    desc: "My first webiste for you",
    color: "#B76E79",
    size: 55,
    url: "https://heyaaa-six.vercel.app/",
  },
  {
    id: "this-site",
    emoji: "🌙",
    title: "Our cute Dairy",
    desc: "The place where we maintain our connection even when life gets hard.",
    color: "#C9B8E8",
    size: 50,
    url: "https://docs.google.com/document/d/1HeI0nZKXIwg0zooo33uIu361LbYnMuM2HCW87M-QoKA/edit?usp=drivesdk",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌍 DISTANCE — Map & locations
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DISTANCE = {
  herLabel: "You 🏠",
  myLabel: "Me 💙",
  mainMessage: "Distance changes cities - Adeeee Indore duur nhi hai",
  finalMessage: "Never hearts.",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚨 EMERGENCY — Messages for the darkest moments
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EMERGENCY_MESSAGES = [
  "If you're reading this...",
  "It means today has been difficult.",
  "I know you're tired.",
  "I know you're exhausted.",
  "But I also know something else.",
  "You don't quit.",
  "You never have.",
  "And I know tomorrow you'll stand up again.",
  "That's why I believe in you.",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌸 COMFORT CENTER — Emotional support buttons & messages
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const COMFORT_BUTTONS = [
  { id: "miss", emoji: "❤️", label: "I Miss You" },
  { id: "hard", emoji: "😭", label: "Today Was Hard" },
  { id: "hug",  emoji: "🥺", label: "I Need A Hug" },
  { id: "sleep", emoji: "😴", label: "Can't Sleep" },
  { id: "lost", emoji: "😔", label: "Feeling Lost" },
  { id: "mock", emoji: "😤", label: "Mock Test Went Bad" },
  { id: "home", emoji: "😶", label: "Missing Home" },
];

export const COMFORT_MESSAGES = {
  miss: {
    heading: `I miss you too, ${SITE_INFO.petName}`,
    lines: [
      "Right now, somewhere, I'm thinking about you too.",
      "I miss your voice. Your laugh. The way you say Yash.",
    ],
    highlight: "This distance is temporary. Our love isn't.",
    memories: ["💖 Remember our first photo?", "💖 Remember that stupid laughing session?", "💖 Remember how we talked for hours?"],
    closeText: "I feel better now ❤️",
  },
  hard: {
    heading: "Take a deep breath.",
    lines: [
      "One exam never decides your future.",
      "One mock test never decides your capability.",
      "One bad day doesn't erase all your good ones.",
    ],
    highlight: "I am proud of you betu pie. Not after selection. Today.",
    closeText: "I'll try again honeybun💪",
  },
  hug: {
    heading: "Sending you the biggest hug",
    lines: [
      "Aakhein band karo.",
      "Imagine my arms around you.",
      "My baby, Sona, mera cuta baby...",
    ],
    highlight: "I wish I could hold you right now. But this hug travels through time and space to reach you.",
    closeText: "Hug received ❤️",
  },
  sleep: {
    heading: "The night is gentle with you",
    lines: [
      "Close your eyes.",
      "Imagine our late night, deep talks",
      "No syllabus. No deadlines. Just us.",
      "It's all good sweetie :)",
    ],
    highlight: "Sleep peacefully, my love. Mai aapke paas hi hu.",
    closeText: "Goodnight love🌙",
  },
  lost: {
    heading: `You're not lost, ${SITE_INFO.petName}`,
    lines: [
      "You can only lost in my heart, thike naaa?",
      "Failure doesn't mean you're going the wrong way.",
      "It means you're growing.",
    ],
    highlight: "Trust the process. Trust yourself. I trust you more than you trust yourself.",
    closeText: "That's my Girl🌟",
  },
  mock: {
    heading: "One mock test. That's all it was.",
    lines: [
      "It doesn't define you.",
      "Every topper once scored badly on a mock.",
      "What matters is that you showed up and tried.",
      "The real exam is still ahead — and you're getting better every day.",
    ],
    highlight: "Today's score isn't your final score. Your comeback is coming.",
    closeText: "I'll analyze and improve 📊",
  },
  home: {
    heading: "Home isn't going anywhere",
    lines: [
      "Mai hu naa bacche, mai aapka ghar hu naaa.",
      "Sb log yhi hai, waiting for you.",
      "And when you come back, you'll come back stronger.",
    ],
    highlight: "Home is proud of you for leaving. Because home knows you'll return with your dream.",
    closeText: "Mumma se baat krti 📞",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✨ FINAL SECTION — The closing words
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FINAL_MESSAGES = [
  "Chase your dreams.",
  "I'll keep cheering for you from wherever I am.",
  "Focus on becoming the person you've always dreamed of becoming.",
  "I'll focus on becoming someone worthy enough to stand beside you.",
  "And one day...",
  "We'll look back at these days...",
  "and smile together.",
];

export const FINAL_LINE = "No matter how many kilometers separate us... you'll always have a home in my heart. Because whatever our souls are made of, yours and mine are the same";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌙 COMFORT MODE — Letter that appears when toggling night mode
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const COMFORT_LETTERS = [
  "Take a deep breath. You're doing amazing, even if you can't see it right now.",
  "The night is gentle with you. Let the calm wash over you.",
  "Everything feels heavy right now, but you carry it so gracefully.",
  "You don't have to be perfect. You just have to keep going.",
  "Close your eyes for a moment. The world will wait for you.",
  "This quiet moment is for you. Breathe. Rest. You deserve it.",
  "Even in the dark, you shine. You always have.",
  "Rest isn't quitting. Rest is preparing for a stronger comeback.",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📅 EXAM CONFIG — Countdown & date settings
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EXAM_CONFIG = {
  // Set her exam month here — countdown targets July 2027
  // Uses July 1st, 2027 as the reference date
  examDate: "2027-07-01",

  // Label for the countdown
  countdownLabel: "Days until exam in 2027",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💡 DAILY AFFIRMATIONS — One per day, rotating
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AFFIRMATIONS = [
  "Today, I choose progress over perfection.",
  "I am capable of achieving my dreams.",
  "Every effort I make counts, even the small ones.",
  "I trust myself and my preparation.",
  "I am growing stronger with each passing day.",
  "My potential is limitless.",
  "I deserve success and happiness.",
  "I am enough, exactly as I am today.",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌸 EASTER EGG — Typing "cuckoo" triggers flower rain
//    You can change the trigger word below
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EASTER_EGG = {
  triggerWord: "cuckoo", // ← Change this to any word you want
  konamiMessage: `I love you endlessly. Forever and always, ${SITE_INFO.petName} ❤️`,
};
