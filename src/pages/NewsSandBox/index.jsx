import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Home from './Home'
// import UserList from './UserList'
// import RoleList from './RoleList'
// import RightList from './RightList'
// import NotFound from './NotFound'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'

import lazyLoad from './LazyLoad'
export default function NewsSandBox () {
  return (
    <>
      <SideMenu />
      <TopHeader />
      <Switch>
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/home" render={() => lazyLoad('Home')} />
        <Route path="/user-manage/list" render={() => lazyLoad('UserList')} />
        <Route path="/right-manage/role/list" render={() => lazyLoad('RoleList')} />
        <Route path="/right-manage/right/list" render={() => lazyLoad('RightList')} />
        <Redirect path="/" to="/home" exact />
        <Route path="*" render={() => lazyLoad('NotFound')} />
      </Switch>
    </>
  )
}

