import React from 'react'
import { useHistory } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dropdown, Menu } from 'antd';
import welcomeStyle from './index.module.scss'
import handlerStorage from '../../../../utils/handlerLocalStorage'


export default function WelcomUser () {
  let { username, role: { roleName } } = handlerStorage.getStorage()
  const history = useHistory()
  const menu = (
    <Menu
      onClick={(item) => {
        if (item.key === 'login-out') {
          handlerStorage.removeStorage()
          history.replace('/login')
        }
      }}
      items={[
        {
          key: 'roleType',
          label: roleName
        },
        {
          key: 'login-out',
          label: '退出',
          danger: true
        }
      ]}
    />
  )
  return (
    <div className={welcomeStyle['welcome-user-wrap']}>
      <div className={welcomeStyle['welcome-user-wrap']}>
        Welcom
        <span style={{ color: 'blue', paddingLeft: '5px' }}>{username}</span>
      </div>
      <Dropdown overlay={menu} arrow={true}>
        <Avatar size={48} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}
