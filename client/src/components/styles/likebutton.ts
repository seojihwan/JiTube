import styled from 'styled-components';
import skyblue_like from './res/skyblue-like.svg';
import gray_like from './res/gray-like.svg';

interface ButtonProps {
  like: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  background: ${(props) =>
    props.like ? `url(${skyblue_like})` : `url(${gray_like})`};
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const CommentLikeButton = styled.button<ButtonProps>`
  border: none;
  outline: none;
  width: 15px;
  height: 15px;
  background: ${(props) =>
    props.like ? `url(${skyblue_like})` : `url(${gray_like})`};
  background-repeat: no-repeat;
`;

export const CommentUnLikeButton = styled.button<ButtonProps>`
  border: none;
  outline: none;
  width: 15px;
  height: 15px;
  background: ${(props) =>
    props.like ? `url(${skyblue_like})` : `url(${gray_like})`};
  background-repeat: no-repeat;
`;
