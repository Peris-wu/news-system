import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { DeleteOutlined, UnorderedListOutlined, WarningOutlined } from '@ant-design/icons'
import ajax from '../../../../utils/ajax'

/* const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
]; */
export default function RoleList () {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [roleTableList, setRoleTableList] = useState([])
  const [roleTreeList, setRoleTreeList] = useState([])
  const [checkList, setCheckList] = useState([])
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    ajax.get('/api/roles').then(res => {
      setRoleTableList(res.data)
    })
    ajax.get('/api/rights?_embed=children').then(res => {
      setRoleTreeList(res.data)
    })
  }, [])
  const showModal = (item) => {
    setCheckList(item.rights)
    setCurrentId(item.id)
    setIsModalVisible(!isModalVisible)
  }
  const cancelModal = () => {
    setIsModalVisible(!isModalVisible)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '操作',
      key: 'operate',
      render: (item) => {
        return <div>
          <Button shape='circle' type='primary' icon={<DeleteOutlined />} danger onClick={() => { delteRole(item) }} />
          <span style={{ padding: '0 5px' }}></span>
          <Button shape='circle' type='primary' icon={<UnorderedListOutlined />} onClick={() => { showModal(item) }} />
        </div>
      }
    }
  ]
  const deleteRoleOk = (item) => {
    setRoleTableList(roleTableList.filter(r_item => r_item.id !== item.id))
    ajax.delete(`/api/roles/${item.id}`)
  }
  const delteRole = (item) => {
    Modal.confirm({
      title: '删除角色权限',
      content: '确定删除吗',
      style: { color: 'red' },
      icon: < WarningOutlined style={{ color: 'red' }} />,
      onOk: () => { deleteRoleOk(item) },
      cancelText: '取消',
      okText: '确定'
    })
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    setCheckList(checkedKeys)
  };
  const handlerOk = () => {
    setRoleTableList(roleTableList.map(item => {
      if (item.id === currentId) {
        console.log(checkList, item.id, currentId);
        return {
          ...item,
          rights: checkList
        }
      }
      return item
    }))
    setIsModalVisible(!isModalVisible)
    ajax.patch(`/api/roles/${currentId}`, {
      rights: checkList
    })
  }
  return (
    <>
      <Table columns={columns} dataSource={roleTableList} rowKey={(item) => item.id} />
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onCancel={cancelModal}
        okText="确定"
        cancelText="取消"
        onOk={handlerOk}
      >
        <Tree
          checkable
          checkedKeys={checkList}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={roleTreeList}
        // checkStrictly
        />
      </Modal>
    </>
  )
}
