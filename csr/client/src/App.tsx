import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { NavBar } from './component';
import { Home, Login, SignUp, Upload, VideoDetail } from './pages';
import { v4 } from 'uuid';
import { Results } from './pages/Results';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home key={v4()} />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/video/upload"
            render={() => <Upload key={v4()} />}
          />
          <Route exact path="/video/:id" component={VideoDetail} />
          <Route exact path="/results" component={Results} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
