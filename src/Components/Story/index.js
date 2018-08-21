import React from 'react'

import './index.css'

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

const isResolved = status => (
  status.name && status.name.toLowerCase() === 'resolved'
)

const style = (height, resizing, resizingGradient) => {
  const defaultStyle = {
    minHeight: height,
    background: `linear-gradient(
      to right,
      ${resizingGradient},

    )`
  }

  const secondaryColor = '#fff'

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
    animation: 'slide 20s infinite linear forwards'
  }

  if (resizing) return {
    ...defaultStyle,
    ...gradient
  }

  return defaultStyle
}

const Story = ({ issue, height, resizing, resizingGradient }) => {
  const { fields, key: id } = issue
  const type = fields.issuetype && fields.issuetype.iconUrl
  const avatar = fields.assignee && fields.assignee.avatarUrls
  const { status, summary: title, epic, customfield_10013: points } = fields

  return (
    <div className="Story" style={ style(height, resizing, resizingGradient) }>
      <div className="Story-header">
        <img className="Story-header-type" src={ type } alt="story type" />
        <div className={ `Story-header-id ${isResolved(status) ? 'line-through' : ''}` }>
          { id }
        </div>
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
