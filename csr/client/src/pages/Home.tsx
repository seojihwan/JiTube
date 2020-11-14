import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Thumbnail } from '../component';
import { IStoreState } from '../store';
import { requestGetAllVideos } from '../actions';
import { ThumbnailsWrapper } from './styles';

export const Home: React.FC = () => {
  const videos = useSelector((state: IStoreState) => state.videos) || [];
  const dispatch = useDispatch();
  console.log('videos', videos);

  useEffect(() => {
    dispatch(requestGetAllVideos());
  }, []);

  return (
    <ThumbnailsWrapper>
      {videos.map((video, idx) => (
        <Thumbnail key={idx} {...video} isChannel={false} isAdmin={false} />
      ))}
    </ThumbnailsWrapper>
  );
};
