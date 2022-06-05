import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg"
import { convertToRaw, ContentState, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import editorStyle from './index.module.scss'
export default function EcloseEditor ({ callback, completeContent }) {
  const [editorState, setEditorState] = useState('')
  useEffect(() => {
    if (!completeContent) return
    const contentBlock = htmlToDraft(completeContent);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
      callback(
        {
          completeContent,
          exceptContent: convertToRaw(editorState.getCurrentContent()).blocks[0].text.trim()
        }
      )
    }
  }, [completeContent])
  const onEditorBlur = () => {
    let editorObj = convertToRaw(editorState.getCurrentContent())
    callback(
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
