import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { userRightReducer } from '../reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const rootPersistConfig = {
//   key: 'token',
//   storage: storage
// }
// const persisteReducer = persistReducer(rootPersistConfig, userRightReducer)
const reducer = combineReducers({
  userRightReducer
})
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store
