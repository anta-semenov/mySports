import * as actionTypes from '../actions/actionTypes'
import omitBy from 'lodash/omitBy'

const sportHashes = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SPORT_HASHES:
      return action.sportHashes
    case actionTypes.ADD_SPORT_HAHSES:
      return {...state, [action.sportId]: action.hashes}
    case actionTypes.REMOVE_SPORT_HASHES:
      return omitBy(state, value => value !== action.sportId)
    default:
      return state
  }
}

export default sportHashes

/*
 Selectors
*/
export const getSportHashes = state => state
