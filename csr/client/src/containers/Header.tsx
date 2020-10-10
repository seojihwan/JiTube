import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogout } from '../actions';
import { LogoutButton } from '../component';
import { IStoreState } from '../store';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const authentication = useSelector(
    (store: IStoreState) => store.authentication
  );
  return (
    <LogoutButton
      authentication={authentication}
      requestLogout={() => dispatch(requestLogout())}
    />
  );
};
