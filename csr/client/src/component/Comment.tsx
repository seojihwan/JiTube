import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestComment } from '../actions';
import { IStoreState } from '../store';
interface ICommentProps {
  video_id: string;
  _id: string;
  username: string;
  contents: string;
}

export const Comment: React.FC<ICommentProps> = ({
  video_id,
  _id,
  username,
  contents,
}) => {
  const auth = useSelector((store: IStoreState) => store.authentication);
  const [replyContents, setReplyContents] = useState<string>('');
  const dispatch = useDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      dispatch(
        requestComment({
          username: auth.name,
          contents: replyContents,
          comment_id: _id,
          video_id,
        })
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContents(e.currentTarget.value);
  };

  return (
    <div>
      <h1>{username}</h1>
      <h3>{contents}</h3>
      <button>대댓글 달기</button>
      <form onSubmit={onSubmit} data-comments_id={_id as string}>
        <div>
          <h1>댓글</h1>
          <label htmlFor="contents"></label>
          <input
            value={replyContents}
            onChange={onChange}
            name="contents"
            type="textarea"
          />
          <button>등록</button>
        </div>
      </form>
    </div>
  );
};
