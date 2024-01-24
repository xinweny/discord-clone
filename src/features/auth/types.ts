export type AuthData = {
  userId: string;
  accessToken: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = {
  email: string;
  displayName?: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
};