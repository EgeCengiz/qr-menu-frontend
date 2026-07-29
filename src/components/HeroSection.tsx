import React from 'react';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        height: '85vh',
        minHeight: '85vh',
        boxSizing: 'border-box',
        paddingTop: '74px',
        paddingBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0e0b09 0%, #110e0c 60%, #150f0b 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Top: RİZE · ÇARŞI badge */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '2px',
            background: '#c0392b',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: '#c8a165',
            fontSize: '10px',
            letterSpacing: '0.22em',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          RİZE · ÇARŞI
        </span>
      </div>

      {/* Middle: Logo & Description (Vertically Centered) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
          padding: '10px 16px',
        }}
      >
        {/* Large circular logo */}
        <div
          style={{
            position: 'relative',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Outer glow rings */}
          <div
            style={{
              position: 'absolute',
              width: '290px',
              height: '290px',
              borderRadius: '50%',
              border: '1px solid rgba(200,161,101,0.08)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              border: '1px solid rgba(200,161,101,0.05)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          {/* White circular logo container */}
          <div
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 50px rgba(0,0,0,0.65)',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            <img
              src="/hookahlab-official-logo.webp"
              alt="HookahLab Logo"
              style={{
                width: '210px',
                height: '210px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Description text */}
        <p
          style={{
            color: '#c8b99a',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Montserrat, sans-serif',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: '270px',
            margin: '0 auto',
          }}
        >
          Kahvaltıdan geceye; mutfak, kahve, tatlı ve imza nargile harmanları.
        </p>
      </div>

      {/* Bottom: MENÜYÜ KEŞFET bar & scroll indicator */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '32px',
              background: '#c8a165',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: '#c8a165',
              fontSize: '11px',
              letterSpacing: '0.22em',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              paddingLeft: '14px',
            }}
          >
            MENÜYÜ KEŞFET
          </span>
        </div>

        <div
          className="animate-bounce"
          style={{
            color: 'rgba(200,161,101,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
};
