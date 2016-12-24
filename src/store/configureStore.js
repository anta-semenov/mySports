import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'
import {loadState} from '../actions/actionCreators'
import middleware from './middleware'

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk, ...middleware))
  store.dispatch(loadState())
  return store
}

export default configureStore
