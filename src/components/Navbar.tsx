import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';
import SquashHamburger from './SquashHamburger';
import SynapseXLogo from './SynapseXLogo';

interface NavbarProps {
  entranceComplete: boolean;
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [exploreHovered, setExploreHovered] = useState(false);

  const scrollToSection = (section: 'about' | 'metrics') => {
    const offset =
      section === 'about' ? window.innerHeight : window.innerHeight * 2;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 h-20 w-full bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Desktop left group */}
        <div className="hidden items-center gap-2 sm:flex">
          <motion.div
            className={`flex h-12 items-center gap-2.5 rounded-[14px] bg-white/15 px-5 backdrop-blur-md ${
              menuOpen ? 'hidden md:flex' : 'flex'
            }`}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
          >
            <SynapseXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">MG Neon</span>
          </motion.div>

          <motion.div
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex shrink-0 items-center justify-center transition-colors ${
                menuOpen
                  ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-white/10 hover:bg-white/20'
                  : 'h-12 w-12 rounded-[14px]'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <SquashHamburger isOpen={menuOpen} />
            </button>

            {menuOpen && (
              <div className="flex items-center gap-6 pl-4 pr-5">
                {[
                  { label: 'About', section: 'about' as const },
                  { label: 'Metrics', section: 'metrics' as const },
                ].map((link) => (
                  <motion.button
                    key={link.label}
                    type="button"
                    onClick={() => scrollToSection(link.section)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[16px] font-normal text-white/85 hover:text-white"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScrambleText
                      text={link.label}
                      isHovered={hoveredLink === link.label}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Mobile left group */}
        <div className="flex flex-1 items-center gap-2 sm:hidden">
          <motion.div
            className="flex h-9 items-center gap-2 overflow-hidden rounded-[10px] bg-white/15 px-3 backdrop-blur-md"
            animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1, padding: menuOpen ? 0 : undefined }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <SynapseXLogo size={14} className="text-white" />
            <span className="whitespace-nowrap text-[13px] font-medium tracking-tight text-white">
              MG Neon
            </span>
          </motion.div>

          <motion.div
            className="flex h-9 items-center overflow-hidden rounded-[10px] bg-white/15 backdrop-blur-md"
            animate={{ width: menuOpen ? '100%' : 36 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex shrink-0 items-center justify-center ${
                menuOpen
                  ? 'ml-1 h-7 w-7 rounded-[8px] bg-white/10'
                  : 'h-9 w-9 rounded-[10px]'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <SquashHamburger isOpen={menuOpen} isMobile />
            </button>

            {menuOpen && (
              <div className="flex flex-1 items-center justify-around px-3">
                {[
                  { label: 'About', section: 'about' as const },
                  { label: 'Metrics', section: 'metrics' as const },
                ].map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => scrollToSection(link.section)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[13px] font-normal text-white/85 hover:text-white"
                  >
                    <ScrambleText
                      text={link.label}
                      isHovered={hoveredLink === link.label}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Explore button */}
        <motion.button
          type="button"
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 text-black sm:h-12 sm:gap-2 sm:px-6"
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setExploreHovered(true)}
          onMouseLeave={() => setExploreHovered(false)}
        >
          <span className="text-[13px] sm:text-[16px]">
            <ScrambleText text="Explore" isHovered={exploreHovered} />
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
