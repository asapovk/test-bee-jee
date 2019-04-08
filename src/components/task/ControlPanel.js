import React, { Component } from 'react'
import {connect} from 'react-redux'

export default class ControlPanel extends  Component {

  handleSelectSorting = (sortType) => () => {
    this.props.onSort(sortType)
  }

  render() {
    return <ul>
            <button onClick={this.handleSelectSorting('email')}>Sort by email</button>
            <button onClick={this.handleSelectSorting('username')}>Sort by username</button>
            <button onClick={this.handleSelectSorting('status')}>Sort by status</button>
          </ul>
  }
}
