import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import lazyLoad from '../../pages/NewsSandBox/LazyLoad'
import ajax from '../../utils/ajax'
export default function NewsSandBoxRoute () {
  const [routeList, setRouteList] = useState([])
  const { role: { rights } } = useSelector(state => state.userRightReducer)
  useEffect(() => {
    Promise.all([
      ajax.get(`/api/rights`),
      ajax.get(`/api/children`)
    ]).then(res => {
      setRouteList([...res[0].data, ...res[1].data])
    })
  }, [])
  // 映射路由表
  const mappingRoute = {
    "/home": 'Home',
    "/user-manage/list": 'UserManage/UserList',
    "/right-manage/role/list": 'RightManage/RoleList',
    "/right-manage/right/list": 'RightManage/RightList',
    "/news-manage/add": 'NewsManage/ComposeNews',
    "/news-manage/draft": 'NewsManage/Draft',
    "/news-manage/category": 'NewsManage/NewsSort',
    "/audit-manage/audit": 'ExamineManage/ExamineNews',
    "/audit-manage/list": 'ExamineManage/ExamineList',
    "/publish-manage/unpublished": 'PublicManage/UnPublic',
    "/publish-manage/published": 'PublicManage/Publiced',
    "/publish-manage/sunset": 'PublicManage/Offline'
  }
  const isBackRouteInfoAllow = item => {
    return mappingRoute[item.key] && item.pagepermisson
  }
  const isUserRouteInfoAllow = item => {
    return rights.includes(item.key)
  }
  return (
    <Switch>
      {
        routeList.map(item => {
          if (isBackRouteInfoAllow(item) && isUserRouteInfoAllow(item)) {
            return <Route exact key={item.key} path={item.key} render={() => lazyLoad(mappingRoute[item.key])} />
          }
        })
      }
      {/* <Route path="/home" render={() => lazyLoad('Home')} />
    <Route path="/user-manage/list" render={() => lazyLoad('UserManage/UserList')} />

    <Route path="/right-manage/role/list" render={() => lazyLoad('RightManage/RoleList')} />
    <Route path="/right-manage/right/list" render={() => lazyLoad('RightManage/RightList')} />

    <Route path="/news-manage/add" render={() => lazyLoad('NewsManage/ComposeNews')} />
    <Route path="/news-manage/draft" render={() => lazyLoad('NewsManage/Draft')} />
    <Route path="/news-manage/category" render={() => lazyLoad('NewsManage/NewsSort')} />

    <Route path="/audit-manage/audit" render={() => lazyLoad('ExamineManage/ExamineNews')} />
    <Route path="/audit-manage/list" render={() => lazyLoad('ExamineManage/ExamineList')} />

    <Route path="/publish-manage/unpublished" render={() => lazyLoad('PublicManage/UnPublic')} />
    <Route path="/publish-manage/published" render={() => lazyLoad('PublicManage/Publiced')} />
    <Route path="/publish-manage/sunset" render={() => lazyLoad('PublicManage/Offline')} /> */}

      <Redirect path="/" to="/home" exact />
      {routeList.length > 0 ? <Route path="*" render={() => lazyLoad('NotFound')} /> : null}
    </Switch>
  )
}
