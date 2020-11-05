import React from 'react';
import { Link } from 'react-router-dom';
import { IVideoData } from '../store';
import {
  ThumbnailWrapper,
  ThumbnailAdminAvatar,
  ThumbnailContents,
} from './styles';
const endpoint = 'http://localhost:4000';

export const Thumbnail: React.FC<IVideoData> = (props) => {
  return (
    <ThumbnailWrapper>
      <Link to={{ pathname: `video/${props._id}`, state: props }}>
        <img src={endpoint + props.thumbnailPath} alt="" />
        <ThumbnailAdminAvatar>
          <img src={endpoint + props.admin.imageUrl} />
        </ThumbnailAdminAvatar>
        <ThumbnailContents>
          <div>{props.title}</div>
          <span>{props.admin.name}</span>
        </ThumbnailContents>
      </Link>
    </ThumbnailWrapper>
  );
};
