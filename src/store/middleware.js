import {AsyncStorage, NetInfo} from 'react-native'
import throttle from 'lodash/throttle'
import * as actionTypes from '../actions/actionTypes'
import * as fromReducer from '../reducer'
import * as actions from '../actions/actionCreators'

const saveState = store => next => action => {
  const result = next(action)
  const nextState = store.getState()

  if (shouldSaveState(action.type)) {
    throttle(async () => {
      try {
        await AsyncStorage.setState('appState', nextState)
      } catch (e) {}
    }, 1500)
  }

  return result
}

const shouldSaveState = actionType =>
  actionType === actionTypes.ADD_SPORT ||
  actionType === actionTypes.REMOVE_SPORT ||
  actionType === actionTypes.LOAD_CONTACTS_RECEIVE

// const getSportHashes = store => next => async action => {
//   const result = next(action)
//   const nextState = store.getState()
//
//   if (shouldRequestSportHashes(action)) {
//     const sportsIds = fromReducer.getSportsIds(nextState)
//     if (sportsIds.lenght > 0) {
//       const netStatus = await NetInfo.fetch()
//       if (netStatus === 'wifi' || netStatus === 'cell') {
//         store.dispatch(actions.loadSportHashes(sportsIds))
//       }
//     }
//   }
//
//   return result
// }
//
// const shouldRequestSportHashes = actionType =>
//   actionType === actionTypes.LOAD_STATE_RECEIVE

const middlewares = [saveState]
export default middlewares
