import * as actionTypes from '../actions/actionTypes'

const availableSports = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_SERVICE_DATA_RECEIVE:
      return action.data.availableSports
    case actionTypes.LOAD_STATE_RECEIVE:
      return action.state.availableSports || []
    default:
      return state
  }
}

export default availableSports

export const getAvailableSports = state => state
