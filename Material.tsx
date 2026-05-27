import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";

interface RingItem {
  id: number;
  title: string;
  category: string;
  materials: string[];
  technique?: string;
  imageUrl: string;
  description: string;
}

const preciousMetals: RingItem[] = [
  { id: 1, title: "Classic Gold Engagement Ring", category: "Gold Ring", materials: ["24K Gold", "Diamond"], technique: "Prong Setting", imageUrl: "https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Timeless gold band with brilliant diamond centerpiece" },
  { id: 2, title: "Platinum Solitaire Ring", category: "Platinum Ring", materials: ["PT950 Platinum", "Diamond"], technique: "Lost-wax Casting", imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Exquisite platinum ring with pristine diamond solitaire" },
  { id: 3, title: "Rose Gold Diamond Ring", category: "Rose Gold Ring", materials: ["18K Rose Gold", "Diamond"], technique: "Pavé Setting", imageUrl: "https://images.unsplash.com/photo-1736615494533-14b406d50f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Romantic rose gold with delicate diamond accents" },
  { id: 4, title: "White Gold Halo Ring", category: "White Gold Ring", materials: ["18K White Gold", "Diamond"], technique: "Halo Setting", imageUrl: "https://images.unsplash.com/photo-1713999261126-8755201f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Elegant white gold with stunning halo diamond design" },
  { id: 5, title: "Yellow Gold Eternity Band", category: "Gold Ring", materials: ["18K Yellow Gold", "Diamond"], technique: "Channel Setting", imageUrl: "https://images.unsplash.com/photo-1646656493803-3fa79874de02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Classic yellow gold eternity band with continuous diamonds" },
  { id: 6, title: "Platinum Vintage Ring", category: "Platinum Ring", materials: ["PT900 Platinum", "Diamond"], technique: "Milgrain Detail", imageUrl: "https://images.unsplash.com/photo-1639291488816-8e8ba6abb9a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Art Deco inspired platinum ring with intricate details" },
];

const gemstones: RingItem[] = [
  { id: 7, title: "Burmese Ruby Ring", category: "Ruby Ring", materials: ["Pigeon Blood Ruby", "18K Gold"], technique: "Prong Setting", imageUrl: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Rare Burmese ruby with exceptional clarity and color" },
  { id: 8, title: "Pink Sapphire Ring", category: "Sapphire Ring", materials: ["Pink Sapphire", "Sterling Silver"], technique: "Bezel Setting", imageUrl: "https://images.unsplash.com/photo-1586878340946-f81bfad535f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Delicate pink sapphire in elegant silver setting" },
  { id: 9, title: "Ruby Cluster Ring", category: "Ruby Ring", materials: ["Ruby", "White Gold"], technique: "Cluster Setting", imageUrl: "https://images.unsplash.com/photo-1763256614634-7feb3ff79ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Multiple rubies creating a stunning floral pattern" },
  { id: 10, title: "Blue Sapphire Ring", category: "Sapphire Ring", materials: ["Ceylon Sapphire", "Platinum"], technique: "Three-Stone Setting", imageUrl: "https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Deep blue Ceylon sapphire with accent diamonds" },
  { id: 11, title: "Vintage Ruby Ring", category: "Ruby Ring", materials: ["Ruby", "Yellow Gold"], technique: "Vintage Setting", imageUrl: "https://images.unsplash.com/photo-1587947330318-88fcd9055420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Vintage-inspired ruby ring with antique finish" },
  { id: 12, title: "Emerald Cut Ring", category: "Emerald Ring", materials: ["Colombian Emerald", "18K Gold"], technique: "Emerald Cut", imageUrl: "https://images.unsplash.com/photo-1705854937134-dd130d90df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Sophisticated emerald cut gemstone ring" },
];

const contemporary: RingItem[] = [
  { id: 13, title: "Minimalist Titanium Ring", category: "Modern Ring", materials: ["Medical Grade Titanium"], technique: "Brushed Finish", imageUrl: "https://images.unsplash.com/photo-1645748655434-9cc8e96470a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Sleek titanium ring with contemporary minimalist design" },
  { id: 14, title: "Black Ceramic Ring", category: "Modern Ring", materials: ["High-tech Ceramic"], technique: "Precision Machining", imageUrl: "https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Ultra-modern black ceramic with scratch-resistant surface" },
  { id: 15, title: "Mokume-gane Wedding Band", category: "Art Ring", materials: ["Copper", "Silver", "Gold"], technique: "Mokume-gane", imageUrl: "https://images.unsplash.com/photo-1726507367666-08c5f025bdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Japanese wood grain metal technique creating unique patterns" },
  { id: 16, title: "Textured Silver Ring", category: "Art Ring", materials: ["Sterling Silver"], technique: "Hammer Texturing", imageUrl: "https://images.unsplash.com/photo-1632984513357-e25ebe1bee37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Handcrafted silver ring with organic texture finish" },
  { id: 17, title: "Engraved Band Ring", category: "Art Ring", materials: ["Sterling Silver"], technique: "Hand Engraving", imageUrl: "https://images.unsplash.com/photo-1719924998065-0c60e329ef58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Personalized engraved ring with meaningful inscription" },
  { id: 18, title: "Stacked Modern Rings", category: "Modern Ring", materials: ["Mixed Metals"], technique: "Stackable Design", imageUrl: "https://images.unsplash.com/photo-1709150485687-b5ed84fd776c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", description: "Contemporary stackable rings for versatile styling" },
];

const categories = [
  { key: "precious", title: "Precious Metals", items: preciousMetals },
  { key: "gemstones", title: "Gemstones", items: gemstones },
  { key: "contemporary", title: "Art & Modern", items: contemporary },
];

function getCategoryPalette(category: string) {
  if (category.includes("Gold")) {
    return { border: "border-amber-500/50", shadow: "shadow-amber-500/20" };
  }
  if (category.includes("Platinum")) {
    return { border: "border-slate-300/50", shadow: "shadow-slate-300/20" };
  }
  if (category.includes("Ruby")) {
    return { border: "border-rose-500/50", shadow: "shadow-rose-500/20" };
  }
  if (category.includes("Sapphire")) {
    return { border: "border-blue-500/50", shadow: "shadow-blue-500/20" };
  }
  if (category.includes("Emerald")) {
    return { border: "border-emerald-500/50", shadow: "shadow-emerald-500/20" };
  }
  return { border: "border-white/50", shadow: "shadow-white/20" };
}

const scatteredPositions = [
  { x: -380, y: -120 },
  { x: -200, y: -180 },
  { x: 0, y: -200 },
  { x: 200, y: -160 },
  { x: 380, y: -100 },
  { x: 450, y: 60 },
  { x: 350, y: 200 },
  { x: 150, y: 280 },
  { x: -50, y: 260 },
  { x: -250, y: 180 },
  { x: -400, y: 80 },
  { x: -350, y: -50 },
];

export function Material() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
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

  const getCurrentCategory = () => {
    const windowHeight = window.innerHeight;
    const pageProgress = scrollY / windowHeight;
    if (pageProgress < 0.8) return -1;
    if (pageProgress < 1.8) return 0;
    if (pageProgress < 2.8) return 1;
    return 2;
  };

  const currentCategoryIndex = getCurrentCategory();

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <Navigation />

      {/* 首页 - 标题区域 */}
      <div className="relative h-screen w-full">
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
              Precious Materials
            </h1>
            <p
              className="text-[36px] md:text-[40px] text-white/90"
              style={{
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.2em",
                textShadow: "0 0 20px rgba(240,216,168,0.4), 0 0 40px rgba(216,185,110,0.3)"
              }}
            >
              THE ART OF FINE CRAFTSMANSHIP
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
            background: "radial-gradient(circle, rgba(180,150,50,0.35) 0%, rgba(180,180,180,0.2) 30%, rgba(180,150,50,0) 68%)",
            opacity: heroHover ? 1 : 0,
          }}
          animate={{ scale: heroHover ? [0.95, 1.1, 0.95] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => setHeroHover(true)}
          onMouseLeave={() => setHeroHover(false)}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 z-[212] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={`title-orbit-${i}`}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-amber-600' : 'bg-gray-400'}`}
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                transform: `rotate(${i * 12.85}deg) translateX(${155 + (i % 4) * 24}px)`,
                boxShadow: i % 2 === 0 ? "0 0 14px rgba(180,150,50,0.95)" : "0 0 14px rgba(180,180,180,0.95)",
              }}
              animate={{ opacity: [0.22, 1, 0.22], scale: [0.85, 1.5, 0.85] }}
              transition={{ duration: 1.8 + (i % 5) * 0.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 w-[650px] h-[280px] rounded-full pointer-events-none z-[206]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(ellipse at center, rgba(180,150,50,0.5) 0%, rgba(180,180,180,0.4) 40%, rgba(180,150,50,0) 75%)",
            filter: "blur(15px)",
            boxShadow: "0 0 60px rgba(180,150,50,0.6), 0 0 100px rgba(180,180,180,0.45)",
          }}
          animate={{ rotate: [0, 360], opacity: [0.6, 0.95, 0.6], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 w-[520px] h-[220px] rounded-full pointer-events-none z-[207]"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            border: "1px solid rgba(180,150,50,0.7)",
            boxShadow: "0 0 45px rgba(180,150,50,0.6), inset 0 0 30px rgba(180,180,180,0.45)",
          }}
          animate={{ rotate: [360, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 z-[213] pointer-events-none"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(42)].map((_, i) => (
            <motion.div
              key={`title-spark-ring-${i}`}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-amber-500' : 'bg-gray-300'}`}
              style={{
                width: `${1.6 + (i % 2) * 1.8}px`,
                height: `${1.6 + (i % 2) * 1.8}px`,
                transform: `rotate(${i * 8.57}deg) translateX(${185 + (i % 5) * 16}px)`,
                boxShadow: i % 2 === 0 ? "0 0 18px rgba(180,150,50,0.95)" : "0 0 18px rgba(180,180,180,0.95)",
              }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.7, 0.7] }}
              transition={{ duration: 1.2 + (i % 4) * 0.45, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest"
          style={{ fontFamily: "'Cinzel', serif" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL DOWN
        </motion.div>
      </div>

      {/* 分类页面 */}
      {categories.map((cat, catIndex) => {
        const isActive = currentCategoryIndex === catIndex;

        return (
          <div
            key={cat.key}
            className="relative h-screen w-full bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-x-0 top-[15%] flex justify-center z-[50] pointer-events-none"
            >
              <h1
                className="text-[72px] md:text-[96px] xl:text-[110px]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#ffffff",
                  textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)"
                }}
              >
                {cat.title}
              </h1>
            </motion.div>

            {/* 不规则分布的图片 */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {cat.items.map((ring, index) => {
                const pos = scatteredPositions[index % scatteredPositions.length];
                const palette = getCategoryPalette(ring.category);

                return (
                  <motion.div
                    key={ring.id}
                    className="absolute cursor-pointer"
                    style={{
                      transform: `translate(${pos.x - 70}px, ${pos.y - 70}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onMouseEnter={() => setHoveredRing(ring.id)}
                    onMouseLeave={() => setHoveredRing(null)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                      className={`relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 ${palette.border} shadow-2xl ${palette.shadow}`}
                    >
                      <img
                        src={ring.imageUrl}
                        alt={ring.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {hoveredRing === ring.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 rounded-xl bg-black/90 border border-white/30 backdrop-blur-md"
                        style={{ zIndex: 100 }}
                      >
                        <h3
                          className="text-white text-lg font-bold mb-2 text-center"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {ring.title}
                        </h3>
                        <p
                          className="text-white/70 text-sm text-center mb-2"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {ring.description}
                        </p>
                        <div className="text-center">
                          <span className="text-white/50 text-xs tracking-widest uppercase">
                            {ring.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="h-[400vh]" />
    </div>
  );
}
