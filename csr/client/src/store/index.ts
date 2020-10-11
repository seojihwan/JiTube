export interface IAuthentication {
  email: string;
  user_id: string;
  token: string;
}

export interface IStoreState {
  authentication: IAuthentication | null;
}
