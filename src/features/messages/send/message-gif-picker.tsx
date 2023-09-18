import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import GifPicker, { type TenorImage, Theme } from 'gif-picker-react';
import { useIntl } from 'react-intl';

import { useSendMessageMutation } from '../api';

import { TextElement, env } from '@config';

type MessageGifPickerProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function MessageGifPicker({
  btnRef,
}: MessageGifPickerProps) {
  const { roomId, serverId } = useParams();

  const intl = useIntl();

  const { locale } = intl;

  const [sendMessage] = useSendMessageMutation();

  const { reset } = useFormContext();

  const handleClick = async (gif: TenorImage) => {
    const body = JSON.stringify([{ type: 'text', children: [{ text: gif.url }] }] as TextElement[]);

    await sendMessage({
      roomId: roomId!,
      serverId,
      body,
      attachments: [],
    }).unwrap();

    btnRef.current?.click();
    reset();
  };

  return (
    <GifPicker
      tenorApiKey={env.VITE_TENOR_API_KEY}
      onGifClick={handleClick}
      theme={Theme.DARK}
      country={locale}
      locale={locale}
    />
  );
}