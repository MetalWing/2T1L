import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Lobby from './components/lobby';
import Home from './components/home';
import Room from './components/room';

export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
        </Switch>
    </Router>
  );
}
