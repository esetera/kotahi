import React from 'react'
import { ValidatedFieldFormik } from '@pubsweet/ui'
import { adopt } from 'react-adopt'
import { inputFields } from '../formFields'
import { getSpecificFilesQuery } from '../../../asset-manager/src/queries'
import withModal from '../../../asset-manager/src/ui/Modal/withModal'

import {
  Section,
  Page,
  EditorForm,
  ActionButtonContainer,
  FormActionButton,
} from '../style'

const mapper = {
  getSpecificFilesQuery,
  withModal,
}

const mapProps = args => ({
  onAssetManager: manuscriptId => {
    return new Promise((resolve, reject) => {
      const {
        withModal: { showModal, hideModal },
      } = args

      const handleImport = async selectedFileIds => {
        const {
          getSpecificFilesQuery: { client, query },
        } = args

        const { data } = await client.query({
          query,
          variables: { ids: selectedFileIds },
        })

        const { getSpecificFiles } = data

        const alteredFiles = getSpecificFiles.map(getSpecificFile => {
          const mediumSizeFile = getSpecificFile.storedObjects.find(
            storedObject => storedObject.type === 'medium',
          )

          return {
            source: mediumSizeFile.url,
            mimetype: mediumSizeFile.mimetype,
            ...getSpecificFile,
          }
        })

        hideModal()
        resolve(alteredFiles)
      }

      showModal('assetManagerEditor', {
        manuscriptId,
        withImport: true,
        handleImport,
      })
    })
  },
})

const Composed = adopt(mapper, mapProps)

const CMSPageEditForm = ({
  onSubmit,
  setFieldValue,
  setTouched,
  key,
  updatePageStatus,
  submitButtonText,
  cmsPage,
}) => {
  const getInputFieldSpecificProps = (item, { onAssetManager }) => {
    let props = {}

    switch (item.type) {
      case 'text-input':
        props.onChange = value => {
          let val = value

          if (value.target) {
            val = value.target.value
          } else if (value.value) {
            val = value.value
          }

          setFieldValue(item.name, val, false)
        }

        break

      case 'rich-editor':
        props.onChange = value => setFieldValue(item.name, value)
        props.onAssetManager = () => onAssetManager(cmsPage.id)
        break

      default:
        props = {}
    }

    return props
  }

  return (
    <Composed>
      {({ onAssetManager }) => (
        <Page>
          <EditorForm key={key} onSubmit={onSubmit}>
            {inputFields.map(item => {
              return (
                <Section flexGrow={item.flexGrow || false} key={item.name}>
                  <p style={{ fontSize: '10px' }}>{item.label}</p>
                  <ValidatedFieldFormik
                    component={item.component}
                    name={item.name}
                    setTouched={setTouched}
                    style={{ width: '100%' }}
                    {...getInputFieldSpecificProps(item, { onAssetManager })}
                  />
                </Section>
              )
            })}
            <ActionButtonContainer>
              <FormActionButton primary type="submit">
                {submitButtonText}
              </FormActionButton>
            </ActionButtonContainer>
          </EditorForm>
        </Page>
      )}
    </Composed>
  )
}

export default CMSPageEditForm
