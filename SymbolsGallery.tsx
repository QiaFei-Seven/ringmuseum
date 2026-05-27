import { Link } from 'react-router';
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Navigation } from './Navigation';

interface SymbolItem {
  type: string;
  name: string;
  description: string;
  fontSize: string;
  x: number;
  y: number;
}

const symbolCategories: SymbolItem[] = [
  { type: 'love', name: 'LOVE', description: 'Eternal symbols of devotion and commitment', fontSize: 'text-[72px]', x: 15, y: 20 },
  { type: 'power', name: 'POWER', description: 'Emblems of authority and status', fontSize: 'text-[56px]', x: 70, y: 25 },
  { type: 'protection', name: 'PROTECTION', description: 'Forces of guardianship and blessing', fontSize: 'text-[64px]', x: 25, y: 45 },
  { type: 'death', name: 'MORTALITY', description: 'Philosophy of life and cycles', fontSize: 'text-[48px]', x: 65, y: 55 },
  { type: 'wisdom', name: 'WISDOM', description: 'Symbols of knowledge and enlightenment', fontSize: 'text-[60px]', x: 20, y: 72 },
  { type: 'nature', name: 'NATURE', description: 'Elements of the natural world', fontSize: 'text-[52px]', x: 72, y: 78 },
];

export function SymbolsGallery() {
  const [scrollY, setScrollY] = useState(0);
  const [heroHover, setHeroHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[200vh] overflow-hidden bg-black">
      <Navigation />

      {/* 第一页 - 标题区域 */}
      <div className="relative h-screen w-full">
        {/* 黑色背景 */}
        <div className="absolute inset-0 bg-black" />

        {/* 星星点点的动态光效 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                left: `${(i * 17 + 7) % 100}%`,
                top: `${(i * 23 + 11) % 100}%`,
                boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
              animate={{
                opacity: [0.15, 0.8, 0.15],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          className="absolute inset-0 flex items-center justify-center z-[210]"
        >
          <div className="text-center">
            <h1
              className="text-[96px] md:text-[120px] xl:text-[130px] mb-6"
              style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2)"
              }}
            >
              Symbolic Meanings
            </h1>
            <p 
              className="text-[36px] md:text-[40px] text-white/90" 
              style={{ 
                fontFamily: "'Cinzel', serif", 
                letterSpacing: "0.2em",
                textShadow: "0 0 20px rgba(147,197,253,0.4), 0 0 40px rgba(59,130,246,0.3)"
              }}
            >
              THE LANGUAGE OF RINGS
            </p>
          </div>
        </motion.div>

        {/* 鼠标跟随光晕 */}
        <motion.div
          className="absolute pointer-events-none w-56 h-56 rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(173,216,230,0.35) 0%, rgba(144,238,144,0.2) 30%, rgba(173,216,230,0) 68%)",
            opacity: heroHover ? 1 : 0,
          }}
          animate={{ scale: heroHover ? [0.95, 1.1, 0.95] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => setHeroHover(true)}
          onMouseLeave={() => setHeroHover(false)}
        />

        {/* 外层旋转光点环 */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-[212] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={`title-orbit-${i}`}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-sky-300' : 'bg-green-300'}`}
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                transform: `rotate(${i * 12.85}deg) translateX(${155 + (i % 4) * 24}px)`,
                boxShadow: i % 2 === 0 ? "0 0 14px rgba(173,216,230,0.95)" : "0 0 14px rgba(144,238,144,0.95)",
              }}
              animate={{ opacity: [0.22, 1, 0.22], scale: [0.85, 1.5, 0.85] }}
              transition={{ duration: 1.8 + (i % 5) * 0.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </motion.div>

        {/* 发光椭圆背景 */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[650px] h-[280px] rounded-full pointer-events-none z-[206]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(ellipse at center, rgba(173,216,230,0.5) 0%, rgba(144,238,144,0.4) 40%, rgba(173,216,230,0) 75%)",
            filter: "blur(15px)",
            boxShadow: "0 0 60px rgba(173,216,230,0.6), 0 0 100px rgba(144,238,144,0.45)",
          }}
          animate={{ rotate: [0, 360], opacity: [0.6, 0.95, 0.6], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* 边框光环 */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[520px] h-[220px] rounded-full pointer-events-none z-[207]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            border: "1px solid rgba(173,216,230,0.7)",
            boxShadow: "0 0 45px rgba(173,216,230,0.6), inset 0 0 30px rgba(144,238,144,0.45)",
          }}
          animate={{ rotate: [360, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        {/* 内层旋转光点环 */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-[213] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(42)].map((_, i) => (
            <motion.div
              key={`title-spark-ring-${i}`}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-sky-200' : 'bg-green-200'}`}
              style={{
                width: `${1.6 + (i % 2) * 1.8}px`,
                height: `${1.6 + (i % 2) * 1.8}px`,
                transform: `rotate(${i * 8.57}deg) translateX(${185 + (i % 5) * 16}px)`,
                boxShadow: i % 2 === 0 ? "0 0 18px rgba(173,216,230,0.95)" : "0 0 18px rgba(144,238,144,0.95)",
              }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.7, 0.7] }}
              transition={{ duration: 1.2 + (i % 4) * 0.45, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </motion.div>

        {/* 滚动提示 */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest"
          style={{ fontFamily: "'Cinzel', serif" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL DOWN
        </motion.div>
      </div>

      {/* 第二页 - 视频背景 + 文字符号 */}
      <div className="relative h-screen w-full">
        {/* 视频背景 */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
            style={{ objectFit: "cover" }}
          >
            <source src="/videos/meaning-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* 文字符号 - 不同大小排列 */}
        <div className="relative z-[10] h-full">
          {symbolCategories.map((category, index) => (
            <Link key={category.type} to={`/symbols/${category.type}`}>
              <motion.div
                className="absolute cursor-pointer"
                style={{ 
                  left: `${category.x}%`, 
                  top: `${category.y}%`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.15 }}
              >
                <h2
                  className={`${category.fontSize} text-white font-bold whitespace-nowrap transition-all duration-300`}
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    textShadow: "0 0 20px rgba(255,255,255,0.3)"
                  }}
                >
                  {category.name}
                </h2>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
