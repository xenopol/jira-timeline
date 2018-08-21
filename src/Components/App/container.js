import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  setSprint as setSprintAction,
  setIssueState as setIssueStateAction,
} from '../../store/actions/data'

import { getActiveSprint, getIssues } from '../../api'
import { getStateFromServer } from '../../api'

import mockActiveSprint from '../../Mock/activeSprint'
import mockIssues from '../../Mock/issues'

import App from './'

const getData = async () => {
  const { data: sprintData } = await getActiveSprint()
  const [activeSprint] = sprintData.values
  const { data: issuesData } = await getIssues(activeSprint.id)
  return {
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: issuesData.issues,
  }
}

const getMockData = async () => {
  const [activeSprint] = mockActiveSprint.values
  return {
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: mockIssues.issues,
  }
}

class AppContainer extends Component{
  state = { loading: true }

  componentDidMount() {
    const { setSprint, setIssueState } = this.props

    getMockData()
      .then(({ sprintId, sprintStart, sprintEnd, issues }) => {
        setSprint({ sprintId, sprintStart, sprintEnd, issues })

        getStateFromServer(sprintId)
        .then(({ data: { issues } }) => {
            setIssueState({ issuesState: issues })
            this.setState({ loading: false })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { loading } = this.state
    return !loading && <App />
  }
}

const mapStateToProps = state => ({
  sprintId: state.sprintId,
  sprintStart: state.sprintStart,
  sprintEnd: state.sprintEnd,
  issues: state.issues,
  issuesState: state.issuesState,
})

const mapDispatchToProps = dispatch => ({
  setSprint: sprint => dispatch(setSprintAction(sprint)),
  setIssueState: issueState => dispatch(setIssueStateAction(issueState)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
