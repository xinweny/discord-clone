const serverInviteRegex = /https:\/\/discord-clone\.gg\/[a-zA-Z0-9]{8}/;

export const isServerInviteLink = (url: string) => {
  return !!url.match(serverInviteRegex);
};

export const getServerInviteLinks = (url: string) => {
  return url.match(serverInviteRegex);
};

export const getUrlId = (url: string) => {
  return url.split('/').slice(-1)[0];
}