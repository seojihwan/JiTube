import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutComponent } from '../component/';
import { Header } from '../containers/';
import { IStoreState } from '../store';

export const Home: React.FC = (props) => {
  return (
    <div>
      Home
      <Header />
      <Link to="/login">login</Link>
      <Link to="/signup">signup</Link>
    </div>
  );
};
