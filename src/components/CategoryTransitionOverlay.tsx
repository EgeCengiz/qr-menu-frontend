import React, { useEffect, useRef, useState } from 'react';
import type { Category } from '../types/menu';
import { resolveMediaUrl } from '../api/menuApi';

interface CategoryTransitionOverlayProps {
  category: Category;
  onCovered?: () => void;
  onTransitionComplete: () => void;
}

/**
 * TV-turn-on overlay that plays when the user taps a category card.
 *
 * Sequence:
 *  0 ms   → overlay appears with tv-open animation (scaleY 0→1, 750 ms)
 *  750ms  → overlay covers full screen, triggers onCovered callback (switches page in background)
 *  850ms  → subtitle & main title fade in upward
 * 2800ms  → overlay slides up, revealing CategoryDetail underneath
 *
 * If category.videoUrl exists:
 *  - Full-screen video plays behind the text instead of the circular image
 */
export const CategoryTransitionOverlay: React.FC<CategoryTransitionOverlayProps> = ({
  category,
  onCovered,
  onTransitionComplete,
}) => {
  const [closing, setClosing] = useState(false);
  const coverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasVideo = !!(category.videoUrl && category.videoUrl.trim() !== '');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [category.videoUrl]);

  useEffect(() => {
    // At 750ms overlay has scaled to full screen height: trigger background page switch
    coverTimerRef.current = setTimeout(() => {
      if (onCovered) onCovered();
    }, 750);

    // After 3.0 s trigger the closing slide-up animation
    closeTimerRef.current = setTimeout(() => {
      setClosing(true);
    }, 3000);

    return () => {
      if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [onCovered]);

  // When closing animation ends, tell parent to remove overlay
  const handleAnimationEnd = () => {
    if (closing) {
      onTransitionComplete();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col justify-center items-center overflow-hidden max-w-md mx-auto ${
        closing ? 'tv-closing' : 'tv-open-animate'
      }`}
      onAnimationEnd={handleAnimationEnd}
      style={{ transformOrigin: 'center' }}
    >
      {/* ── Background: Video (if exists) or solid dark ── */}
      {hasVideo ? (
        <>
          {/* Full-screen video — fully opaque */}
          <video
            ref={videoRef}
            src={resolveMediaUrl(category.videoUrl!)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle golden glow */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(200,161,101,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </>
      ) : (
        <>
          {/* Original: solid dark background */}
          <div className="absolute inset-0 bg-[#0d0a08]" />
          {/* Subtle golden radial glow behind the text */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(200,161,101,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* ── Center content ── */}

      {/* Video modunda küçük resim yok */}

      {/* No-video mode: large circular category thumbnail */}
      {!hasVideo && (
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid rgba(200,161,101,0.40)',
            boxShadow: '0 0 60px rgba(200,161,101,0.18)',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1,
            opacity: closing ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        >
          <img
            src={category.img}
            alt={category.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          {/* vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(13,10,8,0.55) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* Text block — only shown when no video */}
      {!hasVideo && (
        <div className="relative z-10 text-center px-8">
          {/* Subtitle */}
          <p
            className="text-fade-up-1"
            style={{
              color: '#c8a165',
              fontSize: '11px',
              letterSpacing: '0.28em',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            {category.subtitle}
          </p>

          {/* Main title */}
          <h2
            className="text-fade-up-2"
            style={{
              color: '#e8dcc8',
              fontSize: '48px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            {category.title}
          </h2>
        </div>
      )}

      {/* Thin golden horizontal rule — only shown when no video */}
      {!hasVideo && (
        <div
          className="text-fade-up-2"
          style={{
            marginTop: '28px',
            width: '48px',
            height: '1px',
            background: 'rgba(200,161,101,0.50)',
            position: 'relative',
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};
