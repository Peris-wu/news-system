import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, Button, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import ajax from '../../../../utils/ajax'
const { confirm } = Modal
export default function Draft () {
  const [draftState, setDraftState] = useState([])
  const { username } = useSelector(state => state.userRightReducer)
  const history = useHistory()
  useEffect(() => {
    ajax.get(`/api/news?author=${username}&auditState=0&_expand=category`).then(res => {
      setDraftState(res.data)
    })
  }, [])
  const deleteDraft = (item) => {
    confirm({
      title: '提示',
      content: '确定删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setDraftState(draftState.filter(draftItem => draftItem.id !== item.id))
        ajax.delete(`/api/news/${item.id}`)
      }
    })
  }
  const toUpdateNews = (item) => {
    history.push({
      pathname: `/news-manage/update/${item.id}`
    })
  }
  const handlerPreview = (item) => {
    history.push({
      pathname: `/news-manage/preview/${item.id}`
    })
  }
  const draftToAudit = (item) => {
    console.log(item)
    setDraftState([...draftState.filter(d_item => {
      return d_item.id !== item.id
    })])
    ajax.patch(`/api/news/${item.id}`, {
      auditState: 1
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, item) => <span style={{ color: '#1890FF', cursor: 'pointer' }} onClick={() => { handlerPreview(item) }}>{title}</span>
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
      render: (category) => category.value
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteDraft(item) }}></Button>
          <span style={{ padding: '0 5px' }}></span>
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { toUpdateNews(item) }}></Button>
          <span style={{ padding: '0 5px' }}></span>
          <Button shape='circle' type="primary" icon={<VerticalAlignTopOutlined />} onClick={() => { draftToAudit(item) }}></Button>
        </div>
      }
    }
  ]
  return (
    <Table
      dataSource={draftState}
      columns={columns}
      rowKey={(item) => item.id}
    />
  )
}
