import React from 'react'

import './style.css'

const isResolved = status => status.name && status.name.toLowerCase() === 'resolved'

const Story = ({ status, type, id, avatar, title, epic, points }) => (
  <div className="Story-container">
    <div className="Story-header">
      <img className="Story-header-type" src={ type } alt="story type" />
      <div className={ `Story-header-id ${isResolved(status) ? 'line-through' : ''}` }>{ id }</div>
      <img className="Story-header-avatar" src={ avatar["32x32"] } alt="avatar" />
    </div>
    <div className="Story-body">
      <div className="Story-body-title">{ title }</div>
    </div>
    <div className="Story-footer">
      {
        epic && <div className="Story-footer-epic">{ epic.name }</div>
      }
      <div className="Story-footer-points">{ points }</div>
    </div>
  </div>
)

export default Story
