import React from 'react';
import { useHistory } from 'react-router-dom';

export interface ILogoutProps {
  authentication: boolean;
  requestLogout(): void;
}
export const LogoutButton: React.FC<ILogoutProps> = (props) => {
  const history = useHistory();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.requestLogout();
    document.cookie = 'xAuth=; expires=Thu, 01 Jan 1970 00:00:00';
    history.push('/');
  };
  return <button onClick={onClick}>로그 아웃</button>;
};
