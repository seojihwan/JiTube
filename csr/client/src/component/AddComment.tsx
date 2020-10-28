import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestComment } from '../actions';
import { requestGetOneVideo } from '../apis';
import { IStoreState } from '../store';
import { CommentInput } from './styles';
import {
  UserIcon,
  CommentEnter,
  CommentInputWrapper,
  CommentInputFilled,
  CommentInputFilledWrapper,
} from './styles';

const endpoint = 'http://localhost:4000';
interface IAddCommentprops {
  video_id: string;
}

export const AddComment: React.FC<IAddCommentprops> = ({ video_id }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store: IStoreState) => store.authentication);
  const [contents, setContents] = useState('');
  const [isFocus, setIsFocus] = useState(false);

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

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.currentTarget.value);
  }, []);

  const onFocus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(true);
  }, []);
  const onFocusOut = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(false);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <UserIcon
          src={auth?.imageUrl ? endpoint + auth.imageUrl : endpoint + '/1.png'}
          alt=""
        />
        <label htmlFor="contents"></label>
        <CommentInputWrapper>
          <CommentInput
            value={contents}
            onChange={onChange}
            name="contents"
            type="textarea"
            placeholder="댓글 내용을 입력해주세요."
            onFocus={onFocus}
            onBlur={onFocusOut}
          />
          <CommentInputFilledWrapper>
            <CommentInputFilled isFocus={isFocus} />
          </CommentInputFilledWrapper>
        </CommentInputWrapper>

        <CommentEnter disabled={!contents}>댓글</CommentEnter>
      </div>
    </form>
  );
};
