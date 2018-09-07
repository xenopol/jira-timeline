import React from 'react'
import { connect } from 'react-redux'
import Timeline from '../Timeline/container'
import Login from '../Login'
import './index.css'

const AppContainer = ({ loading, error, isLoggedIn }) => (
  <div className="App">
    { error && <h3 className="App-error-banner">{ error }</h3> }
    <div className="App-body">
      { isLoggedIn ? <Timeline /> : <Login /> }
    </div>
  </div>
)

const mapStateToProps = ({ isLoggedIn, status: { loading, error } }) => ({
  isLoggedIn,
  loading,
  error,
})

export default connect(mapStateToProps, null)(AppContainer)
