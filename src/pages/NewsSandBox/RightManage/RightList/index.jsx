import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ajax from '../../../../utils/ajax'


const { confirm } = Modal
export default function RightList () {
  const [rightList, setRightList] = useState([])
  const handlerDel = (tableItem) => {
    confirm({
      title: '确定删除?',
      onOk: () => {
        let copyRightList = JSON.parse(JSON.stringify(rightList))
        let res
        if (tableItem.grade === 1) {
          res = copyRightList.filter(rightItem => {
            return rightItem.id !== tableItem.id
          })
          setRightList(res)
          ajax.delete(`/api/rights/${tableItem.id}`)
        }
        else if (tableItem.grade !== 1) {
          let index
          copyRightList.some(rightItem => {
            if (rightItem.id === tableItem.rightId) {
              index = rightItem.children.findIndex(targetItem => {
                return targetItem.id === tableItem.id
              })
              rightItem.children.splice(index, 1)
              return true
            }
            return false
          })
          setRightList(copyRightList)
          ajax.delete(`/api/children/${tableItem.id}`)
        }
      },
      okText: '确定',
      cancelText: '取消'
    })
  }
  const handlerSwitch = (tableItem) => {
    console.log(tableItem);
    tableItem.pagepermisson = tableItem.pagepermisson === 1 ? 0 : 1
    setRightList([...rightList])
    if (tableItem.grade === 1) {
      ajax.patch(`/api/rights/${tableItem.id}`, {
        pagepermisson: tableItem.pagepermisson
      })
    }
    else if (tableItem.grade === 2) {
      ajax.patch(`/api/children/${tableItem.id}`, {
        pagepermisson: tableItem.pagepermisson
      })
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
      render: (title) => {
        return <b>{title}</b>
      }
    },
    {
      title: '权限地址',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (tableItem) => {
        return <div>
          <Button
            type='primary'
            shape="circle"
            icon={<DeleteOutlined />}
            danger
            onClick={() => { handlerDel(tableItem) }}
          >

          </Button>
          <span style={{ padding: '0 5px' }}></span>
          <Popover content={<Switch checked={tableItem.pagepermisson} onChange={() => { handlerSwitch(tableItem) }} />} trigger={tableItem.pagepermisson === undefined ? '' : 'click'}>
            <Button disabled={tableItem.pagepermisson === undefined} type='primary' shape="circle" icon={<EditOutlined />}>
            </Button>
          </Popover>
        </div>
      }
    }
  ];
  useEffect(() => {
    ajax.get('/api/rights?_embed=children').then(res => {
      res.data.forEach(item => {
        if (item.children.length === 0) item.children = ''
      })
      console.log(res.data);
      setRightList(res.data)
    })
  }, [])
  return (
    <Table
      dataSource={rightList}
      columns={columns}
      pagination={{
        pageSize: 5
      }}
    />
  )
}
