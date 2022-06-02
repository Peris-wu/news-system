import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import editorStyle from './index.module.scss'
export default function EcloseEditor ({ cb }) {
  const [editorState, setEditorState] = useState('')
  const onEditorBlur = () => {
    let editorObj = convertToRaw(editorState.getCurrentContent())
    cb(
      {
        completeContent: draftToHtml(editorObj),
        exceptContent: editorObj.blocks[0].text.trim()
      }
    )
  }
  const onEditorStateChange = (editState) => {
    setEditorState(editState)
  }
  return (
    <div className={editorStyle['editor-wrap']}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        onBlur={onEditorBlur}
        wrapperClassName="aaa"
        editorClassName={editorStyle.editor}
        toolbarClassName="ccc"
      />
    </div>
  )
}
