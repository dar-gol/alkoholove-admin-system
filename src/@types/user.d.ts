export interface IUser {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserContextType = {
  user: Tokens;
  setAdmin: (admin: Tokens) => void;
};
