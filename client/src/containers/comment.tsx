import React from 'react';
import { AddComment, Comments, CommentLength } from '../components';
import { IVideoData } from '../store';

interface CommentContainerProps {
  videoData: IVideoData;
}

export const CommentContainer: React.FC<CommentContainerProps> = ({
  videoData,
}) => {
  return (
    <>
      <CommentLength length={videoData.comments.length} />
      <AddComment video_id={videoData._id} />
      <Comments video_id={videoData._id} comments={videoData.comments || []} />
    </>
  );
};
