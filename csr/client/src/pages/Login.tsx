import React, { useState } from 'react';
import { ILoginComponentProps, LoginComponent } from '../component';
import { connect } from 'react-redux';
import { IStoreState } from '../store';
import { requestLogin } from '../actions';
const Login: React.FC<ILoginComponentProps> = (props) => (
  <LoginComponent {...props} />
);

export default connect(
  (state: IStoreState) => ({
    authentication: state.authentication,
  }),
  (dispatch) => ({
    requestLogin: (email: string, password: string) =>
      dispatch(requestLogin({ email, password })),
  })
)(Login);
