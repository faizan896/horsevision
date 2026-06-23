import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SupportedBreeds } from "@/components/landing/SupportedBreeds";
import { AccuracyBlock } from "@/components/landing/AccuracyBlock";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <SupportedBreeds />
      <AccuracyBlock />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
