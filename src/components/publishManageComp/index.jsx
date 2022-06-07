import React from 'react'
import { Table, Button } from 'antd'
export default function index (props) {
  const { dataSource, operateCallback } = props
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        return <span>{category.title}</span>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return operateCallback(item.id)
      }
    }
  ]
  return (
    <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} />
  )
}
