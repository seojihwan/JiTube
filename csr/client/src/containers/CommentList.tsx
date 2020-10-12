import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestComment, requestGetOneVideo } from '../actions';
import { IStoreState, IVideoData } from '../store';
import { Comment } from '../component';
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
    dispatch(requestGetOneVideo(videoData._id));
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
      {video?.comments.reverse().map((comment, idx) => (
        <Comment key={idx} {...comment} />
      ))}
    </>
  );
};
