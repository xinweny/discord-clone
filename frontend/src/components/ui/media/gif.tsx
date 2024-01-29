import { useState } from 'react';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';

type GifProps = {
  src: string;
  alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function Gif({ src, alt, ...props }: GifProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const ext = src.split('.').slice(-1)[0];

  if (ext.toLowerCase() !== 'gif') return <img
    src={src}
    alt={alt}
    {...props}
  />;

  const publicId = decodeURIComponent(extractPublicId(src));
  const stillUrl = buildUrl(publicId, {
    transformations: {
      page: 1,
    },
  });

  return (
    <img
      onMouseEnter={() => { setIsFocus(true); }}
      onMouseLeave={() => { setIsFocus(false); }}
      src={isFocus ? src : stillUrl}
      alt={alt}
      {...props}
    />
  );
}