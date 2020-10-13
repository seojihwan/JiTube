import styled from 'styled-components';
import { Col } from 'antd';

export const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  width: 100%;
  height: 56px;
  img {
    height: 30px;
  }
  button {
    height: 30px;
    border: none;
    outline: none;
    font-size: 12px;
    color: #bbb;
    background-color: #fff;
    :hover {
      color: #bbb;
      transform: scale(1.1);
    }
  }
`;

export const NavStart = styled.div`
  display: flex;
`;
export const NavEnd = styled.div`
  display: flex;
  flex: 0 1 200px;
`;
