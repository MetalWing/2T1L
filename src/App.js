import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import CreateRoom from './components/createRoom';
import Home from './components/home';
import Lobby from './components/lobby';
import Join from './components/join';

// Test comment.
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
          <Route path="/join">
            <Join />
          </Route>
        </Switch>
    </Router>
  );
}
