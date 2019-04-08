import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createTask} from '../../ducks/task'

class TaskForm extends  Component {
  state = {
    user: '',
    email: '',
    text: ''
  }

  handleChange = (fieldName) => (e) => {
    this.setState({[fieldName]: e.target.value})
  }

  handleSubmit = () => {
    const {user, email, text} = this.state
    this.setState({user: '', email: '', text: ''})
    this.props.createTask({user, email, text})
  }

  render() {
    const {task} = this.props
    const user = task ? task.user : null
    const email = task ? task.email : null
    const text = task ? task.text : null
    return <div>
            <h4>Input username</h4>
            <input value={this.state.user}
              type="text"
              onChange={this.handleChange('user')}/>
            <h4>Input email</h4>
            <input value={this.state.email}
              type="text"
              onChange={this.handleChange('email')}/>
            <h4>Input text</h4>
            <textarea value={this.state.text}
              rows="10"
              onChange={this.handleChange('text')}>
              Describe you task...
            </textarea>
          </div>
  }
}


export default connect(null, {createTask})(TaskForm)
