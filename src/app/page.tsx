import AboutSection from '@/components/sections/about';
import CtaSection from '@/components/sections/cta';
import FeaturesSection from '@/components/sections/features';
import HardwareAddons from '@/components/sections/hardware-addons';
import HeroSection from '@/components/sections/hero';
import MobileAppSection from '@/components/sections/mobile-app';
import PricingSection from '@/components/sections/pricing';
import TestimonialsSection from '@/components/sections/testimonials';
import WhyChooseUsSection from '@/components/sections/why-choose-us';
import FloatingHelpButton from '@/components/ui/floating-help-button';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <MobileAppSection />
      <TestimonialsSection />
      <PricingSection />
      <HardwareAddons />
      <CtaSection />
      <FloatingHelpButton />
    </main>
  );
}
