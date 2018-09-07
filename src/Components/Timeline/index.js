import React, { Component } from 'react'
import Story from '../Story'
import StoryWithRnd from '../Story/container'
import { isResolved } from '../Story'
import { generateDays } from './utils'
import { markersData } from '../Story/utils'

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
  withRnd
    ? <StoryWithRnd key={ issue.id } id={ Number(issue.id) } issue={ issue } />
    : <Story key={ issue.id } id={ Number(issue.id) } issue={ issue } />
)

class Timeline extends Component {
  constructor(props) {
    super(props)
    const { issues } = props

    this.timelineRef = React.createRef()
    this.searchRef = React.createRef()

    this.state = {
      isOpen: false,
      activeStories: issues.filter(({ fields: { status } }) => !isResolved(status)),
      resolvedStories: issues.filter(({ fields: { status } }) => isResolved(status)),
      searchValue: '',
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { setStepSize } = this.props
    const { current: timeline } = this.timelineRef
    const timelineWidth = timeline.offsetWidth
    const halfTimelineDay = (timelineWidth / 11) / 2

    setStepSize(halfTimelineDay)
  }

  handleClick() { this.setState(prevState => ({ isOpen: !prevState.isOpen })) }

  handleSearch({ target }) {
    this.setState(({ searchValue }) => ({
      searchValue: target.value,
    }), () => {
      // input's cursor disappears on state change, so this hack fixes it
      this.searchRef.current.blur()
      this.searchRef.current.focus()
    })
  }

  render() {
    const { name, stepSize, issues, startDay, endDay } = this.props
    const { isOpen, activeStories, resolvedStories, searchValue } = this.state
    const days = generateDays(startDay, endDay)
    const stories = searchValue.length > 0
      ? activeStories.filter(({ key }) => key.toLowerCase().includes(searchValue.toLowerCase()))
      : activeStories

    return (
      <div className="Timeline-container">
        <h1 className="Timeline-name">{ name }</h1>
        <div className="Timeline-info">
          <div className="Timeline-legend">
            { markersData.map(({ name, color }) => (
              <div key={ name } className="Timeline-legend-item">
                <div className="Timeline-legend-color" style={ { background: color } }></div>
                { name }
              </div>
            )) }
          </div>
          <input
            className="Timeline-search"
            ref={ this.searchRef }
            value={ searchValue }
            onChange={ this.handleSearch }
            placeholder="Search"
          />
        </div>
        <div className={ `Timeline-resolved ${isOpen ? 'active' : ''}` }>
          <h2 className="Timeline-resolved-title" onClick={ this.handleClick }>
            { `Resolved issues (${resolvedStories.length}/${issues.length})` }
            <span className="Timeline-chevron"></span>
          </h2>
          <div className="Timeline-resolved-issues">
            { stepSize && renderIssues(resolvedStories) }
          </div>
        </div>
        <div className="Timeline" ref={ this.timelineRef } style={ style(stepSize) }>
          <div className="Timeline-header">
            <div className="Timeline-header-days">
              { days.map((day, i) => (
                <div key={ i } className={ `Timeline-day ${getClassName(day)}` }>
                  { day.number }
                </div>
              )) }
            </div>
          </div>
          {
            stepSize !== 0 && <div className="Timeline-body">
              { renderIssues(stories, true) }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Timeline
