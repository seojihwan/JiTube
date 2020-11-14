import React from 'react';
import {
  VideoInfoWrapper,
  AdminInfo,
  AdminIcon,
  AdminName,
  VideoDescription,
  VideoTitle,
  VideoWrapper,
  Avatar,
} from './styles';
import { LikeButton } from './LikeButton';
import { UserDocument } from '../../../server/models/User';
import { endpoint } from '../apis';
import { Link } from 'react-router-dom';

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
        <Link to={`/user/${admin._id}`}>
          <Avatar
            src={
              admin.imageUrl ? endpoint + admin.imageUrl : endpoint + '/1.png'
            }
            alt=""
          />
        </Link>

        <AdminName>{admin.name}</AdminName>
      </AdminInfo>
      <VideoDescription>{description}</VideoDescription>
    </VideoInfoWrapper>
  );
};
