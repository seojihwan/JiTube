import React, { useState } from 'react';

export interface ISignUpComponent {
  authentication: string | null;
  requestSignUp(email: string, password: string, id: string): void;
}

export const SignUpComponent: React.FC<ISignUpComponent> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [name, setName] = useState<string>('');

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
    props.requestSignUp(email, password, name);
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
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="password2"
          autoComplete="on"
          value={password2}
          onChange={changePassword2}
        ></input>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={changeName}
        ></input>
        <button>회원가입</button>
      </form>
    </div>
  );
};
