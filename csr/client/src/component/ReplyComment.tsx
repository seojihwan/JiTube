import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { requestComment } from '../actions';
import { IStoreState } from '../store';
import { ReplyButton } from './styles';
import {
  ReplyForm,
  ReplyInput,
  ReplyInputWrapper,
  ReplyInputFilled,
  ReplyInputFilledWrapper,
  ReplyEnter,
} from './styles';
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
  const [onReply, setOnReply] = useState(false);
  const handleClickReplyButton = useCallback(() => setOnReply(true), []);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContents(e.currentTarget.value);
  }, []);

  const [isFocus, setIsFocus] = useState(false);
  const onFocus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(true);
  }, []);
  const onFocusOut = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(false);
  }, []);

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
      setReplyContents('');
    }
  };
  return (
    <>
      <ReplyButton onClick={handleClickReplyButton}>답글</ReplyButton>
      {onReply ? (
        <div>
          <ReplyForm onSubmit={onSubmit} data-comments_id={comment._id || ''}>
            <ReplyInputWrapper>
              <ReplyInput
                value={replyContents}
                onChange={onChange}
                name="contents"
                type="textarea"
                placeholder="답글 내용을 입력해주세요."
                onFocus={onFocus}
                onBlur={onFocusOut}
                autoComplete="off"
              />
              <ReplyInputFilledWrapper>
                <ReplyInputFilled isFocus={isFocus} />
              </ReplyInputFilledWrapper>
            </ReplyInputWrapper>
            <ReplyEnter disabled={!replyContents}>답글</ReplyEnter>
          </ReplyForm>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
