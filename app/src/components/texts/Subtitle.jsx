import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.h2`
    font-size: clamp(1em, 1vw + 1em, 1.8em);
    font-weight: ${props => props.weight || "lighter"};
    color: ${props => props.color || "white"};
    cursor: ${props => !(props.onClick) ? "default" : "pointer"};

`

const Subtitle = (props) => {
    return (
        <StyledText weight={props.weight} onClick={props.onClick}>
            {props.text}
        </StyledText> 
    );
};

Subtitle.propTypes = {
    text: PropTypes.string,
};

export default Subtitle;