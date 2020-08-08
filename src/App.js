import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar'
import Movies from './components/ShowData';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path='/movies' component={Movies} />
          <Route path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  );
}

export default App;