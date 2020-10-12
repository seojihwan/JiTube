import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestComment } from '../actions';
import { IStoreState, IVideoData } from '../store';

interface ICommentListProps {
  videoData: IVideoData;
}

export const CommentList: React.FC<ICommentListProps> = ({ videoData }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store: IStoreState) => store.authentication);
  const video = useSelector((store: IStoreState) => store.currentPageVideo);
  const [contents, setContents] = useState<string>('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      const comment_id = e.currentTarget.getAttribute('data-comments_id');
      if (comment_id) {
        dispatch(
          requestComment({
            username: auth.name,
            contents,
            video_id: '',
            comment_id: comment_id,
          })
        );
      } else {
        dispatch(
          requestComment({
            username: auth.name,
            contents,
            video_id: videoData._id,
            comment_id: '',
          })
        );
      }
    }
  };
  useEffect(() => {
    console.log(videoData, 'video');
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.getAttribute('data-idx');
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <h1>댓글</h1>
          <label htmlFor="contents"></label>
          <input
            value={contents}
            onChange={onChange}
            name="contents"
            type="textarea"
          />
          <button>등록</button>
        </div>
      </form>
      {videoData.comments.map((comment, idx) => (
        <div key={idx}>
          <h1>{comment.username}</h1>
          <h3>{comment.contents}</h3>
          <button data-idx={idx} onClick={onClick}>
            대댓글 달기
          </button>
          <form onSubmit={onSubmit} data-comments_id={comment._id as string}>
            <div>
              <h1>댓글</h1>
              <label htmlFor="contents"></label>
              <input
                value={contents}
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
