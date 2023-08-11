export interface ServerData {
  _id: string;
  name: string;
  createdAt: Date;
  memberCount: number;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  ownerId: string;
  private: boolean;
}