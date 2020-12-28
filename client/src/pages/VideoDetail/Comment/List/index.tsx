import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CommentDocument } from '../../../../../../server/models';
import { IStoreState } from '../../../../store';
import { Comment } from './Element';

interface ICommentsProps {
  video_id: string;
  comments: Array<CommentDocument>;
}

export const List: React.FC<ICommentsProps> = ({ video_id, comments }) => {
  const newComments = useSelector(
    (store: IStoreState) => store.currentPageVideo?.comments
  );

  const updatedComments = useMemo(
    () => (newComments || comments || []).reverse(),
    [newComments]
  );

  return (
    <>
      {updatedComments.map((comment, idx) => (
        <Comment key={idx} video_id={video_id} comment={comment}></Comment>
      ))}
    </>
  );
};
