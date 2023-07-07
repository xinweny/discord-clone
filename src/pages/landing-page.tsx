import {
  LandingLayout,
  Header,
  HeadlineBanner,
  BenefitBannerContainer,
  CTABanner,
  Footer,
} from '@features/landing/components';

export function LandingPage() {
  return (
    <div>
      <LandingLayout>
        <Header />
        <HeadlineBanner />
        <BenefitBannerContainer />
        <CTABanner />
        <Footer />
      </LandingLayout>
    </div>
  );
}