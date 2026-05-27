import { Link } from 'react-router';
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Navigation } from './Navigation';

interface StyleItem {
  id: string;
  name: string;
  image: string;
  rings: string[];
}

const styleCollections: StyleItem[] = [
  { id: '1', name: 'STACKING', image: 'https://images.unsplash.com/photo-1736615494533-14b406d50f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Multi-Layer', 'Delicate Bands', 'Layered Elegance'] },
  { id: '2', name: 'MIXING', image: 'https://images.unsplash.com/photo-1713999261126-8755201f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Gold & Silver', 'Contrast', 'Material Fusion'] },
  { id: '3', name: 'MINIMALISM', image: 'https://images.unsplash.com/photo-1646656493803-3fa79874de02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Sleek Bands', 'Geometric Lines', 'Open Design'] },
  { id: '4', name: 'BOHEMIAN', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Free Spirit', 'Nature Inspired', 'Artisan Touch'] },
  { id: '5', name: 'VINTAGE', image: 'https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Art Deco', 'Victorian', 'Retro Glamour'] },
  { id: '6', name: 'AVANT-GARDE', image: 'https://images.unsplash.com/photo-1639291488816-8e8ba6abb9a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800', rings: ['Bold Forms', 'Unconventional', 'Statement'] },
];

function getStylePalette(name: string) {
  if (name === 'STACKING') {
    return {
      card: "bg-gradient-to-br from-purple-950/70 to-zinc-900/70 border-purple-700/40",
      imageBorder: "border-2 border-purple-400/50",
    };
  }
  if (name === 'MIXING') {
    return {
      card: "bg-gradient-to-br from-amber-950/70 to-zinc-900/70 border-amber-700/40",
      imageBorder: "border-2 border-amber-400/50",
    };
  }
  if (name === 'MINIMALISM') {
    return {
      card: "bg-gradient-to-br from-slate-800/70 to-zinc-900/70 border-slate-300/40",
      imageBorder: "border-2 border-slate-300/50",
    };
  }
  if (name === 'BOHEMIAN') {
    return {
      card: "bg-gradient-to-br from-emerald-950/70 to-zinc-900/70 border-emerald-700/40",
      imageBorder: "border-2 border-emerald-400/50",
    };
  }
  if (name === 'VINTAGE') {
    return {
      card: "bg-gradient-to-br from-rose-950/70 to-zinc-900/70 border-rose-700/40",
      imageBorder: "border-2 border-rose-400/50",
    };
  }
  return {
    card: "bg-gradient-to-br from-indigo-950/70 to-zinc-900/70 border-indigo-700/40",
    imageBorder: "border-2 border-indigo-400/50",
  };
}

export function StyleGallery() {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
    <div className="relative w-full min-h-[350vh] overflow-hidden bg-black">
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
              Ring Styling
            </h1>
            <p 
              className="text-[36px] md:text-[40px] text-white/90" 
              style={{ 
                fontFamily: "'Cinzel', serif", 
                letterSpacing: "0.2em",
                textShadow: "0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(139,92,246,0.3)"
              }}
            >
              EXPRESS YOUR PERSONAL STYLE
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
            background: "radial-gradient(circle, rgba(200,180,255,0.35) 0%, rgba(180,150,200,0.2) 30%, rgba(200,180,255,0) 68%)",
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
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-purple-400' : 'bg-pink-300'}`}
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                transform: `rotate(${i * 12.85}deg) translateX(${155 + (i % 4) * 24}px)`,
                boxShadow: i % 2 === 0 ? "0 0 14px rgba(200,180,255,0.95)" : "0 0 14px rgba(200,150,200,0.95)",
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
              "radial-gradient(ellipse at center, rgba(200,180,255,0.5) 0%, rgba(180,150,220,0.4) 40%, rgba(200,180,255,0) 75%)",
            filter: "blur(15px)",
            boxShadow: "0 0 60px rgba(200,180,255,0.6), 0 0 100px rgba(180,150,220,0.45)",
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
            border: "1px solid rgba(200,180,255,0.7)",
            boxShadow: "0 0 45px rgba(200,180,255,0.6), inset 0 0 30px rgba(180,150,220,0.45)",
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
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-purple-300' : 'bg-pink-200'}`}
              style={{
                width: `${1.6 + (i % 2) * 1.8}px`,
                height: `${1.6 + (i % 2) * 1.8}px`,
                transform: `rotate(${i * 8.57}deg) translateX(${185 + (i % 5) * 16}px)`,
                boxShadow: i % 2 === 0 ? "0 0 18px rgba(200,180,255,0.95)" : "0 0 18px rgba(200,150,200,0.95)",
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

      {/* 第二页 - 视频背景 + 戒指卡片 */}
      <div className="relative h-[250vh] w-full">
        {/* 视频背景 */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            style={{ objectFit: "cover" }}
          >
            <source src="/videos/style-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40" />
        </div>

        {/* 戒指卡片 - 左侧垂直排列 */}
        <div className="relative z-[10] pt-[60px] pl-16 md:pl-24">
          {styleCollections.map((collection, index) => {
            const triggerOffset = window.innerHeight * 0.3;
            const elementPosition = window.innerHeight + index * 400 + triggerOffset;
            const isVisible = scrollY >= elementPosition - window.innerHeight && scrollY <= elementPosition + 200;
            const opacity = isVisible ? 1 : 0;
            const yOffset = scrollY >= elementPosition - window.innerHeight ? 0 : 50;
            const palette = getStylePalette(collection.name);
            
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: opacity, y: yOffset }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-20"
                style={{ marginTop: index === 0 ? '0' : '40px' }}
              >
                <Link to={`/style/${collection.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className={`w-[42rem] sm:w-[48rem] ${palette.card} backdrop-blur-lg p-6 rounded-2xl shadow-[0_26px_60px_rgba(0,0,0,0.5)]`}
                  >
                    <div className="flex">
                      {/* 图片区域 - 左侧 */}
                      <div className={`relative w-64 h-48 rounded-xl ${palette.imageBorder} bg-black/30 overflow-hidden flex-shrink-0`}>
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover saturate-95 contrast-105"
                        />
                      </div>
                      {/* 文字区域 - 右侧 */}
                      <div className="flex flex-col justify-center px-6">
                        <h3 
                          className="text-3xl text-white font-bold mb-4"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {collection.name}
                        </h3>
                        <ul className="space-y-2">
                          {collection.rings.map((ring, idx) => (
                            <li 
                              key={idx} 
                              className="text-white/80 text-lg"
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                              • {ring}
                            </li>
                          ))}
                        </ul>
                        <Link 
                          to={`/style/${collection.id}`}
                          className="font-[Cormorant_Garamond] mt-4 text-[14px] tracking-[0.15em] text-white/60 uppercase hover:text-white transition-colors inline-block"
                        >
                          View Collection →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
