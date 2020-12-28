import React, { useEffect } from 'react';
import { LikeButton } from '../../../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestUpVideoViewCount } from '../../../actions';
import { IVideoData } from '../../../store';
import {
  Container,
  DetailInfo,
  Title,
  ViewCount,
  Date,
  AdminInfo,
  AdminIcon,
  AdminName,
  Description,
} from './styles';
import { endpoint } from '../../../apis';

interface VideoInfoProps {
  videoData: IVideoData;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  videoData: { title, _id, likePeople, admin, viewcount, description, date },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestUpVideoViewCount(_id));
  }, []);
  return (
    <Container>
      <Title>{title}</Title>
      <DetailInfo>
        <ViewCount>{`조회수 ${viewcount}회`}</ViewCount>
        <Date>{date}</Date>
        <LikeButton video_id={_id} likePeople={likePeople} />
      </DetailInfo>
      <hr />
      <AdminInfo>
        <Link to={{ pathname: `/user/${admin._id}`, state: { admin } }}>
          <AdminIcon
            src={
              admin.imageUrl ? endpoint + admin.imageUrl : endpoint + '/1.png'
            }
            alt=""
          />
        </Link>
        <AdminName>{admin.name}</AdminName>
      </AdminInfo>
      <Description>{description}</Description>
    </Container>
  );
};
