import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { NavBar } from './component';
import { Home, Login, SignUp, Upload, VideoDetail } from './pages';

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
          <Route exact path="/video/:id" component={VideoDetail} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
