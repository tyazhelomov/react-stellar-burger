export interface IUserInfo {
  email: string;
  name: string;
}

export interface ILoginInfo {
  [name: string]: boolean | IUserInfo | string;
};

export interface IUser {
  isLoading: boolean;
  user?: undefined | ILoginInfo;
  token?: string | undefined;
}