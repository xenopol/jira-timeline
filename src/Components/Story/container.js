import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Rnd } from 'react-rnd'
import { handleStoryChange as handleStoryChangeAction } from '../../store/actions/story-change'
import Marker, { resizeOptions } from '../Marker/container'
import { CHANGE_TYPES } from '../../store/actions/story-change'
import { markersData, getBackgroundGradient, getResizingGradient } from './utils'

import Story from './'

const DEFAULT_BACKGROUND_COLOR = '#fff'
const STORY_HEIGHT = 50

class StoryContainer extends Component{
  constructor(props) {
    super(props)

    this.state = { isResizing: false, isDragging: false, width: 0 }

    this.onResize = this.onResize.bind(this)
    this.onResizeStop = this.onResizeStop.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
  }

  onResize(e, dir, element, delta, position) {
    this.setState({ isResizing: true, width: element.offsetWidth })
  }

  onResizeStop(e, dir, element, delta, position) {
    const { isResizing } = this.state
    const { handleStoryChange, id, stepSize } = this.props

    if (isResizing) {
      handleStoryChange(
        CHANGE_TYPES.storyResize,
        { id, width: Math.round(element.offsetWidth / stepSize) }
      )
      this.setState({ isResizing: false })
    }
  }

  onDrag() { this.setState({ isDragging: true }) }

  onDragStop(e, { node, lastX, deltaX }) {
    const { isDragging } = this.state
    const { handleStoryChange, id, stepSize } = this.props

    if (isDragging) {
      handleStoryChange(
        CHANGE_TYPES.storyDrag,
        { id, width: Math.round(node.offsetWidth / stepSize), left: Math.round(lastX / stepSize) }
    )
      this.setState({ isDragging: false })
    }
  }

  renderMarkers() {
    const { id: storyId, change, stepSize } = this.props
    const { width } = this.state

    return markersData.map((marker, i) => {
      const { markers = [], resizeCount = 0 } = change || {}
      const { left } = markers.find(m => m.id === i) || {}

      return (
        <Marker
          key={ i }
          id={ i }
          storyId={ storyId }
          name={ marker.name }
          color={ marker.color }
          resizeCount={ resizeCount }
          left={ left || Math.round(width / stepSize) }
        />
      )
    })
  }

  getStyle() {
    const { isResizing } = this.state
    const { change, stepSize } = this.props

    const { markers = [] } = change || {}
    const { color: activeMarkerColor } = markersData[markers.length] || {}
    const { color: defaultResizingColor} = markersData[markersData.length - 1]
    const primaryGradientColor = activeMarkerColor || defaultResizingColor

    const defaultStyle = { minHeight: STORY_HEIGHT }

    if (isResizing) return {
      ...defaultStyle,
      ...getResizingGradient(primaryGradientColor, DEFAULT_BACKGROUND_COLOR) }

    return {
      ...defaultStyle,
      ...getBackgroundGradient(markers, DEFAULT_BACKGROUND_COLOR, stepSize),
    }
  }

  render() {
    const { issue, change, stepSize } = this.props
    const { width, left, markers = [] } = change || {}
    const storyWidth = 5

    return (
      <div className="Story-wrapper" style={ { height: STORY_HEIGHT } }>
        <Rnd
          default={ {
            x: (left || 0) * stepSize,
            y: 0,
            width: (width || storyWidth) * stepSize,
            height: STORY_HEIGHT,
          } }
          enableResizing={ { ...resizeOptions, right: true } }
          dragAxis="x"
          resizeHandleStyles={ { right: { width: '70px', right: '-50px', cursor: 'ew-resize' } } }
          bounds=".Timeline-body"
          onResizeStart={ this.onResizeStart }
          onResize={ this.onResize }
          onResizeStop={ this.onResizeStop }
          onDrag={ this.onDrag }
          onDragStop={ this.onDragStop }
          resizeGrid={ [stepSize, 0] }
          dragGrid={ [stepSize, 0] }
          cancel=".Marker"
        >
          { this.renderMarkers(markers) }
          <Story
            issue={ issue }
            style={ this.getStyle() }
          />
        </Rnd>
      </div>
    )
  }
}

const mapStateToProps = ({ storyChanges, stepSize }, { id }) => ({
  change: storyChanges.find(change => change.id === id),
  stepSize,
})

const mapDispatchToProps = dispatch => ({
  handleStoryChange: (type, change) => dispatch(handleStoryChangeAction(type, change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer)
