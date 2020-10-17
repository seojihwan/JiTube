import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { requestComment } from '../actions';
import { IStoreState } from '../store';
interface ICommentsProps {
  video_id: string;
  comments: Array<CommentDocument>;
}

export const Comments: React.FC<ICommentsProps> = ({ video_id, comments }) => {
  const auth = useSelector((store: IStoreState) => store.authentication);
  const newComments = useSelector(
    (store: IStoreState) => store.currentPageVideo?.comments
  );
  const updatedComments = newComments || comments || [];
  const [replyContents, setReplyContents] = useState<string>('');
  const dispatch = useDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      dispatch(
        requestComment({
          username: auth.name,
          contents: replyContents,
          comment_id: e.currentTarget.getAttribute('data-comments_id') || '',
          video_id,
        })
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContents(e.currentTarget.value);
  };

  return (
    <>
      {[...updatedComments].reverse().map((comment, idx) => (
        <div>
          <h1>{comment.username}</h1>
          <h3>{comment.contents}</h3>
          <button>대댓글 달기</button>
          <form onSubmit={onSubmit} data-comments_id={comment._id || ''}>
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
      ))}
    </>
  );
};
