import { Hero, SignatureDishes, PopularBowls, DiningExperience, CTASection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Spacer between Hero and Signature Dishes */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-black to-charcoal" />
      <SignatureDishes />
      {/* Spacer between Signature Dishes and Customer Favorites */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-charcoal to-black" />
      <PopularBowls />
      {/* Spacer between Customer Favorites and Dining Experience */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-black to-charcoal" />
      <DiningExperience />
      <CTASection />
    </>
  );
}
