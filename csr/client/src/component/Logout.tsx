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
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00';
    history.push('/');
  };
  return <button onClick={onClick}>로그 아웃</button>;
};
