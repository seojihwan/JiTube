import styled from 'styled-components';
import down_triangle from './res/down-triangle.svg';
import up_triangle from './res/up-triangle.svg';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #030303;
  img {
    height: 32px;
  }
  > div:last-child {
    margin-top: 6px;
  }
  margin-bottom: 10px;
`;

export const CommentContentsWrapper = styled.div`
  flex: 1;
`;
export const CommentAdminName = styled.div`
  font-size: 13px;
  padding-bottom: 5px;
`;
export const CommentContents = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
`;

export const UpTriangleArrow = styled.button`
  border: none;
  outline: none;
  width: 10px;
  height: 10px;
  background: url(${up_triangle});
  background-repeat: no-repeat;
  background-size: 10px;
`;

export const DownTriangleArrow = styled.button`
  border: none;
  outline: none;
  width: 10px;
  height: 10px;
  background: url(${down_triangle});
  background-repeat: no-repeat;
  background-size: 10px;
`;

export const ShowButton = styled.button`
  border: none;
  outline: none;
  color: #0087ff;
  background-color: #fff;
  cursor: pointer;
`;
