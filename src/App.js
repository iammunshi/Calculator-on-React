import React, { Component } from 'react';
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile';
import ChangePassword from './components/changePassword'
import { Container, Row, Button, Col } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isRegister: false,
      isLogin: true,
      changePassword: false
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.profile = this.profile.bind(this);
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

  logout(){
    this.setState({ user: undefined })
  }

  changePassword(){
    this.setState({ changePassword: true })
  }
  profile(){
    this.setState({
      changePassword: false
    })
  }
  render() {
    const {isRegister, isLogin, user, changePassword} = this.state;
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
            {!user && isLogin && <Login getUser={this.getUser} />}
            {!user && isLogin && <Button onClick={this.register}>Don't have account? Register</Button>}
            {!user && isRegister && <Register />}
            {!user && isRegister && <Button onClick={this.login}>Click here to Login</Button>}
            {user && !changePassword && <Profile {...user} logout={this.logout} changePassword={this.changePassword}/>}
            {user && changePassword && <ChangePassword logout={this.logout} profile={this.profile}/>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
