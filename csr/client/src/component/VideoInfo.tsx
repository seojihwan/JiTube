import React, { useEffect } from 'react';
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
import { IVideoData } from '../store';
import { UserDocument } from '../../../server/models/User';
import { endpoint } from '../apis';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestUpVideoViewCount } from '../actions';

interface Iprops {
  videoData: IVideoData;
}
export const VideoInfo: React.FC<Iprops> = ({
  videoData: { title, _id, likePeople, admin, viewcount, description, date },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestUpVideoViewCount(_id));
  }, [viewcount]);
  return (
    <VideoInfoWrapper>
      <VideoTitle>{title}</VideoTitle>
      <LikeButton video_id={_id} likePeople={likePeople} />
      <span>{viewcount}</span>
      <span>{date}</span>
      <hr />
      <AdminInfo>
        <Link to={{ pathname: `/user/${admin._id}`, state: { admin } }}>
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
