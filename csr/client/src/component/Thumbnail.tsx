import React from 'react';
import { Link } from 'react-router-dom';
import { IVideoData } from '../store';
import {
  ThumbnailWrapper,
  ThumbnailAdminAvatar,
  ThumbnailContents,
  ThumbnailImageWrapper,
  DeleteButton,
} from './styles';
import { endpoint } from '../apis';
import { useDispatch } from 'react-redux';
import { requestDeleteVideo } from '../actions';

interface ThumbnailProps extends IVideoData {
  isChannel: boolean;
  isAdmin: boolean;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  _id,
  thumbnailPath,
  admin,
  title,
  filePath,
  description,
  comments,
  isChannel,
  isAdmin,
}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(requestDeleteVideo({ video_id: _id, user_id: admin._id }));
  };
  return (
    <ThumbnailWrapper>
      <Link
        to={{
          pathname: `/video/${_id}`,
          state: {
            _id,
            thumbnailPath,
            admin,
            title,
            description,
            comments,
            filePath,
          },
        }}
      >
        <ThumbnailImageWrapper>
          <img src={endpoint + thumbnailPath} alt="" />
        </ThumbnailImageWrapper>
        {!isChannel && (
          <ThumbnailAdminAvatar>
            <img src={endpoint + admin.imageUrl} />
          </ThumbnailAdminAvatar>
        )}
        <ThumbnailContents>
          <div>{title}</div>
          <span>{admin.name}</span>
        </ThumbnailContents>
      </Link>
      {isChannel && isAdmin && <DeleteButton onClick={handleDelete} />}
    </ThumbnailWrapper>
  );
};
