import { Hero, SignatureDishes, PopularBowls, DiningExperience, CTASection } from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Structural Spacer 1 */}
      <div className="w-full h-32 md:h-48 bg-black flex items-center justify-center border-t border-b border-white/5">
        <div className="w-1 h-8 bg-crimson/50" />
      </div>

      <SignatureDishes />

      {/* Structural Spacer 2 */}
      <div className="w-full h-32 md:h-48 bg-black flex items-center justify-center border-t border-b border-white/5">
        <div className="w-1 h-8 bg-gold/50" />
      </div>

      <PopularBowls />

      {/* Structural Spacer 3 */}
      <div className="w-full h-32 md:h-48 bg-black flex items-center justify-center border-t border-b border-white/5">
        <div className="w-1 h-8 bg-crimson/50" />
      </div>

      <DiningExperience />

      {/* Structural Spacer 4 */}
      <div className="w-full h-32 md:h-48 bg-black flex items-center justify-center border-t border-b border-white/5">
        <div className="w-1 h-8 bg-gold/50" />
      </div>

      <CTASection />
    </>
  );
}
