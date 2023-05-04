import { RequestHandler } from 'express';

import signupValidation from '../validators/signupValidation';
import loginValidation from '../validators/loginValidation';
import handleValidationErrors from '../validators/handleValidationErrors';
import tryCatch from '../middleware/tryCatch';
import CustomError from '../helpers/CustomError';

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

const signup: RequestHandler[] = [
  ...signupValidation,
  handleValidationErrors,
  tryCatch(
    async (req, res, next) => {
      const { email, username, password } = req.body;

      const existingUser = await UserService.findOneUser({ email });

      if (existingUser) throw new CustomError('Email already in use. Please choose a different email.', 400);

      const hashedPassword = await AuthService.hashPassword(password);

      const newUser = await UserService.createUser(email, username, hashedPassword);

      res.json({
        data: newUser,
        message: 'User successfully created.',
      });
    }
  ),
];

const login: RequestHandler[] = [
  ...loginValidation,
  handleValidationErrors,
  tryCatch(
    async (req, res, next) => {
      const { email, password } = req.body;

      const user = await UserService.findOneUser({ email });
      if (!user) throw new CustomError('Invalid email or passsword.', 401);

      const verifiedPassword = await AuthService.verifyPassword(password, user.password);
      if (!verifiedPassword) throw new CustomError('Invalid email or passsword.', 401);

      const { accessToken, refreshToken } = await AuthService.generateTokens(user);

      res.json({
        data: {
          accessToken,
          refreshToken,
        },
        message: 'Logged in successfully.',
      });
    }
  )
];

const refreshAccessToken: RequestHandler[] = [

];

export default {
  signup,
  login,
  refreshAccessToken,
};