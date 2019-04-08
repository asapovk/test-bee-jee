import React, { Component } from 'react';
import logo from './logo.svg';
import {getAuthFromStorage} from './ducks/auth'
import Front from './components/Front'
import './App.css';


class App extends Component {
  componentDidMount () {
    getAuthFromStorage()
}
  render() {
    return <Front/>
  }
}

export default App;
