import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogout } from '../actions';
import { LogoutButton } from '.';
import { IStoreState } from '../store';
import Logo from './styles/res/youtube.svg';
import { Avatar, NavDiv, NavStart, NavEnd } from './styles';
import { Search } from '../component';
import { endpoint } from '../apis';

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store: IStoreState) => store.authentication);
  return (
    <NavDiv>
      <NavStart>
        <HomeButton />
      </NavStart>
      <Search />
      <NavEnd>
        {auth && <UserButton admin={auth} />}
        <UploadButton />
        {auth ? (
          <LogoutButton
            authentication={auth}
            requestLogout={() => dispatch(requestLogout())}
          />
        ) : (
          <>
            <LoginButton />
            <SigninButton />
          </>
        )}
      </NavEnd>
    </NavDiv>
  );
};

export const HomeButton = () => {
  return (
    <Link to="/">
      <img src={Logo} alt="" />
    </Link>
  );
};
export const UploadButton = () => {
  return (
    <Link to="/video/upload">
      <button>업로드</button>
    </Link>
  );
};
export const UserButton = ({
  admin,
}: {
  admin: { imageUrl: string; name: string; user_id: string };
}) => {
  return (
    <Link
      to={{
        pathname: `/user/${admin.user_id}`,
        state: { admin: admin },
      }}
    >
      <Avatar src={endpoint + admin.imageUrl} />
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
