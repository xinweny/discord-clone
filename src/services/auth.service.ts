import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import ms from 'ms';

import env from '../config/env.config';

import { IUser } from '../models/User.model';

import RedisService from './redis.service';

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, Number(env.BCRYPT_SALT));
};

const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}

const generateTokens = async (user: IUser) => {
  const { _id, username, email, role, verified } = user;

  const payload = { _id, username, email, role, verified };

  const accessToken = jwt.sign(
    payload,
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRE }
  );

  const refreshToken = jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRE }
  );
  
  await RedisService.set(`${payload._id}_REFRESH`, refreshToken, ms(env.JWT_REFRESH_EXPIRE));

  return { accessToken, refreshToken };
}

const verifyRefreshToken = async (refreshToken: string) => {
  const user = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;

  const userToken = await RedisService.get(`${user._id}_REFRESH`);

  return (userToken === refreshToken) ? user : null;
};

const issueAccessToken = (user: {
  _id: string,
  email: string,
  username: string,
  role: string,
  verified: boolean,
}) => {
  return jwt.sign(user, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRE,
  });
}

const deleteRefreshToken = async (refreshToken: string) => {
  const user = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;

  if (user) await RedisService.del(user._id);
};

const issueTempToken = async (userId: string, type: 'RESET' | 'VERIFY', expTime: number) => {
  const token = crypto.randomBytes(32).toString('hex');

  const hash = await bcrypt.hash(token, Number(env.BCRYPT_SALT));
  
  await RedisService.set(`${userId}_${type}`, hash, expTime);

  return token;
}

const verifyTempToken = async (token: string, userId: string, type: 'RESET' | 'VERIFY') => {
  const hashedToken = await RedisService.get(`${userId}_${type}`);

  if (!hashedToken) return null;

  const isValid = await bcrypt.compare(token, hashedToken);

  if (!isValid) return null;

  if (type === 'RESET') {
    const refreshToken = await RedisService.get(`${userId}_REFRESH`);

    return refreshToken;
  } else if (type === 'VERIFY') {
    await RedisService.del(`${userId}_${type}`);

    return hashedToken;
  }
}

export default {
  hashPassword,
  verifyPassword,
  generateTokens,
  verifyRefreshToken,
  issueAccessToken,
  issueTempToken,
  deleteRefreshToken,
  verifyTempToken,
};