import React from 'react'
import Story from '../Story/withDraggable'

import './index.css'

const BORDER_COLOR = '#f1f1f1'

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
      isWeekend: currentDate.getDay() === 6 || currentDate.getDay() === 0,
    }
    days.push(day)
    currentDate = addDays(currentDate, 1)
  }
  return days
}

const getClassName = day => (
  `${day.isWeekend ? 'isWeekend' : ''} ${day.number === new Date().getDate() ? 'isCurrent' : ''}`
)

const Timeline = React.forwardRef(({ stepSize, issues, issuesState, startDay, endDay }, ref) => {
  console.log('ref', ref)
  const days = generateDays(startDay, endDay)
  const style = {
    borderRight: `1px solid ${BORDER_COLOR}`,
    backgroundImage: `repeating-linear-gradient(
      to right,
      ${BORDER_COLOR},
      ${BORDER_COLOR} 1px,
      transparent 1px,
      transparent ${stepSize * 2}px
    )`,
  }

  return (
    <div className="Timeline" ref={ ref } style={ stepSize && style }>
      <div className="Timeline-header" style={ { background: BORDER_COLOR } }>
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
})

export default Timeline
