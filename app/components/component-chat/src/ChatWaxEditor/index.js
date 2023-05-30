import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Wax } from 'wax-prosemirror-core'
import chatWaxEditorConfig from './ChatWaxEditorConfig'
import chatWaxEditorLayout from './ChatWaxEditorLayout'
import SelectUserDropdown from '../../../component-task-manager/src/SelectUserDropdown'
// import CustomMentionsInput from '../MentionsInput/MentionsInput'

const ChatWaxEditor = ({
  value,
  validationStatus,
  readonly,
  autoFocus,
  onBlur,
  placeholder,
  spellCheck,
  showUserFilter,
  setUserFilter,
  resetUserFilter,
  users,
  searchUsersCallBack,
  addUserName,
  onEnterPress,
  editorRef,
  ...rest
}) => {
  const [queryString, setQueryString] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [lastIndexOfAtSymbol, setlastIndexOfAtSymbol] = useState(-1)

  const setUserSelectionItem = item => {
    addUserName(item)
  }

  const filterUsers = query => {
    if (!query || !users) {
      return users
    }

    return users.filter(user => {
      const username = user.username.toLowerCase()
      const search = query.toLowerCase()
      return username.startsWith(search)
    })
  }

  useEffect(() => {
    const parser = new DOMParser()
    const parsedHtml = parser.parseFromString(value, 'text/html')
    const targetElement = parsedHtml.querySelector('p')

    if (targetElement) {
      const textvalue = targetElement.textContent
      const lastIndex = textvalue.lastIndexOf('@')

      if (textvalue[textvalue.length - 1] === '@') {
        if (textvalue.length === 1 || textvalue[textvalue.length - 2] === ' ') {
          setlastIndexOfAtSymbol(lastIndex)

          if (typeof setUserFilter === 'function') {
            setUserFilter()
          }
        } else if (showUserFilter) {
          resetUserFilter()
        }
      }

      if (textvalue.length === 0 || lastIndexOfAtSymbol === -1) {
        if (typeof resetUserFilter === 'function') {
          resetUserFilter()
        }
      }

      if (lastIndexOfAtSymbol >= 0) {
        setQueryString(
          textvalue.substring(lastIndexOfAtSymbol + 1, textvalue.length),
        )
      }
    }
  }, [value])

  useEffect(() => {
    setFilteredUsers(filterUsers(queryString))
  }, [queryString])

  return (
    <div className={validationStatus}>
      {!!showUserFilter && (
        <SelectUserDropdown
          lastIndexOfAtSymbol={lastIndexOfAtSymbol}
          setUserSelectionItem={setUserSelectionItem}
          users={filteredUsers}
        />
      )}
      <Wax
        autoFocus={autoFocus}
        browserSpellCheck={spellCheck}
        config={chatWaxEditorConfig({ onEnterPress })}
        debug={false}
        layout={chatWaxEditorLayout(readonly)}
        placeholder={placeholder}
        readonly={readonly}
        ref={editorRef}
        value={value}
        {...rest}
      />
    </div>
  )
}

ChatWaxEditor.propTypes = {
  /** editor content HTML */
  value: PropTypes.string,
  /** either undefined or 'error' to highlight with error color */
  validationStatus: PropTypes.string,
  readonly: PropTypes.bool,
  /** Should this element be given focus on initial rendering? */
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  /** Should enable browser's native spellcheck? */
  spellCheck: PropTypes.bool,
}

ChatWaxEditor.defaultProps = {
  value: '',
  validationStatus: undefined,
  readonly: false,
  autoFocus: false,
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  spellCheck: false,
}

export default ChatWaxEditor
