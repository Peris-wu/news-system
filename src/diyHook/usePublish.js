import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ajax from '../utils/ajax'

export function usePublish(publishType) {
  const [dataSource, setDataSource] = useState([])
  const { username } = useSelector(state => state.userRightReducer)
  useEffect(() => {
    ajax.get(`/api/news?author=${username}&publishState=${publishType}&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username, publishType])
  const handleUnpublish = id => {
    setDataSource(dataSource.filter(item => item.id !== id))
    ajax.patch(`/api/news/${id}`, {
      publishState: 2
    })
  }
  const handlePublished = id => {
    setDataSource(dataSource.filter(item => item.id !== id))
    ajax.patch(`/api/news/${id}`, {
      publishState: 3
    })
  }
  const handleOffline = id => {
    setDataSource(dataSource.filter(item => item.id !== id))
    ajax.delete(`/api/news/${id}`)
  }
  return {
    dataSource,
    handleUnpublish,
    handlePublished,
    handleOffline
  }
}
