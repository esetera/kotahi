import React, { useContext } from 'react'
/* eslint-disable no-unused-vars */
import { injectable, inject } from 'inversify' // TODO: add this.
/* eslint-enable no-unused-vars */
import { isEmpty } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { WaxContext } from 'wax-prosemirror-core'
import { ToolGroup } from 'wax-prosemirror-services'
// import ToolGroup from '../../lib/ToolGroup' // TODO: figure this out

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

@injectable()
class KotahiBlockDropDown extends ToolGroup {
  tools = []

  constructor(
    @inject('Title') title,
    @inject('Author') author,
    @inject('SubTitle') subtitle,
    @inject('EpigraphProse') epigraphprose,
    @inject('EpigraphPoetry') epigraphpoetry,
    @inject('Heading2') heading2,
    @inject('Heading3') heading3,
    @inject('Heading4') heading4,
    @inject('Paragraph') paragraph,
    @inject('ParagraphContinued') paragraphContinued,
    @inject('ExtractProse') extractProse,
    @inject('ExtractPoetry') extractPoetry,
    @inject('SourceNote') sourceNote,
    @inject('BlockQuote') blockQuote,
  ) {
    super()
    this.tools = [
      title,
      author,
      subtitle,
      epigraphprose,
      epigraphpoetry,
      heading2,
      heading3,
      heading4,
      paragraph,
      paragraphContinued,
      extractProse,
      extractPoetry,
      sourceNote,
      blockQuote,
    ]
  }

  renderTools(view) {
    if (isEmpty(view) || window.innerWidth > 18800) return null

    const { activeViewId } = useContext(WaxContext)

    const DropdownStyled = styled(Dropdown)`
      display: inline-flex;
      cursor: not-allowed;
      opacity: ${props => (props.select ? 1 : 0.4)};
      pointer-events: ${props => (props.select ? 'default' : 'none')};
      .Dropdown-control {
        border: none;
      }
      .Dropdown-arrow {
        right: 25px;
        top: 10px;
      }
      .Dropdown-menu {
        width: 120%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .Dropdown-option {
          width: 100%;
        }
      }
    `

    const { dispatch, state } = view

    const dropDownOptions = [
      /* eslint-disable no-underscore-dangle */
      { label: 'Title', value: '0', item: this._tools[0] },
      { label: 'author', value: '1', item: this._tools[1] },
      { label: 'Subtitle', value: '2', item: this._tools[2] },
      { label: 'Epigraph Prose', value: '3', item: this._tools[3] },
      { label: 'Epigraph Poetry', value: '4', item: this._tools[4] },
      { label: 'Heading 1', value: '5', item: this._tools[5] },
      { label: 'Heading 2', value: '6', item: this._tools[6] },
      { label: 'Heading 3', value: '7', item: this._tools[7] },
      { label: 'Paragraph', value: '8', item: this._tools[8] },
      { label: 'Paragraph Continued', value: '9', item: this._tools[9] },
      { label: 'Extract Prose', value: '10', item: this._tools[10] },
      { label: 'Extract Poetry', value: '11', item: this._tools[11] },
      { label: 'Source Note', value: '12', item: this._tools[12] },
      { label: 'Block Quote', value: '13', item: this._tools[13] },
      /* eslint-enable no-underscore-dangle */
    ]

    const isDisabled =
      dropDownOptions[0].item.enable &&
      dropDownOptions[0].item.enable(state) &&
      dropDownOptions[0].item.select &&
      dropDownOptions[0].item.select(state, activeViewId)

    let found = ''
    dropDownOptions.forEach((item, i) => {
      if (item.item.active(state, activeViewId) === true) {
        found = item.item.label
      }
    })

    return (
      <DropdownStyled
        key={uuidv4()}
        onChange={option => {
          /* eslint-disable no-underscore-dangle */
          this._tools[option.value].run(state, dispatch)
          /* eslint-enable no-underscore-dangle */
        }}
        options={dropDownOptions}
        placeholder="Block Level"
        select={isDisabled}
        value={found}
      />
    )
  }
}

export default KotahiBlockDropDown
