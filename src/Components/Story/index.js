import React from 'react'

import './index.css'

const BASE_URL = 'https://jira.tdc.dk/browse/'

export const isResolved = status => (
  status.name && status.name.toLowerCase() === 'resolved'
)

const Story = ({ issue, style }) => {
  const { fields, key: id } = issue
  const type = fields.issuetype && fields.issuetype.iconUrl
  const avatar = fields.assignee && fields.assignee.avatarUrls
  const { status } = fields

  return (
    <div className="Story" style={ style }>
      <div className="Story-header">
        <img className="Story-header-type" src={ type } alt="story type" />
        <a
          className={ `Story-header-id ${isResolved(status) ? 'line-through' : ''}` }
          href={ `${BASE_URL}${id}` }
          target="_blank"
        >
          { id }
        </a>
        <img className="Story-header-avatar" src={ avatar["24x24"] } alt="avatar" />
      </div>
    </div>
  )
}

export default Story
