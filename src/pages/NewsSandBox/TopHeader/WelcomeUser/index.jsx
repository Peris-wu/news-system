import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dropdown, Menu } from 'antd';
import welcomeStyle from './index.module.scss'

const menu = (
  <Menu
    onClick={() => { console.log(1); }}
    items={[
      {
        key: 'super-manager',
        label: '超级管理员'
      },
      {
        key: 'login-out',
        label: '退出',
        danger: true
      }
    ]}
  />
)
export default function WelcomUser () {
  return (
    <div className={welcomeStyle['welcome-user-wrap']}>
      <div className={welcomeStyle['welcome-user-wrap']}>WelcomUser</div>
      <Dropdown overlay={menu} arrow={true}>
        <Avatar size={48} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}
