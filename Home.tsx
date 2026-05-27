import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";

export function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursor || !cursorRing) return;

    const animate = () => {
      cursor.style.transform = `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`;
      cursorRing.style.transform = `translate(${mousePosition.x - 18}px, ${mousePosition.y - 18}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, [mousePosition]);

  const scrollToEntries = () => {
    document.getElementById('entries')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="min-h-screen bg-black text-white overflow-x-hidden">
      <div 
        ref={cursorRef} 
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
      />
      <div 
        ref={cursorRingRef} 
        className="fixed w-9 h-9 border border-white/40 rounded-full pointer-events-none z-[9998] transition-all duration-[0.14s]"
      />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <nav className="fixed top-0 left-0 right-0 z-[500] p-[50px_56px_28px] flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <div className="font-[Cormorant_Garamond] text-[18px] italic">
          Ring Museum <span className="block font-[Cormorant_Garamond] text-[11px] tracking-[0.3em] text-[#888] italic-normal mt-1">戒指博物馆</span>
        </div>
        <ul className="flex gap-9 items-center list-none">
          <li>
            <Link to="/history" className="stamp-button">History</Link>
          </li>
          <li>
            <Link to="/material" className="stamp-button-black">Material</Link>
          </li>
          <li>
            <Link to="/style" className="stamp-button">Style</Link>
          </li>
          <li>
            <Link to="/symbols" className="stamp-button-black">Symbols</Link>
          </li>
        </ul>
      </nav>

      {/* 星星点点的动态光效 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
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

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-8 max-w-3xl">
          <img 
            src="/images/IMG_9246.PNG" 
            alt="Ring Museum Logo" 
            className="w-[180px] h-[180px] mx-auto mb-5 object-contain"
          />
          <div className="mb-4">
            <h1 
              className="text-[72px] md:text-[86px] font-bold"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #ffffff 0%, #f0d8a8 50%, #c8b99a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitTextStroke: "1px rgba(240,216,168,0.5)",
                filter: "drop-shadow(0 0 20px rgba(240,216,168,0.4))"
              }}
            >
              Ring
            </h1>
            <span 
              className="block text-[24px] md:text-[28px] tracking-[0.3em] mt-2"
              style={{ 
                fontFamily: "'Cinzel', serif",
                color: "#c8b99a",
                textShadow: "0 0 15px rgba(200,185,154,0.5)"
              }}
            >
              MUSEUM
            </span>
          </div>
          <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.35em] text-[#c8b99a] mb-8 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#c8b99a]" />
            Online Museum · 线上博物馆
          </div>
          <p className="font-[Cormorant_Garamond] text-[17px] text-[#888] max-w-[500px] mx-auto mb-8 leading-[1.9] font-light">
            三千年的圆圈。一枚戒指背后的历史、材质与文化——跨越文明的永恒符号。
          </p>
          <button 
            onClick={scrollToEntries}
            className="group inline-flex items-center gap-5 font-[Cormorant_Garamond] text-[14px] tracking-[0.25em] uppercase border-b border-[#555] pb-2.5 hover:border-white hover:gap-7 transition-all duration-300"
          >
            进入博物馆 Enter →
          </button>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 font-[Cormorant_Garamond] text-[12px] tracking-[0.3em] uppercase text-[#555]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#555] to-transparent animate-[scrollAnim_2s_ease-in-out_infinite]" />
          Scroll to Explore
        </div>
      </section>

      <section id="entries" className="bg-black">
        <div className="px-14 py-20 font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#555] flex items-center gap-5">
          馆内导览 · Museum Guide
          <div className="flex-1 h-px bg-[#1a1a1a]" />
        </div>
        <div className="grid grid-cols-3 border-t border-[#1a1a1a]">
          <Link to="/history" className="entry-card border-r border-b border-[#1a1a1a]">
            <div className="h-[320px] overflow-hidden">
              <img 
                src="/images/IMG_9247.PNG" 
                alt="History" 
                className="w-full h-full object-cover transition-transform duration-[0.8s] hover:scale-[1.04] hover:brightness-60"
              />
            </div>
            <div className="p-[36px_40px_40px]">
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.2em] mb-2">01 ——</div>
              <div 
              className="mb-3 transition-all duration-300 hover:scale-105"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "44px",
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
              }}
            >
              History
            </div>
              <p className="font-[Cormorant_Garamond] text-[15px] text-[#888] leading-[1.7] max-w-[340px]">
                从古埃及法老的圣甲虫印章，到清代帝王玉扳指——循迹戒指穿越三千年文明的旅程。
              </p>
              <span className="inline-block font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.15em] mt-4 transition-all hover:text-[#c8b99a] hover:translate-x-1.5">
                进入展厅 →
              </span>
            </div>
          </Link>
          <Link to="/material" className="entry-card border-r border-b border-[#1a1a1a]">
            <div className="h-[320px] overflow-hidden">
              <img 
                src="/images/IMG_9248.PNG" 
                alt="Material" 
                className="w-full h-full object-cover transition-transform duration-[0.8s] hover:scale-[1.04] hover:brightness-60"
              />
            </div>
            <div className="p-[36px_40px_40px]">
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.2em] mb-2">02 ——</div>
              <div 
              className="mb-3 transition-all duration-300 hover:scale-105"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "44px",
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
              }}
            >
              Material
            </div>
              <p className="font-[Cormorant_Garamond] text-[15px] text-[#888] leading-[1.7] max-w-[340px]">
                黄金、铂金、翡翠、钻石——每一种材质都是一段地质史与人类欲望的交汇。
              </p>
              <span className="inline-block font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.15em] mt-4 transition-all hover:text-[#c8b99a] hover:translate-x-1.5">
                进入展厅 →
              </span>
            </div>
          </Link>
          <Link to="/style" className="entry-card border-b border-[#1a1a1a]">
            <div className="h-[320px] overflow-hidden">
              <img 
                src="/images/IMG_9249.PNG" 
                alt="Style" 
                className="w-full h-full object-cover transition-transform duration-[0.8s] hover:scale-[1.04] hover:brightness-60"
              />
            </div>
            <div className="p-[36px_40px_40px]">
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.2em] mb-2">03 ——</div>
              <div 
              className="mb-3 transition-all duration-300 hover:scale-105"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "44px",
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
              }}
            >
              Style
            </div>
              <p className="font-[Cormorant_Garamond] text-[15px] text-[#888] leading-[1.7] max-w-[340px]">
                叠戴、混搭、孤品陈列——发现属于你自己的戒指语言与佩戴美学。
              </p>
              <span className="inline-block font-[Cormorant_Garamond] text-[14px] text-[#555] tracking-[0.15em] mt-4 transition-all hover:text-[#c8b99a] hover:translate-x-1.5">
                进入展厅 →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section id="featured" className="py-[100px_0_80px] bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="px-14 flex justify-between items-end mb-14">
          <div>
            <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#555] mb-3">
              ∙ Selected Works
            </div>
            <div 
            className="text-[48px]"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
            }}
          >
            精选馆藏
          </div>
          </div>
          <Link to="/history" className="font-[Cormorant_Garamond] text-[14px] tracking-[0.2em] uppercase text-[#555] hover:text-white transition-colors">
            查看全部藏品 →
          </Link>
        </div>
        <div className="flex gap-px overflow-x-auto px-14 scrollbar-hide">
          <div className="ring-card flex-shrink-0 w-[260px] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer">
            <div className="h-[260px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="transition-transform duration-500 hover:scale-110 hover:opacity-100 opacity-70">
                <circle cx="70" cy="70" r="44" stroke="#c8b99a" strokeWidth="2.5"/>
                <circle cx="70" cy="70" r="35" stroke="#8a7a60" strokeWidth="1"/>
                <ellipse cx="70" cy="70" rx="44" ry="15" stroke="#c8b99a" strokeWidth="1.5"/>
                <circle cx="70" cy="26" r="9" fill="#c8b99a" opacity="0.7"/>
                <path d="M65 26 L70 19 L75 26 L72 32 L68 32Z" fill="#e8d5b0" opacity="0.9"/>
              </svg>
            </div>
            <div className="p-[20px_22px_24px]">
              <div className="font-[Cormorant_Garamond] text-[19px] mb-1.5">Aeon Solitaire</div>
              <div className="font-[Cormorant_Garamond] text-[13px] tracking-[0.2em] uppercase text-[#555] mb-3">18K Gold · Diamond</div>
              <div className="font-[Cormorant_Garamond] text-[13px] text-[#888] italic">19th Century, Europe</div>
            </div>
          </div>
          <div className="ring-card flex-shrink-0 w-[260px] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer">
            <div className="h-[260px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="transition-transform duration-500 hover:scale-110 hover:opacity-100 opacity-70">
                <circle cx="70" cy="70" r="42" stroke="#aaa" strokeWidth="3.5"/>
                <circle cx="70" cy="70" r="33" stroke="#666" strokeWidth="1"/>
                <ellipse cx="70" cy="70" rx="42" ry="14" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3 5"/>
              </svg>
            </div>
            <div className="p-[20px_22px_24px]">
              <div className="font-[Cormorant_Garamond] text-[19px] mb-1.5">Imperial Seal</div>
              <div className="font-[Cormorant_Garamond] text-[13px] tracking-[0.2em] uppercase text-[#555] mb-3">Platinum · Jade</div>
              <div className="font-[Cormorant_Garamond] text-[13px] text-[#888] italic">Qing Dynasty, China</div>
            </div>
          </div>
          <div className="ring-card flex-shrink-0 w-[260px] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer">
            <div className="h-[260px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="transition-transform duration-500 hover:scale-110 hover:opacity-100 opacity-70">
                <circle cx="70" cy="70" r="40" stroke="#c8a060" strokeWidth="4.5"/>
                <circle cx="70" cy="70" r="32" stroke="#a07040" strokeWidth="1"/>
                <ellipse cx="70" cy="70" rx="40" ry="13" stroke="#c8a060" strokeWidth="2.5"/>
                <circle cx="70" cy="30" r="12" fill="#c8b99a" opacity="0.5"/>
              </svg>
            </div>
            <div className="p-[20px_22px_24px]">
              <div className="font-[Cormorant_Garamond] text-[19px] mb-1.5">Scarab Ring</div>
              <div className="font-[Cormorant_Garamond] text-[13px] tracking-[0.2em] uppercase text-[#555] mb-3">22K Gold · Lapis</div>
              <div className="font-[Cormorant_Garamond] text-[13px] text-[#888] italic">Ancient Egypt, 1400 BC</div>
            </div>
          </div>
          <div className="ring-card flex-shrink-0 w-[260px] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer">
            <div className="h-[260px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="transition-transform duration-500 hover:scale-110 hover:opacity-100 opacity-70">
                <circle cx="70" cy="70" r="42" stroke="#777" strokeWidth="2"/>
                <circle cx="70" cy="70" r="34" stroke="#555" strokeWidth="1"/>
                <circle cx="70" cy="70" r="26" stroke="#444" strokeWidth="0.5"/>
                <ellipse cx="70" cy="70" rx="42" ry="13" stroke="#888" strokeWidth="1.5"/>
                <polygon points="70,34 82,52 78,70 62,70 58,52" fill="#444" stroke="#666" strokeWidth="1"/>
              </svg>
            </div>
            <div className="p-[20px_22px_24px]">
              <div className="font-[Cormorant_Garamond] text-[19px] mb-1.5">Signet Arcana</div>
              <div className="font-[Cormorant_Garamond] text-[13px] tracking-[0.2em] uppercase text-[#555] mb-3">Silver · Hematite</div>
              <div className="font-[Cormorant_Garamond] text-[13px] text-[#888] italic">Medieval Europe</div>
            </div>
          </div>
          <div className="ring-card flex-shrink-0 w-[260px] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer">
            <div className="h-[260px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="transition-transform duration-500 hover:scale-110 hover:opacity-100 opacity-70">
                <circle cx="70" cy="70" r="42" stroke="#b8d0c8" strokeWidth="2"/>
                <circle cx="70" cy="70" r="36" stroke="#90b0a8" strokeWidth="3.5"/>
                <ellipse cx="70" cy="70" rx="42" ry="14" stroke="#b8d0c8" strokeWidth="1.5"/>
                <circle cx="70" cy="28" r="5" fill="#a0c8c0"/>
                <circle cx="70" cy="112" r="5" fill="#a0c8c0"/>
                <circle cx="28" cy="70" r="5" fill="#a0c8c0"/>
                <circle cx="112" cy="70" r="5" fill="#a0c8c0"/>
              </svg>
            </div>
            <div className="p-[20px_22px_24px]">
              <div className="font-[Cormorant_Garamond] text-[19px] mb-1.5">Aqua Eternity</div>
              <div className="font-[Cormorant_Garamond] text-[13px] tracking-[0.2em] uppercase text-[#555] mb-3">White Gold · Aquamarine</div>
              <div className="font-[Cormorant_Garamond] text-[13px] text-[#888] italic">Art Deco, 1920s</div>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="py-[100px_56px] bg-black border-t border-[#1a1a1a]">
        <div className="flex justify-between items-end mb-14">
          <div>
            <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#555] mb-3">
              ∙ Featured Stories
            </div>
            <div 
            className="text-[48px]"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
            }}
          >精选故事</div>
          </div>
        </div>
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-px mt-14">
          <div className="story-card cursor-pointer min-h-[420px] bg-[#0d0d0d] flex flex-col justify-end relative overflow-hidden">
            <div className="story-card-bg absolute inset-0 flex items-center justify-center opacity-15 hover:opacity-25 transition-opacity">
              <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="90" stroke="#fff" strokeWidth="1"/>
                <text x="84" y="136" fill="#fff" fontSize="52" fontFamily="serif">安</text>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <div className="relative p-[28px_28px_32px]">
              <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#c8b99a] mb-2.5">∙ History</div>
              <div className="font-[Cormorant_Garamond] text-[28px] mb-2 leading-[1.3]">帝王印章戒指——权力铸成圆圈</div>
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#888] leading-[1.65]">古代中国统治者如何将权威凝铸于玉与金之中。</div>
            </div>
          </div>
          <div className="story-card cursor-pointer min-h-[420px] bg-[#0d0d0d] flex flex-col justify-end relative overflow-hidden">
            <div className="story-card-bg absolute inset-0 flex items-center justify-center opacity-15 hover:opacity-25 transition-opacity">
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <polygon points="80,12 136,100 24,100" stroke="#fff" strokeWidth="1.2" fill="none"/>
                <polygon points="80,30 118,95 42,95" stroke="#fff" strokeWidth="0.6" fill="none"/>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <div className="relative p-[28px_28px_32px]">
              <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#c8b99a] mb-2.5">∙ Material</div>
              <div className="font-[Cormorant_Garamond] text-[22px] mb-2 leading-[1.3]">铂金为何成为永恒的金属</div>
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#888] leading-[1.65]">一种稀有元素的皇家崛起之路。</div>
            </div>
          </div>
          <div className="story-card cursor-pointer min-h-[420px] bg-[#0d0d0d] flex flex-col justify-end relative overflow-hidden">
            <div className="story-card-bg absolute inset-0 flex items-center justify-center opacity-15 hover:opacity-25 transition-opacity">
              <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
                <path d="M40 180 Q80 60 120 180" stroke="#fff" strokeWidth="1.5" fill="none"/>
                <circle cx="68" cy="120" r="10" stroke="#fff" strokeWidth="1" fill="none"/>
                <circle cx="90" cy="90" r="8" stroke="#fff" strokeWidth="0.8" fill="none"/>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <div className="relative p-[28px_28px_32px]">
              <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#c8b99a] mb-2.5">∙ Style</div>
              <div className="font-[Cormorant_Garamond] text-[22px] mb-2 leading-[1.3]">叠戴：戒指作为自我叙事的语言</div>
              <div className="font-[Cormorant_Garamond] text-[14px] text-[#888] leading-[1.65]">多枚戒指如何成为一种个人传记。</div>
            </div>
          </div>
        </div>
      </section>

      <section id="community-preview" className="py-[100px_56px] bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="flex justify-between items-end mb-14">
          <div>
            <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#555] mb-3">
              ∙ Community
            </div>
            <div 
            className="text-[48px]"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
            }}
          >社区与共创</div>
          </div>
          <Link to="/symbols" className="font-[Cormorant_Garamond] text-[14px] tracking-[0.2em] uppercase text-[#555] hover:text-white transition-colors">
            进入社区 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px mt-14">
          <div className="grid grid-cols-2 gap-px">
            <div className="community-cell aspect-square bg-[#1a1a1a] cursor-pointer relative overflow-hidden flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.35">
                <circle cx="40" cy="40" r="28" stroke="#c8b99a" strokeWidth="2"/>
                <circle cx="40" cy="12" r="7" fill="#c8b99a"/>
                <path d="M35 12 L40 6 L45 12 L42 17 L38 17Z" fill="#e8d5b0"/>
              </svg>
              <div className="absolute inset-0 flex items-end p-4">
                <div className="font-[Cormorant_Garamond] text-[12px] tracking-[0.2em] uppercase text-white opacity-0 hover:opacity-100 transition-opacity">
                  @lin_ming_jewelry
                </div>
              </div>
            </div>
            <div className="community-cell aspect-square bg-[#090909] cursor-pointer relative overflow-hidden flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.3">
                <circle cx="40" cy="40" r="32" stroke="#888" strokeWidth="3.5"/>
                <ellipse cx="40" cy="40" rx="32" ry="11" stroke="#999" strokeWidth="1.5"/>
              </svg>
              <div className="absolute inset-0 flex items-end p-4">
                <div className="font-[Cormorant_Garamond] text-[12px] tracking-[0.2em] uppercase text-white opacity-0 hover:opacity-100 transition-opacity">
                  @wei_studio
                </div>
              </div>
            </div>
            <div className="community-cell aspect-square bg-[#0b0b0b] cursor-pointer relative overflow-hidden flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.35">
                <text x="26" y="57" fill="#fff" fontSize="38" fontFamily="serif">安</text>
              </svg>
              <div className="absolute inset-0 flex items-end p-4">
                <div className="font-[Cormorant_Garamond] text-[12px] tracking-[0.2em] uppercase text-white opacity-0 hover:opacity-100 transition-opacity">
                  @grace.chen
                </div>
              </div>
            </div>
            <div className="community-cell aspect-square bg-[#080808] cursor-pointer relative overflow-hidden flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.3">
                <polygon points="40,8 68,52 12,52" stroke="#b8d0c8" strokeWidth="1.5" fill="none"/>
                <circle cx="40" cy="40" r="22" stroke="#90b0a8" strokeWidth="1"/>
              </svg>
              <div className="absolute inset-0 flex items-end p-4">
                <div className="font-[Cormorant_Garamond] text-[12px] tracking-[0.2em] uppercase text-white opacity-0 hover:opacity-100 transition-opacity">
                  @yuki_forms
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-[56px_48px] flex flex-col justify-between">
            <div>
              <div className="font-[Cormorant_Garamond] text-[14px] tracking-[0.3em] uppercase text-[#555] mb-5">∙ Community</div>
              <div className="font-[Cormorant_Garamond] text-[52px] leading-none mb-6">收藏<br/>创作<br/><em className="italic text-[#c8b99a]">展示</em></div>
              <p className="font-[Cormorant_Garamond] text-[16px] text-[#888] leading-[1.85] mb-10">
                一个围绕戒指生长的活态社区——博物馆联名、用户众创、藏品档案，记录每一枚戒指背后的故事。
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="c-action flex items-center justify-between p-[16px_20px] border border-[#555] cursor-pointer hover:border-[#c8b99a] hover:bg-[#c8b99a]/5 transition-all">
                <span className="font-[Cormorant_Garamond] text-[14px] tracking-[0.2em] uppercase">博物馆联名</span>
                <span className="font-[Cormorant_Garamond] text-[14px] text-[#555] hover:text-[#c8b99a] hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="c-action flex items-center justify-between p-[16px_20px] border border-[#555] cursor-pointer hover:border-[#c8b99a] hover:bg-[#c8b99a]/5 transition-all">
                <span className="font-[Cormorant_Garamond] text-[14px] tracking-[0.2em] uppercase">用户众创</span>
                <span className="font-[Cormorant_Garamond] text-[14px] text-[#555] hover:text-[#c8b99a] hover:translate-x-1 transition-all">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-[72px_56px_48px] bg-black border-t border-[#1a1a1a]">
        <div className="flex justify-between items-start mb-18">
          <div>
            <div className="font-[Cormorant_Garamond] text-[32px] italic">Ring Museum</div>
            <div className="font-[Cormorant_Garamond] text-[14px] text-[#555] mt-1.5 italic">戒指博物馆 · A circle without end.</div>
          </div>
          <div className="flex gap-18">
            <div className="fcol">
              <h4 className="font-[Cormorant_Garamond] text-[14px] tracking-[0.25em] uppercase text-[#555] mb-5">展厅</h4>
              <ul className="list-none flex flex-col gap-2.5">
                <li><Link to="/history" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">History 历史</Link></li>
                <li><Link to="/material" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">Material 材质</Link></li>
                <li><Link to="/style" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">Style 搭配</Link></li>
                <li><Link to="/symbols" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">Community 社区</Link></li>
              </ul>
            </div>
            <div className="fcol">
              <h4 className="font-[Cormorant_Garamond] text-[14px] tracking-[0.25em] uppercase text-[#555] mb-5">关注</h4>
              <ul className="list-none flex flex-col gap-2.5">
                <li><a href="#" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">WeChat</a></li>
                <li><a href="#" className="font-[Cormorant_Garamond] text-[15px] text-[#555] hover:text-white transition-colors">小红书</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-7 border-t border-[#1a1a1a]">
          <div className="font-[Cormorant_Garamond] text-[13px] text-[#555] tracking-[0.1em]">© 2024 Ring Museum · 线上戒指博物馆</div>
          <div className="font-[Cormorant_Garamond] text-[13px] text-[#555] tracking-[0.1em]">Crafted with intention · 知识与美的循环</div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Space+Mono:wght@400;700&display=swap');
        
        :root {
          --font-serif: 'Playfair Display', serif;
          --font-body: 'Cormorant Garamond', serif;
          --font-mono: 'Space Mono', monospace;
        }
        
        body {
          font-family: var(--font-body);
        }
        
        .stamp-button {
          position: relative;
          background: #c8b99a;
          padding: 15px 25px;
          border: none;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000;
          transition: transform 0.3s;
          clip-path: polygon(
            0% 5%, 5% 5%, 5% 0%, 10% 0%, 10% 5%, 15% 5%, 15% 0%, 20% 0%, 20% 5%, 25% 5%, 25% 0%, 30% 0%, 30% 5%, 35% 5%, 35% 0%, 40% 0%, 40% 5%, 45% 5%, 45% 0%, 50% 0%, 50% 5%, 55% 5%, 55% 0%, 60% 0%, 60% 5%, 65% 5%, 65% 0%, 70% 0%, 70% 5%, 75% 5%, 75% 0%, 80% 0%, 80% 5%, 85% 5%, 85% 0%, 90% 0%, 90% 5%, 95% 5%, 95% 0%, 100% 0%, 100% 5%, 100% 10%, 95% 10%, 95% 15%, 100% 15%, 100% 20%, 95% 20%, 95% 25%, 100% 25%, 100% 30%, 95% 30%, 95% 35%, 100% 35%, 100% 40%, 95% 40%, 95% 45%, 100% 45%, 100% 50%, 95% 50%, 95% 55%, 100% 55%, 100% 60%, 95% 60%, 95% 65%, 100% 65%, 100% 70%, 95% 70%, 95% 75%, 100% 75%, 100% 80%, 95% 80%, 95% 85%, 100% 85%, 100% 90%, 95% 90%, 95% 95%, 100% 95%, 100% 100%, 95% 100%, 95% 95%, 90% 95%, 90% 100%, 85% 100%, 85% 95%, 80% 95%, 80% 100%, 75% 100%, 75% 95%, 70% 95%, 70% 100%, 65% 100%, 65% 95%, 60% 95%, 60% 100%, 55% 100%, 55% 95%, 50% 95%, 50% 100%, 45% 100%, 45% 95%, 40% 95%, 40% 100%, 35% 100%, 35% 95%, 30% 95%, 30% 100%, 25% 100%, 25% 95%, 20% 95%, 20% 100%, 15% 100%, 15% 95%, 10% 95%, 10% 100%, 5% 100%, 5% 95%, 0% 95%, 0% 90%, 5% 90%, 5% 85%, 0% 85%, 0% 80%, 5% 80%, 5% 75%, 0% 75%, 0% 70%, 5% 70%, 5% 65%, 0% 65%, 0% 60%, 5% 60%, 5% 55%, 0% 55%, 0% 50%, 5% 50%, 5% 45%, 0% 45%, 0% 40%, 5% 40%, 5% 35%, 0% 35%, 0% 30%, 5% 30%, 5% 25%, 0% 25%, 0% 20%, 5% 20%, 5% 15%, 0% 15%, 0% 10%, 5% 10%, 5% 5%, 0% 5%
          );
        }
        
        .stamp-button:hover {
          transform: scale(1.05) rotate(1deg);
        }
        
        .stamp-button::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px; right: 8px; bottom: 8px;
          border: 2px dashed rgba(0,0,0,0.3);
          pointer-events: none;
        }
        
        .stamp-button-black {
          background: #222;
          color: #fff;
        }
        
        .stamp-button-black::before {
          border: 2px dashed rgba(255,255,255,0.3);
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        @keyframes scrollAnim {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}