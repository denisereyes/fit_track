import React from 'react';
import Button from "./Button";
import styled from 'styled-components';

const Grid = styled.div`

    display: grid;

    @media (min-width: 1000px) { 
        gap: 60px;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-columns: minmax(100px, auto);
    }


    @media (max-width: 1000px) { 
        gap: clamp(30px, 6vh, 60px);
        grid-template-rows: repeat(2, 1fr);
        grid-auto-rows: minmax(100px, auto);
    }


`

const TwoButtons = (props) => {

    return (
        <Grid>
            <Button text={props.option1.text} onClick={props.option1.onClick}/>
            <Button text={props.option2.text} onClick={props.option2.onClick}/>
        </Grid>

       );
};

export default TwoButtons;