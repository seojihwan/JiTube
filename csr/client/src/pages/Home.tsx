import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Thumbnail } from '../component';
import { IStoreState } from '../store';
import { requestGetAllVideos } from '../actions';

export const Home: React.FC = () => {
  const videos = useSelector((state: IStoreState) => state.videos) || [];
  const dispatch = useDispatch();
  console.log('videos', videos);

  useEffect(() => {
    dispatch(requestGetAllVideos());
  }, []);

  return (
    <div>
      Home
      {videos.map((video, idx) => (
        <Thumbnail key={idx} {...video} />
      ))}
    </div>
  );
};
