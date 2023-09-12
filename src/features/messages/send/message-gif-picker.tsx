import GifPicker, { type TenorImage } from 'gif-picker-react';
import { useIntl } from 'react-intl';

import { env } from '@config';

export function MessageGifPicker() {
  const intl = useIntl();

  const handleClick = (gif: TenorImage) => {
    console.log(gif);
  };

  console.log(env.VITE_TENOR_API_KEY);

  return (
    <GifPicker
      tenorApiKey={env.VITE_TENOR_API_KEY}
      onGifClick={handleClick}
      locale={intl.locale}
    />
  );
}