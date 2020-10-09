import React, { useState } from 'react';

export interface ILoginComponentProps {
  authentication: string | null;
  requestLogin(email: string, password: string): void;
}

export const LoginComponent: React.FC<ILoginComponentProps> = (props) => {
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
    props.requestLogin(email, password);
  };
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
