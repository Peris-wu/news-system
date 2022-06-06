import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ajax from '../../../../utils/ajax'
import { Table, Button, Tag, notification, Modal } from 'antd'

const { confirm } = Modal
export default function ExaminList () {
  const [newsList, setNewsList] = useState([])
  const history = useHistory()
  const userRightReducer = useSelector(state => state.userRightReducer)
  useEffect(() => {
    ajax.get(`/api/news?author=${userRightReducer.username}&auditState_ne=0&publishState_lte=1&_expand=category`)
      .then(res => {
        setNewsList(res.data)
      })
  }, [])
  const mapAuditState = {
    1: '审核中',
    2: '已通过',
    3: '未通过'
  }
  const mapColor = {
    1: 'orange',
    2: 'green',
    3: 'magenta'
  }
  const toPreviewPage = (item) => {
    history.push({
      pathname: `/news-manage/preview/${item.id}`
    })
  }
  const withDraw = (item) => {
    confirm({
      title: '撤销确认',
      content: '确定撤销该新闻吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setNewsList(newsList.filter(c_item => c_item.id !== item.id))
        ajax.patch(`/api/news/${item.id}`, {
          auditState: 0
        }).then(res => {
          notification.info({
            message: '通知',
            description: '您可以到草稿箱中查看您的新闻',
            placement: 'bottomRight'
          })
        })
      }
    })
  }
  const updateNews = (item) => {
    history.push({
      pathname: `/news-manage/update/${item.id}`
    })
  }
  const publishNews = (item) => {
    confirm({
      title: '发布确认',
      content: '确定发布该新闻吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setNewsList(newsList.filter(c_item => c_item.id !== item.id))
        ajax.patch(`/api/news/${item.id}`, {
          publishState: 2
        })
      }
    })
  }
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, item) => {
        return <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { toPreviewPage(item) }}>{title}</span>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: (title, item) => <span onClick={() => { }}>{title}</span>
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
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: (auditState) => {
        return <Tag color={mapColor[auditState]}>{mapAuditState[auditState]}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          {
            item.auditState === 1 ? <Button danger onClick={() => { withDraw(item) }}>撤销</Button>
              : item.auditState === 2 ? <Button type="primary" onClick={() => { publishNews(item) }}>发布</Button>
                : item.auditState === 3 ? <Button type="primary" onClick={() => { updateNews(item) }}>更新</Button> : null
          }
        </div>
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={newsList}
      rowKey={item => item.id}
    />
  )
}
