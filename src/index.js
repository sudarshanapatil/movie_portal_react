import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import Admin from './Admin';
import App from './App';

const routing = (
  <Router>
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/' component={App} />
      <Redirect to='/' />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
