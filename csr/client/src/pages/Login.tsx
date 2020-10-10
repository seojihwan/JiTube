import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../actions';
import { useHistory } from 'react-router-dom';
import { useAuthCheck } from '../hook';

export const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
  if (useAuthCheck()) {
    history.push('/');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeEmail}
        ></input>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          value={password}
          onChange={changePassword}
        ></input>
        <button>로그인</button>
      </form>
    </div>
  );
};
