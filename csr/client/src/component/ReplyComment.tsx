import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { requestComment } from '../actions';
import { IStoreState } from '../store';

interface ReplyCommentProps {
  video_id: string;
  comment: CommentDocument;
}
export const ReplyComment: React.FC<ReplyCommentProps> = ({
  video_id,
  comment,
}) => {
  const [replyContents, setReplyContents] = useState<string>('');
  const auth = useSelector((store: IStoreState) => store.authentication);
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContents(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (auth) {
      dispatch(
        requestComment({
          user_id: auth.user_id,
          contents: replyContents,
          comment_id: e.currentTarget.getAttribute('data-comments_id') || '',
          video_id,
        })
      );
    }
  };
  return (
    <form onSubmit={onSubmit} data-comments_id={comment._id || ''}>
      <div>
        <label htmlFor="contents"></label>
        <input
          value={replyContents}
          onChange={onChange}
          name="contents"
          type="textarea"
          autoComplete="off"
        />
        <button>등록</button>
      </div>
    </form>
  );
};
