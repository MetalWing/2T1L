import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import CreateRoom from './components/createRoom';
import Home from './components/home';
import Lobby from './components/lobby';

export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/createRoom">
            <CreateRoom />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
        </Switch>
    </Router>
  );
}
