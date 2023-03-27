import React from 'react';
import styled from "styled-components";
import ReferenceUnCitation from './ReferenceUnCitation';

const Wrapper = styled.div`
    display: flex;
    align-item: center !important;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 3px;
`;

const ReferenceUnCitationTool = () => {
    return (
        <Wrapper>
            <ReferenceUnCitation />
        </Wrapper>
    )
}

export default ReferenceUnCitationTool

