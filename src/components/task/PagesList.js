
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {pagesSelector} from '../../ducks/task'
import Task from './Task'


class PagesList extends  Component {



  handleSelectPage = (pageNumber) => () => {
    this.props.onSelect(pageNumber)
  }

  render() {
    const {pages} = this.props
    const foo = pages ? new Array(pages).fill(pages): null
    const pageComonents = pages ? foo.map((page, index) => {
      const pageNumber = index+1
      return <button key={index} onClick={this.handleSelectPage(pageNumber)}>{pageNumber}</button>
    }): null
    return <ul>{pageComonents}</ul>
  }
}


export default connect((state)=> ({pages: pagesSelector(state)}))(PagesList)
