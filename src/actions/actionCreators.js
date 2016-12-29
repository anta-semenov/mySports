import * as types from './actionTypes.js'
import {AsyncStorage, NativeModules, NetInfo} from 'react-native'
import {getAvailableSports} from '../services/backend'

export const addSport = sport => ({type: types.ADD_SPORT, sport})

/*
* Thunks
*/

export const loadState = () => async dispatch => {
  dispatch({type: types.LOAD_STATE_REQUEST})
  try {
    const state = await AsyncStorage.getItem('appState')
    if (state) {
      dispatch({type: types.LOAD_STATE_RECEIVE, state})
    } else {
      dispatch({type: types.LOAD_STATE_RECEIVE, state: {}})
    }
    dispatch(loadContacts())
    dispatch(loadServiceData())
  } catch (error) {
      dispatch({type: types.LOAD_STATE_ERROR, error: error.message})
  }
}

const loadContacts = () => async dispatch => {
  dispatch({type: types.LOAD_CONTACTS_REQUEST})
  try {
    const contacts = await NativeModules.MSContacts.getOwnContact()
    dispatch({type: types.LOAD_CONTACTS_RECEIVE, contacts})
  } catch (error) {
    dispatch({type: types.LOAD_CONTACTS_ERROR})
  }
}

const loadServiceData = () => async dispatch => {
  dispatch({type: types.LOAD_SERVICE_DATA_REQUEST})
  const result = await getAvailableSports()
  dispatch({
    type: types.LOAD_SERVICE_DATA_RECEIVE,
    data: {availableSports: result}
  })
}
