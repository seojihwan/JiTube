import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { IStoreState } from '../store';
import { ReplyComment } from '../component';
import {
  CommentWrapper,
  CommentAdminName,
  CommentContents,
  CommentContentsWrapper,
  UpTriangleArrow,
  DownTriangleArrow,
  ShowButton,
  ReplyDeleteButton,
  Avatar,
} from './styles';
import { endpoint } from '../apis';
import { requestDeleteComment } from '../actions';
import { Link } from 'react-router-dom';

interface ICommentProps {
  video_id: string;
  comment: CommentDocument;
}

export const Comment: React.FC<ICommentProps> = ({ video_id, comment }) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const auth = useSelector((store: IStoreState) => store.authentication);
  const dispatch = useDispatch();

  const handleShowButton = () => {
    setIsShowReply(!isShowReply);
  };

  const handleRemoveComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (auth) {
      dispatch(
        requestDeleteComment({
          video_id,
          parrentComment_id: comment._id,
          comment_id:
            e.currentTarget.getAttribute('data-replycomment_id') || '',
        })
      );
    }
  };

  const replyComments = useMemo(() => comment.replyComments.reverse(), [
    comment,
  ]);
  return (
    <>
      <CommentWrapper>
        <Link
          to={{
            pathname: `/user/${comment.admin._id}`,
            state: { admin: comment.admin },
          }}
        >
          <Avatar src={endpoint + comment.admin.imageUrl} />
        </Link>
        <CommentContentsWrapper>
          <CommentAdminName>{comment.admin.name}</CommentAdminName>
          <CommentContents>{comment.contents}</CommentContents>
          <ReplyComment video_id={video_id} comment={comment} />
          {replyComments.length ? (
            <div>
              {isShowReply ? (
                <>
                  <UpTriangleArrow />
                  <ShowButton onClick={handleShowButton}>
                    답글 숨기기
                  </ShowButton>
                </>
              ) : (
                <>
                  <DownTriangleArrow />
                  <ShowButton onClick={handleShowButton}>
                    답글
                    {replyComments.length !== 1
                      ? ` ${replyComments.length}개 `
                      : ' '}
                    보기
                  </ShowButton>
                </>
              )}
            </div>
          ) : (
            <></>
          )}

          <div>
            {isShowReply &&
              replyComments.map((replyComment, idx) => (
                <CommentWrapper key={idx}>
                  <Link
                    to={{
                      pathname: `/user/${replyComment.admin._id}`,
                      state: { admin: replyComment.admin },
                    }}
                  >
                    <Avatar
                      style={{
                        width: '24px',
                        height: '24px',
                      }}
                      src={endpoint + replyComment.admin.imageUrl}
                    />
                  </Link>

                  <CommentContentsWrapper>
                    <CommentAdminName>
                      {replyComment.admin.name}
                    </CommentAdminName>
                    <CommentContents>{replyComment.contents}</CommentContents>
                  </CommentContentsWrapper>
                  {replyComment.admin._id === auth?.user_id && (
                    <ReplyDeleteButton
                      onClick={handleRemoveComment}
                      data-replycomment_id={replyComment._id}
                    >
                      삭제
                    </ReplyDeleteButton>
                  )}
                </CommentWrapper>
              ))}
          </div>
        </CommentContentsWrapper>
      </CommentWrapper>
    </>
  );
};
