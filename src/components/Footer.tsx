import React, { useEffect, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { fetchSettings, type StoreSettingsApi } from '../api/menuApi';

const DEFAULT_SETTINGS: StoreSettingsApi = {
  storeName: 'HOOKAHLAB RİZE',
  title: 'Bize uğrayın.',
  addressLine1: 'Çarşı Mahallesi, TOKİ AVM',
  addressLine2: 'Merkez / Rize',
  workingHours: 'Her gün 08:30 – 00:00',
  breakfastWeekdays: 'Hafta içi 08:30–15:00',
  breakfastWeekends: 'Hafta sonu 08:30–16:00',
  phone: '05513832509',
  phoneDisplay: '0 551 383 25 09',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=HookahLab+Rize+TOK%C4%B0+AVM',
  note: 'Resmî tatillerde çalışma saatleri değişebilir.',
};

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettingsApi>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetchSettings()
      .then((data) => {
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch((err) => {
        console.warn('Could not load store settings, using defaults:', err);
      });
  }, []);

  return (
    <footer
      style={{
        margin: '48px 16px 48px 16px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ef6b211f, #d8ad6806)',
        borderTop: '2px solid #f26522',
        border: '1px solid rgba(242,101,34,0.22)',
        borderTopWidth: '2px',
        borderRadius: '0',
        padding: '20px 20px 16px 20px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.35)',
      }}
    >
      {/* Watermark HL */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '-6px',
          fontSize: '110px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          color: 'rgba(242,101,34,0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
          letterSpacing: '-6px',
        }}
      >
        HL
      </div>

      {/* Top Label Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ width: '22px', height: '2px', background: '#f26522', flexShrink: 0 }} />
        <span
          style={{
            color: '#f0a060',
            fontSize: '10px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          {settings.storeName}
        </span>
      </div>

      {/* Main Title */}
      <h2
        style={{
          color: '#fff8ee',
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '28px',
          fontWeight: 400,
          letterSpacing: '-0.3px',
          margin: '0 0 6px 0',
          lineHeight: 1.15,
        }}
      >
        {settings.title}
      </h2>

      {/* Address */}
      <div
        style={{
          color: '#b0a090',
          fontSize: '12px',
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: 1.6,
          marginBottom: '14px',
        }}
      >
        <p style={{ margin: 0 }}>{settings.addressLine1}</p>
        {settings.addressLine2 && <p style={{ margin: 0 }}>{settings.addressLine2}</p>}
      </div>

      {/* Info Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '16px' }}>
        {/* ÇALIŞMA SAATLERİ */}
        {settings.workingHours && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(242,101,34,0.15)',
              padding: '10px 0',
            }}
          >
            <span
              style={{
                color: '#d08040',
                fontSize: '10px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              ÇALIŞMA SAATLERİ
            </span>
            <span
              style={{
                color: '#fff8ee',
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'right',
              }}
            >
              {settings.workingHours}
            </span>
          </div>
        )}

        {/* KAHVALTI SERVİSİ */}
        {(settings.breakfastWeekdays || settings.breakfastWeekends) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '8px',
              borderBottom: '1px solid rgba(242,101,34,0.15)',
              padding: '10px 0',
            }}
          >
            <span
              style={{
                color: '#d08040',
                fontSize: '10px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                flexShrink: 0,
                paddingTop: '2px',
              }}
            >
              KAHVALTI SERVİSİ
            </span>
            <div
              style={{
                color: '#fff8ee',
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'right',
                lineHeight: 1.55,
              }}
            >
              {settings.breakfastWeekdays && <p style={{ margin: 0 }}>{settings.breakfastWeekdays}</p>}
              {settings.breakfastWeekends && <p style={{ margin: 0 }}>{settings.breakfastWeekends}</p>}
            </div>
          </div>
        )}

        {/* REZERVASYON */}
        {(settings.phoneDisplay || settings.phone) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(242,101,34,0.15)',
              padding: '10px 0',
            }}
          >
            <span
              style={{
                color: '#d08040',
                fontSize: '10px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              REZERVASYON
            </span>
            <a
              href={`tel:${(settings.phone || '').replace(/\s+/g, '')}`}
              style={{
                color: '#fff8ee',
                fontFamily: "'Playfair Display', serif",
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              {settings.phoneDisplay || settings.phone}
            </a>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* YOL TARİFİ AL */}
        {settings.googleMapsUrl && (
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              width: '100%',
              padding: '12px 16px',
              background: '#f26522',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '0',
              border: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box',
              boxShadow: '0 3px 16px rgba(242,101,34,0.30)',
            }}
          >
            <MapPin size={14} strokeWidth={2.5} />
            <span>YOL TARİFİ AL</span>
          </a>
        )}

        {/* HEMEN ARA */}
        {settings.phone && (
          <a
            href={`tel:${(settings.phone || '').replace(/\s+/g, '')}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              color: '#e8d8c0',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '0',
              border: '1px solid rgba(242,101,34,0.40)',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <Phone size={13} strokeWidth={2.5} />
            <span>HEMEN ARA</span>
          </a>
        )}
      </div>

      {/* Disclaimer */}
      {settings.note && (
        <p
          style={{
            color: '#6a5c4e',
            fontSize: '10px',
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '14px',
            marginBottom: 0,
            lineHeight: 1.5,
          }}
        >
          {settings.note}
        </p>
      )}
    </footer>
  );
};

