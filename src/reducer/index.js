import {combineReducers} from 'redux'
import mySports, * as fromMySports from './mySports'
import availableSports, * as fromAvailableSports from './availableSports'
import contacts, * as fromContacts from './contacts'
import contactsHashes, * as fromContactsHashes from './contactsHashes'
import sportHashes, * as fromSportHashes from './sportHashes'
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'
import uniq from 'lodash/uniq'

const rootReducer = combineReducers({
  mySports,
  availableSports,
  contacts,
  contactsHashes,
  sportHashes
})

export default rootReducer

/*
* Selectors
*/
Object.keys(fromContacts).forEach(key => {
  if (key === 'default') return
  module.exports[key] = state => fromContacts[key](state.contacts)
})

Object.keys(fromContactsHashes).forEach(key => {
  if (key === 'default')     return
  module.exports[key] = state => fromContactsHashes[key](state.contactsHashes)
})

Object.keys(fromSportHashes).forEach(key => {
  if (key === 'default')     return
  module.exports[key] = state => fromSportHashes[key](state.sportHashes)
})

export const getAvailableSports = state => fromAvailableSports.getAvailableSports(state.availableSports)

export const getMySports = state => fromMySports.getMySports(state.mySports)

export const sportContactIds = createSelector(
  state => fromSportHashes.getSportHashes(state.sportHashes),
  state => fromContactsHashes.getContactHashes(state.contactsHashes),
  (sportHashes, contactsHashes) => mapValues(sportHashes, hashesArray => uniq(
    hashesArray.map(hash => contactsHashes[hash])
  ))
)

export const sportContactsTitles = createSelector(
  sportContactIds,
  state => fromContacts.getAllContacts(state.contacts),
  (sportContactIds, contacts) => mapValues(sportContactIds, id => fromContacts.getContactInfo(contacts, id))
)

export const getSportContactsTitles = (state, sportId) => sportContactsTitles(state)[sportId]
