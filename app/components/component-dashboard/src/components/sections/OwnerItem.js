import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Item, StatusBadge } from '../../style'
import VersionTitle from './VersionTitle'
import { Icon, ClickableSectionRow } from '../../../../shared'
import theme from '../../../../../theme'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const OwnerItem = ({ version, urlFrag, instanceName, shouldShowShortId }) => {
  return (
    <StyledLink
      key={`version-${version.id}`}
      to={`${urlFrag}/versions/${version.parentId || version.id}/submit`}
    >
      <ClickableSectionRow>
        <Item>
          <div>
            {' '}
            <StatusBadge
              minimal
              published={version.published}
              status={version.status}
            />
            <VersionTitle
              instanceName={instanceName}
              shouldShowShortId={shouldShowShortId}
              version={version}
            />
          </div>
          <Icon color={theme.colorSecondary} noPadding size={2.5}>
            chevron_right
          </Icon>
        </Item>
      </ClickableSectionRow>
    </StyledLink>
  )
}

OwnerItem.propTypes = {
  version: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default OwnerItem
