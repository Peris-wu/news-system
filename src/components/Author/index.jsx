import React from 'react'
import { Redirect } from 'react-router-dom'
import handlerStorage from '../../utils/handlerLocalStorage'
export default function Author ({ children }) {
  return (
    handlerStorage.getStorage() ? children : <Redirect to="/login" />
  )
}
