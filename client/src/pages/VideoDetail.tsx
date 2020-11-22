import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AddComment, LikeButton, Comments, CommentLength } from '../components';
import { IVideoData } from '../store';
import { VideoPageWrapper } from '../components/videoPlayer/styles/video';
import { VideoPlayerContainer, VideoInfoContainer } from '../containers';

export const VideoDetail: React.FC<RouteComponentProps<{}, any, IVideoData>> = (
  props
) => {
  const videoData: IVideoData = props.location.state;

  return (
    <VideoPageWrapper>
      <VideoPlayerContainer src={videoData.filePath} />
      <VideoInfoContainer videoData={videoData} />
      <hr />
      <CommentLength length={videoData.comments.length} />
      <AddComment video_id={videoData._id} />
      <Comments video_id={videoData._id} comments={videoData.comments || []} />
    </VideoPageWrapper>
  );
};
