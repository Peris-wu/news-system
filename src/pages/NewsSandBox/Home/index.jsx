import React, { useState, useEffect } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import ajax from '../../../utils/ajax'
import { useHistory } from 'react-router-dom'
import dogsPic from '../../../images/dogs.jpg'
const { Meta } = Card

export default function Home () {
  const [skimNumber, setSkimNumber] = useState([])
  const [likeNumber, setLikeNumber] = useState([])
  const [visible, setVisible] = useState(false)
  // const history = useHistory()
  const { username, region, role: { roleName } } = useSelector(state => state.userRightReducer)
  useEffect(() => {
    // /api/news?publishState=2&_expand=category&_sort=view&_order=desc
    ajax.get(`/api/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=10`).then(res => {
      setSkimNumber(res.data)
    })
  }, [])
  useEffect(() => {
    // /api/news?publishState=2&_expand=category&_sort=view&_order=desc
    ajax.get(`/api/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=10`).then(res => {
      setLikeNumber(res.data)
    })
  }, [])

  const changeVisible = () => {
    setVisible(!visible)
  }
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered>
            <List
              dataSource={skimNumber}
              renderItem={(item) => (
                <List.Item>
                  {/* <span
                    style={{ color: '#1890FF', cursor: 'pointer' }}
                    onClick={() => {
                      history.push({
                        pathname: `/news-manage/update/${item.id}`
                      })
                    }}>{item.title}</span> */}
                  <a href={`#/news-manage/update/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered>
            <List
              dataSource={likeNumber}
              renderItem={(item) => (
                <List.Item>
                  {/* <span
                    style={{ color: '#1890FF', cursor: 'pointer' }}
                    onClick={() => {
                      history.push({
                        pathname: `/news-manage/update/${item.id}`
                      })
                    }}>{item.title}</span> */}
                  <a href={`#/news-manage/update/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered
            cover={
              <img
                src={dogsPic}
                alt="pictureTip"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={changeVisible} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://tvax1.sinaimg.cn/crop.0.0.750.750.180/a45075c5ly8fzarzyxxu1j20ku0ku0uh.jpg?KID=imgbed,tva&Expires=1654710354&ssig=xwx8LuYhmL" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : '全球'}</b>
                  <span style={{ padding: '0 8px' }}></span>
                  <span>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="Basic Drawer" placement="right" onClose={changeVisible} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}
