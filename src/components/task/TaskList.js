import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchTask, taskSelector} from '../../ducks/task'
import Task from './Task'


class TaskList extends  Component {

  componentDidMount () {
    this.props.fetchTask()
  }

  render() {
    const {tasks} = this.props
    const taskComonents = tasks ? tasks.map((task, index) => {
      return <Task task={task} key={index}/>
    }): <div>is loading...</div>
    return <ul>{taskComonents}</ul>
  }
}


export default connect((state)=> ({tasks: taskSelector(state)}),{fetchTask})(TaskList)
