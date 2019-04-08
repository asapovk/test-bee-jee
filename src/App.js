import React, { Component } from 'react';
import logo from './logo.svg';
import {getAuthFromStorage} from './ducks/auth'
import TaskList from './components/TaskList'
import './App.css';


class App extends Component {
  componentDidMount () {
    getAuthFromStorage()
}
  render() {
    return <TaskList/>
  }
}

export default App;
