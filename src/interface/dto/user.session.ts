export interface ISessionRoot {
  user: ISessionUser;
  expires: string;
  accessToken: string;
}

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: ISessionProfile;
}

export interface ISessionProfile {
  phone: string;
  gender: string;
  country: string;
  dateOfBirth: string;
}
