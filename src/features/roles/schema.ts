import zod from 'zod';

import { PERMISSION_NAMES } from './edit/data';

export const editRoleSchema = zod.object({
  serverId: zod.string(),
  roleId: zod.string(),
  name: zod.string().min(1),
  color: zod.string(),
  permissions: zod.object(PERMISSION_NAMES.reduce(
    (o, key) => ({ ...o, [key]: zod.boolean() }),
    {}
  )),
});