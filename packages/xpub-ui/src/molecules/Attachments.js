import React from 'react'
import Files from './Files'
import Attachment from '../atoms/Attachment'
import classes from './Attachments.local.scss'
import Icon from '../atoms/Icon'

// TODO: show upload progress

class Attachments extends React.Component {
  render () {
    return (
      <Files
        {...this.props}
        buttonText="Attach file"
        uploadingFile={({ file, progress, error }) => (
          <div className={classes.uploading}>
            <span className={classes.icon}>
              <Icon color="cornflowerblue">paperclip</Icon>
            </span>
            <span className={classes.filename}>
              {error ? error : 'Uploading…'}
            </span>
          </div>
        )}
        uploadedFile={value => (
          <Attachment
            key={value.url}
            value={value}/>
        )}
      />
    )
  }
}

export default Attachments
