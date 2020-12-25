import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IVideoData } from '../../store';
import { VideoPlayerContainer, VideoInfoContainer } from '../../containers';
import { CommentContainer } from '../../containers';
import { VideoDetailWrapper } from './style';

export const VideoDetail: React.FC<
  RouteComponentProps<{}, any, IVideoData>
> = props => {
  const videoData: IVideoData = props.location.state;

  return (
    <VideoDetailWrapper>
      <VideoPlayerContainer src={videoData.filePath} />
      <VideoInfoContainer videoData={videoData} />
      <CommentContainer videoData={videoData} />
    </VideoDetailWrapper>
  );
};
