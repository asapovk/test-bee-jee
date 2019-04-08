import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchTask, taskSelector} from '../../ducks/task'
import Task from './Task'


export default class TaskList extends  Component {

  render() {
    const {tasks} = this.props
    const taskComonents = tasks ? tasks.map((task, index) => {
      return <Task task={task} key={index}/>
    }): <div>is loading...</div>
    return <ul>{taskComonents}</ul>
  }
}
