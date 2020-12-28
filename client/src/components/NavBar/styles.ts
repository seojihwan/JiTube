import styled from 'styled-components';

export const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
`;

export const NavStart = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    height: 30px;
  }
`;
export const NavEnd = styled.div`
  display: flex;
  flex: 0 1 200px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    text-decoration: none;
    min-width: 40px;
  }
  button {
    border: none;
    outline: none;
    font-size: 12px;
    color: #bbb;
    background-color: #fff;
    min-width: 70px;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
`;
