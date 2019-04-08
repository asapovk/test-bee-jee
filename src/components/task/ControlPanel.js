import React, { Component } from 'react'
import {connect} from 'react-redux'

export default class ControlPanel extends  Component {

  handleSelectSorting = (sortType) => () => {
    this.props.onSort(sortType)
  }

  handleSelectDirection = (sortDirection) => () => {
    this.props.onSortDirection(sortDirection)
  }

  render() {
    return <div>
              <ul>
                <button onClick={this.handleSelectSorting('asc')}>
                  asc
                </button>
                <button onClick={this.handleSelectSorting('dec')}>
                  dec
                </button>
              </ul>  
              <ul>
                <button onClick={this.handleSelectSorting('email')}>Sort by email</button>
                <button onClick={this.handleSelectSorting('username')}>Sort by username</button>
                <button onClick={this.handleSelectSorting('status')}>Sort by status</button>
              </ul>
            </div>
  }
}
