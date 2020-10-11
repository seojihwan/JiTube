import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Video } from '../component';
import { IStoreState } from '../store';

export const Home: React.FC = () => {
  const videos = useSelector((state:IStoreState) => state.videos) || []
  return (
    <div>
      Home
      {videos.map((video,idx) => <Video key={idx} {...video} /> )}
    </div>
  );
};
