import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Login from './components/Login';
import AdminHome from './components/AdminHome';
import Auth from './components/Auth';

function Admin({ match }) {
  return (
    <Auth>
      <Switch>
        <Route path={`${match.url}/login`} component={Login} />
        <Route exact path={`${match.url}`} component={AdminHome} />
        <Redirect to={`${match.url}/login`} />
      </Switch>
    </Auth>
  );
}

export default Admin;