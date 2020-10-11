import { UserDocument } from '../../../server/models';

export interface IAuthentication {
  email: string;
  user_id: string;
  token: string;
}
export interface IVideo {
  _id: string;
  title: string;
  description: string;
  admin: UserDocument;
  filePath: string;
  thumbnailPath: string;
}
export interface IStoreState {
  authentication: IAuthentication | null;
  videos: Array<IVideo> | null;
}
