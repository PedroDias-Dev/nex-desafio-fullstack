import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from './pages/login/index';
import Register from './pages/register/index';
import NotFound from './pages/not_found/index';
import Products from './pages/products/index';

import jwt_decode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

const PrivateRoute = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      localStorage.getItem('token') !== null && jwt_decode(localStorage.getItem('token')).role === 'admin' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route path='/login'  component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/products' component={Products} />

      <Route
        render = {
          props => 
            <Redirect to={{pathname : '/products', state :{from : props.location}}} /> 
        }
      />
      
      <Route component={NotFound} />
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