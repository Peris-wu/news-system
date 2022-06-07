import React from 'react'
import PublishComp from '../../../../components/publishManageComp'
import { usePublish } from '../../../../diyHook/usePublish'
import { Button } from 'antd'
export default function UnPublic () {
  const { dataSource, handlePublished } = usePublish(2)
  return (
    <PublishComp dataSource={dataSource} operateCallback={(id) => {
      return <Button type="primary" onClick={() => { handlePublished(id) }}>下线</Button>
    }} />
  )
}
