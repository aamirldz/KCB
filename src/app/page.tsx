import { Hero, SignatureDishes, PopularBowls, DiningExperience, CTASection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Spacer between Hero and Signature Dishes */}
      <div className="h-32 md:h-48 lg:h-56 bg-gradient-to-b from-black to-charcoal flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
      </div>
      <SignatureDishes />
      {/* Spacer between Signature Dishes and Customer Favorites */}
      <div className="h-32 md:h-48 lg:h-56 bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
      <PopularBowls />
      {/* Spacer between Customer Favorites and Dining Experience */}
      <div className="h-32 md:h-48 lg:h-56 bg-gradient-to-b from-black to-charcoal flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
      </div>
      <DiningExperience />
      {/* Spacer between Dining Experience and CTA Section */}
      <div className="h-32 md:h-48 lg:h-56 bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
      <CTASection />
    </>
  );
}
