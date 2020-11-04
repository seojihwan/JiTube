import styled from 'styled-components';
import down_triangle from './res/down-triangle.svg';
import up_triangle from './res/up-triangle.svg';

export const UpTriangleArrow = styled.button`
  border: none;
  outline: none;
  width: 10px;
  height: 10px;
  background: url(${up_triangle});
  background-repeat: no-repeat;
  background-size: 10px;
  cursor: pointer;
`;

export const DownTriangleArrow = styled.button`
  border: none;
  outline: none;
  width: 10px;
  height: 10px;
  background: url(${down_triangle});
  background-repeat: no-repeat;
  background-size: 10px;
  cursor: pointer;
`;

export const ShowButton = styled.button`
  border: none;
  outline: none;
  color: #0087ff;
  background-color: #fff;
  cursor: pointer;
`;
