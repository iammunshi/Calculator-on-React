import React, { Component } from 'react';
import './style.css';

class calculator extends Component{
    render(){
        return (
            <p className="customStyle">{this.props.text}</p>
        )
    }
}

export default calculator;