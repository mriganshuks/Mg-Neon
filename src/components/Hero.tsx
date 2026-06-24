import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSeekRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);
  const lastMouseXRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const processSeekQueue = () => {
      const v = videoRef.current;
      if (!v || pendingSeekRef.current === null) {
        isSeekingRef.current = false;
        return;
      }

      isSeekingRef.current = true;
      const target = pendingSeekRef.current;
      pendingSeekRef.current = null;
      v.currentTime = Math.max(0, Math.min(target, v.duration || target));
    };

    const onSeeked = () => {
      if (pendingSeekRef.current !== null) {
        processSeekQueue();
      } else {
        isSeekingRef.current = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const v = videoRef.current;
      if (!v || !v.duration) return;

      if (lastMouseXRef.current === null) {
        lastMouseXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;

      const deltaTime = (deltaX / window.innerWidth) * v.duration * 0.8;
      const newTime = v.currentTime + deltaTime;

      if (isSeekingRef.current) {
        pendingSeekRef.current = newTime;
      } else {
        isSeekingRef.current = true;
        v.currentTime = Math.max(0, Math.min(newTime, v.duration));
      }
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 select-none uppercase"
        style={{
          marginTop: '50px',
          fontFamily: '"Anton SC", sans-serif',
          fontSize: 'clamp(120px, 30vw, 521px)',
          letterSpacing: '-4px',
          opacity: 0.1,
          background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        TRANSCENDENCE
      </div>

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ opacity: 0, y: 25 }}
              animate={
                entranceComplete
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 25 }
              }
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              Built at the intersection of neuroscience and artificial intelligence.
              SynapseX continuously maps neural pathways, cognitive load, and physiological
              states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
