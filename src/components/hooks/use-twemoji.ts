import twemoji from 'twemoji';

export const useTwemoji = (emoji: string) => {
  const hexCodePoint = twemoji.convert.toCodePoint(emoji);

  const url = `https://twemoji.maxcdn.com/v/14.0.2/svg/${hexCodePoint}.svg`;
  
  return {
    hexCodePoint,
    url,
  };
};