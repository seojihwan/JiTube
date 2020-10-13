import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { IStoreState } from '../store';
import { AuthDiv } from './styles';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useSelector((store: IStoreState) => store.authentication);

  const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestLogin({ email, password }));
  };

  return auth ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={onSubmit}>
      <AuthDiv>
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeEmail}
          placeholder="이메일"
        ></input>
        <input
          type="password"
          name="password"
          autoComplete="on"
          value={password}
          onChange={changePassword}
          placeholder="비밀번호"
        ></input>
        <button>로그인</button>
      </AuthDiv>
    </form>
  );
};
