import {
  Header,
  HeadlineBanner,
  BenefitBannerContainer,
  CTABanner,
  Footer,
} from '@features/landing';

import { LandingLayout } from '@components/layouts';

import styles from './landing-page.module.scss';

export function LandingPage() {
  return (
    <div className={styles.page}>
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