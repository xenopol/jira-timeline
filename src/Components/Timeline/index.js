import React, { Component } from 'react'
import Story from '../Story'
import StoryWithRnd from '../Story/container'
import { isResolved } from '../Story'
import { generateDays } from './utils'

import './index.css'

const BORDER_COLOR = '#f5f5f5'

const getClassName = day => (
  `${day.isWeekend ? 'isWeekend' : ''} ${day.number === new Date().getDate() ? 'isCurrent' : ''}`
)

const style = stepSize => ({
  borderRight: `1px solid ${BORDER_COLOR}`,
  backgroundImage: `repeating-linear-gradient(
      to right,
      ${BORDER_COLOR},
      ${BORDER_COLOR} 1px,
      transparent 1px,
      transparent ${stepSize * 2}px
    )`,
})

const renderIssues = (issues, withRnd) => issues.map(issue =>
  withRnd ? (
    <StoryWithRnd
      key={ issue.id }
      id={ Number(issue.id) }
      issue={ issue }
    />
  ) : (
      <Story
        key={ issue.id }
        id={ Number(issue.id) }
        issue={ issue }
      />
  )
)

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() { this.setState(prevState => ({ isOpen: !prevState.isOpen })) }

  render() {
    const { name, stepSize, issues, startDay, endDay, timelineRef } = this.props
    const { isOpen } = this.state
    const days = generateDays(startDay, endDay)
    const resolvedIssues = issues.filter(({ fields: { status } }) => isResolved(status))
    const activeIssues = issues.filter(({ fields: { status } }) => !isResolved(status))

    return (
      <div className="Timeline-container">
        <h1 className="Timeline-name">{ name }</h1>
        <div className={ `Timeline-resolved ${isOpen ? 'active' : ''}` }>
          <h2 className="Timeline-resolved-title" onClick={ this.handleClick }>
            { `Resolved issues (${resolvedIssues.length}/${issues.length})` }
            <span className="Timeline-chevron"></span>
          </h2>
          <div className="Timeline-resolved-issues">
            { stepSize && renderIssues(resolvedIssues) }
          </div>
        </div>
        <div className="Timeline" ref={ timelineRef } style={ style(stepSize) }>
          <div className="Timeline-header">
            { days.map((day, i) => (
              <div key={ i } className={ `Timeline-day ${getClassName(day)}` }>
                { day.number }
              </div>
            )) }
          </div>
          {
            stepSize && <div className="Timeline-body">
              { renderIssues(activeIssues, true) }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Timeline
