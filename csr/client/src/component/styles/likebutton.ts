import styled from 'styled-components';
import heart_red from './res/heart_red.svg';
import heart_blank from './res/heart_blank.svg';

interface ButtonProps {
  like: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  width: 30px;
  height: 30px;
  background: ${(props) =>
    props.like ? `url(${heart_red})` : `url(${heart_blank})`};
  background-repeat: no-repeat;
`;
