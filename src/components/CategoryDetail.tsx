import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { Category, MenuItem } from '../types/menu';
import { Footer } from './Footer';

interface CategoryDetailProps {
  category: Category;
  allCategories: Category[];
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenSearch: () => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({
  category,
  allCategories,
  onBack,
  onSelectCategory,
  onSelectItem,
  onOpenSearch,
}) => {
  const [activeSubCategory, setActiveSubCategory] = useState<string>('');

  // Update default subcategory when category changes
  useEffect(() => {
    if (category.subCategories && category.subCategories.length > 0) {
      setActiveSubCategory(category.subCategories[0].id);
    } else {
      setActiveSubCategory('');
    }
  }, [category.id]);

  const handleSubCategoryClick = (subId: string) => {
    setActiveSubCategory(subId);
    const element = document.getElementById(`subcategory-${subId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Format price helper to highlight currency symbol like in screenshots
  const renderFormattedPrice = (priceStr: string) => {
    const cleanPrice = priceStr.replace('₺', '').trim();
    return (
      <span className="text-[#f5efe6] font-serif text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap">
        {cleanPrice} <span className="text-[#ff6b2b] text-xs font-bold font-sans ml-0.5">₺</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#110e0c] text-[#e2d8c3] relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#110e0c]/95 backdrop-blur-md px-4 py-3 border-b border-[#2d241e] flex items-center justify-between max-w-md mx-auto">
        {/* Left: Small Circular Logo Badge */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/30 shadow-md shrink-0">
          <img
            src="/hookahlab-official-logo.webp"
            alt="HookahLab Lounge"
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Right: Search Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Menüde Ara"
          className="text-white/80 hover:text-white p-1.5 transition-colors cursor-pointer"
        >
          <Search size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3 max-w-md mx-auto">
        {/* Back Link Button: ← TÜM KATEGORİLER */}
        <button
          onClick={onBack}
          className="text-[#a89880] hover:text-[#c8a165] flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors py-1 mb-4"
        >
          <span className="text-xs font-semibold">←</span> TÜM KATEGORİLER
        </button>

        {/* Category Header Information */}
        <div className="mb-4">
          <span className="text-[#ff6b2b] text-[11px] font-bold tracking-[0.25em] uppercase block mb-1">
            {category.subtitle}
          </span>
          <h1 className="text-[#f5efe6] font-serif text-4xl sm:text-5xl font-normal tracking-tight mb-2">
            {category.title}
          </h1>
          <span className="text-[#8c8273] text-[11px] font-medium tracking-[0.2em] uppercase block">
            {category.itemCount}
          </span>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-[#2d241e] my-5" />

        {/* Category Banner Image Card (Spacious & Taller height) */}
        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#3a312a] my-7 shadow-2xl transition-all">
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-[#ff6b2b] font-bold text-[11px] tracking-[0.25em] uppercase bg-[#181310]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#ff6b2b]/35 shadow-lg">
              {category.title}
            </span>
          </div>
        </div>

        {/* Subcategories Filter Pills Box */}
        {category.subCategories && category.subCategories.length > 0 && (
          <div className="bg-[#181310] border border-[#2d241e] rounded-2xl p-2.5 flex items-center gap-2.5 overflow-x-auto custom-scrollbar mb-8 shadow-inner">
            {category.subCategories.map((sub) => {
              const isActive = activeSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubCategoryClick(sub.id)}
                  className={`px-4.5 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-full shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#241c17] text-[#c8a165] border border-[#c8a165]/50 shadow-md'
                      : 'bg-transparent text-[#8c8273] border border-[#2d241e] hover:text-[#e2d8c3]'
                  }`}
                >
                  {sub.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Product Items Grouped by Subcategory */}
        {category.subCategories && category.subCategories.length > 0 ? (
          category.subCategories.map((sub) => {
            const subItems = category.items.filter(
              (item) => item.subCategory === sub.id
            );
            // If no item explicitly matches subcategory, fallback to showing items
            const displayItems = subItems.length > 0 ? subItems : category.items;

            return (
              <div key={sub.id} id={`subcategory-${sub.id}`} className="mb-8 scroll-mt-20">
                {/* Subcategory Section Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#2d241e] mb-4">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#c8a165] tracking-wide uppercase">
                    {sub.title}
                  </h2>
                  <span className="text-[#8c8273] text-[10px] font-semibold tracking-[0.2em]">
                    {sub.itemCount}
                  </span>
                </div>

                {/* Product List */}
                <div className="divide-y divide-[#2d241e]/80">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className="flex items-center gap-3.5 py-4 px-1 cursor-pointer transition-colors duration-200 group hover:bg-[#181310]/50 rounded-lg"
                    >
                      {/* Left Thumbnail */}
                      <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden bg-black/60 border border-[#3a312a]/60 shrink-0 relative shadow-md">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Middle Details */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h3 className="text-[#f5efe6] font-serif text-sm sm:text-base font-bold tracking-wide uppercase group-hover:text-[#f3e5ab] transition-colors leading-tight mb-1">
                          {item.name}
                        </h3>
                        {item.desc && (
                          <p className="text-[#998e80] text-[11px] font-sans leading-relaxed line-clamp-2 font-normal">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {/* Right Price - Large & Vertically Centered */}
                      <div className="shrink-0 text-right pl-2 self-center">
                        {renderFormattedPrice(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          /* Fallback single product list if no subcategories exist */
          <div className="divide-y divide-[#2d241e]/80 mb-8">
            {category.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex items-center gap-3.5 py-4 px-1 cursor-pointer transition-colors duration-200 group hover:bg-[#181310]/50 rounded-lg"
              >
                <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden bg-black/60 border border-[#3a312a]/60 shrink-0 relative shadow-md">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-[#f5efe6] font-serif text-sm sm:text-base font-bold tracking-wide uppercase group-hover:text-[#f3e5ab] transition-colors leading-tight mb-1">
                    {item.name}
                  </h3>
                  {item.desc && (
                    <p className="text-[#998e80] text-[11px] font-sans leading-relaxed line-clamp-2 font-normal">
                      {item.desc}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right pl-2 self-center">
                  {renderFormattedPrice(item.price)}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Bottom Categories Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#16110e]/95 backdrop-blur-md border border-[#3a312a] rounded-full p-1.5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shadow-2xl">
        {allCategories.map((cat) => {
          const isCurrent = cat.id === category.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold tracking-wide rounded-full shrink-0 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#ff6b2b] text-white shadow-lg scale-[1.02]'
                  : 'bg-transparent text-[#998e80] hover:text-[#e2d8c3] font-medium'
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
