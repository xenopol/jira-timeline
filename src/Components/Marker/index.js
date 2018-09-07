import React from 'react'

import './index.css'

const Marker = ({ id, name, color, style, isDragging }) => (
  <div className="Marker" style={ style }>
    <div className={ `Marker-logo ${isDragging ? 'active' : ''}` }>{ name.charAt(0) }</div>
  </div>
)

export default Marker
