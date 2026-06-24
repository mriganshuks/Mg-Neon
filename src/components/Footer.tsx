import SynapseXLogo from './SynapseXLogo';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-black">
      <div className="flex min-h-[400px] flex-col md:flex-row">
        <div className="relative h-[300px] w-full md:h-auto md:w-1/2">
          <video
            src={VIDEO_URL}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
          <div>
            <div className="mb-8 flex items-center gap-2.5">
              <SynapseXLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium tracking-tight text-white/70">
                SynapseX
              </span>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
              The next evolution of human-machine interaction. Built for those who refuse to
              be limited by biology alone.
            </p>
          </div>

          <p className="mt-12 text-[12px] text-white/25">
            (c) 2026 SynapseX Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
