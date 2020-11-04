import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentDocument } from '../../../server/models';
import { IStoreState } from '../store';
import { ReplyComment } from '../component';
import {
  CommentWrapper,
  CommentContents,
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
  console.log(comment);
  return (
    <>
      <CommentWrapper>
        <img src={`${endpoint}${comment.admin.imageUrl}`}></img>
        <CommentContents>
          <div>{comment.admin.name}</div>
          <div>{comment.contents}</div>
          <ReplyComment video_id={video_id} comment={comment} />
          {comment.replyComments.length ? (
            <div>
              {isShowReply ? (
                <>
                  <ShowButton onClick={handleShowButton}>
                    <UpTriangleArrow />
                    답글 숨기기
                  </ShowButton>
                </>
              ) : (
                <>
                  <ShowButton onClick={handleShowButton}>
                    <DownTriangleArrow />
                    답글
                    {comment.replyComments.length !== 1
                      ? ` ${comment.replyComments.length}개 `
                      : ''}
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
              comment.replyComments
                .reverse()
                .map((replyComment, idx) => (
                  <div key={idx}>{replyComment.admin.name}</div>
                ))}
          </div>
        </CommentContents>
      </CommentWrapper>
    </>
  );
};
