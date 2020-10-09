import React from 'react';
import { connect } from 'react-redux';
import { ISignUpComponent, SignUpComponent } from '../component';
import { IStoreState } from '../store';
import { requestSignUp } from '../actions';

const SignUp: React.FC<ISignUpComponent> = (props) => (
  <SignUpComponent {...props} />
);

export default connect(
  (state: IStoreState) => ({
    authentication: state.authentication,
  }),
  (dispatch) => ({
    requestSignUp: (email: string, password: string, name: string) =>
      dispatch(requestSignUp({ email, password, name })),
  })
)(SignUp);
