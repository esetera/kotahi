import React, { useContext } from 'react'
import { injectable, inject } from 'inversify' // TODO: add this.
import { isEmpty } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { WaxContext } from 'wax-prosemirror-core'
import { ToolGroup } from 'wax-prosemirror-services'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

// REMEMBER:
// If we wanted to install other headers (e.g. H5, H6) we'd have to implement them like this:
//
// https://gitlab.coko.foundation/wax/wax-prosemirror/-/tree/master/wax-prosemirror-services/src/DisplayBlockLevel/HeadingService
//
// not sure where Paragraph and BlockQuote are coming from.

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
    @inject('Heading5') heading5,
    @inject('Heading6') heading6,
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
      heading5,
      heading6,
    ]
  }

  renderTools(view) {
    if (isEmpty(view) || window.innerWidth > 18800) return null

    const { activeViewId } = useContext(WaxContext)

    const DropdownStyled = styled(Dropdown)`
      display: inline-flex;
      white-space: nowrap;
      cursor: not-allowed;
      opacity: ${props => (props.select ? 1 : 0.4)};
      pointer-events: ${props => (props.select ? 'default' : 'none')};
      .Dropdown-control {
        border: none;
        padding: 6px 52px 6px 6px;
      }
      .Dropdown-arrow {
        right: 25px;
        top: 16px;
      }
      .Dropdown-menu {
        top: calc(100% + 2px);
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
      { label: 'Title', value: '0', item: this._tools[0] },
      // { label: 'author', value: '1', item: this._tools[1] },
      // { label: 'Subtitle', value: '2', item: this._tools[2] },
      // { label: 'Epigraph Prose', value: '3', item: this._tools[3] },
      // { label: 'Epigraph Poetry', value: '4', item: this._tools[4] },
      { label: 'Heading 2f', value: '5', item: this._tools[5] },
      { label: 'Heading 3', value: '6', item: this._tools[6] },
      { label: 'Heading 4', value: '7', item: this._tools[7] },
      { label: 'Heading 5', value: '14', item: this._tools[14] },
      { label: 'Heading 6', value: '15', item: this._tools[15] },
      { label: 'Paragraph', value: '8', item: this._tools[8] },
      // { label: 'Paragraph Continued', value: '9', item: this._tools[9] },
      // { label: 'Extract Prose', value: '10', item: this._tools[10] },
      // { label: 'Extract Poetry', value: '11', item: this._tools[11] },
      // { label: 'Source Note', value: '12', item: this._tools[12] },
      { label: 'Block quote', value: '13', item: this._tools[13] },
    ]

    const isDisabled = true // this was doing the weird thing with the title, disconnected for now.

    // dropDownOptions[0].item.enable &&
    // dropDownOptions[0].item.enable(state) &&
    // dropDownOptions[0].item.select &&
    // dropDownOptions[0].item.select(state, activeViewId)

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
