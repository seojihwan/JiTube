import styled from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #030303;
  img {
    height: 32px;
    margin-right: 8px;
  }
  + div:last-child {
    margin-top: 6px;
  }
  margin-bottom: 10px;
`;

export const CommentContents = styled.div`
  flex: 1;
`;

export const ReplyButton = styled.button`
  outline: none;
  border: none;
  color: #606060;
  cursor: pointer;
  background-color: #fff;
`;
