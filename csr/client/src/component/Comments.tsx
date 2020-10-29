import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { requestComment } from '../actions';
import { IStoreState } from '../store';
import { ReplyComment } from '../component';

const endpoint = 'http://localhost:4000';
interface ICommentsProps {
  video_id: string;
  comments: Array<CommentDocument>;
}

export const Comments: React.FC<ICommentsProps> = ({ video_id, comments }) => {
  const newComments = useSelector(
    (store: IStoreState) => store.currentPageVideo?.comments
  );
  const updatedComments = useMemo(() => newComments || comments || [], [
    newComments,
  ]);

  return (
    <>
      {[...updatedComments].reverse().map((comment, idx) => (
        <div key={idx}>
          <img src={`${endpoint}${comment.admin.imageUrl}`}></img>
          <div>{comment.admin.name}</div>
          <div>{comment.contents}</div>
          <ReplyComment video_id={video_id} comment={comment}/>
        </div>
      ))}
    </>
  );
};
