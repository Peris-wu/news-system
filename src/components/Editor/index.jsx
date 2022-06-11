import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import _ from 'lodash'
export default function EcloseEditor ({ callback, completeContent }) {
  const [editorState, setEditorState] = useState('')
  useEffect(() => {
    if (!completeContent) return
    let getEditorState = BraftEditor.createEditorState(completeContent)
    setEditorState(getEditorState)
    callback(
      {
        completeContent,
        exceptContent: getEditorState.toRAW(true).blocks[0].text.trim()
      }
    )

  }, [completeContent])
  const onEditorBlur = () => {
    let toRaw = editorState.toRAW(true)
    let toHtml = editorState.toHTML()
    console.log(toRaw, toHtml)
    callback(
      {
        completeContent: toHtml,
        exceptContent: toRaw.blocks[0].text.trim()
      }
    )
  }
  const onEditorStateChange = (editState) => {
    setEditorState(editState)
  }
  const _onEditorStateChange = _.debounce(onEditorStateChange, 300)
  return (
    <div style={{ border: '1px solid #eee' }}>
      <BraftEditor
        contentStyle={{ width: '100%', height: '200px' }}
        value={editorState}
        onChange={_onEditorStateChange}
        onBlur={onEditorBlur}
      />
    </div>
  )
}

