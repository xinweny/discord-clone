import {
  Header,
  HeadlineBanner,
  BenefitBannerContainer,
  CTABanner,
  Footer,
} from '@features/landing';
import { LandingLayout } from '@components/layouts';

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