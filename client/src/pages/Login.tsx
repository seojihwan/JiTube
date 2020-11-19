import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { IStoreState } from '../store';
import { Form } from '../component/';

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
    <Form onSubmit={onSubmit}>
      <Form.Input
        type="email"
        name="email"
        value={email}
        onChange={changeEmail}
        placeholder="이메일"
      ></Form.Input>
      <Form.Input
        type="password"
        name="password"
        autoComplete="on"
        value={password}
        onChange={changePassword}
        placeholder="비밀번호"
      ></Form.Input>
      <Form.Button>로그인</Form.Button>
    </Form>
  );
};
