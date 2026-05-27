import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "首页" },
    { path: "/style", label: "风格" },
    { path: "/material", label: "材质" },
    { path: "/history", label: "历史" },
    { path: "/symbols", label: "意义" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {isHomePage ? (
            <div className="w-20" /> // 占位，保持右侧菜单对齐
          ) : (
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}

          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-serif text-[18px] italic text-white"
            >
              Ring Museum <span className="block font-mono text-[11px] tracking-[0.3em] text-[#888] italic-normal mt-1">戒指博物馆</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className="relative text-sm tracking-wider uppercase"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className={
                        location.pathname === item.path
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }
                    >
                      {item.label}
                    </span>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-2 left-0 right-0 h-px bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-6 pb-4"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`py-3 text-sm tracking-wider uppercase ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-neutral-400"
                  }`}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}