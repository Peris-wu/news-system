import React, { useState, useEffect, useRef } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import ajax from '../../../utils/ajax'
import _ from 'lodash'
import * as echarts from 'echarts'
import dogsPic from '../../../images/dogs.jpg'
const { Meta } = Card

export default function Home () {
  const [skimNumber, setSkimNumber] = useState([])
  const [likeNumber, setLikeNumber] = useState([])
  const [barEcharts, setBarEcharts] = useState(null)
  const [pieEcharts, setPieEcharts] = useState(null)
  const [pieEchartsData, setPieEchartsData] = useState([])
  const [visible, setVisible] = useState(false)
  const barRef = useRef(null)
  const pieRef = useRef(null)
  // const history = useHistory()
  const { username, region, role: { roleName } } = useSelector(state => state.userRightReducer)
  useEffect(() => {
    // /api/news?publishState=2&_expand=category&_sort=view&_order=desc
    ajax.get(`/api/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=10`).then(res => {
      setSkimNumber(res.data)
      console.log(res.data);
    })
  }, [])
  useEffect(() => {
    // /api/news?publishState=2&_expand=category&_sort=view&_order=desc
    ajax.get(`/api/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=10`).then(res => {
      setLikeNumber(res.data)
    })
  }, [])
  useEffect(() => {
    ajax.get(`/api/news?publishState=2&_expand=category`).then(res => {
      setTimeout(() => {
        renderBarEcharts(_.groupBy(res.data, item => item.category.title))
      }, 0)
    })
    return () => {
      window.onresize = null
    }
  }, [])
  useEffect(() => {
    ajax.get(`/api/news?publishState=2&author=${username}&_expand=category`).then(res => {
      let handleData = Object.entries(_.groupBy(res.data, item => item.category.title)).map(item => {
        return {
          value: item[1].length,
          name: item[0]
        }
      })
      setPieEchartsData(handleData)
    })
  }, [username])
  const renderBarEcharts = (handledData) => {
    let myChart
    if (!barEcharts) {
      myChart = echarts.init(barRef.current)
      setBarEcharts(myChart)
    } else {
      myChart = barEcharts

    }
    const options = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: Object.keys(handledData),
        axisLabel: {
          rotate: '45'
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: Object.values(handledData).map(item => {
            return item.length
          })
        }
      ]
    }
    // barEcharts
    myChart.setOption(options)
    window.onresize = () => {
      myChart.resize()
    }
  }
  const changeVisible = () => {
    setVisible(!visible)
    setTimeout(() => {
      renderPieEcharts(pieEchartsData)
    }, 0)
  }
  const renderPieEcharts = (handledData) => {
    let myChart
    if (!pieEcharts) {
      myChart = echarts.init(pieRef.current)
      setPieEcharts(myChart)
    } else {
      myChart = pieEcharts
    }
    const options = {
      title: {
        text: '当前用户新闻分类图示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: handledData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.setOption(options)
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
      <div style={{ width: '100%', height: '400px', marginTop: '50px' }} ref={barRef}></div>
      <Drawer title="个人新闻分类" width="500" placement="right" onClose={changeVisible} visible={visible}>
        <div style={{ width: '100%', height: '600px' }} ref={pieRef}></div>
      </Drawer>
    </div>
  )
}