import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import type { MenuItem, Category } from '../types/menu';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  categories: Category[];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectItem, categories }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & clear query
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle ESC key press to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic requiring at least 2 characters ("EN AZ İKİ HARF YAZIN")
  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];

    const lowerQuery = trimmed.toLocaleLowerCase('tr-TR');
    const results: { item: MenuItem; categoryPath: string }[] = [];

    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        const itemNameTr = item.name.toLocaleLowerCase('tr-TR');
        const itemDescTr = item.desc.toLocaleLowerCase('tr-TR');

        if (itemNameTr.includes(lowerQuery) || itemDescTr.includes(lowerQuery)) {
          // Find subcategory title if available
          const subCatObj = cat.subCategories?.find((s) => s.id === item.subCategory);
          const subCatTitle = subCatObj ? subCatObj.title.toUpperCase() : '';
          const catTitle = cat.title.toUpperCase();

          const categoryPath = subCatTitle ? `${catTitle} · ${subCatTitle}` : catTitle;

          results.push({ item, categoryPath });
        }
      });
    });

    return results;
  }, [query, categories]);

  if (!isOpen) return null;

  const hasQuery = query.length > 0;
  const isMinLength = query.trim().length >= 2;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0b0908] max-w-md mx-auto shadow-2xl border-x border-[#c8a165]/10 animate-fade-in text-[#e2d8c3]">
      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 transition-colors z-20 cursor-pointer"
        aria-label="Kapat"
      >
        <X size={26} strokeWidth={2} />
      </button>

      {/* Main Search Header Section (Vertically centered when empty, glides to top when typing) */}
      <div
        className={`px-6 transition-all duration-500 ease-in-out shrink-0 ${
          hasQuery ? 'pt-14 pb-2' : 'pt-[28vh] pb-6'
        }`}
      >
        {/* Subtitle / Context Header */}
        <span className="text-[#8c8273] text-[11px] font-semibold tracking-[0.2em] uppercase block mb-3">
          HOOKAHLAB MENÜSÜNDE
        </span>

        {/* Input Field with Serif Typography */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ne aramıştınız?"
            className="w-full bg-transparent text-[#f3ebe1] placeholder-[#5c544c] text-3xl sm:text-4xl font-serif focus:outline-none py-1 tracking-tight"
          />
        </div>

        {/* Copper / Orange Accent Underline */}
        <div className="w-full h-[2px] bg-[#b86d29] mt-3" />
        {/* Dark divider line below accent bar */}
        <div className="w-full h-[1px] bg-[#1a1613] mt-1" />
      </div>

      {/* Results Container (Smoothly fades in & slides up when typing) */}
      <div
        className={`flex-1 overflow-y-auto px-6 custom-scrollbar transition-all duration-500 ease-in-out ${
          hasQuery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {!isMinLength ? null : searchResults.length === 0 ? (
          <div className="py-12 text-center text-[#8c8273]">
            <p className="font-serif text-lg text-[#d0c5b5]">
              "{query}" ile eşleşen lezzet bulunamadı.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#221c17]">
            {searchResults.map(({ item, categoryPath }) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="py-4 flex items-center justify-between cursor-pointer hover:bg-[#16120e]/60 transition-colors group"
              >
                {/* Left Side: Title & Subtitle */}
                <div className="flex-1 pr-4 min-w-0">
                  <h4 className="text-[#f3ebe1] font-serif font-bold text-base sm:text-lg tracking-wide uppercase group-hover:text-[#c8a165] transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-[#8c8273] text-[10px] tracking-[0.18em] uppercase font-sans mt-1">
                    {categoryPath}
                  </p>
                </div>

                {/* Right Side: Price */}
                <div className="shrink-0 text-right">
                  <span className="text-[#c8a165] font-serif text-base sm:text-lg font-medium whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Hint Footer */}
      <div className="px-6 py-5 text-[#8c8273] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase shrink-0">
        EN AZ İKİ HARF YAZIN · ESC İLE KAPATIN
      </div>
    </div>
  );
};
