import React, { Component } from 'react'
import {connect} from 'react-redux'
import {userSelector, signOut} from '../ducks/auth'

import AuthForm from './auth/AuthForm'
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'
import PagesList from  './task/PagesList'
import ControlPanel from './task/ControlPanel'

class Front extends  Component {

  state = {
    openLoginForm: false,
    pageNumber: 1,

  }

  handleOpenLoginForm = () => {
    this.setState({openLoginForm: true})
  }

  handleCloseLoginForm = () => {
    this.setState({openLoginForm: false})
  }

  selectPage = (pageNumber) => {
    alert(pageNumber)
  }

  selectSort = (sortType) => {
    alert(sortType)
  }

  rendeUserMenu = () => {
    const {user} = this.props
    const {openLoginForm} = this.state
    if(user) {
      return <div>
                <h4>{'Hello '+user}</h4>
                <button onClick={this.props.signOut}>Logout</button>
              </div>
    }
    else {
      return <div>{openLoginForm ? <AuthForm handleClose={this.handleCloseLoginForm}/> :
              <button onClick={this.handleOpenLoginForm}>Login</button>}</div>
    }
  }

  render() {
    return <div>
            {this.rendeUserMenu()}
            <TaskForm/>
            <ControlPanel onSort={this.selectSort}/>
            <TaskList/>
            <PagesList onSelect={this.selectPage}/>
          </div>
  }
}

export default connect((state)=>({user: userSelector(state)}),{signOut})(Front)
