import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Subtitle from '../texts/Subtitle';

const StyledButton = styled.button`
    
    width: 100%;
    min-width: 15em;
    height: clamp(4rem, 6vw, 6rem);
    background: linear-gradient(to top, #1F4A1F, #285F28);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.16);

    border-radius: 10px;
    outline: none;
    border: none;

    transition-duration: 250ms;
    transition-timing-function: ease;


    cursor: pointer;

    &:hover{
        transform: scale(1.02);
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);;

    }

    &:active{
        transform: scale(1);
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.16);;
    }

    &:disabled{
        background: #153815;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
        pointer-events: none;
        transition-duration: 0ms;

    }


`

const Button = (props) => {
    return (
        <StyledButton disabled={props.disabled} onClick={props.onClick}>
            <Subtitle text={props.text} onClick={()=>{}}/> 
        </StyledButton>
    );
};

Button.propTypes = {
    text: PropTypes.string,
};


export default Button;