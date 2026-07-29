import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  onOpenSearch: () => void;
  onReplayIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        maxWidth: '448px',
        margin: '0 auto',
        zIndex: 40,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(14,11,9,0.85) 0%, transparent 100%)',
        borderBottom: '1px solid transparent',
      }}
    >
      {/* Left: small circular logo — white background like screenshot */}
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          border: '2px solid rgba(17,14,12,0.8)',
          flexShrink: 0,
        }}
      >
        <img
          src="/hookahlab-official-logo.webp"
          alt="HookahLab"
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
        />
      </div>

      {/* Right: search icon only — like screenshot */}
      <button
        onClick={onOpenSearch}
        aria-label="Menüde Ara"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          color: 'rgba(255,255,255,0.80)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Search size={22} strokeWidth={1.5} />
      </button>
    </header>
  );
};
