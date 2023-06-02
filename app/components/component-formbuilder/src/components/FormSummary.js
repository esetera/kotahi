import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import SimpleWaxEditor from '../../../wax-collab/src/SimpleWaxEditor'
import {
  Icon,
  Action,
  ActionButton,
  LooseRow,
  LabelBadge,
} from '../../../shared'

const DetailPane = styled.div`
  background: ${th('colorSecondaryBackground')};
  border: 1px solid ${th('colorFurniture')};
  border-radius: ${th('borderRadius')};
  margin-bottom: 8px;
  padding: 8px;

  & > h2 {
    font-size: ${th('fontSizeHeading5')};
    font-weight: bold;
    margin-right: 1em;
  }
`

const RightLooseRow = styled(LooseRow)`
  float: right;
  width: unset;
`

const MakeActiveButton = styled(ActionButton)`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const FormSummary = ({
  form,
  isActive,
  openFormSettingsDialog,
  makeFormActive,
}) => {
  return (
    <DetailPane>
      <RightLooseRow>
        {isActive ? (
          <LabelBadge color={th('colorPrimary')}>Active</LabelBadge>
        ) : (
          <MakeActiveButton isCompact onClick={makeFormActive}>
            Make this the active form
          </MakeActiveButton>
        )}
        <Action onClick={openFormSettingsDialog} title="Edit form settings">
          <Icon noPadding>edit</Icon>
        </Action>
      </RightLooseRow>
      <h2>{form.structure.name}</h2>
      <SimpleWaxEditor
        key={form.structure.description}
        readonly
        value={form.structure.description}
      />
      <p>
        <i>
          {form.structure.haspopup === 'true'
            ? 'Confirmation page is shown prior to submitting'
            : 'No confirmation page'}
        </i>
      </p>
    </DetailPane>
  )
}

export default FormSummary
