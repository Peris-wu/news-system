import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './redux'
import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById('root'))
// const persistor = persistStore(store)
root.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}>
    </PersistGate> */}
    <App />
  </Provider>
)
