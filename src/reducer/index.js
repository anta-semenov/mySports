import {combineReducers} from 'redux'
import mySports, * as fromMySports from './mySports'

const rootReducer = combineReducers({
  mySports
})

export default rootReducer
/*
* Selectors
*/

export const getAvailableSports = () => [
  {id:0, title: 'Football'},
  {id:1, title: 'Tennis'},
  {id:2, title: 'Snowboarding' },
  {id:3, title: 'Voleyball'},
  {id:4, title: 'Hockey'},
]

export const getMySports = state => fromMySports.getMySports(state.mySports)
