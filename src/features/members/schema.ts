import zod from 'zod';

export const editServerMemberSchema = zod.object({
  memberId: zod.string(),
  serverId: zod.string(),
  displayName: zod.string().min(1),
  bannerColor: zod.string(),
  bio: zod.string(),
});