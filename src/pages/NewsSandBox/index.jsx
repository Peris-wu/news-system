import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Home from './Home'
// import UserList from './UserList'
// import RoleList from './RoleList'
// import RightList from './RightList'
// import NotFound from './NotFound'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import lazyLoad from './LazyLoad'
import { Layout } from 'antd';

import style from './index.module.scss'
const { Content } = Layout;
export default function NewsSandBox () {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <SideMenu styleProp={style} collapsed={collapsed} />
        <Layout className={style['site-layout']}>
          <TopHeader style={style} collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            className={style['site-layout-background']}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              {/* <Route path="/home" component={Home} /> */}
              <Route path="/home" render={() => lazyLoad('Home')} />
              <Route path="/user-manage/list" render={() => lazyLoad('UserManage/UserList')} />

              <Route path="/right-manage/role/list" render={() => lazyLoad('RightManage/RoleList')} />
              <Route path="/right-manage/right/list" render={() => lazyLoad('RightManage/RightList')} />

              <Route path="/news-manage/compose-news" render={() => lazyLoad('NewsManage/ComposeNews')} />
              <Route path="/news-manage/draft" render={() => lazyLoad('NewsManage/Draft')} />
              <Route path="/news-manage/news-sort" render={() => lazyLoad('NewsManage/NewsSort')} />

              <Route path="/examine-manage/examine-news" render={() => lazyLoad('ExamineManage/ExamineNews')} />
              <Route path="/examine-manage/examine-list" render={() => lazyLoad('ExamineManage/ExamineList')} />

              <Route path="/public-manage/unpublic" render={() => lazyLoad('PublicManage/UnPublic')} />
              <Route path="/public-manage/publiced" render={() => lazyLoad('PublicManage/Publiced')} />
              <Route path="/public-manage/offline" render={() => lazyLoad('PublicManage/Offline')} />

              <Redirect path="/" to="/home" exact />
              <Route path="*" render={() => lazyLoad('NotFound')} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

