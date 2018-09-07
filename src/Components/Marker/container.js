import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Rnd } from 'react-rnd'
import { handleStoryChange as handleStoryChangeAction } from '../../store/actions/story-change'
import { CHANGE_TYPES } from '../../store/actions/story-change'
import Marker from './'

export const resizeOptions = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
}

const MARKER_WIDTH = 2
const MARKER_FULL_WIDTH = 32

const getStyle = (markerOffset, isDragging) => ({
    background: `linear-gradient(
    to right,
    transparent,
    transparent ${markerOffset}px,
    white ${markerOffset}px,
    white ${markerOffset + MARKER_WIDTH}px,
    transparent ${markerOffset + MARKER_WIDTH}px
  )`,
})

class MarkerContainer extends Component {
  constructor(props) {
    super(props)

    this.state = { isDragging: false }

    this.onDrag = this.onDrag.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
  }

  onDrag() { this.setState({ isDragging: true }) }

  onDragStop(e, { node, lastX }) {
    const { isDragging } = this.state
    const { handleStoryChange, id, storyId, stepSize } = this.props

    if (isDragging) {
      handleStoryChange(
        CHANGE_TYPES.markerDrag,
        { id, storyId, left: Math.round(lastX / stepSize) }
      )
      this.setState({ isDragging: false })
    }
  }

  render() {
    const { isDragging } = this.state
    const { id, name, color, stepSize, resizeCount, left } = this.props
    const isPlacedMarker = id < resizeCount
    const markerOffset = (MARKER_FULL_WIDTH - MARKER_WIDTH) / 2
    const xPos = (left * stepSize)

    if (isPlacedMarker) return (
      <Rnd
        default={ { x: xPos, y: 0, width: 0, height: '100%' } }
        dragAxis="x"
        dragGrid={ [stepSize, 0] }
        enableResizing={ resizeOptions }
        style={ { zIndex: 2 } }
        bounds="parent"
        onDrag={ this.onDrag }
        onDragStop={ this.onDragStop }
      >
        <div className="Marker-container" style={ { width: MARKER_FULL_WIDTH } }>
          <Marker
            id={ id }
            name={ name }
            color={ color }
            style={ getStyle(markerOffset) }
            isDragging={ isDragging }
          />
        </div>
      </Rnd>
    )
    else return null
  }
}

const mapStateToProps = ({ stepSize }) => ({ stepSize })

const mapDispatchToProps = dispatch => ({
  handleStoryChange: (type, change) => dispatch(handleStoryChangeAction(type, change)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MarkerContainer)
