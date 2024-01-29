export type CategoryData = {
  _id: string;
  name: string;
  channelIds: string[];
};

export type CreateCategoryFields = {
  serverId: string;
  name: string;
};

export type EditCategoryFields = {
  serverId: string;
  categoryId: string;
  name: string;
};

export type DeleteCategoryFields = {
  serverId: string;
  categoryId: string;
};