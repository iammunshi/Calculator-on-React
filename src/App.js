import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './screens/calculator';
import CustomButton from './components/customButton/customButton';
import Display from './components/display/display';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator text="Calculator in React"></Calculator>
          <Display displayStyle="displayStyle"></Display>
          <CustomButton text="C" style="numbers"></CustomButton>
          <CustomButton text="+/-" style="numbers"></CustomButton>
          <CustomButton text="%" style="numbers"></CustomButton>
          <CustomButton text="/" style="operators"></CustomButton>
          <br/>
          <CustomButton text="7" style="numbers"></CustomButton>
          <CustomButton text="8" style="numbers"></CustomButton>
          <CustomButton text="9" style="numbers"></CustomButton>
          <CustomButton text="*" style="operators"></CustomButton>
          <br/>
          <CustomButton text="4" style="numbers"></CustomButton>
          <CustomButton text="5" style="numbers"></CustomButton>
          <CustomButton text="6" style="numbers"></CustomButton>
          <CustomButton text="-" style="operators"></CustomButton>
          <br/>
          <CustomButton text="1" style="numbers"></CustomButton>
          <CustomButton text="2" style="numbers"></CustomButton>
          <CustomButton text="3" style="numbers"></CustomButton>
          <CustomButton text="+" style="operators"></CustomButton>
          <br/>
          <CustomButton text="0" style="numbers"></CustomButton>
          <CustomButton text="." style="numbers"></CustomButton>
          <CustomButton text="del" style="numbers"></CustomButton>
          <CustomButton text="=" style="equalTo"></CustomButton>
      </div>
    );
  }
}

export default App;
