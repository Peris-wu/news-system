import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader, Descriptions } from 'antd'
import _moment from 'moment'
import _ from 'lodash'
import ajax from '../../../../utils/ajax'

export default function Preview () {
  const params = useParams()
  const [previewInfo, setPreviewInfo] = useState({})
  useEffect(() => {
    ajax.get(`/api/news/${params.id}?_expand=category&_expand=role`).then(res => {
      console.log(res.data)
      setPreviewInfo(res.data)
    })
  }, [])
  const mapAudit = ['未审核', '审核中', '已通过', '未通过']
  const mapPublish = ['未发布', '待发布', '已上线', '已下线']
  return (
    <div>
      {
        !_.isEmpty(previewInfo) &&
        <>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={previewInfo.title}
            subTitle={previewInfo.category.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">{previewInfo.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{_moment(previewInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{previewInfo.publishTime ? _moment(previewInfo.publishTime).format('YYYY/MM/DD HH:mm:ss') : '-'}</Descriptions.Item>
              <Descriptions.Item label="区域">{previewInfo.region}</Descriptions.Item>
              <Descriptions.Item label="审核状态"><span style={{ color: 'red' }}>{mapAudit[previewInfo.auditState]}</span></Descriptions.Item>
              <Descriptions.Item label="发布状态"><span style={{ color: 'red' }}>{mapPublish[previewInfo.publishState]}</span></Descriptions.Item>
              <Descriptions.Item label="访问数量">{previewInfo.view}</Descriptions.Item>
              <Descriptions.Item label="点赞数量">{previewInfo.star}</Descriptions.Item>
              <Descriptions.Item label="评论数量">0</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div style={{ border: '1px solid #ececec', padding: '16px 24px' }} dangerouslySetInnerHTML={{
            __html: previewInfo.content
          }}></div>
        </>
      }
    </div>
  )
}
