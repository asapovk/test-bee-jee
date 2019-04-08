import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createTask, editTask} from '../../ducks/task'

class TaskForm extends  Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.task ? this.props.task.username : '',
      email: this.props.task ? this.props.task.email : '',
      text: this.props.task ? this.props.task.text : '',
      status: this.props.task ? this.props.task.status : '',
    }
  }

  handleChange = (fieldName) => (e) => {
    const {task} = this.props
    if (task) {
      if (fieldName !== 'username' && fieldName !== 'email')
      this.setState({[fieldName]: e.target.value})
    }
    else {
      if (fieldName !== 'status')
      this.setState({[fieldName]: e.target.value})
    }
  }

  handleSubmit = () => {
    const {username, email, text, status} = this.state
    const {task} = this.props
    if (task) {
      const taskId = task.id
      this.props.editTask({task : {status, text, email, username} , taskId})
    }
    else {
      this.props.createTask({username, email, text, status})
    }
    this.setState({username: '', email: '', text: '', status: ''})
    
  }

  render() {
    return <div>
            <h4>Input username</h4>
            <input value={this.state.username}
              type="text"
              onChange={this.handleChange('username')}/>
            <h4>Input email</h4>
            <input value={this.state.email}
              type="text"
              onChange={this.handleChange('email')}/>
            <h4>Input status</h4>
            <input value={this.state.status}
              type="text"
              onChange={this.handleChange('status')}/>
            <h4>Input text</h4>
            <textarea value={this.state.text}
              rows="10"
              onChange={this.handleChange('text')}>
              Describe you task...
            </textarea>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
  }
}


export default connect(null, {createTask, editTask})(TaskForm)
