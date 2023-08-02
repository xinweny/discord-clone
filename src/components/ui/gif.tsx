import { useState } from 'react';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';

type GifProps = {
  src: string;
};

export function Gif({ src }: GifProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const publicId = extractPublicId(src);
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
      alt=""
    />
  );
}