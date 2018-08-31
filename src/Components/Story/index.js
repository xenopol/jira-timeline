import React from 'react'

import './index.css'

const BASE_URL = 'https://jira.tdc.dk/browse/'

const hexToRgbA = (hex, opacity) => {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = `0x${c.join('')}`
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')} ,${opacity})`
  }
  throw new Error('Bad Hex')
}

export const isResolved = status => (
  status.name && status.name.toLowerCase() === 'resolved'
)

const style = (height, resizing, resizingGradient) => {
  const defaultStyle = {
    minHeight: height,
    background: `linear-gradient(
      to right,
      ${resizingGradient},
    )`,
  }

  if (!resizingGradient) return defaultStyle

  const secondaryColor = 'rgba(255, 255, 255, 0.1)'

  const gradient = {
    background: `repeating-linear-gradient(
      -45deg,
      ${hexToRgbA(resizingGradient, 0.1)},
      ${hexToRgbA(resizingGradient, 0.1)} 20px,
      ${secondaryColor} 20px,
      ${secondaryColor} 40px
    )`,
    backgroundSize: '56px 56px',
    backgroundPositionX: '0%',
    animation: 'slide 20s infinite linear forwards',
  }

  if (resizing) return { ...defaultStyle, ...gradient }
}

const Story = ({ issue, height, isResizing, resizingGradient }) => {
  const { fields, key: id } = issue
  const type = fields.issuetype && fields.issuetype.iconUrl
  const avatar = fields.assignee && fields.assignee.avatarUrls
  const { status, summary: title, epic, customfield_10013: points } = fields

  return (
    <div className="Story" style={ style(height, isResizing, resizingGradient) }>
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
      {/* <div className="Story-body">
        <div className="Story-body-title">{ title }</div>
      </div>
      <div className="Story-footer">
        {
          epic && <div className="Story-footer-epic">{ epic.name }</div>
        }
        <div className="Story-footer-points">{ points }</div>
      </div> */}
    </div>
  )
}

export default Story
