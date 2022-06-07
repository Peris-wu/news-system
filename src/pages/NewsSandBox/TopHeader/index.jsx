import React from 'react'
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import WelcomeUser from './WelcomeUser'
import headerStyle from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCollapsed } from '../../../actions/collapsed'
const { Header } = Layout;
export default function TopHeader (props) {
  const { collapsed } = useSelector(state => state.collapsedReducer)
  const dispatch = useDispatch()
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
          onClick: () => dispatch(getCollapsed(!collapsed)),
        })}
        <WelcomeUser className={headerStyle['header-right']} />
        {/* <div className={headerStyle['header-right']}>123</div> */}
      </div>
    </Header>
  )
}
