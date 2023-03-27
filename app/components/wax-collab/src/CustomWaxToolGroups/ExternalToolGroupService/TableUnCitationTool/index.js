import React from 'react';
import styled from "styled-components";
import TableUnCitation from './TableUnCitation';


const Wrapper = styled.div`
    display: flex;
    align-item: center !important;
    padding-left: 4px;
    padding-right: 4px;
    margin-top: 3px;
`;

const TableUnCitationTool = () => {
    return (
        <Wrapper>
            <TableUnCitation />
        </Wrapper>
    )
}

export default TableUnCitationTool

