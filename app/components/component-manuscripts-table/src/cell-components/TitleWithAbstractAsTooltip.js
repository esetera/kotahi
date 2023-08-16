import React from 'react'
import styled from 'styled-components'
import Tooltip from 'rc-tooltip'
import { InfoIcon } from '../style'
import { stripHtml } from '../../../component-review/src/components/review/util'
import { SemanticScholarIcon } from '../../../shared/Icons'

const FloatingIcon = styled.div`
  float: right;
`

const IsImportSemanticScholar = styled(SemanticScholarIcon)`
  height: 15px;
  margin-bottom: -5px;
  margin-right: 10px;
  width: 20px;
`

const getAbstractAsPlainText = manuscript =>
  stripHtml(manuscript.submission.$abstract || '')

/** Render the title;
 * if abstract exists, a floating info icon will show the abstract on hover.
 * If submission.$sourceUri exists, the title will be hyperlinked to this;
 * failing that, if submission.$doi exists, the title will be hyperlinked to a DOI link.
 * */
const TitleWithAbstractAsTooltip = ({ manuscript }) => {
  const title = manuscript.submission.$title || ''

  const isManuscriptFromSemanticScholar = !!(
    manuscript.importSourceServer &&
    manuscript.importSourceServer === 'semantic-scholar'
  )

  let url = manuscript.submission.$sourceUri
  if (!url && manuscript.submission.$doi)
    url = `https://doi.org/${manuscript.submission.$doi}`

  const abstract = getAbstractAsPlainText(manuscript)

  return (
    <div>
      {abstract && (
        <FloatingIcon>
          <Tooltip
            destroyTooltipOnHide={{ keepParent: false }}
            getTooltipContainer={el => el}
            overlay={
              <span>
                {abstract.length > 1000
                  ? `${abstract.slice(0, 1000)}...`
                  : abstract}
              </span>
            }
            overlayInnerStyle={{
              backgroundColor: 'black',
              color: 'white',
              borderColor: 'black',
              fontWeight: 'normal',
            }}
            overlayStyle={{
              width: '40em',
              maxWidth: '65vw',
              wordBreak: 'break-word',
            }}
            placement="bottomLeft"
            trigger={['hover']}
          >
            <InfoIcon />
          </Tooltip>
        </FloatingIcon>
      )}
      {isManuscriptFromSemanticScholar && (
        <IsImportSemanticScholar height="60" width="80" />
      )}
      <span style={{ wordBreak: 'break-word' }}>
        {url ? (
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </span>
    </div>
  )
}

export default TitleWithAbstractAsTooltip
