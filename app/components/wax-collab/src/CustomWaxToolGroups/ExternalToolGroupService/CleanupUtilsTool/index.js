import React from 'react';
import styled from "styled-components";
import CleanupUtils from './CleanupUtils';


const Wrapper = styled.div`
    display: flex;
    align-item: center !important;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 3px;
`;

const CleanupUtilsTool = () => {
    return (
        <Wrapper>
           <CleanupUtils/>
        </Wrapper>
    )
}

export default CleanupUtilsTool

