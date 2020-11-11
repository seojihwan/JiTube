import styled from 'styled-components';

export const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  img {
    height: 30px;
  }
`;

export const NavStart = styled.div`
  display: flex;
  align-items: center;
`;
export const NavEnd = styled.div`
  display: flex;
  flex: 0 1 200px;
  button {
    border: none;
    outline: none;
    font-size: 12px;
    color: #bbb;
    background-color: #fff;
    :hover {
      transform: scale(1.1);
    }
  }
`;
