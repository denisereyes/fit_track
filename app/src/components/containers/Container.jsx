import React from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
    height: fit-content;
    padding: ${props => props.padding || "60px"};
    padding-left: 60px;
    padding-right: 60px;

    background: linear-gradient(to ${props => props.direction || "bottom"}, #183818, #0E240E);
    border-radius: 10px;
`



const Container = (props) => {
    return (
        <StyledContainer padding={props.padding} sides={props.sides} direction={props.direction}>
            {props.children}
        </StyledContainer>
    );
};

export default Container;