import React, { Component } from 'react'
import {connect} from 'react-redux'
import TaskForm from './TaskForm'

export default class Task extends  Component {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({edit: !this.state.edit})
  }

  renderEditForm = (task) => {
    return <TaskForm task={task} handleClose={this.handleCloseForm}/>
  }

  handleCloseForm = () => {
    this.setState({edit: false})
  }

  renderTaskContent = (username, email, text, status) => {
    return <div>
              <br/>
              <div>{parseInt(status) === 10 ? 'Task is Done!' : null}</div>
              <div>{username}</div>
              <div>{email}</div>
              <div>{text}</div>
              <br/>
            </div>
  }

  render() {
    const {task, admin} = this.props
    const {edit} = this.state
    const username = task ? task.username : null
    const email = task ? task.email : null
    const text = task ? task.text : null
    const status = task ? task.status: null
    return <div>
            {edit ? this.renderEditForm(task) : this.renderTaskContent(username, email, text, status)}
            {admin ? <button onClick={this.toggleEdit}>edit</button>: null }
          </div>
  }
}
