import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select
function CreateForm ({ regions, roles, isDisable, setIsDisable }, ref) {
  const triggerRequired = (roleId) => {
    if (roleId === 1) {
      setIsDisable(true)
      ref.current.setFieldsValue({
        region: ''
      })
      return
    }
    setIsDisable(false)
  }
  return (
    <Form
      ref={ref}
      name="add-form"
      layout='vertical'
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={
          [
            {
              required: true,
              message: '用户名不能为空'
            }
          ]
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={
          [
            {
              required: true,
              message: '密码不能为空'
            }
          ]
        }
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="region"
        label="区域"
        rules={isDisable ? [] : [{ required: true, message: '区域不能为空' }]
        }
      >
        <Select disabled={isDisable}>
          {
            regions.map(item => <Option value={item.value} key={item.id}>{item.value}</Option>)
          }
        </Select>
      </Form.Item>

      <Form.Item
        name="roleId"
        label="角色"
        rules={
          [
            {
              required: true,
              message: '角色不能为空'
            }
          ]
        }
      >
        <Select
          onChange={triggerRequired}
        >
          {
            roles.map(item => <Option value={item.roleType} key={item.id}>{item.roleName}</Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
export default forwardRef(CreateForm) 
