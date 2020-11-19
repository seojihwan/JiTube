import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestSignUp } from '../actions';
import { Redirect } from 'react-router-dom';
import { IStoreState } from '../store';
import { Form } from '../component';

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [name, setName] = useState<string>('');
  const auth = useSelector((store: IStoreState) => store.authentication);

  const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const changePassword2 = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword2(e.currentTarget.value);
  };
  const changeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      return alert('비밀번호 확인이 올바르지 않습니다.');
    }
    dispatch(requestSignUp({ email, password, name }));
  };

  return auth ? (
    <Redirect to="/" />
  ) : (
    <Form onSubmit={onSubmit}>
      <Form.Input
        type="email"
        name="email"
        placeholder="이메일"
        autoComplete="on"
        value={email}
        onChange={changeEmail}
      ></Form.Input>
      <Form.Input
        type="password"
        name="password"
        autoComplete="on"
        placeholder="비밀번호"
        value={password}
        onChange={changePassword}
      ></Form.Input>
      <Form.Input
        type="password"
        name="password2"
        autoComplete="on"
        placeholder="비밀번호 확인"
        value={password2}
        onChange={changePassword2}
      ></Form.Input>
      <Form.Input
        type="text"
        name="name"
        placeholder="이름"
        value={name}
        onChange={changeName}
      ></Form.Input>
      <Form.Button>회원가입</Form.Button>
    </Form>
  );
};
