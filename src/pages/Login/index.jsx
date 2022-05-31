import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import loginStyle from './index.module.scss'
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getUserRights } from '../../actions/getUserRights'
import { message } from 'antd'
import handlerStorage from '../../utils/handlerLocalStorage'
import ajax from '../../utils/ajax'
export default function Login () {
  const history = useHistory()
  const dispatch = useDispatch()
  const particlesInit = async (main) => {
    await loadFull(main)
  }
  const particlesLoaded = (container) => {
  }
  const onFinish = async (values) => {
    const { username, password } = values
    let userInfo = await dispatch(getUserRights({ username, password }))
    if (userInfo.length > 0) {
      dispatch(getUserRights(userInfo[0]))
      history.replace({
        pathname: '/home'
      })
      return
    }
    message.error('用户或者帐号错误')
  }
  return (
    <div className={loginStyle['login-box']}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#fff",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000",
            },
            links: {
              color: "#000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className={loginStyle['login-wrap']}>
        <div className={loginStyle['login-title']}>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          style={{ width: '90%' }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
