import React, { Component } from 'react'
import { Rnd } from 'react-rnd'
import Story from './'
import Marker, { resizeOptions } from '../Marker'
import { saveStateToServer } from '../../api'

import './index.css'

const markers = [
  { name: 'RR', color: 'red' },
  { name: 'RT', color: 'blue' },
  { name: 'RM', color: 'green' }
]

const STORY_HEIGHT = 132

class StoryWithDraggable extends Component{
  constructor(props) {
    super(props)

    this.state = { resizing: false, resizeCount: 0, width: 0 }

    this.onResizeStart = this.onResizeStart.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onResizeStop = this.onResizeStop.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
  }

  componentDidMount() {
    const { issueState } = this.props
    const { markers = [] } = issueState
    this.setState({ resizeCount: markers.length })
  }

  onResizeStart(...args) {
    const [, , element] = args

    this.setState({ width: element.offsetWidth })
  }

  onResize(...args) {
    const [, , element] = args

    this.setState({ resizing: true, width: element.offsetWidth })
  }

  onResizeStop(...args) {
    const [, , element] = args
    const width = element.offsetWidth

    this.setState(prevState => (
      {
        resizing: false,
        resizeCount: prevState.resizing ? prevState.resizeCount + 1 : prevState.resizeCount,
        width
      }
    ), () => {
      this.parseAndSaveState({ width })
        .catch(err => console.log(err))
    })
  }

  onDragStop(...args) {
    const [, { lastX }] = args

    this.parseAndSaveState({ left: lastX })
      .catch(err => console.log(err))
  }

  parseAndSaveState(state) {
    const { sprintId, issue: { id } } = this.props
    const newState = {
      sprintId,
      issueId: id,
      newState: { ...state }
    }
    return saveStateToServer(JSON.stringify(newState))
  }

  renderMarkers() {
    const { sprintId, issue: { id }, stepSize, issueState } = this.props
    const { resizing, resizeCount, width } = this.state

    return markers.map((marker, i) => {
      const { markers = [] } = issueState
      const { left } = markers.find(m => m.id === i) || {}

      return (
        <Marker
          key={ i }
          index={ i }
          name={ marker.name }
          color={ marker.color }
          stepSize={ stepSize }
          resizing={ resizing }
          resizeCount={ resizeCount }
          offset={ left || width }
          sprintId={ sprintId }
          issueId={ id }
        />
      )
    })
  }

  render() {
    const { issue, issueState, stepSize } = this.props
    const { width, left } = issueState
    const storyWidth = Math.round(5 * stepSize)

    return (
      <div className="Story-wrapper" style={ { height: STORY_HEIGHT } }>
        <Rnd
          default={ { x: left || 0, y: 0, width: width || storyWidth, height: STORY_HEIGHT } }
          enableResizing={ { ...resizeOptions, right: true } }
          dragAxis="x"
          resizeHandleStyles={ { right: { width: '40px', right: '-15px', cursor: 'ew-resize' } } }
          bounds=".Timeline-body"
          onResizeStart={ this.onResizeStart }
          onResize={ this.onResize }
          onResizeStop={ this.onResizeStop }
          onDragStop={ this.onDragStop }
          resizeGrid={ [stepSize, 0] }
          dragGrid={ [stepSize, 0] }
          cancel=".Marker"
        >
          { this.renderMarkers() }
          <Story issue={ issue } height={ STORY_HEIGHT } />
        </Rnd>
      </div>
    )
  }
}

export default StoryWithDraggable
