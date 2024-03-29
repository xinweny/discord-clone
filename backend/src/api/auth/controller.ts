import { RequestHandler } from 'express';
import ms from 'ms';

import env from '@config/env.js';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

import { validateFields } from '@middleware/validateFields.js';

import { passwordResetMail } from '@templates/passwordResetMail.js';
import { emailVerificationMail } from '@templates/emailVerificationMail.js';

import { mailService } from '@services/mail.js';
import { authService } from '@api/auth/service.js';
import { userService } from '@api/users/service.js';

const signup: RequestHandler[] = [
  ...validateFields(['email', 'username', 'password']),
  tryCatch(
    async (req, res) => {
      const { email, displayName, username, password } = req.body;

      const existingUser = await userService.getOne({ email });

      if (existingUser) throw new CustomError(400, 'Email already in use');

      const hashedPassword = await authService.hashPassword(password);

      const newUser = await userService.create({
        email,
        displayName,
        username,
        password: hashedPassword,
      });

      res.json({
        data: newUser,
        message: 'User successfully created.',
      });
    }
  ),
];

const login: RequestHandler[] = [
  ...validateFields(['email', 'password']),
  tryCatch(
    async (req, res) => {
      const { email, password } = req.body;

      const user = await userService.getOne({ email }, true);
      if (!user) throw new CustomError(400, 'Invalid email or password.');

      const verifiedPassword = await authService.verifyPassword(password, user.password);
      if (!verifiedPassword) throw new CustomError(400, 'Invalid email or password.');

      const { accessToken, refreshToken } = await authService.generateTokens(user);

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: ms(env.JWT_REFRESH_EXPIRE),
      });

      res.json({
        data: {
          userId: user._id,
          accessToken,
        },
        message: 'Logged in successfully.',
      });
    }
  )
];

const refreshAccessToken: RequestHandler[] = [
  tryCatch(
    async (req, res) => {
      const refreshToken = req.cookies.jwt;

      if (!refreshToken) throw new CustomError(400, 'Invalid refresh token.');

      const decodedToken = await authService.verifyRefreshToken(req.cookies.jwt);

      if (!decodedToken) throw new CustomError(400, 'Invalid refresh token.');

      const { _id } = decodedToken;

      const user = { _id };

      const accessToken = authService.issueAccessToken(user);

      res.json({
        data: {
          userId: _id,
          accessToken,
        },
        message: 'Access token issued successfully.',
      });
    }
  )
];

const logout: RequestHandler[] = [
  tryCatch(
    async (req, res) => {
      await authService.deleteRefreshToken(req.cookies.jwt);

      res.json({
        data: {},
        message: 'Logged out successfully.',
      });
    }
  )
];

const requestPasswordReset: RequestHandler[] = [
  ...validateFields(['email']),
  tryCatch(
    async (req, res) => {
      const { email } = req.body;

      const user = await userService.getOne({ email });

      if (!user) throw new CustomError(400, 'User does not exist.');

      const id = user._id.toString();
      const resetToken = await authService.issueTempToken(id, 'RESET', 1800000);

      const link = `${env.CLIENT_URL}/reset?token=${resetToken}&id=${id}`;

      await mailService.sendMail(
        email,
        'Discord Clone Password Reset',
        passwordResetMail(user.username, link)
      );

      res.json({
        data: null,
        message: 'Password reset email sent successfully.'
      });
    }
  )
];

const resetPassword: RequestHandler[] = [
  ...validateFields(['password', 'confirmPassword']),
  tryCatch(
    async (req, res) => {
      const { token, uid, password } = req.body;

      if (!token || !uid) throw new CustomError(404, 'Not found.');

      const isValid = await authService.verifyTempToken(token, uid, 'RESET');
      if (!isValid) throw new CustomError(400, 'Invalid reset token');

      const hashedPassword = await authService.hashPassword(password);

      const user = await userService.updateSensitive(uid, { password: hashedPassword });

      if (!user) throw new CustomError(400, 'Bad request');

      res.json({
        data: { userId: user._id },
        message: 'Password changed successfully.',
      });
    }
  )
];

const requestEmailVerification: RequestHandler[] = [
  ...validateFields(['email']),
  tryCatch(
    async (req, res) => {
      const { email } = req.body;

      const user = await userService.getOne({ email });

      if (!user) throw new CustomError(400, 'User does not exist.');

      const id = user._id.toString();
      const verifyToken = await authService.issueTempToken(id, 'VERIFY', 1800000);

      const link = `${env.CLIENT_URL}/verify?token=${verifyToken}&id=${id}`;

      const mail = await mailService.sendMail(
        email,
        'Discord Clone User Verification',
        emailVerificationMail(user.username, link)
      );

      res.json({
        data: mail,
        message: 'Email verification email sent successfully.'
      });
    }
  )
];

const verifyEmail: RequestHandler = tryCatch(
  async (req, res) => {
    if (!req.query.token || !req.query.uid) throw new CustomError(404, 'Not found.');

    const token = req.query.token.toString();
    const uid = req.query.uid.toString();

    const user = await userService.getOne({ _id: uid });

    if (!user) throw new CustomError(400, 'User does not exist.');
    if (user.verified) throw new CustomError(400, 'User email has already been verified.');

    const isValid = await authService.verifyTempToken(token, uid, 'VERIFY');
    if (!isValid) throw new CustomError(400, 'Invalid verify token');

    await userService.updateSensitive(uid, { verified: true });

    res.json({
      data: { userId: user._id },
      message: 'User email verified successfully.',
    });
  }
);

const checkRefreshToken: RequestHandler = tryCatch(
  async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) throw new CustomError(401, 'Unauthorized');

    const user = await authService.verifyRefreshToken(token);

    if (!user) throw new CustomError(401, 'Unauthorized');

    res.json({
      data: { userId: user._id },
      message: 'Refresh token verified successfully.',
    });
  }
);

const checkUsername: RequestHandler = tryCatch(
  async (req, res) => {
    const { username } = req.query;

    const isAvailable = await userService.checkUsernameAvailable(username as string);

    res.json({
      data: isAvailable,
    });
  }
);

export const authController = {
  signup,
  login,
  refreshAccessToken,
  logout,
  requestPasswordReset,
  resetPassword,
  requestEmailVerification,
  verifyEmail,
  checkRefreshToken,
  checkUsername,
};