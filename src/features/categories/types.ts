export type CategoryData = {
  _id: string;
  name: string;
  channelIds: string[];
};

export type CreateCategoryFields = {
  serverId: string;
  name: string;
};