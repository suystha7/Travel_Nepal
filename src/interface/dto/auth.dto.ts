export interface IAuthUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  accessToken: string;
  refreshToken: string;
  expires_in: number;
  tokenExpiry: number;
  profile: {
    phone: string | null;
    gender: string | null;
    country: string | null;
    dateOfBirth: string | null;
  };
}

export interface InstyJWT extends Record<string, unknown> {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken?: string;
  refreshToken?: string;
  expires_in?: number;
  tokenExpiry?: number;
  profile?: IAuthUser["profile"];
  error?: string;
}

export interface InstySession {
  user: IAuthUser;
  accessToken?: string;
  error?: string;
}

export interface ICredentialsInput {
  email?: string;
  password?: string;
}
