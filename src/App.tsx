import { useState, useEffect } from 'react';
import { CATEGORIES } from './data/menuData';
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
  // transitionCategory holds the category being "entered" while the overlay plays
  const [transitionCategory, setTransitionCategory] = useState<Category | null>(null);

  // Track window scroll for sticky header effect
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

  /** Called when a CategoryCard is tapped on Homepage — start transition overlay while keeping Homepage behind it */
  const handleCategorySelect = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id) || null;
    if (cat) {
      setTransitionCategory(cat);
    }
  };

  /** Called when the overlay animation expands and covers the full screen (750ms) */
  const handleTransitionCovered = () => {
    if (transitionCategory) {
      setSelectedCategory(transitionCategory.id);
      window.scrollTo(0, 0);
    }
  };

  /** Called when the overlay finishes its closing animation */
  const handleTransitionComplete = () => {
    setTransitionCategory(null);
  };

  /** Change active category (e.g. from bottom navigation bar) */
  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || null;

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
            allCategories={CATEGORIES}
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

            {/* Hero Section (Rize Çarşı & Main Logo) */}
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
                  {CATEGORIES.length < 10 ? `0${CATEGORIES.length}` : CATEGORIES.length} SEÇKİ
                </span>
              </div>

              {/* Category Cards */}
              <div style={{ paddingTop: '4px' }}>
                {CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onSelect={handleCategorySelect}
                  />
                ))}
              </div>

              {/* Footer */}
              <Footer />
            </section>
          </>
        )}

        {/* Category Transition Overlay — plays on top of the background screen */}
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
          onSelectItem={(item) => setSelectedItem(item)}
        />
      </div>
    </div>
  );
}
