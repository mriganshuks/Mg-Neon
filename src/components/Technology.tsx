import { motion } from 'framer-motion';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const FEATURES = [
  {
    title: 'Premium Design',
    description: 'Beautiful interfaces crafted for modern audiences.',
  },
  {
    title: 'Interactive Motion',
    description: 'Fluid animations that transform browsing into an experience.',
  },
  {
    title: 'Performance Focus',
    description: 'Fast, optimized experiences built for every screen and device.',
  },
  {
    title: 'Custom Development',
    description: 'Tailored solutions built around unique brands and ideas.',
  },
];

export default function Technology() {
  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        src={VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-10 flex h-full flex-col px-8 py-12 sm:px-12 sm:py-16 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.h2
            className="text-[clamp(36px,8vw,72px)] font-light leading-[0.95] tracking-[-0.03em] text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Digital
            <br />
            Excellence
          </motion.h2>

          <motion.p
            className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:pt-2 md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Every detail is crafted to balance aesthetics, performance, and usability. The
            result is a digital experience that feels effortless while delivering maximum
            impact.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
            >
              <h3 className="mb-2 text-[14px] font-normal text-white sm:text-[16px]">
                {feature.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-white/40 sm:text-[14px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
