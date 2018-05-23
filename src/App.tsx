import React from "react";
import { Router, Route, Link, Switch } from "react-static";
import { hot } from "react-hot-loader";
//

import Admin from './containers/Admin';
import AppContainer from './components/AppContainer';
import Routes from "react-static-routes";


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/admin" component={Admin} />
        <AppContainer>
          <Routes />
        </AppContainer>
      </Switch>
    </div>
  </Router>
);

export default hot(module)(App);
