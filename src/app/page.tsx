import { Hero, SignatureDishes, PopularBowls, DiningExperience, CTASection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ========== SECTION SPACER 1 ========== */}
      <div
        style={{
          width: '100%',
          minHeight: '120px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(185, 28, 28, 0.5)' }} />
      </div>

      <SignatureDishes />

      {/* ========== SECTION SPACER 2 - Between Signature Dishes & Customer Favorites ========== */}
      <div
        style={{
          width: '100%',
          minHeight: '160px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ width: '2px', height: '50px', backgroundColor: 'rgba(217, 119, 6, 0.5)' }} />
      </div>

      <PopularBowls />

      {/* ========== SECTION SPACER 3 - Between Customer Favorites & Dining Experience ========== */}
      <div
        style={{
          width: '100%',
          minHeight: '160px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ width: '2px', height: '50px', backgroundColor: 'rgba(185, 28, 28, 0.5)' }} />
      </div>

      <DiningExperience />

      {/* ========== SECTION SPACER 4 ========== */}
      <div
        style={{
          width: '100%',
          minHeight: '120px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(217, 119, 6, 0.5)' }} />
      </div>

      <CTASection />
    </>
  );
}
