import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'
export default function Author ({ children }) {
  const userRightState = useSelector(state => state.userRightReducer)
  return (
    !_.isEmpty(userRightState) ? children : <Redirect to="/login" />
  )
}
