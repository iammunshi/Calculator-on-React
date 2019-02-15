import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap';
import {updateFB, signoutFB} from '../config/firebase';


class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            age: props.age,
            email: props.email
        }
        this.update = this.update.bind(this);
        this.logoutt = this.logoutt.bind(this);
        this.changePasswordd = this.changePasswordd.bind(this);
    }

    update(){
        console.log("Running Update")
        const {name, age, email} = this.state;
        updateFB(name, age, email);
    }
    logoutt(){
        signoutFB();
        this.props.logout();
    }
    changePasswordd(){
        this.props.changePassword();
    }
  render() {
      const {email, name, age} = this.state
    return (
        <div>
        <Row>
            <Col>
                <Button onClick={this.changePasswordd} className="pullRight">Change Password</Button>
            </Col>
            <Col>
                <Button onClick={this.logoutt} className="pullRight">Logout</Button>
            </Col>
        </Row>
        <Form>
            <h3>Profile</h3>
        <FormGroup>
          <Label for="exampleEmail">Name</Label>
          <Input  id="exampleEmail" placeholder="with a placeholder" value={name} onChange={(e) => this.setState({name: e.target.value})}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Age</Label>
          <Input type="number" id="exampleEmail" placeholder="with a placeholder" value={age} onChange={(e) => this.setState({age: e.target.value})}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" disabled name="email" id="exampleEmail" placeholder="with a placeholder" value={email} onChange={(e) => this.setState({email: e.target.value})}/>
        </FormGroup>
        
        <Button onClick={this.update}>Submit</Button>
      </Form>
      </div>
    );
  }
}

export default Profile;