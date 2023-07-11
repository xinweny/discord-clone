import {
  Header,
  HeadlineBanner,
  BenefitBannerContainer,
  CTABanner,
  Footer,
} from '@features/landing/components';
import { LandingLayout } from '@common/components/layouts';

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