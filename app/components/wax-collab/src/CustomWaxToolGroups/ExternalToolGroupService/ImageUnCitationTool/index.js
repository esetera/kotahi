import React from 'react';
import styled from "styled-components";
import ImageUnCitation from './ImageUnCitation';

const Wrapper = styled.div`
    display: flex;
    align-item: center !important;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 3px;
`;

const ImageUnCitationTool = () => {
    return (
        <Wrapper>
            <ImageUnCitation />
        </Wrapper>
    )
}

export default ImageUnCitationTool

