import React from 'react';
import {
  VideoInfoWrapper,
  AdminInfo,
  AdminIcon,
  AdminName,
  VideoDescription,
  VideoTitle,
  VideoWrapper,
} from './styles';
import { LikeButton } from './LikeButton';
import { UserDocument } from '../../../server/models/User';
const endpoint = 'http://localhost:4000';

interface Iprops {
  admin: UserDocument;
  title: string;
  description: string;
  video_id: string;
  likePeople: Array<string>;
}
export const VideoInfo: React.FC<Iprops> = ({
  admin,
  title,
  description,
  video_id,
  likePeople,
}) => {
  return (
    <VideoInfoWrapper>
      <VideoTitle>{title}</VideoTitle>
      <LikeButton video_id={video_id} likePeople={likePeople} />
      <hr />
      <AdminInfo>
        <AdminIcon
          src={admin.imageUrl ? endpoint + admin.imageUrl : endpoint + '/1.png'}
          alt=""
        />
        <AdminName>{admin.name}</AdminName>
      </AdminInfo>
      <VideoDescription>{description}</VideoDescription>
    </VideoInfoWrapper>
  );
};
