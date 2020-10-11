import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { LikeButton } from '../component';
const endpoint = 'http://localhost:4000';
import { IStoreState, IVideoData } from '../store';

export const VideoDetail: React.FC<RouteComponentProps<{}, any, IVideoData>> = (
  props
) => {
  const videoData: IVideoData = props.location.state;
  return (
    <div>
      비디오 디테일
      <video controls src={endpoint + videoData.filePath} />
      {/* <SideVideoList {...props}/> */}
      <LikeButton videoData={videoData} />
    </div>
  );
};
