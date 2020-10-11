import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Thumbnail } from '../component';
import { IStoreState } from '../store';

export const Home: React.FC = () => {
  const videos = useSelector((state: IStoreState) => state.videos) || [];
  console.log('videos', videos);
  return (
    <div>
      Home
      {videos.map((video, idx) => (
        <Thumbnail key={idx} {...video} />
      ))}
    </div>
  );
};
