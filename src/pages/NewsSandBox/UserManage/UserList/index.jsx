import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Switch, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CollectCreateForm from '../CreateForm'
import ajax from '../../../../utils/ajax'
const { confirm } = Modal
export default function UserList () {
  const [userTable, setUserTable] = useState([])
  const [regions, setRegions] = useState([])
  const [roles, setRoles] = useState([])
  const [addVisible, setAddIsVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const addRef = useRef(null)
  const updateRef = useRef(null)
  useEffect(() => {
    ajax.get('/api/users?_expand=role').then(res => {

      setUserTable(res.data)
    })
  }, [])
  useEffect(() => {
    ajax.get('/api/regions').then(res => {
      setRegions(res.data)
    })
  }, [])
  useEffect(() => {
    ajax.get('/api/roles').then(res => {
      setRoles(res.data)
    })
  }, [])
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region ? region : '全球'}</b>
      },
      filters: [
        ...regions.map(regionItem => {
          return {
            text: regionItem.title,
            value: regionItem.value
          }
        }),
        {
          text: '全球',
          value: '全球'
        }
      ],
      onFilter: (value, record) => {
        if (value === '全球' && record.region === '') {
          return true
        } else {
          return record.region === value
        }
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => { switchOnChange(item) }} />
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button disabled={item.default} shape='circle' danger icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}></Button>
            <span style={{ padding: '0 5px' }}></span>
            <Button disabled={item.default} type="primary" shape='circle' icon={<EditOutlined />} onClick={() => { updateShowModal(item) }}></Button>
          </div>
        )
      }
    }
  ]
  const onCancel = () => {
    setAddIsVisible(!addVisible)
  }
  const showModal = () => {
    setAddIsVisible(!addVisible)
  }
  const switchOnChange = (item) => {
    item.roleState = !item.roleState
    setUserTable([...userTable])
    ajax.patch(`/api/users/${item.id}`, {
      roleState: item.roleState
    })
  }
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk () {
        deleUser(item)
      },
      onCancel () {
      },
    });
  }
  const addUser = async () => {
    try {
      let addUserInfo = await addRef.current.validateFields()
      let res = await ajax.post('/api/users', {
        ...addUserInfo,
        roleState: true,
        default: false
      })
      setUserTable([...userTable, {
        ...res.data,
        role: roles.filter(item => item.roleType === res.data.roleId)[0]
      }])
      setAddIsVisible(!addVisible)
      addRef.current.resetFields()
    } catch (err) {
      console.log(err)
    }
  }
  const deleUser = (item) => {
    ajax.delete(`/api/users/${item.id}`)
    message.info({
      content: '删除成功'
    })
    setUserTable(userTable.filter(userItem => userItem.id !== item.id))
  }
  const updateShowModal = (item) => {
    setTimeout(() => {
      updateRef.current.setFieldsValue(item)
    }, 0)
    if (item.roleId === 1) {
      setIsDisable(true)
    }
    else {
      setIsDisable(false)
    }
    setUpdateVisible(true)
    setCurrentItem(item)
  }
  const updateUser = () => {
    updateRef.current.validateFields().then(value => {
      let updateRes = userTable.map(item => {
        if (item.id === currentItem.id) {
          return {
            ...currentItem,
            role: roles.filter(r_item => r_item.roleType === value.roleId)[0],
            ...value
          }
        }
        return item
      })
      setUserTable(updateRes)
      setUpdateVisible(false)
      ajax.patch(`/api/users/${currentItem.id}`, value)
    })
  }
  const onUpdateCancel = () => {
    setUpdateVisible(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>添加用户</Button>
      <Table columns={columns} dataSource={userTable} rowKey={(item) => item.id} />
      <Modal
        visible={addVisible}
        title="添加用户信息"
        okText="确认"
        cancelText="取消"
        onOk={addUser}
        onCancel={onCancel}
      >
        <CollectCreateForm
          ref={addRef}
          regions={regions}
          roles={roles}
          isDisable={isDisable}
          setIsDisable={(bol) => { setIsDisable(bol) }}
        >
        </CollectCreateForm>
      </Modal>

      <Modal
        visible={updateVisible}
        title="更新用户信息"
        okText="确认"
        cancelText="取消"
        onOk={updateUser}
        onCancel={onUpdateCancel}
      >
        <CollectCreateForm
          ref={updateRef}
          regions={regions}
          roles={roles}
          isDisable={isDisable}
          setIsDisable={(bol) => { setIsDisable(bol) }}
        >
        </CollectCreateForm>
      </Modal>
    </>
  )
}
