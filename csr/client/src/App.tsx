import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Login, Register } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
