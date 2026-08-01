import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../types/menu';
import { resolveMediaUrl } from '../api/menuApi';

interface CategoryCardProps {
  category: Category;
  onSelect: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    /* Outer wrapper — provides margin from screen edges & outer border */
    <div
      onClick={() => onSelect(category.id)}
      className="group"
      style={{
        margin: '12px 12px',
        /* Outer border */
        border: '1px solid rgba(200,161,101,0.35)',
        cursor: 'pointer',
        position: 'relative',
        background: 'linear-gradient(135deg, #1a140e 0%, #150f09 50%, #1a140e 100%)',
      }}
    >
      {/* Inner border — inset 4px from outer */}
      <div
        style={{
          position: 'absolute',
          inset: '5px',
          border: '1px solid rgba(200,161,101,0.18)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Card inner content — padded from the inner border */}
      <div style={{ padding: '16px 14px 18px 14px', position: 'relative', zIndex: 2 }}>

        {/* Top-right HOOKAHLAB watermark */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'rgba(180,145,88,0.55)',
            fontSize: '9px',
            letterSpacing: '0.28em',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            textTransform: 'uppercase',
            zIndex: 3,
          }}
        >
          HOOKAHLAB
        </div>

        {/* Left number — vertically centered on the circle area */}
        <div
          style={{
            position: 'absolute',
            left: 14,
            top: '44%',
            transform: 'translateY(-50%)',
            color: '#c8a165',
            fontSize: '17px',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: 1,
            zIndex: 3,
          }}
        >
          {category.num}
        </div>

        {/* Circular image */}
        <div
          style={{
            width: '82%',
            aspectRatio: '1 / 1',
            margin: '8px auto 18px auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid rgba(200,161,101,0.30)',
            position: 'relative',
            boxShadow: '0 4px 32px rgba(0,0,0,0.55)',
          }}
        >
          <img
            src={resolveMediaUrl(category.img)}
            alt={category.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.88,
              transition: 'transform 0.7s ease, opacity 0.4s ease',
            }}
            className="group-hover:scale-105 group-hover:opacity-100"
          />
          {/* Inner radial vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(17,14,12,0.45) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Bottom text block */}
        <div style={{ paddingLeft: '2px' }}>
          {/* Subtitle */}
          <div
            style={{
              color: '#b8975a',
              fontSize: '10px',
              letterSpacing: '0.22em',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            {category.subtitle}
          </div>

          {/* Title row with arrow */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h3
                style={{
                  color: '#e8dcc8',
                  fontSize: '32px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                  margin: 0,
                  transition: 'color 0.3s',
                }}
                className="group-hover:text-[#f3e5ab]"
              >
                {category.title}
              </h3>
              <div
                style={{
                  color: '#8c7a66',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'uppercase',
                  marginTop: '5px',
                }}
              >
                {category.itemCount}
              </div>
            </div>

            {/* Arrow icon */}
            <div
              style={{
                color: '#c8a165',
                marginBottom: '4px',
                transition: 'transform 0.3s',
              }}
              className="group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <ArrowUpRight size={18} strokeWidth={2} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
