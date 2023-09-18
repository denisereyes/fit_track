import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`

    width: fit-content;
    height: fit-content;
    background: rgba(0, 0, 0, 0.0);

    outline: none;
    border: none;

    font-size: clamp(1em, 1vw + 1em, 1.5em);
    font-weight: bold;
    color: #ffffff;

    cursor: pointer;


`

const TextButton = (props) => {
    return (
        <StyledButton onClick={props.onClick}>
            {props.text}
        </StyledButton>
    );
};

TextButton.propTypes = {
    text: PropTypes.string,
};


export default TextButton;