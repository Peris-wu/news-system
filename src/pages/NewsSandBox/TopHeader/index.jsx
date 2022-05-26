import React from 'react'
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import WelcomeUser from './WelcomeUser'
import headerStyle from './index.module.scss'
const { Header } = Layout;
export default function TopHeader (props) {
  const { collapsed, setCollapsed } = props
  return (
    <Header
      className={props.style['site-layout-background']}
      style={{
        padding: 0,
      }}
    >
      <div className={headerStyle['header-wrap']}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: props.style.trigger,
          onClick: () => setCollapsed(!collapsed),
        })}
        <WelcomeUser className={headerStyle['header-right']} />
        {/* <div className={headerStyle['header-right']}>123</div> */}
      </div>
    </Header>
  )
}
