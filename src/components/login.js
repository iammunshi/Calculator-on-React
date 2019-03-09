import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {loginFB} from '../config/firebase';
import {authInfo} from '../config/router';
import {connect} from 'react-redux';
import {updateUser} from '../redux/action'


class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(){
        console.log("Running Login")
        const {email, password} = this.state;
        const user = await loginFB(email, password);
        console.log("hbhbakb,jmn a.nx amkxna.kxnas.", user);
        authInfo.login(user);
        this.props.updateUserFunc(user);
        this.props.history.push({
            pathname: "/profile",
            state:{
                user
            }
        })
        //this.props.getUser(user);
    }
    register(){
        this.props.history.push('register')
        //console.log(this.props)
    }
  render() {
    return (
        <div>
        <Form>
            <h3>Login</h3>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={(e) => this.setState({email: e.target.value})}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e) => this.setState({password: e.target.value})}/>
        </FormGroup>
        <FormGroup>
            <Button color="primary" onClick={this.login}>Submit</Button>
        </FormGroup>
        
      </Form>
      <Button onClick={this.register} to="/register">Don't have account? Register</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       updateUserFunc: (user) => dispatch(updateUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);