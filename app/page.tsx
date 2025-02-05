'use client';

import { Suspense } from 'react';
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from '@/components/hero-section';
import { WhyChooseSection } from '@/components/why-choose-section';
import { TestimonialSlider } from '@/components/testimonial-slider';
import { CertifiedBanner } from '@/components/certified-banner';
import { ServicesSection } from '@/components/services-section';
import { GlobalPresence } from '@/components/global-presence';
import { StoryNumbers } from '@/components/story-numbers';
import { HeroSkeleton } from '@/components/skeletons/hero-skeleton';
import { WhyChooseSkeleton } from '@/components/skeletons/why-choose-skeleton';
import { ServicesSkeleton } from '@/components/skeletons/services-skeleton';
import { TestimonialSkeleton } from '@/components/skeletons/testimonial-skeleton';
import { StoryNumbersSkeleton } from '@/components/skeletons/story-numbers-skeleton';
import { GlobalPresenceSkeleton } from '@/components/skeletons/global-presence-skeleton';

export default function Home() {
  return (
    <main>
      <NavBar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<WhyChooseSkeleton />}>
        <WhyChooseSection />
      </Suspense>

      <Suspense fallback={<TestimonialSkeleton />}>
        <TestimonialSlider />
      </Suspense>

      <CertifiedBanner />

      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<GlobalPresenceSkeleton />}>
        <GlobalPresence />
      </Suspense>

      <Suspense fallback={<StoryNumbersSkeleton />}>
        <StoryNumbers />
      </Suspense>
    </main>
  );
}
