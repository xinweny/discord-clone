import { Header } from './header';
import { HeadlineBanner } from './headline-banner';
import { BenefitBannerContainer } from './benefit-banner-container';
import { CTABanner } from './cta-banner';
import { Footer } from './footer';

export const LandingLayout = () => {
  return (
    <>
      <Header />
      <HeadlineBanner />
      <BenefitBannerContainer />
      <CTABanner />
      <Footer />
    </>
  );
};