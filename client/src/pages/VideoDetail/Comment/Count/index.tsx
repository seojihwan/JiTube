import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../../../store';

interface CommentLengthProps {
  length: number;
}

export const Count: React.FC<CommentLengthProps> = ({ length }) => {
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
