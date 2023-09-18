import React from 'react';
import styled from 'styled-components';


const TextInput = (props) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' & e.target.value !== '') {
            props.onEnter();
        }
    }
    return (
        <StyledInput autoComplete="off" type={props.type || 'text'} placeholder={props.placeholder} onChange={props.onChange} onKeyDown={handleKeyDown} value = {props.value}/>
            
    );
};

export default TextInput;

const StyledInput = styled.input`
    
    box-sizing: border-box;

    width: 100%;
    height: clamp(4rem, 6vw, 6rem);
    margin-top: 0;
    margin-bottom: 0;
    margin: auto;


    background: white;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.16);;

    border-radius: 10px;
    outline: none;
    border: none;

    font-size: clamp(1em, 1vw + 1em, 1.8em);
    font-weight: lighter;
    color: black;

    padding-left: 1em;
    padding-right: 1em;
`