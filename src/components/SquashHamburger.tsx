import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  isMobile?: boolean;
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 20 };

export default function SquashHamburger({ isOpen, isMobile = false }: SquashHamburgerProps) {
  const width = isMobile ? 15 : 18;
  const height = isMobile ? 10 : 12;
  const barHeight = isMobile ? 1.2 : 1.5;

  return (
    <div
      className="relative"
      style={{ width, height }}
    >
      <motion.span
        className="absolute left-0 right-0 rounded-full bg-white"
        style={{ height: barHeight, transformOrigin: 'center' }}
        animate={
          isOpen
            ? { top: '50%', y: '-50%', rotate: 45 }
            : { top: 0, y: 0, rotate: 0 }
        }
        transition={spring}
      />
      <motion.span
        className="absolute left-0 right-0 rounded-full bg-white"
        style={{ height: barHeight, top: '50%', transformOrigin: 'center' }}
        animate={
          isOpen
            ? { y: '-50%', opacity: 0, scaleX: 0 }
            : { y: '-50%', opacity: 1, scaleX: 1 }
        }
        transition={spring}
      />
      <motion.span
        className="absolute left-0 right-0 rounded-full bg-white"
        style={{ height: barHeight, transformOrigin: 'center' }}
        animate={
          isOpen
            ? { bottom: '50%', y: '50%', rotate: -45 }
            : { bottom: 0, y: 0, rotate: 0 }
        }
        transition={spring}
      />
    </div>
  );
}
