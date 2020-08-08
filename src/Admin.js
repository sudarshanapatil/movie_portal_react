import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Login from './components/Login';
import AdminHome from './components/AdminHome';

function Admin({ match }) {
  return (
    <Router>
      <Switch>
        <Route path={`${match.url}/login`} component={Login} />
        <Route exact path={`${match.url}`} component={AdminHome} />
        <Redirect to={`${match.url}/login`} />
      </Switch>
    </Router>
  );
}

export default Admin;