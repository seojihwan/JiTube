import React, { useEffect } from 'react';
import { LikeButton } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestUpVideoViewCount } from '../actions';
import { IVideoData } from '../store';
import { VideoInfo } from '../components/videoInfo';
import { endpoint } from '../apis';

interface VideoInfoContainerProps {
  videoData: IVideoData;
}

export const VideoInfoContainer: React.FC<VideoInfoContainerProps> = ({
  videoData: { title, _id, likePeople, admin, viewcount, description, date },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestUpVideoViewCount(_id));
  }, []);
  return (
    <VideoInfo>
      <VideoInfo.title>{title}</VideoInfo.title>
      <VideoInfo.detailInfo>
        <VideoInfo.viewCount>{`조회수 ${viewcount}회`}</VideoInfo.viewCount>
        <VideoInfo.date>{date}</VideoInfo.date>
        <LikeButton video_id={_id} likePeople={likePeople} />
      </VideoInfo.detailInfo>
      <hr />
      <VideoInfo.adminInfo>
        <Link to={{ pathname: `/user/${admin._id}`, state: { admin } }}>
          <VideoInfo.adminIcon
            src={
              admin.imageUrl ? endpoint + admin.imageUrl : endpoint + '/1.png'
            }
            alt=""
          />
        </Link>
        <VideoInfo.adminName>{admin.name}</VideoInfo.adminName>
      </VideoInfo.adminInfo>
      <VideoInfo.description>{description}</VideoInfo.description>
    </VideoInfo>
  );
};
