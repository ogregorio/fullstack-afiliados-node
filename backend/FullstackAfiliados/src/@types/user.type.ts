export type User = {
  username: string;
};

export type AuthPayload = {
  username: string;
  password: string;
};

export type AuthReponse = {
  name: string;
  expiresIn: Date;
  token: string;
};
