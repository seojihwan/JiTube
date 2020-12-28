import styled from 'styled-components';

interface UserActiveContentsTabProps {
  width: number;
  translateX: number;
}

interface UserContentsTabProps {
  width: number;
}

export const UserWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsl(0, 0%, 98%);
`;

export const UserInfoWrapper = styled.div`
  width: 66%;
  min-width: 150px;
`;

export const UserContentsTabWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -2px;
  button {
    color: #606060;
    border: none;
    outline: none;
    padding: 10px 20px;
    background-color: hsl(0, 0%, 98%);
    cursor: pointer;
    :hover {
      color: #030303;
    }
  }
`;

export const UserTabWrapper = styled.div`
  display: flex;
  width: 20%;
  min-width: 150px;

  flex-direction: column;
`;

export const UserContentsTab = styled.button<UserContentsTabProps>`
  width: ${({ width }) => `${width}%`};
`;

export const UserActiveContentsTab = styled.div<UserActiveContentsTabProps>`
  width: ${({ width }) => `${width}%`};
  height: 2px;
  background-color: #606060;
  transform: ${({ translateX }) => `translateX(${translateX}%)`};
  transition: transform 0.3s;
`;
