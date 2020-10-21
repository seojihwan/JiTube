import React from 'react';
import { IVideoData } from '../store';
import { Video, Controller, VideoWrapper } from './styles';
const endpoint = 'http://localhost:4000';

interface Iprops {
  src: string;
}
export const VideoPlayer: React.FC<Iprops> = ({ src }) => {
  return (
    <VideoWrapper>
      <Video src={endpoint + src} />
      <Controller>
        <button />
        <button />
        <button />
      </Controller>
    </VideoWrapper>
  );
};
