import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Cockpit from './pages/cockpit/Cockpit';    

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/cockpit" component={Cockpit} />
        </Switch>
      </Router>
      );
  }
}
