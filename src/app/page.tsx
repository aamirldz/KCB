import { Hero, SignatureDishes, PopularBowls, DiningExperience, CTASection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Spacer between Hero and Signature Dishes */}
      <div className="py-16 md:py-24 lg:py-32 bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-0.5 bg-crimson/60 rounded-full" />
        <span className="text-crimson/40 text-xs tracking-[0.3em] uppercase">✦</span>
        <div className="w-24 h-0.5 bg-crimson/60 rounded-full" />
      </div>

      <SignatureDishes />

      {/* Spacer between Signature Dishes and Customer Favorites */}
      <div className="py-16 md:py-24 lg:py-32 bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-0.5 bg-gold/60 rounded-full" />
        <span className="text-gold/40 text-xs tracking-[0.3em] uppercase">✦</span>
        <div className="w-24 h-0.5 bg-gold/60 rounded-full" />
      </div>

      <PopularBowls />

      {/* Spacer between Customer Favorites and Dining Experience */}
      <div className="py-16 md:py-24 lg:py-32 bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-0.5 bg-crimson/60 rounded-full" />
        <span className="text-crimson/40 text-xs tracking-[0.3em] uppercase">✦</span>
        <div className="w-24 h-0.5 bg-crimson/60 rounded-full" />
      </div>

      <DiningExperience />

      {/* Spacer between Dining Experience and CTA Section */}
      <div className="py-16 md:py-24 lg:py-32 bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-24 h-0.5 bg-gold/60 rounded-full" />
        <span className="text-gold/40 text-xs tracking-[0.3em] uppercase">✦</span>
        <div className="w-24 h-0.5 bg-gold/60 rounded-full" />
      </div>

      <CTASection />
    </>
  );
}
