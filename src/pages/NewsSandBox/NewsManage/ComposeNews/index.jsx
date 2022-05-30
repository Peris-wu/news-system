import React, { useState } from 'react'

export default function ComposeNews () {
  const [list, setList] = useState([
    {
      id: 1,
      text: '刘备'
    },
    {
      id: 2,
      text: '关羽'
    },
    {
      id: 3,
      text: '张飞'
    }
  ])
  return (
    <>
      <div>ComposeNews</div>
      {
        list.map(item => <div onClick={() => {
          setList(list.filter(cItem => {
            return cItem.id !== item.id
          }))
        }} key={item.id}>{item.text}</div>)
      }
    </>
  )
}
