import React, { Component } from 'react'
import Story from '../Story/withDraggable'
import { getStateFromServer } from '../../api'

import './index.css'

const parseDate = date => {
  const [startDate] = date.split('T') // split date from time
  return new Date(startDate)
}

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const generateDays = (start, end) => {
  let currentDate = start
  const days = []
  while (currentDate.getDate() !== (end.getDate() + 1)) { // + 1 == include the last day also
    const day = {
      number: currentDate.getDate(),
      isWeekend: currentDate.getDay() === 6 || currentDate.getDay() === 0
    }
    days.push(day)
    currentDate = addDays(currentDate, 1)
  }
  return days
}

const getClassName = day => (
  `${day.isWeekend ? 'isWeekend' : ''} ${day.number === new Date().getDate() ? 'isCurrent' : ''}`
)

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepSize: null,
      issuesState: []
    }

    this.timelineRef = React.createRef()
  }

  componentDidMount() {
    const { sprintId } = this.props
    const { current: timeline } = this.timelineRef
    const timelineWidth = timeline.offsetWidth
    const halfTimelineDay = (timelineWidth / 11) / 2

    getStateFromServer(sprintId)
      .then(({ data }) => {
        const { issues } = data
        this.setState({ stepSize: halfTimelineDay, issuesState: issues })
      })
  }

  render() {
    const { sprintId, sprintStart, sprintEnd, issues } = this.props
    const { stepSize, issuesState } = this.state
    const start = parseDate(sprintStart)
    const end = parseDate(sprintEnd)
    const days = generateDays(start, end)

    return (
      <div className="Timeline" ref={ this.timelineRef }>
        <div className="Timeline-header">
          { days.map((day, i) => (
            <div key={ i } className={ `Timeline-day ${getClassName(day)}` }>
              { day.number }
            </div>
          )) }
        </div>
        {
          stepSize && <div className="Timeline-body">
            {
              issues.map(issue => {
                const activeIssue = issuesState.find(elem => elem.id === issue.id) || {}
                return (
                  <Story
                    key={ issue.id }
                    sprintId={ sprintId }
                    issue={ issue }
                    issueState={ activeIssue }
                    stepSize={ stepSize }
                  />
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default Timeline
