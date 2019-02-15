import React, { Component } from 'react';
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile';
import { Container, Row, Button, Col } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isRegister: false,
      isLogin: true
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  register(){
    this.setState({
      isRegister:true,
      isLogin:false
    })
  }
  login(){
    this.setState({
      isRegister: false,
      isLogin: true
    })
  }

  getUser(user){
    this.setState({
      user: user
    })
  }
  render() {
    const {isRegister, isLogin, user} = this.state;
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
            {!user && isLogin && <Login getUser={this.getUser} />}
            {!user && isLogin && <Button onClick={this.register}>Don't have account? Register</Button>}
            {!user && isRegister && <Register />}
            {!user && isRegister && <Button onClick={this.login}>Click here to Login</Button>}
            {user && <Profile {...user}/>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
