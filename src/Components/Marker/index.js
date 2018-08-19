import React, { Component } from 'react'
import { Rnd } from 'react-rnd'
import { saveStateToServer } from '../../api'

import './index.css'

const MARKER_WIDTH = 30

export const resizeOptions = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
}

const style = (resizing, isActiveMarker, offset, xPos) => {
  const defaultStyle = { zIndex: 2 }
  const isNegativeResize = offset < xPos

  return {
    ...defaultStyle,
    left: (resizing && isActiveMarker) || isNegativeResize ? 'auto' : xPos || offset,
    right: (resizing && isActiveMarker) || isNegativeResize ? 0 : 'auto'
  }
}

class Marker extends Component{
  constructor(props) {
    super(props)

    this.state = { xPos: 0 }

    this.onDragStop = this.onDragStop.bind(this)
  }

  componentDidMount() {
    const { offset } = this.props
    this.setState({ xPos: offset })
  }

  componentDidUpdate(prevProps) {
    const { index, resizeCount, offset } = this.props
    const hasResizingStopped = prevProps.resizeCount < resizeCount
    const isActiveMarker = index === resizeCount - 1

    if (hasResizingStopped && isActiveMarker) {
      this.setState({ xPos: offset },
        () => {
          this.parseAndSaveState({ marker: { id: index, left: offset } })
            .catch(err => console.log(err))
        })
    }
  }

  onDragStop(...args) {

  }

  parseAndSaveState(state) {
    const { sprintId, issueId } = this.props
    const newState = {
      sprintId,
      issueId,
      newState: { ...state }
    }
    return saveStateToServer(JSON.stringify(newState))
  }

  render() {
    const { index, name, color, stepSize, resizing, resizeCount, offset } = this.props
    const { xPos } = this.state
    const isActiveMarker = index === resizeCount

    if ((resizing && isActiveMarker) || xPos) return (
      <Rnd
        default={ { x: offset - MARKER_WIDTH, y: 0, width: MARKER_WIDTH, height: '100%' } }
        dragAxis="x"
        dragGrid={ [stepSize, 0] }
        enableResizing={ resizeOptions }
        style={ style(resizing, isActiveMarker, offset, xPos) }
        bounds="parent"
        onDragStop={ this.onDragStop }
      >
        <div className="Marker" style={ { background: color } }>
          { name }
        </div>
      </Rnd>
    )
    else return null
  }
}

export default Marker
