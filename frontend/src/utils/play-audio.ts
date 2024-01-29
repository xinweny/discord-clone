export const playAudio = (audioSrc: string) => {
  new Audio(audioSrc).play();
};