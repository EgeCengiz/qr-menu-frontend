import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      onFinish();
    }, 450);
  };

  useEffect(() => {
    // Total duration ~1.8s (1800ms) for a quick, snappy welcome
    const totalDuration = 1800;
    const intervalTime = 30;
    const increment = (intervalTime / totalDuration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    timerRef.current = setTimeout(() => {
      triggerFinish();
    }, totalDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onClick={triggerFinish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#0d0a08] transition-all duration-500 ease-out select-none cursor-pointer overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient lighting & subtle waves */}
      <div className="absolute inset-0 z-0 bg-waves opacity-60" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(200,161,101,0.12)_0%,transparent_70%)]" />

      {/* Top Header Tag */}
      <div className="relative z-10 pt-10 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8a165]/35 bg-[#16120f]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <Sparkles className="w-3.5 h-3.5 text-[#c8a165] animate-pulse" />
          <span className="text-[#c8a165] text-[10px] tracking-[0.28em] font-semibold uppercase">
            RİZE ÇARŞI · HOOKAHLAB
          </span>
        </div>
      </div>

      {/* Center Section: Animated Moving Rings & Unblurring Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto px-6 text-center">
        {/* Glow halo behind rings */}
        <div className="absolute w-72 h-72 bg-[#c8a165]/15 rounded-full filter blur-3xl animate-pulse-glow" />

        {/* Ring & Logo Outer Container */}
        <div className="relative w-52 h-52 flex items-center justify-center mb-8">
          
          {/* Ring Ripple 1 (Pulsing outwards) */}
          <div className="absolute inset-0 rounded-full border border-[#c8a165]/40 animate-ring-ripple-1" />
          
          {/* Ring Ripple 2 (Delayed pulse) */}
          <div className="absolute inset-0 rounded-full border border-[#c8a165]/30 animate-ring-ripple-2" />

          {/* Clockwise Dashed Gold Outer Ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#c8a165"
              strokeWidth="0.8"
              strokeDasharray="5 4"
              opacity="0.75"
            />
          </svg>

          {/* Counter-Clockwise Secondary Accent Ring with Orbit Dots */}
          <div className="absolute inset-3 rounded-full border border-[#c8a165]/20 animate-spin-reverse-slow flex items-center justify-center">
            <div className="absolute -top-1 w-2 h-2 rounded-full bg-[#c8a165] shadow-[0_0_8px_#c8a165]" />
            <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#c8a165] shadow-[0_0_8px_#c8a165]" />
            <div className="absolute -left-1 w-2 h-2 rounded-full bg-[#c8a165]/50" />
            <div className="absolute -right-1 w-2 h-2 rounded-full bg-[#c8a165]/50" />
          </div>

          {/* Logo Frame Container with Glassmorphism */}
          <div className="relative w-36 h-36 rounded-full border-2 border-[#c8a165]/60 bg-[#14100d]/95 backdrop-blur-xl p-3 flex items-center justify-center shadow-[0_0_40px_rgba(200,161,101,0.25)]">
            
            {/* The Logo Image with Unblur & Focus Animation */}
            <img
              src="/hookahlab-official-logo.webp"
              alt="HookahLab Logo"
              className="w-28 h-28 object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] animate-logo-unblur"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `<span class="text-[#c8a165] font-serif font-bold text-xl tracking-tight animate-logo-unblur">HookahLab</span>`;
                }
              }}
            />
          </div>
        </div>

        {/* Brand Text */}
        <h1 className="text-3xl font-serif font-bold text-[#e2d8c3] tracking-wide mb-2">
          HookahLab <span className="text-[#c8a165] italic font-normal">Lounge</span>
        </h1>
        <p className="text-[#a09484] text-xs max-w-[260px] leading-relaxed font-sans tracking-wider">
          Kahve, Lezzet & Özel Karışım Nargile
        </p>
      </div>

      {/* Bottom Section: Sleek Progress Bar & Fast Skip Callout */}
      <div className="relative z-10 w-full max-w-xs pb-10 px-6 flex flex-col items-center gap-3">
        {/* Animated Progress Line */}
        <div className="w-full bg-[#201814] h-1 rounded-full overflow-hidden border border-[#c8a165]/20 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#8b5a2b] via-[#c8a165] to-[#f3e5ab] transition-all duration-75 rounded-full shadow-[0_0_12px_#c8a165]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] tracking-widest text-[#c8a165]/80 uppercase font-medium pt-1">
          <span>MENÜYE GEÇİLİYOR</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
