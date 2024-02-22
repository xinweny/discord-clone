import styles from './benefit-banner.module.scss';

type BenefitBannerProps = {
  benefit: {
    header: string;
    body: string;
    img: { src: string, alt?: string };
    className: string;
  };
};

export function BenefitBanner({ benefit }: BenefitBannerProps) {
  const { header, body, img, className } = benefit;
  const { src, alt } = img;

  return (
    <div className={`${styles.banner} ${className || ''}`}>
      <div>
        <img src={src} alt={alt} />
        <div className={styles.description}>
          <h2>{header}</h2>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
}