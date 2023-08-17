export const formatTextChannelName = (str: string) => str
  .toLowerCase()
  .replace(/^[\s-]+/g, '')
  .replace(/[\s-]+/g, '-');

export const formatEmojiName = (str: string) => str
  .replace(/\.[^/.]+$/, '')
  .replace(/^[a-zA-Z0-9]+$/i, '');