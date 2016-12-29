import {combineReducers} from 'redux'
import mySports, * as fromMySports from './mySports'
import availableSports, * as fromAvailableSports from './availableSports'

const rootReducer = combineReducers({
  mySports,
  availableSports
})

export default rootReducer
/*
* Selectors
*/

export const getAvailableSports = state => fromAvailableSports.getAvailableSports(state.availableSports)

export const getMySports = state => fromMySports.getMySports(state.mySports)
