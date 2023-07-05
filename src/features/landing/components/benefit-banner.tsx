type BenefitBannerProps = {
  benefit: {
    header: string;
    body: string;
    img: { src: string, alt?: string };
  };
};

export const BenefitBanner = ({ benefit }: BenefitBannerProps) => {
  const { header, body, img } = benefit;
  const { src, alt } = img;

  return (
    <div>
      <img src={src} alt={alt} />
      <div>
        <h2>{header}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};