import React, { Component } from 'react'
import {connect} from 'react-redux'

export default class Task extends  Component {
  render() {
    const {task} = this.props
    const user = task ? task.user : null
    const email = task ? task.email : null
    const text = task ? task.text : null
    return <div>
            <div>{user}</div>
            <div>{email}</div>
            <div>{text}</div>
          </div>
  }  
}
