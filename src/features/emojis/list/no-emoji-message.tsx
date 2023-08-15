import { NullMessage } from '@components/ui/displays';

export function NoEmojiMessage() {
  return (
    <NullMessage
      src="#"
      header="No Emoji"
      message="Get the party started by uploading an emoji!"
    />
  );
}