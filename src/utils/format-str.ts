export const formatTextChannelName = (str: string) => str
  .toLowerCase()
  .replace(/^[\s-]+/g, '')
  .replace(/[\s-]+/g, '-');