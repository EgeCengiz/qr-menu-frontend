import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { fetchWelcome, resolveMediaUrl } from '../api/menuApi';

interface WelcomeData {
  videoUrl: string | null;
  posterImg: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
}

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(3000); // ms (3 seconds)
  const [videoReady, setVideoReady] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch welcome data from API
  useEffect(() => {
    fetchWelcome()
      .then((data) => {
        const sec = data && Number(data.durationSeconds) > 0 ? Number(data.durationSeconds) : 4;
        setWelcomeData(data);
        setVideoDuration(sec * 1000);
      })
      .catch(() => {
        // Use defaults if API fails
        setWelcomeData({
          videoUrl: null,
          posterImg: '',
          title: 'HookahLab Lounge',
          subtitle: 'Kahve, Lezzet & Özel Karışım Nargile',
          durationSeconds: 4,
        });
        setVideoDuration(4000);
      });
  }, []);

  // Safety fallback: if video hasn't loaded within 1.2s, force videoReady = true
  useEffect(() => {
    if (welcomeData === null) return;
    const hasVid = !!(welcomeData.videoUrl && welcomeData.videoUrl.trim() !== '');

    if (hasVid) {
      fallbackRef.current = setTimeout(() => {
        setVideoReady(true);
      }, 1200);
    } else {
      setVideoReady(true);
    }

    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, [welcomeData]);

  // Attempt programmatically playing the video on mount/ready (for mobile Safari/Chrome)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors on low-power mode or restricted policies
      });
    }
  }, [welcomeData, videoReady]);

  const triggerFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    setTimeout(() => {
      onFinish();
    }, 500);
  };

  // Start progress & auto-finish timer once video is ready or fallback triggered
  useEffect(() => {
    if (welcomeData === null || !videoReady) return;

    const totalDuration = videoDuration;
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
  }, [welcomeData, videoDuration, videoReady]);

  const hasVideo = welcomeData?.videoUrl && welcomeData.videoUrl.trim() !== '';

  return (
    <div
      onClick={triggerFinish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-end bg-black transition-all duration-500 ease-out select-none cursor-pointer overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── Full-screen video or fallback dark bg ── */}
      {hasVideo ? (
        <video
          ref={videoRef}
          src={resolveMediaUrl(welcomeData!.videoUrl!)}
          poster={resolveMediaUrl(welcomeData?.posterImg) || undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
          onStalled={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : welcomeData?.posterImg ? (
        <img
          src={resolveMediaUrl(welcomeData.posterImg)}
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Default dark animated background when no video/poster */
        <>
          <div className="absolute inset-0 bg-[#0d0a08]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,161,101,0.12)_0%,transparent_70%)]" />
        </>
      )}

      {/* ── Gradient overlay (bottom fade for readability) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />

      {/* ── Bottom Section: text + progress bar ── */}
      <div className="relative z-10 w-full px-6 pb-12 flex flex-col items-center gap-3">
        {/* Brand text */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide drop-shadow-lg">
            {welcomeData?.title || 'HookahLab Lounge'}
          </h1>
          <p className="text-[#e2d8c3]/80 text-xs max-w-[260px] leading-relaxed font-sans tracking-wider mt-1 drop-shadow">
            {welcomeData?.subtitle || 'Kahve, Lezzet & Özel Karışım Nargile'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="w-full bg-white/20 h-[3px] rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-[#8b5a2b] via-[#c8a165] to-[#f3e5ab] transition-all duration-75 rounded-full shadow-[0_0_10px_#c8a165]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Skip hint */}
        <div className="flex items-center gap-1.5 text-[11px] tracking-widest text-white/60 uppercase font-medium">
          <span>MENÜYE GEÇİLİYOR</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
