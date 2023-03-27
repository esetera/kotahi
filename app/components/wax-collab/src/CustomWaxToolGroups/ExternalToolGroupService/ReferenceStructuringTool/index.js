import React from 'react';
import styled from "styled-components";
import ReferenceStructuring from './ReferenceStructuring';



const Wrapper = styled.div`
    display: flex;
    align-item: center;
    justify-content: center;
    height: 30px;
`;

const ReferenceStructuringTool = () => {
    return (
        <Wrapper>
            <ReferenceStructuring/>
        </Wrapper>
    )
}

export default ReferenceStructuringTool

