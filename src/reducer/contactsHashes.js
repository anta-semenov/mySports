import * as actionTypes from '../actions/actionTypes'
import omitBy from 'lodash/omitBy'

const contactsHashes = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CONTACTS_RECEIVE:
      return loadContacts(action.contacts)
    case actionTypes.UPDATE_CONTACT:
      return updateContact(state, action.contact)
    default:
      return state
  }
}

export default contactsHashes

/*
 Selectors
*/
export const getContactIdForHash = (state, hash) => state[hash]
export const getContactHashes = state => state
/*
 Utils
*/
const loadContacts = contacts => {
  const result = {}
  contacts.forEach(contact => {
    contact.hashes.forEach(hash => {
      result[hash] = contact.id
    })
  })

  return result
}

const updateContact = (state, {id, contact}) => {
  const result = omitBy(state, value => value !== id)
  contact.hashes.forEach(hash => {
    result[hash] = id
  })
}
