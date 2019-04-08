import React, { Component } from 'react'
import {connect} from 'react-redux'

export default class Task extends  Component {
  render() {
    const {task} = this.props
    const username = task ? task.username : null
    const email = task ? task.email : null
    const text = task ? task.text : null
    return <div>
            <div>{username}</div>
            <div>{email}</div>
            <div>{text}</div>
          </div>
  }
}
