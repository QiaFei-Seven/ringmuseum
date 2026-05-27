import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Navigation } from "./Navigation";

interface RingItem {
  id: number;
  name: string;
  period: string;
  material: string;
  image: string;
  x: number;
  y: number;
  side: "left" | "right";
}

function getEraPalette(period: string) {
  if (period.startsWith("Ancient Civilizations")) {
    return {
      card: "bg-[#2a2116]/45 border-[#e8cf9a]/55",
      imageBorder: "border-[#f0d8a8]/45",
      connector: "rgba(240,216,168,0.95)",
    };
  }
  if (period.startsWith("Medieval Worlds")) {
    return {
      card: "bg-[#1b202b]/48 border-[#b8c7dd]/55",
      imageBorder: "border-[#d0ddf0]/45",
      connector: "rgba(196,215,245,0.95)",
    };
  }
  if (period.startsWith("Early Modern Courts")) {
    return {
      card: "bg-[#2a1b26]/46 border-[#f0bfd6]/55",
      imageBorder: "border-[#ffd7e6]/45",
      connector: "rgba(255,207,231,0.95)",
    };
  }
  return {
    card: "bg-[#18222a]/46 border-[#b7d9e8]/55",
    imageBorder: "border-[#d4edf8]/45",
    connector: "rgba(197,231,246,0.95)",
  };
}

function getEraTypography(period: string) {
  if (period.startsWith("Ancient Civilizations")) {
    return "'Cormorant Garamond', serif";
  }
  if (period.startsWith("Medieval Worlds")) {
    return "'Alegreya Sans SC', sans-serif";
  }
  if (period.startsWith("Early Modern Courts")) {
    return "'Alex Brush', cursive";
  }
  return "'Inter', sans-serif";
}

const timelinePathD =
  "M20 1120 C 250 1400, 300 2100, 520 2600 C 740 3120, 260 3620, 530 4140 C 760 4620, 320 5200, 560 5740 C 760 6230, 330 6820, 560 7350 C 760 7900, 420 8600, 620 9185";

const ringItems: RingItem[] = [
  { id: 5, name: "Roman Egypt Glass Ring", period: "Ancient Civilizations, 30 B.C.-A.D. 364 (The Met 10.130.974)", material: "Fused Glass", image: "https://images.metmuseum.org/CRDImages/eg/original/10.130.974_EGDP017265.jpg", x: 20, y: 19, side: "left" },
  { id: 6, name: "Nishapur Turquoise Ring", period: "Ancient Civilizations, 9th-11th century (The Met 40.170.202)", material: "Silver, Turquoise", image: "https://images.metmuseum.org/CRDImages/is/original/wb-40.170.202.JPG", x: 72, y: 22, side: "right" },
  { id: 7, name: "Nishapur Silver Ring", period: "Ancient Civilizations, 9th-11th century (The Met 39.40.124)", material: "Silver", image: "https://images.metmuseum.org/CRDImages/is/original/LC-39_40_124.jpg", x: 20, y: 26, side: "left" },
  { id: 8, name: "Nishapur Bronze Ring", period: "Ancient Civilizations, 9th-11th century (The Met 39.40.125)", material: "Bronze", image: "https://images.metmuseum.org/CRDImages/is/original/LC-39_40_125.jpg", x: 72, y: 30, side: "right" },
  { id: 1, name: "Ring of Priest Sienamun", period: "Ancient Civilizations, 664-525 B.C. (The Met 23.10.14)", material: "Gold", image: "https://images.metmuseum.org/CRDImages/eg/original/DP323875.jpg", x: 20, y: 42, side: "left" },
  { id: 2, name: "Ptolemaic Garnet Ring", period: "Ancient Civilizations, 200-30 B.C. (The Met 10.130.1427)", material: "Gold, Garnet", image: "https://images.metmuseum.org/CRDImages/eg/original/DP356224.jpg", x: 72, y: 46, side: "right" },
  { id: 3, name: "Scarab Ring of Ruiu", period: "Ancient Civilizations, ca. 1504-1447 B.C. (The Met 35.3.54)", material: "Glazed Steatite, Silver", image: "https://images.metmuseum.org/CRDImages/eg/original/LC-35_3_54_EGDP025372.jpg", x: 20, y: 51, side: "left" },
  { id: 4, name: "New Kingdom Faience Ring", period: "Ancient Civilizations, ca. 1550-1295 B.C. (The Met 17.6.116)", material: "Faience", image: "https://images.metmuseum.org/CRDImages/eg/original/LC-17_6_116_EGDP024477.jpg", x: 72, y: 55, side: "right" },
  { id: 9, name: "Cloisonne Enamel Ring", period: "Medieval Worlds, 10th-11th century (The Met 2004.274)", material: "Gold with Cloisonne Enamel", image: "https://images.metmuseum.org/CRDImages/cl/original/DP120350.jpg", x: 20, y: 66, side: "left" },
  { id: 10, name: "Granulated Gold Ring", period: "Medieval Worlds, 12th-13th century (The Met 1976.405)", material: "Gold, Engraved and Granulated", image: "https://images.metmuseum.org/CRDImages/is/original/sf1976-405b.jpg", x: 72, y: 70, side: "right" },
  { id: 11, name: "Iraqi Court Ring", period: "Medieval Worlds, 12th-13th century (The Met 48.154.10)", material: "Gold, Cast and Chased", image: "https://images.metmuseum.org/CRDImages/is/original/sf48-154-10b.jpg", x: 20, y: 75, side: "left" },
  { id: 12, name: "Turquoise Bezel Ring", period: "Medieval Worlds, 11th-12th century (The Met 1981.232.1)", material: "Gold, Turquoise", image: "https://images.metmuseum.org/CRDImages/is/original/sf1981-232-1a.jpg", x: 72, y: 78, side: "right" },
  { id: 13, name: "Nishapur Gold Ring", period: "Medieval Worlds, 9th-11th century (The Met 40.170.156)", material: "Gold", image: "https://images.metmuseum.org/CRDImages/is/original/DP233250.jpg", x: 20, y: 90, side: "left" },
  { id: 14, name: "Deccan Gold Ring", period: "Early Modern Courts, 17th century (The Met 2008.565)", material: "Gold", image: "https://images.metmuseum.org/CRDImages/is/original/DP335173.jpg", x: 72, y: 94, side: "right" },
  { id: 15, name: "Art Deco Diamond Ring", period: "20th Century to Present, 1920-1930", material: "Platinum, Diamonds", image: "https://images.metmuseum.org/CRDImages/eg/original/DP323875.jpg", x: 20, y: 100, side: "left" },
  { id: 16, name: "Cartier Love Ring", period: "20th Century to Present, 1970s", material: "Gold", image: "https://images.metmuseum.org/CRDImages/eg/original/DP356224.jpg", x: 72, y: 104, side: "right" },
];

export function History() {
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroHover, setHeroHover] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getScrollOpacity = (elementPosition: number) => {
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    const distance = elementPosition - scrollY;
    
    if (distance < -threshold) return 0;
    if (distance > windowHeight + threshold) return 0;
    
    const normalizedDistance = (distance - threshold) / (windowHeight);
    return Math.max(0, Math.min(1, 1 - normalizedDistance));
  };

  const getScrollYOffset = (elementPosition: number) => {
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    const distance = elementPosition - scrollY;
    
    if (distance < -threshold || distance > windowHeight + threshold) return 50;
    
    const normalizedDistance = (distance - threshold) / (windowHeight);
    return Math.max(0, Math.min(50, normalizedDistance * 50));
  };

  return (
    <div className="relative w-full min-h-[9200px] overflow-hidden bg-black cursor-none">
      <Navigation />
      
      <div className="absolute inset-0">
        <img 
          src="/images/history-bg.jpg" 
          alt="ring timeline background" 
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20" />
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 h-[1100px] pointer-events-none"
        style={{
          x: (mousePosition.x - 720) * 0.015,
          y: (mousePosition.y - 350) * 0.012,
        }}
      >
        {[...Array(130)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1.5 + ((i * 9) % 4)}px`,
              height: `${1.5 + ((i * 9) % 4)}px`,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              boxShadow: "0 0 18px rgba(255,255,255,0.95)",
            }}
            animate={{ opacity: [0.18, heroHover ? 1 : 0.78, 0.2], scale: [0.8, 1.45, 0.8] }}
            transition={{ duration: 1.4 + (i % 4), repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      <div
        className="absolute h-[998px] left-0 top-0 w-full pointer-events-none"
        onMouseEnter={() => setHeroHover(true)}
        onMouseLeave={() => setHeroHover(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          className="absolute inset-0 flex items-start justify-center z-[210] pt-4"
          style={{ transform: "translate(111px, 526px)" }}
        >
          <div className="relative">
            <h1
              className="text-[96px] md:text-[120px] xl:text-[130px] mb-2 whitespace-nowrap"
              style={{ 
                fontFamily: "'Playfair Display', serif", 
                position: "absolute", 
                top: "350px", 
                left: "-400px",
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2)"
              }}
            >
              Rings Through Time
            </h1>
            <p 
              className="text-[40px] text-white/90 whitespace-nowrap" 
              style={{ 
                fontFamily: "'Cinzel', serif", 
                position: "absolute", 
                top: "450px", 
                left: "-150px",
                letterSpacing: "0.2em",
                textShadow: "0 0 20px rgba(245,197,200,0.4), 0 0 40px rgba(240,216,168,0.3)"
              }}
            >
              A ROMANTIC JOURNEY OF RINGS
            </p>
          </div>
        </motion.div>
        <motion.div
          className="absolute pointer-events-none w-56 h-56 rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 68%)",
            opacity: heroHover ? 1 : 0,
          }}
          animate={{ scale: heroHover ? [0.95, 1.1, 0.95] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[138px] text-white z-[215]"
          animate={{ y: [0, 16, 0], opacity: [0.65, 1, 0.65], scale: [0.96, 1.08, 0.96] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 16px rgba(255,255,255,0.9))" }}
        >
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <path d="M4.5 8.5L12 16.2L19.5 8.5" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-[42%] z-[212] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={`title-orbit-${i}`}
              className="absolute rounded-full bg-white/90"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                transform: `rotate(${i * 12.85}deg) translateX(${155 + (i % 4) * 24}px)`,
                boxShadow: "0 0 14px rgba(255,255,255,0.95)",
              }}
              animate={{ opacity: [0.22, 1, 0.22], scale: [0.85, 1.5, 0.85] }}
              transition={{ duration: 1.8 + (i % 5) * 0.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-[42%] w-[650px] h-[280px] rounded-full pointer-events-none z-[206]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(ellipse at center, rgba(191,212,255,0.45) 0%, rgba(255,181,228,0.35) 40%, rgba(255,181,228,0) 75%)",
            filter: "blur(15px)",
            boxShadow: "0 0 60px rgba(191,212,255,0.55), 0 0 100px rgba(255,181,228,0.4)",
          }}
          animate={{ rotate: [0, 360], opacity: [0.6, 0.95, 0.6], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-[42%] w-[520px] h-[220px] rounded-full pointer-events-none z-[207]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            border: "1px solid rgba(193, 224, 255, 0.6)",
            boxShadow: "0 0 45px rgba(193,224,255,0.55), inset 0 0 30px rgba(255,183,231,0.4)",
          }}
          animate={{ rotate: [360, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-[42%] z-[213] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(42)].map((_, i) => (
            <motion.div
              key={`title-spark-ring-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1.6 + (i % 2) * 1.8}px`,
                height: `${1.6 + (i % 2) * 1.8}px`,
                transform: `rotate(${i * 8.57}deg) translateX(${185 + (i % 5) * 16}px)`,
                boxShadow: "0 0 18px rgba(255,255,255,0.95)",
              }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.7, 0.7] }}
              transition={{ duration: 1.2 + (i % 4) * 0.45, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bloom-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${170 + (i % 4) * 70}px`,
              height: `${170 + (i % 4) * 70}px`,
              left: `${(i * 19) % 100}%`,
              top: `${14 + (i * 11) % 84}%`,
              background: "radial-gradient(circle, rgba(255, 230, 245, 0.24) 0%, rgba(255, 230, 245, 0) 72%)",
              filter: "blur(6px)",
            }}
            animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.94, 1.08, 0.94] }}
            transition={{ duration: 8 + (i % 4) * 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 9200" preserveAspectRatio="none">
          <motion.path
            d={timelinePathD}
            stroke="url(#timelineGlow)"
            strokeWidth="9.5"
            fill="none"
            filter="url(#timelineSoftGlow)"
            strokeLinecap="round"
            animate={{ opacity: [0.72, 1, 0.76], strokeWidth: [9, 10.5, 9] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="timelineGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 236, 208, 0.8)" />
              <stop offset="38%" stopColor="rgba(210, 215, 255, 0.9)" />
              <stop offset="68%" stopColor="rgba(255, 197, 232, 0.88)" />
              <stop offset="100%" stopColor="rgba(255, 245, 227, 0.78)" />
            </linearGradient>
            <filter id="timelineSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6.5" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 9200" preserveAspectRatio="none">
          {[...Array(60)].map((_, i) => (
            <circle key={`curve-particle-${i}`} r={1.6 + (i % 2) * 0.9} fill="rgba(255,255,255,0.9)">
              <animateMotion
                dur={`${8 + (i % 8) * 0.8}s`}
                begin={`${i * 0.22}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={timelinePathD}
              />
              <animate attributeName="opacity" values="0.15;1;0.15" dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[...Array(36)].map((_, i) => (
            <ellipse key={`curve-aurora-${i}`} rx={12 + (i % 4) * 3} ry="1.2" fill="rgba(186,227,255,0.85)">
              <animateMotion
                dur={`${14 + (i % 7) * 0.9}s`}
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={timelinePathD}
              />
              <animate attributeName="opacity" values="0.08;0.7;0.08" dur={`${3.2 + (i % 4) * 0.6}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[
          { title: "Ancient Civilizations", top: "15%", glowColor: "rgba(240,216,168,0.85)", transform: "translate(-48%, -20px)" },
          { title: "Medieval Worlds", top: "38%", glowColor: "rgba(196,215,245,0.85)", transform: "translate(-52%, -20px)" },
          { title: "Early Modern Courts", top: "60%", glowColor: "rgba(255,197,232,0.85)", transform: "translate(-49%, -5px)" },
          { title: "20th Century to Present", top: "82%", glowColor: "rgba(197,231,246,0.85)", transform: "translate(-52%, 0)" },
        ].map((item, index) => (
          <div
            key={item.title}
            className="absolute left-1/2 text-white/90 z-[220]"
            style={{ top: item.top, transform: item.transform }}
          >
            {[...Array(4)].map((_, orbitIndex) => (
              <motion.div
                key={`orbit-${index}-${orbitIndex}`}
                className="absolute left-1/2 top-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{ rotate: orbitIndex % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{ duration: 12 + orbitIndex * 4, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(6 + orbitIndex * 2)].map((_, planetIndex) => (
                  <motion.div
                    key={`planet-${index}-${orbitIndex}-${planetIndex}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${20 + orbitIndex * 6}px`,
                      height: `${20 + orbitIndex * 6}px`,
                      transform: `rotate(${planetIndex * (360 / (6 + orbitIndex * 2))}deg) translateX(${7500 + orbitIndex * 2400}px)`,
                      backgroundColor: item.glowColor,
                      boxShadow: `0 0 ${24 + orbitIndex * 10}px ${item.glowColor}, 0 0 ${48 + orbitIndex * 20}px ${item.glowColor}70`,
                    }}
                    animate={{ 
                      opacity: [0.25, 0.95, 0.25], 
                      scale: [0.6, 1.4, 0.6],
                    }}
                    transition={{ 
                      duration: 1.8 + orbitIndex * 0.4, 
                      repeat: Infinity, 
                      delay: planetIndex * 0.12 
                    }}
                  />
                ))}
              </motion.div>
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[500px] h-[160px] rounded-full"
              style={{
                translateX: "-50%",
                translateY: "-50%",
                background: `radial-gradient(ellipse at center, ${item.glowColor}40 0%, ${item.glowColor}20 45%, transparent 78%)`,
                filter: "blur(15px)",
                zIndex: -1,
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.94, 1.12, 0.94], rotate: [0, 8, 0] }}
              transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="text-7xl sm:text-9xl xl:text-[10rem] drop-shadow-[0_0_32px_rgba(255,255,255,0.4)] text-center"
              style={{ fontFamily: "'Alex Brush', cursive" }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {ringItems.map((ring, index) => {
          const elementPosition = (ring.y / 100) * 9200;
          const opacity = getScrollOpacity(elementPosition);
          const yOffset = getScrollYOffset(elementPosition);
          return (
          <motion.div
            key={ring.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: opacity, y: yOffset }}
            transition={{ duration: 0.8 }}
            className="absolute"
            style={{ left: `${ring.x}%`, top: `${ring.y}%`, zIndex: hoveredRing === ring.id ? 100 : 20 }}
            onMouseEnter={() => setHoveredRing(ring.id)}
            onMouseLeave={() => setHoveredRing(null)}
          >
            {(() => {
              const palette = getEraPalette(ring.period);
              const eraFont = getEraTypography(ring.period);
              return (
            <motion.div
              whileHover={{ scale: 1.06, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative w-[23.5rem] sm:w-[25.5rem] ${palette.card} backdrop-blur-md p-4 rounded-2xl shadow-[0_26px_60px_rgba(0,0,0,0.45)]`}
              style={{ transform: ring.side === "left" ? "translateX(-100%)" : "translateX(0)" }}
            >
              <div className={`relative w-full h-60 overflow-visible rounded-xl ${palette.imageBorder} bg-black/20`}>
                <img
                  src={ring.image}
                  alt={ring.name}
                  className="absolute inset-0 w-full h-full object-cover saturate-95 contrast-105"
                />
                <motion.div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-black/75 border border-white/40 text-white text-2xl whitespace-nowrap"
                  style={{ fontFamily: eraFont }}
                  animate={{ opacity: hoveredRing === ring.id ? 1 : 0, y: hoveredRing === ring.id ? -4 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {ring.name}
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -left-48 px-6 py-3 rounded-full bg-black/75 border border-white/40 text-white text-xl max-w-72"
                  style={{ fontFamily: eraFont }}
                  animate={{ opacity: hoveredRing === ring.id ? 1 : 0, x: hoveredRing === ring.id ? -8 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {ring.material}
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -right-48 px-6 py-3 rounded-full bg-black/75 border border-white/40 text-white text-xl max-w-80"
                  style={{ fontFamily: eraFont }}
                  animate={{ opacity: hoveredRing === ring.id ? 1 : 0, x: hoveredRing === ring.id ? 8 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {ring.period}
                </motion.div>
              </div>
              <div className="font-[Cormorant_Garamond] mt-3 text-[14px] tracking-[0.14em] text-white/70 uppercase">Museum Catalogue</div>
            </motion.div>
              );
            })()}

            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-[2px] ${ring.side === "left" ? "left-full" : "right-full"}`}
              style={{
                background: `linear-gradient(to ${ring.side === "left" ? "right" : "left"}, ${getEraPalette(ring.period).connector}, transparent)`,
              }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
          </motion.div>
          );
        })}
      </div>

      <motion.div
        className="fixed w-12 h-12 rounded-full border border-white/70 pointer-events-none z-[300] mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 26px rgba(255,255,255,0.45)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-white pointer-events-none z-[301]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 15px rgba(255,255,255,0.95)",
        }}
      />
    </div>
  );
}