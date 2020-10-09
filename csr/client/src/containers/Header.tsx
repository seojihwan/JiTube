import React from 'react';
import { connect } from 'react-redux';
import { requestLogout } from '../actions';
import { ILogoutComponent, LogoutComponent } from '../component';
import { IStoreState } from '../store';

const Header: React.FC<ILogoutComponent> = (props) => {
  return <LogoutComponent {...props} />;
};

export default connect(
  (state: IStoreState) => ({
    authentication: state.authentication,
  }),
  (dispatch) => ({
    requestLogout: () => dispatch(requestLogout()),
  })
)(Header);
