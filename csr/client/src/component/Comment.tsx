import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
} from './styles';

const endpoint = 'http://localhost:4000';
interface ICommentProps {
  video_id: string;
  comment: CommentDocument;
}

export const Comment: React.FC<ICommentProps> = ({ video_id, comment }) => {
  const [isShowReply, setIsShowReply] = useState(false);

  const handleShowButton = () => {
    setIsShowReply(!isShowReply);
  };
  const replyComments = useMemo(() => comment.replyComments.reverse(), [
    comment,
  ]);

  return (
    <>
      <CommentWrapper>
        <img src={endpoint + comment.admin.imageUrl}></img>
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
                  <img
                    style={{ width: '24px', height: '24px' }}
                    src={endpoint + replyComment.admin.imageUrl}
                  />
                  <CommentContentsWrapper>
                    <CommentAdminName>
                      {replyComment.admin.name}
                    </CommentAdminName>
                    <CommentContents>{replyComment.contents}</CommentContents>
                  </CommentContentsWrapper>
                </CommentWrapper>
              ))}
          </div>
        </CommentContentsWrapper>
      </CommentWrapper>
    </>
  );
};
