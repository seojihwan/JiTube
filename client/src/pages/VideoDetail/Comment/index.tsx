import React from 'react';
import { IVideoData } from '../../../store';
import { Count } from './Count';
import { Input } from './Input';
import { List } from './List';

interface CommentProps {
  videoData: IVideoData;
}

export const Comment: React.FC<CommentProps> = ({ videoData }) => {
  return (
    <>
      <Count length={videoData.comments.length} />
      <Input video_id={videoData._id} />
      <List video_id={videoData._id} comments={videoData.comments || []} />
    </>
  );
};
