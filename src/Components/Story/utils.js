export const markersData = [
  { name: 'review', color: '#fff8e1' },
  { name: 'test', color: '#e1f5fe' },
  { name: 'merge', color: '#e8f5e9' },
]

export const getBackgroundGradient = (markers, defaultBackgroundColor, stepSize) => {
  if (!markers.length) return { background: defaultBackgroundColor }
  const resizingWithNoMarkerColor = '#f6f6f6'

  return {
    background: `linear-gradient(
      to right,
      ${markers.map((marker, i, markerArray) => {
        const { color } = markersData[i]
        const isFirstElement = i === 0
        const isLastElement = i === markerArray.length - 1

        return `
          ${color} ${isFirstElement ? 0 : markerArray[i - 1].left * stepSize}px,
          ${color} ${marker.left * stepSize}px,
          ${isLastElement ? `${resizingWithNoMarkerColor} ${marker.left * stepSize}px` : ''}
        `
      }).join('')}
    )`,
  }
}

export const getResizingGradient = (primaryColor, secondaryColor) => {
  return {
    background: `repeating-linear-gradient(
      -45deg,
      ${primaryColor},
      ${primaryColor} 20px,
      ${secondaryColor} 20px,
      ${secondaryColor} 40px
    )`,
    backgroundSize: '56px 56px',
    backgroundPositionX: '0%',
    animation: 'slide 20s infinite linear forwards',
  }
}