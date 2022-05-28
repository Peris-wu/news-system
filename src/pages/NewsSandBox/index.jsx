import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Home from './Home'
// import UserList from './UserList'
// import RoleList from './RoleList'
// import RightList from './RightList'
// import NotFound from './NotFound'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import lazyLoad from './LazyLoad'
import ajax from '../../utils/ajax'
import { Layout } from 'antd';

import style from './index.module.scss'
const { Content } = Layout;
function isAllow (menuItem) {
  return menuItem.pagepermisson
}
function handlerMenuList (menuList) {
  let copyMenuList = JSON.parse(JSON.stringify(menuList))
  let res = []
  copyMenuList.forEach(item => {
    if (item.children?.length > 0 && isAllow(item)) {
      res.push(
        {
          id: item.id,
          label: item.title,
          grade: item.grade,
          key: item.key,
          pagepermisson: item.pagepermisson,
          children: handlerMenuList(item.children)
        }
      )
    } else {
      isAllow(item) && res.push(
        {
          id: item.id,
          label: item.title,
          grade: item.grade,
          key: item.key,
          pagepermisson: item.pagepermisson,
          children: null
        }
      )
    }
  })
  return res
}
function handlerRouteList (routeList) {
  let res = []
  let copyRouteList = JSON.parse(JSON.stringify(routeList))
  copyRouteList.forEach(item => {
    if (item.children?.length > 0) {
      res.push(...handlerRouteList(item.children))
    } else {
      res.push(
        {
          key: item.key
        }
      )
    }
  })
  return res
}
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
  "/publish-manage/sunset": 'PublicManage/Publiced',
  "/publish-manage/sunset": 'PublicManage/Offline'
}
export default function NewsSandBox () {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([])
  const [routeList, setRouteList] = useState([])
  useEffect(() => {
    ajax.get('/api/rights?_embed=children').then(res => {
      let menuResult = handlerMenuList(res.data)
      let routeResult = handlerRouteList(menuResult)
      setMenuList(menuResult)
      setRouteList(routeResult)
    })
  }, [])
  return (
    <>
      <Layout>
        <SideMenu styleProp={style} collapsed={collapsed} menuList={menuList} />
        <Layout className={style['site-layout']}>
          <TopHeader style={style} collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            className={style['site-layout-background']}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow: 'auto'
            }}
          >
            <Switch>
              {
                routeList.map(item => {
                  return <Route key={item.key} path={item.key} render={() => lazyLoad(mappingRoute[item.key])} />
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
              <Route path="*" render={() => lazyLoad('NotFound')} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

