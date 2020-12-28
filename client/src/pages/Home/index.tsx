import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Thumbnail } from '../../components';
import { IStoreState } from '../../store';
import { requestGetAllVideos } from '../../actions';
import { HomeThumbNails } from './HomeThumbNails';

export const Home: React.FC = () => {
  const videos = useSelector((state: IStoreState) => state.videos) || [];
  const dispatch = useDispatch();
  console.log('videos', videos);

  useEffect(() => {
    dispatch(requestGetAllVideos());
  }, []);

  return <HomeThumbNails videos={videos} />;
};
