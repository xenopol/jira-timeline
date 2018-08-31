import {
  FETCH_STORY_CHANGES_SUCCESS,
  ADD_STORY_RESIZE_CHANGE,
  ADD_STORY_DRAG_CHANGE,
  ADD_MARKER_DRAG_CHANGE,
} from '../actions/story-change'

const MAX_NUMBER_OF_MARKERS = 3

const handleStoryResizeChange = (state, { id, width }) => {
  const activeChange = state.find(change => change.id === id)

  if (activeChange) return state.map(change => {
    const resizeCount = change.resizeCount + 1
    if (change.id === id) return {
      ...change,
      width,
      resizeCount,
      markers: resizeCount <= MAX_NUMBER_OF_MARKERS
        ? [...change.markers, { id: change.resizeCount, left: width }]
        : [...change.markers],
    }
    return change
  })

  const resizeCount = 1
  return [
    ...state,
    {
      id,
      width,
      left: 0,
      markers: [{ id: 0, left: width }],
      resizeCount,
    },
  ]
}

const handleStoryDragChange = (state, { id, width, left }) => {
  const activeChange = state.find(change => change.id === id)

  if (activeChange) return state.map(change => (change.id === id) ? { ...change, left } : change)

  return [
    ...state,
    { id, width, left, resizeCount: 0, markers: [] },
  ]
}

const handleMarkerDragChange = (state, { id, storyId, left }) => {
  return state.map(change => {
    if (change.id === storyId) return {
      ...change,
      markers: change.markers.map(marker => {
        if (marker.id === id) return {
          ...marker,
          left,
        }
        return marker
      }),
    }
    return change
  })
}

const storyChanges = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_STORY_CHANGES_SUCCESS:
      return payload
    case ADD_STORY_RESIZE_CHANGE:
      return [...handleStoryResizeChange(state, payload)]
    case ADD_STORY_DRAG_CHANGE:
      return [...handleStoryDragChange(state, payload)]
    case ADD_MARKER_DRAG_CHANGE:
      return [...handleMarkerDragChange(state, payload)]
    default:
      return state
  }
}

export default storyChanges
