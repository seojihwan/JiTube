import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogout } from '../actions';
import { LogoutButton } from '../component';
import { useAuthCheck } from '../hook';
import { IStoreState } from '../store';

export const UploadButton = () => {
  return (
    <Link to="/video/upload">
      <button>업로드</button>
    </Link>
  );
};
export const LoginButton = () => {
  return (
    <Link to="/login">
      <button>로그인</button>
    </Link>
  );
};
export const SigninButton = () => {
  return (
    <Link to="/signup">
      <button>회원가입</button>
    </Link>
  );
};
export const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const authentication = useSelector(
    (store: IStoreState) => store.authentication
  );
  return (
    <>
      <UploadButton />
      {authentication ? (
        <LogoutButton
          authentication={authentication}
          requestLogout={() => dispatch(requestLogout())}
        />
      ) : (
        <>
          <LoginButton />
          <SigninButton />
        </>
      )}
    </>
  );
};
