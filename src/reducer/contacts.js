import * as actionTypes from '../actions/actionTypes'

const contacts = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CONTACTS_RECEIVE:
      return loadContacts(action.contacts)
    case actionTypes.UPDATE_CONTACT:
      return {...state, [action.id]: action.contact}
    default:
      return state
  }
}

export default contacts

/*
 Selectors
*/
export const getAllContacts = state => state
export const getContact = (state, id) => state[id]
export const getContactInfo = (state, id) => ({
  id: id,
  title: `${state[id].givenName} ${state[id].familyName}`
})

/*
 Utils
*/
const loadContacts = contacts => {
  const result = {}
  contacts.forEach(contact => {
    result[contact.id] = contact
  })

  return result
}
