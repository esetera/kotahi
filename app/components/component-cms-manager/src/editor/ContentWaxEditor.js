import React, { useRef } from 'react'

import { Wax } from 'wax-prosemirror-core'

import ContentEditorLayout from './layout/ContentEditorLayout'
import ContentEditorConfig from './config/ContentEditorConfig'

// TODO Save this image via the server
const renderImage = file => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => {
      reader.readAsDataURL(file)
    }, 150)
  })
}

const ContentWaxEditor = ({
  value,
  placeholder,
  fileUpload,
  readonly,
  user,
  ...rest
}) => {
  const handleAssetManager = () => {}

  const waxUser = {
    userId: user.id || '-',
    userColor: {
      addition: 'royalblue',
      deletion: 'indianred',
    },
    username: user.username || 'demo',
  }

  const editorRef = useRef(null)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Wax
        config={ContentEditorConfig(handleAssetManager)}
        fileUpload={file => renderImage(file)}
        layout={ContentEditorLayout(readonly)}
        ref={editorRef}
        user={waxUser}
        value={value}
        {...rest}
      />
    </div>
  )
}

ContentWaxEditor.defaultProps = {
  readonly: false,
  fileUpload: () => {},
  user: {},
}

export default ContentWaxEditor
