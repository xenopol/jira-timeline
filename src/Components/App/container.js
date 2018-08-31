import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSprint as setSprintAction } from '../../store/actions/sprint'

import App from './'

class AppContainer extends Component{
  componentDidMount() {
    const { setSprint } = this.props
    setSprint()
  }

  render() {
    const { loading, error } = this.props
    if (error) return <h3>{ error }</h3>
    return !loading && <App />
  }
}

const mapStateToProps = ({ status: { loading, error } }) => ({ loading, error })

const mapDispatchToProps = dispatch => ({
  setSprint: sprint => dispatch(setSprintAction(sprint)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
