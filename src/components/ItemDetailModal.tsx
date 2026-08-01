import React from 'react';
import { X, Sparkles } from 'lucide-react';
import type { MenuItem } from '../types/menu';
import { resolveMediaUrl } from '../api/menuApi';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#110e0c] animate-slide-up max-w-md mx-auto shadow-2xl overflow-hidden border-x border-[#c8a165]/10">
      {/* Item Image Header with Gradient Overlay */}
      <div className="relative h-80 w-full bg-black shrink-0">
        <img
          src={resolveMediaUrl(item.img)}
          alt={item.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110e0c] via-[#110e0c]/30 to-transparent" />

        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg hover:bg-black/80 transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Floating Tag */}
        <div className="absolute top-5 left-5 px-3 py-1 bg-[#16120f]/80 backdrop-blur-md rounded-full border border-[#c8a165]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c8a165]" />
          <span className="text-[#c8a165] text-[10px] tracking-widest font-semibold uppercase">
            Özel Sunum
          </span>
        </div>
      </div>

      {/* Item Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar bg-waves">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#e2d8c3] mb-3 leading-tight">
            {item.name}
          </h2>
          <div className="w-12 h-[2px] bg-[#c8a165]/60 mb-5" />
          <p className="text-[#a09484] text-sm leading-relaxed tracking-wide font-sans mb-8">
            {item.desc}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="border-t border-[#c8a165]/20 pt-6 pb-6 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8c8273] text-[10px] uppercase tracking-widest font-semibold mb-1">
                Fiyat
              </p>
              <p className="text-[#c8a165] text-3xl font-serif font-bold tracking-tight">
                {item.price}
              </p>
            </div>

            <button
              onClick={onClose}
              className="py-3 px-6 rounded-lg bg-gradient-to-r from-[#8b5a2b] to-[#c8a165] text-[#110e0c] font-semibold text-xs tracking-widest uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
