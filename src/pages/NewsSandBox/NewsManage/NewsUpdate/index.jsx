import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ComposeNewsComp from '../../../../components/composeNewsComp'
import ajax from '../../../../utils/ajax'
export default function NewsUpdate () {
  const params = useParams()
  const [newsInfo, setNewsInfo] = useState({})
  useEffect(() => {
    ajax.get(`/api/news/${params.id}`).then(res => {
      setNewsInfo(res.data)
    })
  }, [])
  return (
    <ComposeNewsComp action={1} newsInfo={newsInfo} />
  )
}
