import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin as handleLoginAction } from '../../store/actions/login'

import './index.css'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { hasUsername: false, hasPassword: false }

    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()

    this.handleLogin = this.handleLogin.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleUsernameChange({ target: { value } }) {
    this.setState({ hasUsername: value.length > 0 })
  }

  handlePasswordChange({ target: { value } }) {
    this.setState({ hasPassword: value.length > 0 })
  }

  handleLogin(e) {
    e.preventDefault()
    const { login } = this.props
    const { current: { value: usernameValue } } = this.usernameRef
    const { current: { value: passwordValue } } = this.passwordRef
    const credentials = btoa(`${usernameValue}:${passwordValue}`)
    login(credentials)
  }

  render() {
    const { hasUsername, hasPassword } = this.state
    const isFormReady = hasUsername && hasPassword

    return (
      <div className="Login">
        <h2 className="Login-title">Sprint Timeline</h2>
        <form className="Login-form" onSubmit={ this.handleLogin }>
          <input
            className="Login-input"
            placeholder="Username"
            ref={ this.usernameRef }
            onChange={ this.handleUsernameChange }
          />
          <input
            className="Login-input"
            type="password"
            placeholder="Password"
            ref={ this.passwordRef }
            onChange={ this.handlePasswordChange }
          />
          <button
            className="Login-button"
            type="submit"
            disabled={ !isFormReady }
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(handleLoginAction(credentials)),
})

export default connect(null, mapDispatchToProps)(Login)
