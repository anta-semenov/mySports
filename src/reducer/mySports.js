import * as actionTypes from '../actions/actionTypes'

const mySports = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_SPORT:
      return [...state, action.sport]
    default:
      return state
  }
}

export default mySports

export const getMySports = state => state
