import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Author ({ children }) {
  return (
    localStorage.getItem('token') ? children : <Redirect to="/login" />
  )
}
