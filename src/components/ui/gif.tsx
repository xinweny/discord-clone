import { useState } from 'react';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';

import { env } from '@config';

type GifProps = {
  src: string;
};

const CLOUD_CONFIG = {
  cloudName: env.VITE_CLOUD_NAME,
  apiKey: env.VITE_CLOUDINARY_API_KEY,
};

export function Gif({ src }: GifProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const publicId = extractPublicId(src);
  const stillUrl = buildUrl(publicId, {
    cloud: CLOUD_CONFIG,
    transformations: {
      page: 1,
    },
  });

  return (
    <img
      onMouseEnter={() => { setIsFocus(true); }}
      onMouseLeave={() => { setIsFocus(false); }}
      src={isFocus ? src : stillUrl}
      alt=""
    />
  );
}