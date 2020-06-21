import React, { useCallback } from 'react'
import { Button } from '@pubsweet/ui'
// import { th } from '@pubsweet/ui-toolkit'
// import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useDropzone } from 'react-dropzone'

import Spinner from '../../shared/Spinner'
import ChangeUsername from './ChangeUsername'
import { BigProfileImage } from './ProfileImage'
import PageWithHeader from './PageWithHeader'
import { FormGrid, FormRow } from './FormGrid'

const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      profilePicture
      username
      defaultIdentity {
        aff
        name {
          surname
        }
        type
        ... on ExternalIdentity {
          identifier
        }
        ... on LocalIdentity {
          email
        }
      }
    }
  }
`

// eslint-disable-next-line react/prop-types
const ProfileDropzone = ({ profilePicture, updateProfilePicture }) => {
  const onDrop = useCallback(async acceptedFiles => {
    const body = new FormData()
    body.append('file', acceptedFiles[0])
    let result = await fetch('/api/uploadProfile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body,
    })
    result = await result.text()
    updateProfilePicture(result)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {profilePicture ? (
        <BigProfileImage src={profilePicture} />
      ) : (
        <BigProfileImage src="/static/profiles/placeholder.png" />
      )}
      {isDragActive ? <Button>Drop it here</Button> : <Button>Change</Button>}
    </div>
  )
}

const Profile = () => {
  const { loading, error, data, client } = useQuery(GET_CURRENT_USER)

  if (loading) return <Spinner />
  if (error) return JSON.stringify(error)

  // This is a bridge between the fetch results and the Apollo cache/state
  const updateProfilePicture = profilePicture => {
    const cacheData = client.readQuery({ query: GET_CURRENT_USER })
    const updatedData = {
      currentUser: {
        ...cacheData.currentUser,
        profilePicture,
      },
    }
    client.writeData({ data: updatedData })
  }

  return (
    <>
      <PageWithHeader header="Your profile">
        <FormGrid rows={3}>
          <FormRow>
            <label>Profile picture</label>
            <div>
              <ProfileDropzone
                profilePicture={data.currentUser.profilePicture}
                updateProfilePicture={updateProfilePicture}
              />
            </div>
          </FormRow>
          <FormRow>
            <label>ORCID</label>{' '}
            <div>{data.currentUser.defaultIdentity.identifier}</div>
          </FormRow>
          <FormRow>
            <label htmlFor="2">Username</label>
            <div>
              <ChangeUsername user={data.currentUser} />
            </div>
          </FormRow>
        </FormGrid>
      </PageWithHeader>
    </>
  )
}

export default Profile
