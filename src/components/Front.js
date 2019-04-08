import React, { Component } from 'react'
import {connect} from 'react-redux'
import {userSelector, signOut} from '../ducks/auth'
import {fetchTask, taskSelector} from '../ducks/task'

import AuthForm from './auth/AuthForm'
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'
import PagesList from  './task/PagesList'
import ControlPanel from './task/ControlPanel'

class Front extends  Component {

  state = {
    openLoginForm: false,
    sortType: null,
    sortDirection: null
  }

  componentDidMount () {
    this.props.fetchTask()
  }



  handleOpenLoginForm = () => {
    this.setState({openLoginForm: true})
  }

  handleCloseLoginForm = () => {
    this.setState({openLoginForm: false})
  }

  selectPage = (pageNumber) => {
    const {sortType, sortDirection} =this.state
    this.props.fetchTask({sort_field: sortType, sort_direction: sortDirection, page: pageNumber})

  }

  selectSort = (sorttype) => {
    //alert(sorttype)
    this.setState({sortType: sorttype})
    const {sortType, sortDirection} = this.state
    this.props.fetchTask({sort_field: sorttype, sort_direction: sortDirection})
  }

  selectSortDirection = (sortdirection) => {
    //alert(sortdirection)
    this.setState({sortDirection: sortdirection})
    const {sortType, sortDirection} = this.state
    this.props.fetchTask({sort_field: sortType, sort_direction: sortdirection})
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
            <ControlPanel onSort={this.selectSort} onSortDirection={this.selectSortDirection}/>
            <TaskList tasks={this.props.tasks}/>
            <PagesList onSelect={this.selectPage}/>
          </div>
  }
}

export default connect((state)=>({user: userSelector(state), tasks: taskSelector(state)}),{signOut, fetchTask})(Front)
