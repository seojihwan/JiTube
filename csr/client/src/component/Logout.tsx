import React from 'react';
import { useHistory } from 'react-router-dom';
import { IAuthentication } from '../store';

export interface ILogoutProps {
  authentication: IAuthentication | null;
  requestLogout(): void;
}
export const LogoutButton: React.FC<ILogoutProps> = (props) => {
  const history = useHistory();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.requestLogout();
    history.push('/');
  };
  return <button onClick={onClick}>로그 아웃</button>;
};
