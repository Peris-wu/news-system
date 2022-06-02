import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import { Layout } from 'antd';

const { Sider } = Layout;
export default function SideMenu (props) {
  const history = useHistory()
  let { pathname } = history.location
  const { styleProp, collapsed, menuList } = props
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <div className={styleProp.logo}>123</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={[`/${pathname.split('/')[1]}`]}
          onClick={(value) => {
            if (history.location.pathname === value.key) return
            history.replace(value.key)
          }}
          items={menuList}
        >
        </Menu>
      </div>
    </Sider>

  )
}