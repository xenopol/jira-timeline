import { getChangeFromServer, saveChangeToServer } from '../../api/'
import { loading, error } from './status'

export const CHANGE_TYPES = {
  storyResize: 'STORY_RESIZE',
  storyDrag: 'STORY_DRAG',
  markerDrag: 'MARKER_DRAG',
}

export const FETCH_STORY_CHANGES_SUCCESS = 'FETCH_STORY_CHANGES_SUCCESS'
export const fetchStoryChangesSuccess = changes => ({
  type: FETCH_STORY_CHANGES_SUCCESS,
  payload: changes,
})

export const initStoryChanges = () => (dispatch, getState) => {
  const { sprint: { sprintId } } = getState()
  getChangeFromServer(sprintId)
    .then(({ data: { changes } }) => {
      dispatch(fetchStoryChangesSuccess(changes))
      dispatch(loading(false))
    })
    .catch(err => dispatch(error(err)))
}

export const ADD_STORY_CHANGE_TO_SERVER_SUCCESS = 'ADD_STORY_CHANGE_TO_SERVER_SUCCESS'
const addStoryChangeToServerSuccess = response => ({
  type: ADD_STORY_CHANGE_TO_SERVER_SUCCESS,
  payload: response,
})

export const ADD_STORY_RESIZE_CHANGE = 'ADD_STORY_RESIZE_CHANGE'
const addStoryResizeChange = change => ({
  type: ADD_STORY_RESIZE_CHANGE,
  payload: change,
})

export const ADD_STORY_DRAG_CHANGE = 'ADD_STORY_DRAG_CHANGE'
const addStoryDragChange = change => ({
  type: ADD_STORY_DRAG_CHANGE,
  payload: change,
})

export const ADD_MARKER_DRAG_CHANGE = 'ADD_MARKER_DRAG_CHANGE'
const addMarkerDragChange = change => ({
  type: ADD_MARKER_DRAG_CHANGE,
  payload: change,
})

export const handleStoryChange = (type, change) => (dispatch, getState) => {
  if (type === CHANGE_TYPES.storyResize) dispatch(addStoryResizeChange(change))
  if (type === CHANGE_TYPES.storyDrag) dispatch(addStoryDragChange(change))
  if (type === CHANGE_TYPES.markerDrag) dispatch(addMarkerDragChange(change))

  const { sprint: { sprintId }, storyChanges } = getState()
  saveChangeToServer(JSON.stringify({ sprintId, changes: storyChanges }))
    .then(response => dispatch(addStoryChangeToServerSuccess(response)))
    .catch(err => dispatch(dispatch(error(err))))
}
