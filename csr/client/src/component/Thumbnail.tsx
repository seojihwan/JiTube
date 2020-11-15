import React from 'react';
import { Link } from 'react-router-dom';
import { IVideoData } from '../store';
import {
  Avatar,
  ThumbnailWrapper,
  ThumbnailAdminAvatar,
  ThumbnailContents,
  ThumbnailImageWrapper,
  ThumbnailAvatarContentsWrapper,
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
  viewcount,
  date,
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
            viewcount,
            date,
            filePath,
          },
        }}
      >
        <ThumbnailImageWrapper>
          <img src={endpoint + thumbnailPath} alt="" />
        </ThumbnailImageWrapper>
      </Link>
      <ThumbnailAvatarContentsWrapper>
        {!isChannel && (
          <ThumbnailAdminAvatar>
            <Link
              to={{
                pathname: `/user/${admin._id}`,
                state: { admin },
              }}
            >
              <Avatar src={endpoint + admin.imageUrl} />
            </Link>
          </ThumbnailAdminAvatar>
        )}
        <ThumbnailContents>
          <div>{title}</div>
          <Link
            to={{
              pathname: `/user/${admin._id}`,
              state: { admin },
            }}
          >
            <span>{admin.name}</span>
          </Link>
        </ThumbnailContents>
        {isChannel && isAdmin && <DeleteButton onClick={handleDelete} />}
      </ThumbnailAvatarContentsWrapper>
    </ThumbnailWrapper>
  );
};
