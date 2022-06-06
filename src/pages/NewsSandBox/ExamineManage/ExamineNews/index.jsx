import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ajax from '../../../../utils/ajax';
export default function ExamineNews () {
  const [auditNews, setAuditNews] = useState([])
  const userRightReducer = useSelector(state => state.userRightReducer)
  const history = useHistory()
  useEffect(() => {
    ajax.get(`/api/news?auditState=1&_expand=category`).then(res => {
      let list = res.data
      setAuditNews(userRightReducer.role.roleType === 1 ? list : [
        ...list.filter(item => {
          return item.author === userRightReducer.username
        }),
        ...list.filter(item => {
          return item.region === userRightReducer.region && item.roleId === 3
        })
      ])
    })
  }, [userRightReducer])
  const toPreviewPage = (item) => {
    history.push({
      pathname: `/news-manage/preview/${item.id}`
    })
  }
  const auditPassed = (item) => {
    setAuditNews(auditNews.filter(c_item => {
      return c_item.id !== item.id
    }))
    ajax.patch(`/api/news/${item.id}`, {
      auditState: 2,
      publishState: 1
    })
  }
  const auditReject = (item) => {
    setAuditNews(auditNews.filter(c_item => {
      return c_item.id !== item.id
    }))
    ajax.patch(`/api/news/${item.id}`, {
      auditState: 3,
      publishState: 0
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
      title: '操作',
      render: (item) => {
        return <div>
          <Button type="primary" onClick={() => { auditPassed(item) }}>通过</Button>
          <span style={{ padding: '0 5px' }}></span>
          <Button danger onClick={() => { auditReject(item) }}>驳回</Button>
        </div>
      }
    }
  ]
  return (
    <Table dataSource={auditNews} columns={columns} rowKey={item => item.id} />
  )
}
