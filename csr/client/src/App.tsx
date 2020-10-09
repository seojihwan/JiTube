import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Login, SignUp } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
