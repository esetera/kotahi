import React from 'react';
import styled from "styled-components";
import ImageCitation from './ImageCitation';


const Wrapper = styled.div`
    display: flex;
    align-item: center !important;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 3px;
`;

const ImageCitationTool = () => {
    return (
        <Wrapper>
            <ImageCitation />
        </Wrapper>
    )
}

export default ImageCitationTool

