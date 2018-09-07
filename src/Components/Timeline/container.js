import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSprint as setSprintAction } from '../../store/actions/sprint'
import { setStepSize as setStepSizeAction } from '../../store/actions/step-size'
import { parseDate } from './utils'

import Timeline from './'

class TimelineContainer extends Component{
  componentDidMount() {
    const { setSprint } = this.props
    setSprint()
  }

  render() {
    const { name, sprintStart, sprintEnd, issues,
      storyChanges, loading, stepSize, setStepSize } = this.props

    if (loading) return (
      <div className="Timeline-loader-container">
        <div className="Timeline-loader"></div>
      </div>
    )
    const startDay = sprintStart && parseDate(sprintStart)
    const endDay = sprintEnd && parseDate(sprintEnd)

    return <Timeline
      name={ name }
      issues={ issues }
      storyChanges={ storyChanges }
      startDay={ startDay }
      endDay={ endDay }
      setStepSize={ setStepSize }
      stepSize={ stepSize }
    />
  }
}

const mapStateToProps = ({ sprint, stepSize, storyChanges, status }) => ({
  name: sprint.name,
  sprintStart: sprint.sprintStart,
  sprintEnd: sprint.sprintEnd,
  issues: sprint.issues,
  storyChanges,
  loading: status.loading,
  stepSize,
})

const mapDispatchToProps = dispatch => ({
  setSprint: () => dispatch(setSprintAction()),
  setStepSize: stepSize => dispatch(setStepSizeAction(stepSize)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
