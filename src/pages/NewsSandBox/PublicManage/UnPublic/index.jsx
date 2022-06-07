import React from 'react'
import PublishComp from '../../../../components/publishManageComp'
import { usePublish } from '../../../../diyHook/usePublish'
import { Button } from 'antd'
export default function UnPublic () {
  const { dataSource, handleUnpublish } = usePublish(1)
  return (
    <PublishComp dataSource={dataSource} operateCallback={(id) => {
      return <Button type="primary" onClick={() => { handleUnpublish(id) }}>发布</Button>
    }} />
  )
}
