import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  padding-right: 10px;
`

const FlexContainer = styled.div`
  display: flex;
`

const UpdateReference = ({ data, tagList, updateRef }) => {
  const HandleTagColor = (item, key) => {
    let tagColor = '#000000' // Default Tag Color
    const findKey = item[key].split('-')[1]

    const matches = tagList.filter(element => {
      // return element["tag"] === item[key];
      return element.tag.includes(findKey)
    })

    if (matches.length > 0) {
      tagColor = matches[0].color
    }

    return tagColor
  }

  const setAllTag = (item, key) => {
    return (
      <sub
        style={{
          marginLeft: '1px',
          marginRight: '1px',
          fontSize: '2px',
          color: 'red',
          opacity: -1,
          '&:hover': {
            background: '#efefef',
          },
        }}
      >
        {item[key].split('-')[1]}
      </sub>
    )
  }

  return (
    <ContentWrapper style={{ clear: 'both' }}>
      <FlexContainer>
        <div
          style={{ width: '90%', wordBreak: 'break-all', marginTop: '21px' }}
        >
          {data &&
            data.prediction.map((ele, index) => {
              return ele.map(item => {
                for (const key in item) {
                  const tagColor = HandleTagColor(item, key)
                  return (
                    <span
                      style={{
                        color: tagColor,
                      }}
                    >
                      {key}
                      {setAllTag(item, key)}
                    </span>
                  )
                }
              })
            })}
        </div>
        <button
          onClick={() => {
            updateRef()
          }}
          style={{
            backgroundColor: '#3AAE2A',
            border: '1px solid #3AAE2A',
            color: 'white',
            padding: '6px 24px',
            cursor: 'pointer',
            borderRadius: '3px',
            height: '50%',
          }}
        >
          Update
        </button>
      </FlexContainer>
    </ContentWrapper>
  )
}

export default UpdateReference
