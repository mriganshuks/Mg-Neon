import { motion } from 'framer-motion';

const LAYERS = [
  { num: 'Layer 1', name: 'Capture' },
  { num: 'Layer 2', name: 'Process' },
  { num: 'Layer 3', name: 'Interface' },
];

export default function Architecture() {
  return (
    <section className="min-h-screen w-full bg-black">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">
            Architecture
          </p>
          <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-white">
            Three layers. Zero friction.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/45 sm:text-[17px]">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent.
            Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.num}
              className="flex h-[72px] w-full max-w-md items-center justify-between rounded-lg border border-white/10 px-6"
            >
              <span className="text-[12px] uppercase tracking-[0.15em] text-white/30">
                {layer.num}
              </span>
              <span className="text-[16px] font-light text-white sm:text-[18px]">
                {layer.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
