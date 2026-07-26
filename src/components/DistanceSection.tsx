import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DISTANCE } from '../data';

export default function DistanceSection() {
  const { comfortMode } = useApp();

  const lineColor = comfortMode ? '#C9B8E8' : '#B76E79';
  const dotColorHer = comfortMode ? '#C9B8E8' : '#B76E79';
  const dotColorMe = comfortMode ? '#FFE4B5' : '#D4A574';
  const mapFill = comfortMode ? '#3A3A5A' : '#E8D5B7';
  const mapStroke = comfortMode ? '#6A6A8A' : '#C9B8E0';

  return (
    <section id="distance" className="relative min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className={`font-[Great_Vibes] text-4xl md:text-5xl mb-2
          ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
          Distance
        </h2>
        <p className={`font-[Poppins] text-sm ${comfortMode ? 'text-lavender/60' : 'text-warm-brown/50'}`}>
          kilometers change cities. never hearts.
        </p>
      </motion.div>

      <div className={`max-w-lg mx-auto p-6 rounded-2xl ${comfortMode ? 'glass-card-dark' : 'glass-card'}`}>
        {/* World Map */}
        <svg viewBox="0 0 400 220" className="w-full mb-6">
          {/* Background glow */}
          <defs>
            <radialGradient id="lineGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Map continents */}
          <g opacity="0.25">
            {/* Asia */}
            <path d="M200,40 Q220,30 260,35 Q280,40 300,50 Q310,60 300,80 Q290,100 270,110 Q250,115 230,100 Q210,90 200,70 Q190,50 200,40"
              fill={mapFill} stroke={mapStroke} strokeWidth="0.5" />
            {/* India */}
            <path d="M230,70 Q240,65 245,80 Q250,95 240,100 Q235,105 230,95 Q225,85 230,70"
              fill={comfortMode ? '#4A4A6A' : '#D4A574'} stroke={mapStroke} strokeWidth="0.8" />
            {/* Europe */}
            <path d="M160,30 Q170,25 180,35 Q185,45 175,50 Q165,55 155,45 Q150,35 160,30"
              fill={mapFill} stroke={mapStroke} strokeWidth="0.5" />
            {/* Africa */}
            <path d="M160,60 Q170,55 175,70 Q180,85 175,100 Q170,110 160,105 Q150,90 155,75 Q155,65 160,60"
              fill={mapFill} stroke={mapStroke} strokeWidth="0.5" />
            {/* Americas */}
            <path d="M60,30 Q70,25 75,40 Q80,55 75,70 Q65,75 55,65 Q50,55 55,40 Q55,35 60,30"
              fill={mapFill} stroke={mapStroke} strokeWidth="0.5" />
            <path d="M70,80 Q75,75 80,90 Q85,110 80,125 Q75,130 70,120 Q65,100 70,80"
              fill={mapFill} stroke={mapStroke} strokeWidth="0.5" />
          </g>

          {/* === VISIBLE CONNECTING LINE === */}
          {/* Glow behind the line */}
          <motion.ellipse
            cx="200" cy="58"
            rx="60" ry="25"
            fill="url(#lineGlow)"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main solid connecting line */}
          <motion.line
            x1="170" y1="40" x2="235" y2="80"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated dashed overlay on the line */}
          <motion.line
            x1="170" y1="40" x2="235" y2="80"
            stroke={comfortMode ? '#FFE4B5' : '#D4A574'}
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -28] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Heart traveling along the line */}
          <motion.text
            fontSize="14"
            textAnchor="middle"
            fill={lineColor}
            animate={{
              x: [170, 202, 235],
              y: [40, 58, 80],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.text>

          {/* === Her location — India === */}
          <motion.circle
            cx="235" cy="80"
            r="8"
            fill={dotColorHer}
            animate={{ r: [7, 9, 7], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="235" cy="80"
            r="12"
            fill="none"
            stroke={dotColorHer}
            strokeWidth="1.5"
            animate={{ r: [10, 16, 10], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="235" y="102" textAnchor="middle" fontSize="10"
            fill={dotColorHer}
            fontFamily="Dancing Script, cursive"
            fontWeight="600">
            {DISTANCE.herLabel}
          </text>

          {/* === My location === */}
          <motion.circle
            cx="170" cy="40"
            r="8"
            fill={dotColorMe}
            animate={{ r: [7, 9, 7], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="170" cy="40"
            r="12"
            fill="none"
            stroke={dotColorMe}
            strokeWidth="1.5"
            animate={{ r: [10, 16, 10], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <text x="170" y="60" textAnchor="middle" fontSize="10"
            fill={dotColorMe}
            fontFamily="Dancing Script, cursive"
            fontWeight="600">
            {DISTANCE.myLabel}
          </text>
        </svg>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center space-y-4"
        >
          <p className={`font-[Dancing_Script] text-2xl
            ${comfortMode ? 'text-starlight' : 'text-rose-gold'}`}>
            {DISTANCE.mainMessage}
          </p>
          <p className={`font-[Dancing_Script] text-3xl
            ${comfortMode ? 'text-moonlight glow-text-light' : 'text-rose-gold glow-text'}`}>
            {DISTANCE.finalMessage}
          </p>
          <p className={`font-[Poppins] text-sm mt-4
            ${comfortMode ? 'text-moonlight/50' : 'text-warm-brown/50'}`}>
            No matter the kilometers between us, my love reaches you instantly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
