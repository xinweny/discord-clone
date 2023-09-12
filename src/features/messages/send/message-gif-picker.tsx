import GifPicker, { type TenorImage } from 'gif-picker-react';

import { env } from '@config';

export function MessageGifPicker() {
  const handleClick = (gif: TenorImage) => {
    console.log(gif);
  };

  return (
    <GifPicker
      tenorApiKey={env.VITE_TENOR_API_KEY}
      onGifClick={handleClick}
    />
  );
}