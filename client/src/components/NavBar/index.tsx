import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IStoreState } from '../../store';
import Logo from './res/youtube.svg';
import { NavDiv, NavStart, NavEnd } from './styles';
import { Search } from './Search';
import { Avatar } from '../Avatar';
import { endpoint } from '../../apis';
import { requestLogout } from '../../actions';

export const NavBar: React.FC = () => {
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
          <LogoutButton />
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

const HomeButton = () => {
  return (
    <Link to="/">
      <img src={Logo} alt="" />
    </Link>
  );
};
const UploadButton = () => {
  return (
    <Link to="/video/upload">
      <button>업로드</button>
    </Link>
  );
};
const UserButton = ({
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

const LoginButton = () => {
  return (
    <Link to="/login">
      <button>로그인</button>
    </Link>
  );
};

const SigninButton = () => {
  return (
    <Link to="/signup">
      <button>회원가입</button>
    </Link>
  );
};

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onClick = () => {
    dispatch(requestLogout());
    history.push('/');
  };
  return <button onClick={onClick}>로그 아웃</button>;
};
