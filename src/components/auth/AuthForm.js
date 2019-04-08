import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../ducks/auth'


class AuthForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (fieldName) => (e) => {
    this.setState({[fieldName]: e.target.value})
  }

  handleSubmit = () => {
    const {username, password} = this.state
    this.setState({username: '', password: ''})
    this.props.signIn({username, password})
  }

  render() {
    return <div>
              <h4>username</h4>
              <div>
                  <input value={this.state.username}
                    onChange={this.handleChange('username')}
                    type="text"/>
              </div>
              <h4>password</h4>
              <div>
                  <input value={this.state.password}
                    onChange={this.handleChange('password')}
                    type="password"/>
              </div>
              <button onClick={this.handleSubmit}>Submit</button>
              <button onClick={this.props.handleClose}>Close</button>
            </div>
  }
}

export default connect(null,{signIn})(AuthForm)
