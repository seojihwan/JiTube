import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { NavBar } from './containers';
import { Home, Login, SignUp, Upload } from './pages';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/video/upload" component={Upload} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
