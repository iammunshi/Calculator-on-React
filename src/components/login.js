import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {loginFB} from '../config/firebase';


class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    async login(){
        console.log("Running Login")
        const {email, password} = this.state;
        const user = await loginFB(email, password);
        console.log("hbhbakb,jmn a.nx amkxna.kxnas.", user);
        this.props.getUser(user);
    }
  render() {
    return (
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
            <Button onClick={this.login}>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Login;