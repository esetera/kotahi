import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { debounce } from 'lodash'
import { Wax } from 'wax-prosemirror-core'
import waxTheme from './layout/waxTheme'

import fullWaxEditorConfig from './config/FullWaxEditorConfig'
import fullWaxEditorCommentsConfig from './config/FullWaxEditorCommentsConfig'
import FullWaxEditorLayout from './layout/FullWaxEditorLayout'
import FullWaxEditorCommentsLayout from './layout/FullWaxEditorCommentsLayout'

import './katex/katex.css'

// Note that as this is currently set up, notes are not shown when it's readonly. I can't tell if this is intentional or oversight!

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

const FullWaxEditor = ({
  value,
  validationStatus,
  readonly,
  autoFocus,
  onBlur,
  onChange,
  placeholder,
  useComments,
  fileUpload,
  user,
  ...rest
}) => {
  const defaultUser = {
    userId: user.id || "test",
    userColor: {
      addition: 'royalblue',
      deletion: 'indianred',
    },
    username: user.defaultIdentity?.name || user.username || "demo",
  }

  const ourUser = { ...defaultUser } // this is just to make sure we have a user object
  const debounceChange = useCallback(debounce(onChange ?? (() => {}), 1000), [])
  return (
    <ThemeProvider theme={waxTheme}>
      <div className={validationStatus}>
        <Wax
          autoFocus={autoFocus}
          config={
            useComments ? fullWaxEditorCommentsConfig() : fullWaxEditorConfig()
          }
          fileUpload={file => renderImage(file)}
          layout={
            useComments
              ? FullWaxEditorCommentsLayout(readonly)
              : FullWaxEditorLayout(readonly)
          }
          onBlur={val => {
            onChange && onChange(val)
            onBlur && onBlur(val)
          }}
          onChange={debounceChange}
          placeholder={placeholder}
          readonly={readonly}
          user={ourUser}
          value={value}
          {...rest}
        />
      </div>
    </ThemeProvider>
  )
}

FullWaxEditor.propTypes = {
  value: PropTypes.string,
  validationStatus: PropTypes.string,
  readonly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  fileUpload: PropTypes.func,
  useComments: PropTypes.bool,
  user: PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string,
    userColor: PropTypes.shape({
      addition: PropTypes.string,
      deletion: PropTypes.string,
    }),
  }),
}

FullWaxEditor.defaultProps = {
  value: '',
  validationStatus: undefined,
  readonly: false,
  autoFocus: false,
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  fileUpload: () => {},
  useComments: false,
  user: {},
}

export default FullWaxEditor
