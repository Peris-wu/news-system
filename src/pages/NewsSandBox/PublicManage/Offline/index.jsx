import React from 'react'
import PublishComp from '../../../../components/publishManageComp'
import { usePublish } from '../../../../diyHook/usePublish'
import { Button } from 'antd'
export default function UnPublic () {
  const { dataSource, handleOffline } = usePublish(3)
  return (
    <PublishComp dataSource={dataSource} operateCallback={(id) => {
      return <Button type="primary" onClick={() => { handleOffline(id) }}>删除</Button>
    }} />
  )
}
