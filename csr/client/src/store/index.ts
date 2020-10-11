import { UserDocument } from '../../../server/models';
import { IVideo } from '../../../server/models';

export interface IAuthentication {
  email: string;
  user_id: string;
  token: string;
}

export interface IVideoData extends IVideo {
  _id: string;
}
export interface IStoreState {
  authentication: IAuthentication | null;
  videos: Array<IVideoData> | null;
}
