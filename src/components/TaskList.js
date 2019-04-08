import React, { Component } from 'react'
import {connect} from 'react-redux'

import AuthForm from './auth/AuthForm'

export default class TaskList extends  Component {
  render() {
    return <AuthForm/>
  }
}
