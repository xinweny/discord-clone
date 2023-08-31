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