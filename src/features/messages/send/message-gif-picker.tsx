import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import GifPicker, { type TenorImage } from 'gif-picker-react';
import { useIntl } from 'react-intl';

import { useSendMessageMutation } from '../api';

import { env } from '@config';

type MessageGifPickerProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function MessageGifPicker({
  btnRef,
}: MessageGifPickerProps) {
  const { channelId, roomId, serverId } = useParams();

  const intl = useIntl();

  const { locale } = intl;

  const [sendMessage] = useSendMessageMutation();

  const { reset } = useFormContext();

  const handleClick = async (gif: TenorImage) => {
    await sendMessage({
      roomId: channelId || roomId!,
      serverId,
      body: gif.url,
      attachments: [],
    }).unwrap();

    btnRef.current?.click();
    reset();
  };

  return (
    <GifPicker
      tenorApiKey={env.VITE_TENOR_API_KEY}
      onGifClick={handleClick}
      country={locale}
      locale={locale}
    />
  );
}