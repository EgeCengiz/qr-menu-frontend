import React from 'react';
import { X, ChevronLeft } from 'lucide-react';
import type { Category, MenuItem } from '../types/menu';

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onSelectItem }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#110e0c] modal-entering overflow-hidden max-w-md mx-auto shadow-2xl border-x border-[#c8a165]/10">
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 px-5 border-b border-[#c8a165]/20 bg-[#110e0c]/95 backdrop-blur-md z-10 relative">
        <button
          onClick={onClose}
          className="text-[#c8a165] flex items-center gap-1.5 font-medium tracking-wider text-xs uppercase hover:text-[#f3e5ab] transition-colors py-1 px-2.5 rounded-md bg-[#1a1512] border border-[#c8a165]/20"
        >
          <ChevronLeft className="w-4 h-4" /> Geri
        </button>
        <h2 className="text-[#e2d8c3] text-lg font-serif tracking-wide">{category.title}</h2>
        <div className="w-16 flex justify-end">
          <button
            onClick={onClose}
            className="text-[#8c8273] hover:text-[#e2d8c3] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Subtitle Banner */}
      <div className="bg-[#16120f] px-5 py-2.5 border-b border-[#c8a165]/10 flex items-center justify-between">
        <span className="text-[#8c8273] text-[10px] tracking-widest uppercase font-bold">
          {category.subtitle}
        </span>
        <span className="text-[#c8a165] text-[11px] font-medium tracking-wider">
          {category.items.length} Ürün
        </span>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-24 custom-scrollbar bg-waves">
        {category.items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="flex gap-4 p-3 bg-[#1a1512]/90 border border-[#c8a165]/15 rounded-lg cursor-pointer hover:border-[#c8a165]/50 hover:bg-[#201a16] transition-all duration-300 shadow-md group"
          >
            {/* Thumbnail */}
            <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden bg-black/60 border border-[#c8a165]/20 relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-[#e2d8c3] font-serif text-base leading-snug mb-1 group-hover:text-[#f3e5ab] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[#8c8273] text-xs line-clamp-2 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#c8a165]/10">
                <span className="text-[#c8a165] font-semibold text-sm tracking-wide">
                  {item.price}
                </span>
                <span className="text-[10px] text-[#8c8273] tracking-widest uppercase group-hover:text-[#c8a165] transition-colors">
                  Detay →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
