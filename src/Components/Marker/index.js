import React, { Component } from 'react'
import { Rnd } from 'react-rnd'
import { saveStateToServer } from '../../api'

import './index.css'

// is smaller than its children in order to be moved all the way to the right
const MARKER_WRAPPER_WIDTH = 26

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
        default={ { x: offset - 26, y: -9, width: MARKER_WRAPPER_WIDTH, height: '100%' } }
        dragAxis="x"
        dragGrid={ [stepSize, 0] }
        enableResizing={ resizeOptions }
        style={ style(resizing, isActiveMarker, offset, xPos) }
        bounds="parent"
        onDragStop={ this.onDragStop }
      >
        <div className="Marker">
          <div className="Marker-sign">
            <div className="Marker-sign-board" style={ { background: color } }></div>
            <div
              className="Marker-sign-arrow"
              style={ { borderLeft: `15px solid ${color}` } }
            ></div>
            <div className="Marker-sign-pole" style={ { background: color } }></div>
          </div>
          <div className="Marker-name">{ name }</div>
        </div>
      </Rnd>
    )
    else return null
  }
}

export default Marker
