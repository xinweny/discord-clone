import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '@config/env.js';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

import { userService }from '@api/users/service.js';

export const authenticate = tryCatch(
  async (req, res, next) => {
    if (!req.headers.authorization) throw new CustomError(401, 'Unauthorized');

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) throw new CustomError(401, 'Unauthorized');

    const payload = jwt.verify(accessToken, env.JWT_ACCESS_SECRET) as JwtPayload;

    const user = await userService.getById(payload._id, '+verified');

    if (!user) throw new CustomError(401, 'Unauthorized');
    if (!user.verified) throw new CustomError(403, 'Unverified user', { user });

    req.user = user;

    next();
  }
)