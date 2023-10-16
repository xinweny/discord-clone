export const isServerInviteLink = (url: string) => {
  return !!url.match(/https:\/\/discord-clone\.gg\/[a-zA-Z0-9]{8}/);
};