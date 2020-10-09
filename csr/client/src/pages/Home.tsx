import React from 'react';
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div>
      Home
      <Link to="/login">login</Link>
      <Link to="/signup">signup</Link>
    </div>
  );
};
