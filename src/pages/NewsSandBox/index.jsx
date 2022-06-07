import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
// import Home from './Home'
// import UserList from './UserList'
// import RoleList from './RoleList'
// import RightList from './RightList'
// import NotFound from './NotFound'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import NewsSandBoxRoute from '../../components/newsSandBoxRoute'

import ajax from '../../utils/ajax'
import { Layout } from 'antd';
import style from './index.module.scss'
const { Content } = Layout;

export default function NewsSandBox () {
  const [menuList, setMenuList] = useState([])
  const { role: { rights } } = useSelector(state => state.userRightReducer)
  useEffect(() => {
    ajax.get('/api/rights?_embed=children').then(res => {
      let menuResult = handlerMenuList(res.data)
      setMenuList(menuResult)
    })
  }, [])
  function isAllow (menuItem) {
    return menuItem.pagepermisson && rights.includes(menuItem.key)
  }
  function handlerMenuList (menuList) {
    let copyMenuList = JSON.parse(JSON.stringify(menuList))
    let res = []
    copyMenuList.forEach(item => {
      let tempObj = {}
      tempObj.id = item.id
      tempObj.label = item.title
      tempObj.grade = item.grade
      tempObj.key = item.key
      tempObj.pagepermisson = item.pagepermisson
      if (item.children?.length > 0 && isAllow(item)) {
        tempObj.children = handlerMenuList(item.children)
        res.push(tempObj)
      } else {
        if (isAllow(item)) {
          tempObj.children = null
          res.push(tempObj)
        }
      }
    })
    return res
  }
  return (
    <>
      <Layout>
        <SideMenu styleProp={style} menuList={menuList} />
        <Layout className={style['site-layout']}>
          <TopHeader style={style} />
          <Content
            className={style['site-layout-background']}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow: 'auto'
            }}
          >
            <NewsSandBoxRoute />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

