import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Navbar from './components/Navbar'
import ShowData from './components/ShowData';
import Login from './components/Login';
import AddMovie from './components/AddMovie';

const routing = (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path='/show' component={ShowData} />
      <Route path='/login' component={Login} />
      <Route path='/add' component={AddMovie} />
      {/* <Route exact path="/contact" component={ContactUs} /> */}
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
