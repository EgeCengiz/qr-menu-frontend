import { useState, useEffect } from 'react';
import { fetchCategories } from './api/menuApi';
import type { MenuItem, Category } from './types/menu';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCard } from './components/CategoryCard';
import { CategoryDetail } from './components/CategoryDetail';
import { ItemDetailModal } from './components/ItemDetailModal';
import { SearchModal } from './components/SearchModal';
import { CategoryTransitionOverlay } from './components/CategoryTransitionOverlay';
import { Footer } from './components/Footer';

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [transitionCategory, setTransitionCategory] = useState<Category | null>(null);

  // ── API Data State ─────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadMenu = async () => {
    setIsLoadingCategories(true);
    setLoadError(null);
    try {
      const data = await fetchCategories();
      const mapped: Category[] = data.map((cat) => ({
        ...cat,
        subCategories: cat.subCategories?.map((sub) => ({
          id: sub.shortId ?? sub.id,
          title: sub.title,
          itemCount: sub.itemCount,
        })),
        items: cat.items.map((item) => ({
          ...item,
          subCategory: item.subCategory,
        })),
      }));
      setCategories(mapped);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Menü yüklenemedi';
      setLoadError(msg);
      console.error('Failed to load menu:', err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Fetch categories from backend on mount
  useEffect(() => {
    void loadMenu();
  }, []);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modals or transition overlay or welcome screen is active
  useEffect(() => {
    if (selectedItem || isSearchOpen || showWelcome || transitionCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem, isSearchOpen, showWelcome, transitionCategory]);

  /** Called when a CategoryCard is tapped on Homepage */
  const handleCategorySelect = (id: string) => {
    const cat = categories.find((c) => c.id === id) || null;
    if (cat) {
      setTransitionCategory(cat);
    }
  };

  const handleTransitionCovered = () => {
    if (transitionCategory) {
      setSelectedCategory(transitionCategory.id);
      window.scrollTo(0, 0);
    }
  };

  const handleTransitionComplete = () => {
    setTransitionCategory(null);
  };

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || null;

  return (
    <div className="min-h-screen bg-[#110e0c] font-sans text-[#e2d8c3] selection:bg-[#c8a165]/30">
      {/* 3-4 Second Welcome Video / Intro Splash Screen */}
      {showWelcome && (
        <WelcomeScreen onFinish={() => setShowWelcome(false)} />
      )}

      {/* Main Container Mobile App Layout */}
      <div className="max-w-md mx-auto bg-[#110e0c] min-h-screen relative shadow-2xl overflow-hidden border-x border-[#c8a165]/10 bg-waves">
        
        {/* Render CategoryDetail page if a category is selected */}
        {activeCategoryObj ? (
          <CategoryDetail
            category={activeCategoryObj}
            allCategories={categories}
            onBack={() => setSelectedCategory(null)}
            onSelectCategory={handleCategoryChange}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        ) : (
          /* Homepage View (Hero + Categories List) */
          <>
            {/* Sticky Header */}
            <Header
              scrolled={scrolled}
              onOpenSearch={() => setIsSearchOpen(true)}
              onReplayIntro={() => setShowWelcome(true)}
            />

            {/* Hero Section */}
            <HeroSection />

            {/* Categories Section */}
            <section
              style={{
                padding: '0 0 80px 0',
                position: 'relative',
                zIndex: 10,
                background: '#110e0c',
              }}
            >
              {/* KATEGORİLER header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px 13px 16px',
                  borderBottom: '1px solid rgba(200,161,101,0.18)',
                }}
              >
                <span
                  style={{
                    color: '#d0c5b5',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'uppercase',
                  }}
                >
                  KATEGORİLER
                </span>
                <span
                  style={{
                    color: '#c8a165',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'uppercase',
                  }}
                >
                  {isLoadingCategories
                    ? '...'
                    : `${categories.length < 10 ? `0${categories.length}` : categories.length} SEÇKİ`}
                </span>
              </div>

              {/* Loading State */}
              {isLoadingCategories && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 16px',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '2px solid rgba(200,161,101,0.3)',
                      borderTop: '2px solid #c8a165',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <span style={{ color: '#a0907a', fontSize: '12px', letterSpacing: '0.1em' }}>
                    MENÜ YÜKLENİYOR...
                  </span>
                </div>
              )}

              {/* Error State */}
              {loadError && !isLoadingCategories && (
                <div
                  style={{
                    margin: '16px',
                    padding: '20px 16px',
                    background: 'rgba(127,0,0,0.2)',
                    border: '1px solid rgba(200,50,50,0.3)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <p style={{ color: '#fca5a5', fontSize: '13px', margin: 0 }}>
                    ⚠️ {loadError}
                  </p>
                  <p style={{ color: '#a0907a', fontSize: '11px', margin: 0 }}>
                    Backend sunucusunun çalıştığından emin olun.
                  </p>
                  <button
                    onClick={() => void loadMenu()}
                    style={{
                      marginTop: '4px',
                      padding: '6px 16px',
                      background: '#c8a165',
                      color: '#110e0c',
                      fontWeight: 600,
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Yeniden Dene
                  </button>
                </div>
              )}

              {/* Category Cards */}
              {!isLoadingCategories && !loadError && (
                <div style={{ paddingTop: '4px' }}>
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onSelect={handleCategorySelect}
                    />
                  ))}
                </div>
              )}

              {/* Footer */}
              <Footer />
            </section>
          </>
        )}

        {/* Category Transition Overlay */}
        {transitionCategory && (
          <CategoryTransitionOverlay
            category={transitionCategory}
            onCovered={handleTransitionCovered}
            onTransitionComplete={handleTransitionComplete}
          />
        )}

        {/* Item Detail & Search Modals */}
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          categories={categories}
          onSelectItem={(item) => setSelectedItem(item)}
        />
      </div>
    </div>
  );
}
