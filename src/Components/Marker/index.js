import React from 'react'

import './index.css'

const Marker = ({ id, name, color }) => (
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
)

export default Marker
