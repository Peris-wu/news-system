import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageHeader, Steps, Button, Form, Input, message, Select } from 'antd'
import composeNewsStyle from './index.module.scss'
import Editor from '../../../../components/Editor'
import ajax from '../../../../utils/ajax'
const { Step } = Steps
const { Option } = Select
export default function ComposeNews () {
  const [current, setCurrent] = useState(0)
  const [composeNews, setComposeNews] = useState({})
  const [sortState, setSortState] = useState([])
  const baseInfoRef = useRef()
  const history = useHistory()
  const userRightReducer = useSelector(state => state.userRightReducer)
  useEffect(() => {
    ajax.get(`/api/categories`).then(res => {
      setSortState(res.data)
    })
  }, [])
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
    ajax.post(`/api/news`, {
      ...composeNews,
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
    history.push({
      pathname: state ? '/audit-manage/list' : '/news-manage/draft'
    })
  }
  // const onSortChange = (value) => {
  //   console.log(value)
  // }
  return (
    <div className={composeNewsStyle['compose-news']}>
      <PageHeader
        className={[composeNewsStyle['page-header'], composeNewsStyle['ant-page-header-heading-title']]}
        title="撰写新闻"
        subTitle="This is a subtitle"
      />
      <div style={{ margin: '20px 0' }}></div>
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>
      {/* composeNewsStyle['baseInfo-margin'], current === 0 ? '' : composeNewsStyle['steps-hidden'] */}
      <div className={composeNewsStyle['baseInfo-margin']}>
        <div className={current === 0 ? '' : composeNewsStyle['steps-hidden']}>
          <Form
            ref={baseInfoRef}
            name="baseInfo-form"
            autoComplete="off"
            wrapperCol={{
              flex: 1,
            }}
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
          <Editor cb={handlerEditorData} />
        </div>
        <div className={current === 2 ? '' : composeNewsStyle['steps-hidden']}>3</div>
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
