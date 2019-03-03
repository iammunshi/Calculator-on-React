import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Header from '../components/header'
import Home from '../components/home'
import SingleAd from '../components/singleAd'
import Register from '../components/register'
import Login from '../components/login'
import Profile from '../components/profile';
import ChangePassword from '../components/changePassword'
import AddItem from '../components/addItem';
import { Container, Row, Button, Col } from 'reactstrap';

const BasicExample = () => (
  <Router>
    <div>
    <Header/>
      <Container fluid="true">
        <Row>
          <Col>
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute path="/singleAd/:id" component={SingleAd} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <PrivateRoute path="/Profile" component={Profile} />
          </Col>
        </Row>
      </Container>
      
    </div>
  </Router>
);

const authInfo = {
  isAuthenticated: !!localStorage.getItem('user'),
  login: function(user){
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true
  },
  logout: function(user){
    this.isAuthenticated = false
  }
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route 
  {...rest}
  render={props => 
  authInfo.isAuthenticated ? (
    <Component {...props} />
  ): (
    <Redirect
      to={{
        pathname: "/login",
        state: {from: props.location}
      }}
      />
  )
}
/>
);

const AuthRoute = ({ component: Component, ...rest}) => (
  <Route 
  {...rest}
  render={props => 
  !authInfo.isAuthenticated ? (
    <Component {...props} />
  ): (
    <Redirect
      to={{
        pathname: "/profile",
        state: {from: props.location}
      }}
      />
  )
}
/>
);

export {
  BasicExample,
  authInfo
};