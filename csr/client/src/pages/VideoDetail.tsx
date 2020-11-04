import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AddComment, LikeButton, Comments, VideoInfo } from '../component';
import { IStoreState, IVideoData } from '../store';
import { VideoPlayer, CommentLength } from '../component';
import { VideoPageWrapper } from './styles';

export const VideoDetail: React.FC<RouteComponentProps<{}, any, IVideoData>> = (
  props
) => {
  const videoData: IVideoData = props.location.state;
  return (
    <VideoPageWrapper>
      <VideoPlayer src={videoData.filePath} />
      <VideoInfo
        admin={videoData.admin}
        title={videoData.title}
        description={videoData.description}
        video_id={videoData._id}
        likePeople={videoData.likePeople}
      />
      <hr />
      <CommentLength length={videoData.comments.length} />
      <AddComment video_id={videoData._id} />
      <Comments video_id={videoData._id} comments={videoData.comments || []} />
    </VideoPageWrapper>
  );
};
