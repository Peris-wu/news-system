import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../../pages/Login'
import NewsSandBox from '../../pages/NewsSandBox'
import Author from '../Author'
export default function index () {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" render={() => <Author><NewsSandBox /></Author>} />
      </Switch>
    </Router>
  )
}
