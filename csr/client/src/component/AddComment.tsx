import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestComment } from '../actions';
import { requestGetOneVideo } from '../apis';
import { IStoreState } from '../store';

interface IAddCommentprops {
  video_id: string;
}

export const AddComment: React.FC<IAddCommentprops> = ({ video_id }) => {
  console.log(video_id);
  const dispatch = useDispatch();
  const auth = useSelector((store: IStoreState) => store.authentication);
  const [contents, setContents] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      dispatch(
        requestComment({
          username: auth.name,
          contents,
          video_id,
          comment_id: '',
        })
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.currentTarget.value);
  };

  return (
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
  );
};
