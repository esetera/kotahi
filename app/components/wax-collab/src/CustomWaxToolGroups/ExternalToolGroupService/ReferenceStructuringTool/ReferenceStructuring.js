import React, { useState, useContext, useEffect, useRef } from 'react'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { SelectDropdown } from '@pubsweet/ui/dist/molecules'
import { WaxContext } from 'wax-prosemirror-core'
import Modal, { FooterButton, ModalBody, ModalContainer, ModalFooter, ModalHeader } from "./styles"
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import styled from 'styled-components'
import UpdateReference from './UpdateReference'
import { useMutation } from '@apollo/client'
import { alltagList, Replacetags, ReplacetagsList } from './ReferenceStructureHelper/constants'
import { GET_REFERENCE_STRUCTURING } from '../../../../../../queries'

const Wrapper = styled.div`
  height: 93%;
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ContentWrapper = styled.div`
  padding-right: 10px;
`

const SpanWrapper = styled.span`
  margin-right: 5px;
  // background: #ffe184;
`
const FlexContainer = styled.div`
  display: flex;
`
const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  // flex-wrap: wrap;
  float: left;
`
const TagList = styled.button`
  height: 30px;
  width: 150px;
  background-color: rgb(63, 81, 181);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 5px;
  padding: 0;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`

const ButtonStyle = styled.button`
background-color: #3AAE2A;
    border: 1px solid #3AAE2A;
    color: white;
    padding: 6px 24px;
    cursor: pointer;
    border-radius: 3px;
    margin:auto;
`
const WrapperItem = styled.div`
width:${props => props.width};
`

function ReferenceStructuring(props) {
  const { pmViews: { main }, app } = useContext(WaxContext)
  const [open, setOpen] = useState(false)
  const [referenceDetails, setReferenceDetails] = useState([])
  const [reStructuredList, setRestructuredList] = useState([])
  const [referenceData, setreferenceData] = useState(null)
  const [isStructure, setIsStructure] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isEditList, setIsEditList] = useState(null)
  const [isResInd, setResInd] = useState(null)
  const [isTag, setIsTag] = useState('')
  const [dropDownValue, setDropdownValue] = useState(null)
  const [selectedButton, setSelectedButton] = useState(false)
  const [edit, setEdit] = useState(false)

  const [textCopy, setTextCopy] = useState('')

  const [createReferenceStructuring] = useMutation(GET_REFERENCE_STRUCTURING)


  const enableService = app.config.get(
    'config.EnableTrackChangeService.enabled',
  )

  const getSelectionText = () => {
    var text = ''
    var newText = ''
    var activeEl = document.activeElement
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null
    if (
      activeElTagName == 'span' ||
      (activeElTagName == 'span' &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
        typeof activeEl.selectionStart == 'number')
    ) {

      text = activeEl.value.slice(
        activeEl.selectionStart,
        activeEl.selectionEnd,
      )

    } else {
      text = window.getSelection().toString()
      setTextCopy(text)
    }
  }
  document.onmouseup = document.onselectionchange = function (e) {

    getSelectionText()
  }

  const referenceDetailsList = () => {
    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
      referenceBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'reference') {
        referenceBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId,
          valid: node.node.attrs.valid === 'true',
          structurevalid: node.node.attrs.structure === 'true',
        })
      }
    })

    referenceBlock.push({
      data_id: "e9f047a3-ce72-479f-9c44-6387f8fc8ae9",
      structurevalid: false,
      text: "Carruthers, P. and A. Chamberlain, eds. 2000. Evolution and the Human Mind. Cambridge: Cambridge University Press.",
      valid: false
    })

    referenceBlock.push({
      data_id: "cedab611-9c1c-49d5-85d4-50eeee073604",
      structurevalid: false,
      text: "Connelly, From Enemy to Brother (Cambridge, MA: Harvard University Press, 2012), 34.",
      valid: false
    })

    setReferenceDetails(referenceBlock)

  }

  const handleCleanupMode = () => {
    referenceDetailsList()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleBack()
    setIsStructure(false)

  }
  const getKeys = predArry => {
    let keyArr = []
    predArry?.prediction[0].map((el, i) => {
      keyArr.push(Object.keys(el)[0])
    })
    return keyArr.join(' ')
  }
  const handleDataStr = response => {
    let newRes = []
    referenceDetails.forEach((el, refInd) => {
      response.forEach((refEl, i) => {
        el.text.replace(/\u00a0/g, " ") == getKeys(refEl) && (newRes[refInd] = refEl)
      })
    })
    setRestructuredList(newRes)
  }

  const onReStructure = response => {
    handleDataStr(response)
    setRestructuredList(response)
  }
  const onUpdateReference = async props => {
    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    let multipleNode = []
    const {
      state: { schema },
    } = main

    isEditList['prediction'].map(items => {
      items.map((item, index) => {
        for (const key in item) {
          if (
            item[key] == 'I-ATL' ||
            item[key] == 'I-TIT' ||
            item[key] == 'B-TIT'
          ) {
            const node = schema.text(key + ' ', [schema.marks.atl.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-COL') {
            const node = schema.text(key + ' ', [schema.marks.collab.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-CMD' || item[key] == 'I-CON') {
            const node = schema.text(key + ' ', [schema.marks.cmd.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-DOI') {
            const node = schema.text(key + ' ', [schema.marks.doi.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-EID') {
            const node = schema.text(key + ' ', [schema.marks.email.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-ISS') {
            const node = schema.text(key + ' ', [schema.marks.iss.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-JTL') {
            const node = schema.text(key + ' ', [schema.marks.jtl.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-PER') {
            const node = schema.text(key + ' ', [schema.marks.per.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-PN') {
            const node = schema.text(key + ' ', [schema.marks.pub.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-PGS') {
            const node = schema.text(key + ' ', [schema.marks.pg.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-SRC') {
            const node = schema.text(key + ' ', [schema.marks.src.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-URL') {
            const node = schema.text(key + ' ', [schema.marks.url.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-VOL') {
            const node = schema.text(key + ' ', [schema.marks.vol.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-YR') {
            const node = schema.text(key + ' ', [schema.marks.yr.create()])
            multipleNode.push(node)
          } else if (item[key] == 'I-VIP') {
            const node = schema.text(key + ' ', [schema.marks.vip.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-AU') {
            const node = schema.text(key + ' ', [schema.marks.au.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-AUG') {
            const node = schema.text(key + ' ', [schema.marks.aug.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-SNM') {
            const node = schema.text(key + ' ', [schema.marks.snm.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-FNM') {
            const node = schema.text(key + ' ', [schema.marks.fnm.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-COLLAB') {
            const node = schema.text(key + ' ', [schema.marks.vip.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-PUB') {
            const node = schema.text(key + ' ', [schema.marks.pub.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-LOC') {
            const node = schema.text(key + ' ', [schema.marks.loc.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-ED') {
            const node = schema.text(key + ' ', [schema.marks.ed.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-EDN') {
            const node = schema.text(key + ' ', [schema.marks.edn.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-EDGB') {
            const node = schema.text(key + ' ', [schema.marks.edgb.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-EDS') {
            const node = schema.text(key + ' ', [schema.marks.eds.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-BTL') {
            const node = schema.text(key + ' ', [schema.marks.btl.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-CTL') {
            const node = schema.text(key + ' ', [schema.marks.ctl.create()])
            multipleNode.push(node)
          }
          else if (item[key] == 'I-SRC') {
            const node = schema.text(key + ' ', [schema.marks.src.create()])
            multipleNode.push(node)
          }
        }
      })
    })
    const attr = {
      class: `reference`,
      valid: referenceData.valid,
      refId: referenceData[isResInd].data_id,
    }
    let p = schema.nodes.customTagBlock.create(attr, multipleNode)

    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'reference') {
        if (node.node.attrs.refId == referenceData[isResInd].data_id) {
          const tr = main.state.tr.replaceWith(
            node.pos,
            node.pos + node.node.nodeSize,
            p,
          )
          structure: 'true', main.dispatch(tr)
        }
      }
    })

    setShowModal(false)
    setEdit(false)
  }

  const handleBack = () => {
    if (edit) {
      setShowModal(false)
      setIsEditList(null)
      setEdit(false)
    } else {
      setShowModal(false)
      setIsEditList(null)
      setIsStructure(false)
    }
  }
  const referenceStructure = async ref => {
    if (reStructuredList.length > 0) {
      setIsStructure(true)
      setreferenceData(ref)
    }
    else {
      let data = []
      ref.map((ele, index) => {
        return data.push(ele.text)
      })
      setIsStructure(true)
      setreferenceData(ref)
      const response = await createReferenceStructuring({ variables: { references: data } })
      const responseData = JSON.parse(response.data.createReferenceStructuring.response.response)
      onReStructure(responseData)
    }
  }

  const getData = useRef(null)

  const handleTextChange = index => {
    var paragraph = document.getElementById('showData' + index)
    var text = document.createTextNode(isTag)

    paragraph.appendChild(text)
  }

  const selectedCopyTextTag = tag => {
    console.log(textCopy)
    setIsTag(dropDownValue.value)
    let copyText = textCopy
    copyText = copyText.replace(ReplacetagsList, function (matched) {
      return Replacetags[matched]
    })
    console.log(copyText)
    const CopyTexArray = copyText.split(' ')

    CopyTexArray.forEach((item, index) => {
      handleChangeTag(item, index, item, tag)
    })
  }

  const EditRestructureList = () => {
    const tagList = alltagList.slice(0, 27).map((tag, index) => {
      return {
        index: index,
        value: tag.tag,
        label: tag.label
      }
    })
    return (
      <FlexContainer>
         <WrapperItem width={'70%'}>
          <SelectDropdown value={dropDownValue} options={tagList} placeholder={'Please select the tags'} isClearable={true}
            onChange={(value) => {
              if (value !== null) {
                setDropdownValue(value)
                console.log(value)
              }
            }}
          />
        </WrapperItem>
        <WrapperItem width={'30%'}>
          <ButtonStyle style={{ height: 'fit-content', marginLeft: '5px', width: '50%' }}
            onClick={() => { selectedCopyTextTag(''), setDropdownValue(null) }}> Apply </ButtonStyle>
        </WrapperItem>
      </FlexContainer>

    )
  }
  const ReferenceList = ({ referenceDetails }) => {
    return referenceDetails.map((ref, index) => (
      <ContentWrapper key={`${ref}-${index}`}>
        <div>
          <span
            id={`showData${index}`}
            onClick={() => {
              handleTextChange(index)
            }}
          >
            {ref.text}
          </span>
          <div>
            {ref.structurevalid ? (
              <div>
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289Z"
                    fill="#1890FF"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        {referenceDetails.length > 1 &&
          referenceDetails.length !== index + 1 && <hr />}
      </ContentWrapper>
    ))
  }

  const setAllTag = (item, key) => {
    return (
      <sub
        style={{
          marginLeft: '1px',
          marginRight: '1px',
          fontSize: '1px',
          color: 'red',
          opacity: -1,
          "&:hover": {
            background: "#efefef"
          },
        }}
      >
        {item[key].split('-')[1]}
      </sub>
    )
  }

  const EditRestructureListData = props => {
    setIsEditList(isEditList)

    // USER SELECTED STRING COPY NEW TEXT



    //let ArrayData = newData ? newData : isEditList;
    return (
      <ContentWrapper style={{ clear: 'both' }}>
        <FlexContainer>
          <Typography
            style={{ width: '90%', wordBreak: 'break-all', marginTop: '21px' }}
          >
            {isEditList &&
              isEditList['prediction'].map((ele, index) => {
                return ele.map(item => {
                  for (const key in item) {
                    let tagColor = HandleTagColor(item, key)
                    return (
                      <span
                        style={{
                          color: tagColor,
                        }}
                        onClick={() => {
                          handleChangeTag(item, index, key)
                        }}
                      >
                        {key}
                        {setAllTag(item, key)}
                      </span>
                    )
                  }
                })
              })}
          </Typography>
          <ButtonMUI
            variant="contained"
            color="primary"
            style={{
              height: 'fit-content',
              marginLeft: '5px',
              position: 'relative',
              top: '13px',
            }}
            onClick={() => {
              onUpdateReference(referenceDetails)
            }}
          >
            Update
          </ButtonMUI>
        </FlexContainer>
      </ContentWrapper>
    )
  }



  const handleChangeTag = (item, index, key, tag) => {
    let newData = isEditList
    let tagupdate = tag || isTag
    newData['prediction'][0].forEach((el, i) => {
      // el[key] = agupdate;

      let newItem = item.replace('undefined', 'i')
      if (Object.keys(el)[0] == newItem) {

        el[Object.keys(el)[0]] = tagupdate
      }

    })
    let restructed = [...reStructuredList]
    restructed[isResInd].prediction = newData.prediction
    setRestructuredList(restructed)
    setIsEditList(newData)
  }

  const HandleTagColor = (item, key) => {
    let tagColor = '#000000' // Default Tag Color
    let findKey = item[key].split('-')[1]

    let matches = alltagList.filter(function (element) {
      //return element["tag"] === item[key];
      return element['tag'].includes(findKey)
    })
    if (matches.length > 0) {
      tagColor = matches[0].color
    }
    return tagColor
  }

  const ReStructuredList = ({ reStructuredList }) => {

    return (
      !showModal &&

      reStructuredList.map((items, index) => (
        <ContentWrapper key={index} style={{ wordBreak: 'break-all' }}>
          <FlexContainer>
            <div style={{ width: '90%' }}>

              {items['prediction'].map(ele => {
                return ele.map(item => {
                  for (const key in item) {
                    let tagColor = HandleTagColor(item, key)
                    return (
                      <SpanWrapper style={{ color: tagColor }}>
                        {key} {tagColor == '#000000' ? item[key] : ''}
                      </SpanWrapper>
                    )
                  }
                })
              })}
            </div>

            <ButtonStyle
              style={{ height: 'fit-content', marginLeft: '5px', width: '20%' }}
              onClick={() => {
                setShowModal(true)
                setIsEditList(items)
                setResInd(index)
                setEdit(true)
              }}
            >
              Edit
            </ButtonStyle>
          </FlexContainer>
          {reStructuredList.length > 1 &&
            reStructuredList.length !== index + 1 && <hr />}
        </ContentWrapper>
      ))
    )
  }

  return (
    <>
      <Button
        className="px-4"
        icon={
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="26px"
            height="26px"
            viewBox="6 4 27 27"
            enableBackground="new 20 20 40 40"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  fill="#282827"
                  d="M15.5,11.762c1.5,0,3,0.297,4.5,0.891c1.5-0.594,3-0.891,4.5-0.891c0.719,0,1.477,0.078,2.273,0.234 s1.414,0.328,1.852,0.516l0.656,0.234l0.469,0.234v0.469v13.688v1.125h-8.438c-0.313,0.5-0.75,0.75-1.313,0.75s-1-0.25-1.313-0.75 H10.25v-1.125V13.449V12.98l0.469-0.234C12.281,12.09,13.875,11.762,15.5,11.762z M15.5,13.262c-1.156,0-2.406,0.25-3.75,0.75 v12.094c1.313-0.438,2.563-0.656,3.75-0.656s2.438,0.219,3.75,0.656V14.012C17.844,13.512,16.594,13.262,15.5,13.262z  M24.5,13.262c-1.094,0-2.344,0.25-3.75,0.75v12.094c1.313-0.438,2.563-0.656,3.75-0.656s2.438,0.219,3.75,0.656V14.012 C26.906,13.512,25.656,13.262,24.5,13.262z"
                />
              </g>
              <path
                fill="none"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="M34,35H6 c-0.553,0-1-0.447-1-1V6c0-0.553,0.447-1,1-1h28c0.553,0,1,0.447,1,1v28C35,34.553,34.553,35,34,35z"
              />
            </g>
          </svg>
        }
        title="Reference Structuring"
        onClick={handleCleanupMode}
        disabled={enableService}
      />

      <Modal
        isOpen={open}
      // onClose={handleClose}
      >
        <ModalContainer>
          <ModalHeader
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: 'flex', flexWrap: 'wrap', columnGap: '4px' }}
          >
            Reference Structuring
            <div style={{ marginLeft: 'auto', marginTop: '4px' }}>

              {
                referenceDetails.length <= 0 ? <>
                </> :
                  <>
                    <ButtonStyle

                      style={{ height: 'fit-content', marginLeft: '4px' }}
                      onClick={() => {
                        referenceStructure(referenceDetails)
                      }}
                      disabled={isStructure}
                    >
                      Re-structure
                    </ButtonStyle>
                    <ButtonStyle
                      style={{ height: 'fit-content', marginLeft: '5px' }}
                      onClick={handleBack}
                      disabled={!isStructure}
                    >
                      Back
                    </ButtonStyle>
                  </>
              }
            </div>
          </ModalHeader>
          <ModalBody>
            <Wrapper>
              {showModal && <EditRestructureList />}
              {showModal && <UpdateReference updateRef={() => {
                onUpdateReference(referenceDetails)
              }} data={isEditList} tagList={alltagList} />}
              {isStructure ? (
                reStructuredList.length > 0 ? (
                  <ReStructuredList reStructuredList={reStructuredList} />
                ) : (
                  <div style={{ padding: '10px' }}>Loading...</div>
                )
              ) : (
                referenceDetails.length > 0 ? (
                  <ReferenceList referenceDetails={referenceDetails} />
                ) : <>No References</>
              )}
            </Wrapper>
          </ModalBody>
          <ModalFooter>
            <FooterButton onClick={handleClose}>Close</FooterButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  )
}

export default ReferenceStructuring
