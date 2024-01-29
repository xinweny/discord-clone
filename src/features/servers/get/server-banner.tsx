import { createPortal } from 'react-dom';

import styles from './server-banner.module.scss';

type ServerBannerProps = {
  src: string;
} & React.HTMLAttributes<HTMLImageElement>;

export function ServerBanner({ src, ...props }: ServerBannerProps) {
  if (!src) return null;

  const bannerContainer = document.getElementById('server-banner-container');

  if (!bannerContainer) return null;

  return createPortal(
    <img className={styles.banner} src={src} {...props} />,
    bannerContainer
  );
}