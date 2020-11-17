import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../store';
import {} from './styles';

interface CommentLengthProps {
  length: number;
}
export const CommentLength: React.FC<CommentLengthProps> = ({ length }) => {
  length;
  const CommentsLength = useSelector(
    (store: IStoreState) => store.currentPageVideo?.comments.length
  );

  return (
    <div style={{ margin: '20px 0px' }}>{`댓글 ${
      CommentsLength || length
    }개`}</div>
  );
};