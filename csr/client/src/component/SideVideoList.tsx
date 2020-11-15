import React from 'react';
import { Link } from 'react-router-dom';
import { IVideoData } from '../store';
import { endpoint } from '../apis';

export const SideVideoList: React.FC<IVideoData> = (props) => {
  console.log(props);
  return (
    <Link to={{ pathname: `/video/${props._id}`, state: props }}>
      <div>
        {JSON.stringify(props)}
        <img src={endpoint + props.thumbnailPath} alt="" />
      </div>
    </Link>
  );
};
