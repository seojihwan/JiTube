import React, { useEffect } from 'react';
import {
  VideoInfoWrapper,
  VideoDetailInfo,
  AdminInfo,
  AdminIcon,
  AdminName,
  VideoDescription,
  VideoTitle,
  VideoViewCount,
  VideoDate,
  VideoHr,
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
  }, []);
  return (
    <VideoInfoWrapper>
      <VideoTitle>{title}</VideoTitle>
      <VideoDetailInfo>
        <VideoViewCount>{`조회수 ${viewcount}회`}</VideoViewCount>
        <VideoDate>{date}</VideoDate>
        <LikeButton video_id={_id} likePeople={likePeople} />
      </VideoDetailInfo>
      <VideoHr />
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
