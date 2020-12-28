import React from 'react';
import { Thumbnail } from '../../../components';
import { IVideoData } from '../../../store';
import { ThumbnailsWrapper } from './styles';

interface SearchResultsThumbNailsProps {
  videos: IVideoData[];
}

export const SearchResultsThumbNails: React.FC<SearchResultsThumbNailsProps> = ({
  videos,
}) => (
  <ThumbnailsWrapper>
    {videos.map((video, idx) => (
      <Thumbnail key={idx} {...video} isChannel={false} isAdmin={false} />
    ))}
  </ThumbnailsWrapper>
);
