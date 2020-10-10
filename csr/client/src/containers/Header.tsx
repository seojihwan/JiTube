import React from 'react';
import { connect } from 'react-redux';
import { requestLogout } from '../actions';
import { LogoutButton, ILogoutProps } from '../component';
import { IStoreState } from '../store';

const Header: React.FC<ILogoutProps> = (props) => {
  return <LogoutButton {...props} />;
};

export default connect(
  (state: IStoreState) => ({
    authentication: state.authentication,
  }),
  (dispatch) => ({
    requestLogout: () => dispatch(requestLogout()),
  })
)(Header);
