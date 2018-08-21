import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setStepSize as setStepSizeAction } from '../../store/actions/setStepSize'

import Timeline from './'

const parseDate = date => {
  const [day] = date.split('T') // split date from time
  return new Date(day)
}

const timelineRef = React.createRef()

class TimelineContainer extends Component{
  componentDidMount() {
    const { setStepSize } = this.props
    const { current: timeline } = timelineRef
    const timelineWidth = timeline.offsetWidth
    const halfTimelineDay = (timelineWidth / 11) / 2

    setStepSize(halfTimelineDay)
  }

  render() {
    const { sprintStart, sprintEnd, stepSize, issues, issuesState } = this.props
    const startDay = parseDate(sprintStart)
    const endDay = parseDate(sprintEnd)

    return <Timeline
      stepSize={ stepSize }
      issues={ issues }
      issuesState={ issuesState }
      ref={ timelineRef }
      startDay={ startDay }
      endDay={ endDay }
    />
  }
}

const mapStateToProps = ({ sprint, stepSize }) => ({
  sprintStart: sprint.sprintStart,
  sprintEnd: sprint.sprintEnd,
  issues: sprint.issues,
  issuesState: sprint.issuesState,
  stepSize: stepSize,
})

const mapDispatchToProps = dispatch => ({
  setStepSize: stepSize => dispatch(setStepSizeAction(stepSize)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
