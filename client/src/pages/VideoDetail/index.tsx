import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IVideoData } from '../../store';
import { VideoPlayer } from './Video';
import { VideoInfo } from './VideoInfo';
import { Comment } from './Comment';
import { VideoDetailWrapper } from './styles';

export const VideoDetail: React.FC<
  RouteComponentProps<{}, any, IVideoData>
> = props => {
  const videoData: IVideoData = props.location.state;

  return (
    <VideoDetailWrapper>
      <VideoPlayer src={videoData.filePath} />
      <VideoInfo videoData={videoData} />
      <Comment videoData={videoData} />
    </VideoDetailWrapper>
  );
};
