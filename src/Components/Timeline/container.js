import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStepSize as setStepSizeAction } from '../../store/actions/step-size'
import { parseDate } from './utils'

import Timeline from './'

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
    const { name, sprintStart, sprintEnd, stepSize, issues, storyChanges } = this.props
    const startDay = parseDate(sprintStart)
    const endDay = parseDate(sprintEnd)

    return <Timeline
      name={ name }
      stepSize={ stepSize }
      issues={ issues }
      storyChanges={ storyChanges }
      timelineRef={ timelineRef }
      startDay={ startDay }
      endDay={ endDay }
    />
  }
}

const mapStateToProps = ({ sprint, stepSize, storyChanges }) => ({
  name: sprint.name,
  sprintStart: sprint.sprintStart,
  sprintEnd: sprint.sprintEnd,
  issues: sprint.issues,
  storyChanges,
  stepSize: stepSize,
})

const mapDispatchToProps = dispatch => ({
  setStepSize: stepSize => dispatch(setStepSizeAction(stepSize)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
