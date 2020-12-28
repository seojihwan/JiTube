import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { NavBar } from './components';
import { Home, Login, SignUp, Upload, VideoDetail } from './pages';
import { v4 } from 'uuid';
import { SearchResults, User } from './pages';
import * as ROUTES from './constants/routes';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path={ROUTES.HOME} render={() => <Home key={v4()} />} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.SIGNUP} component={SignUp} />
        <Route
          exact
          path={ROUTES.UPLOAD}
          render={() => <Upload key={v4()} />}
        />
        <Route exact path={ROUTES.VIDEO} component={VideoDetail} />
        <Route exact path={ROUTES.RESULTS} component={SearchResults} />
        <Route exact path={ROUTES.USER} component={User} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
