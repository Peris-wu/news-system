import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import { Layout } from 'antd';

const { Sider } = Layout;
const MenuList = [
  {
    id: 1,
    label: '首页',
    key: '/home'
    // children: []
  },
  {
    id: 2,
    label: '用户管理',
    key: '/user-manage',
    children: [
      {
        id: 21,
        label: '用户列表',
        key: '/user-manage/list'
      }
    ]
  },
  {
    id: 3,
    label: '权限管理',
    key: '/right-manage',
    children: [
      {
        id: 31,
        label: '角色列表',
        key: '/right-manage/role/list'
      },
      {
        id: 32,
        label: '权限列表',
        key: '/right-manage/right/list'
      }
    ]
  },
  {
    id: 4,
    label: '新闻管理',
    key: '/news-manage',
    children: [
      {
        id: 41,
        label: '撰写新闻',
        key: '/news-manage/compose-news'
      },
      {
        id: 42,
        label: '草稿箱',
        key: '/news-manage/draft'
      },
      {
        id: 43,
        label: '新闻分类',
        key: '/news-manage/news-sort'
      }
    ]
  },
  {
    id: 5,
    label: '审核管理',
    key: '/examine-manage',
    children: [
      {
        id: 51,
        label: '审核新闻',
        key: '/examine-manage/examine-news'
      },
      {
        id: 52,
        label: '审核列表',
        key: '/examine-manage/examine-list'
      }
    ]
  },
  {
    id: 6,
    label: '发布管理',
    key: '/public-manage',
    children: [
      {
        id: 61,
        label: '待发布',
        key: '/public-manage/unpublic'
      },
      {
        id: 62,
        label: '已发布',
        key: '/public-manage/publiced'
      },
      {
        id: 63,
        label: '已下线',
        key: '/public-manage/offline'
      }
    ]
  }
]
// const rootSubmenuKeys = ['/home', '/user-manage', '/right-manage', '/news-manage', '/examine-manage', '/public-manage'];
export default function SideMenu (props) {
  const history = useHistory()
  // const [openKeys, setOpenKeys] = useState(['/home']);
  let { pathname } = history.location
  console.log(pathname)
  const { styleProp, collapsed } = props
  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
      <div className={styleProp.logo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname === '/' ? '/home' : pathname]}
        defaultOpenKeys={[`/${pathname.split('/')[1]}`]}
        onClick={(value) => {
          if (history.location.pathname === value.key) return
          history.replace(value.key)
        }}
        items={MenuList}
      // onOpenChange={onOpenChange}
      // openKeys={openKeys}
      >
      </Menu>
    </Sider>

  )
}

function getItem (label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}