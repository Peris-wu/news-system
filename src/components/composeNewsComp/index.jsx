import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageHeader, Steps, Button, Form, Input, message, Select } from 'antd'
import composeNewsStyle from './index.module.scss'
import Editor from '../Editor'
import ajax from '../../utils/ajax'
import _ from 'lodash'
const { Step } = Steps
const { Option } = Select
const mapAction = {
  // "0": '撰写新闻',
  // "1": '更新新闻'
  "0": {
    "0": '撰写新闻',
    "1": 'aaa'
  },
  "1": {
    "0": '更新新闻',
    "1": 'bbb'
  }
}
export default function ComposeNews ({ action, newsInfo }) {
  const [current, setCurrent] = useState(0)
  const [composeNews, setComposeNews] = useState({})
  const [sortState, setSortState] = useState([])
  const [initCompleteContent, setInitCompleteContent] = useState('')
  const baseInfoRef = useRef()
  const history = useHistory()
  const { id } = useParams()
  const userRightReducer = useSelector(state => state.userRightReducer)
  useEffect(() => {
    ajax.get(`/api/categories`).then(res => {
      setSortState(res.data)
    })
  }, [])
  useEffect(() => {
    if (!_.isEmpty(newsInfo)) {
      baseInfoRef.current.setFieldsValue({
        title: newsInfo.title,
        categoryId: newsInfo.categoryId
      })
      setInitCompleteContent(newsInfo.content)
    }
  }, [newsInfo])
  const stepNext = () => {
    if (current === 0) {
      baseInfoRef.current.validateFields().then(res => {
        setComposeNews({ ...composeNews, ...res })
        setCurrent(current + 1)
      }).catch(err => {
        console.log(err)
      })
    }
    else if (current === 1) {
      if (!composeNews.exceptContent || composeNews.exceptContent === '') {
        message.error('内容不能为空')
        return
      }
      console.log(composeNews)
      setCurrent(current + 1)
    }
  }
  const handlerEditorData = (objFromEditor) => {
    setComposeNews(
      {
        ...composeNews,
        ...objFromEditor
      }
    )
  }
  const stepPrevious = () => {
    setCurrent(current - 1)
  }
  const handlerSave = (state) => {
    if (action === 0) {
      ajax.post(`/api/news`, {
        title: composeNews.title,
        categoryId: composeNews.categoryId,
        content: composeNews.completeContent,
        region: userRightReducer.region ? userRightReducer.region : '全球',
        author: userRightReducer.username,
        roleId: userRightReducer.roleId,
        auditState: state,
        publishState: 0,
        createTime: new Date(),
        star: 0,
        view: 0,
        publishTime: 0
      })
    } else {
      const { title, categoryId, completeContent } = composeNews
      ajax.patch(`/api/news/${id}`, {
        title,
        categoryId,
        content: completeContent,
        auditState: state
      })
    }
    history.push({
      pathname: state ? '/audit-manage/list' : '/news-manage/draft'
    })
  }
  return (
    <div className={composeNewsStyle['compose-news']}>
      <PageHeader
        className={[composeNewsStyle['page-header'], composeNewsStyle['ant-page-header-heading-title']]}
        title={mapAction[action][0]}
        subTitle={mapAction[action][1]}
      />
      <div style={{ margin: '20px 0' }}></div>
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>
      <div className={composeNewsStyle['baseInfo-margin']}>
        <div className={current === 0 ? '' : composeNewsStyle['steps-hidden']}>
          <Form
            ref={baseInfoRef}
            name="baseInfo-form"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '新闻标题不能为空',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: '新闻分类不能为空',
                },
              ]}
            >
              <Select
              >
                {
                  sortState.map(item => {
                    return <Option key={item.id} value={item.id}>{item.title}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : composeNewsStyle['steps-hidden']}>
          <Editor callback={handlerEditorData} completeContent={initCompleteContent} />
        </div>
        <div className={current === 2 ? '' : composeNewsStyle['steps-hidden']}></div>
      </div>
      <div>
        {
          current > 0 && <Button onClick={stepPrevious}>上一步</Button>
        }
        {
          current < 2 && <Button type="primary" onClick={stepNext}>下一步</Button>
        }
        {
          current === 2 && <Button type="primary" onClick={() => { handlerSave(0) }}>保存草稿箱</Button>
        }
        {
          current === 2 && <Button danger onClick={() => { handlerSave(1) }}>提交审核</Button>
        }
      </div>
    </div >
  )
}
