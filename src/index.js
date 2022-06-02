import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './redux'
import { Provider } from 'react-redux'
import handlerStorage from './utils/handlerLocalStorage'
import { setUserRights } from './actions/getUserRights'

import _ from 'lodash'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'

if (!_.isEmpty(handlerStorage.getStorage())) {
  store.dispatch(setUserRights(handlerStorage.getStorage()))
}

const root = ReactDOM.createRoot(document.getElementById('root'))
// const persistor = persistStore(store)
root.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}>
    </PersistGate> */}
    <App />
  </Provider>
)
