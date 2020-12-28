import React from 'react';
import { Thumbnail } from '../../../components';
import { IVideoData } from '../../../store';
import { ThumbnailsWrapper } from './styles';

interface HomeThumbNailsProps {
  videos: IVideoData[];
}

export const HomeThumbNails: React.FC<HomeThumbNailsProps> = ({ videos }) => (
  <ThumbnailsWrapper>
    {videos.map((video, idx) => (
      <Thumbnail key={idx} {...video} isChannel={false} isAdmin={false} />
    ))}
  </ThumbnailsWrapper>
);
