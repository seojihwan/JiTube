import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AddComment, LikeButton, Comments } from '../component';
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
      <LikeButton video_id={videoData._id} likePeople={videoData.likePeople} />
      <AddComment video_id={videoData._id} />
      <Comments
        video_id={videoData._id}
        comments={[...videoData.comments] || []}
      />
    </div>
  );
};
