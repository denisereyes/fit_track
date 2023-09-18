import React, { useEffect, useState } from 'react';
import Title from '../../../components/texts/Title'
import styled from 'styled-components';
import Button from '../../../components/buttons/Button';
import ContainerWithButton from '../../../components/containers/ContainerWithButton';
import TextWithSelector from '../../../components/input/TextWithSelector';
import {roundTo} from 'round-to';

const Wrapper = styled.div`
    //Center Container
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    max-width: 950px;
    height: min-content;

    @media (max-width: 1000px) { 
        padding: 10vw;
    }

    @media (max-width: 700px) { 
        padding: 30px;
    }
`

const TitleWrapper = styled.div`
    margin-bottom: 3em;
    
    @media (max-width: 1000px) { 
        text-align: center;
    }
`
const UserInputGrid = styled.div`
    
    display: grid;

    @media (min-width: 1000px) { 
        gap: 50px;
        grid-template-columns: 2fr 1fr;
        grid-auto-columns: minmax(100px, auto);
    }


    @media (max-width: 1000px) { 
        gap: clamp(30px, 6vh, 60px);
        grid-template-rows: repeat(2, 1fr);
        grid-auto-rows: minmax(100px, auto);
    }

`

const Height = ({nextStep, prevStep, handleChange, value, isMetric}) => {

    const [disable, setDisable] = useState(true);

    const submitHandler = () =>{
        nextStep();
    }

    const textHandler = (newText) =>{
        const meters = isMetric ? newText : newText / 3.28
        handleChange('height', meters);
        buttonHandler(newText)
    }

    const formatHeight = (toMetric, height) => {
        handleChange('isMetric', toMetric);
        if(height === '') return ''
        const raw = toMetric ? height / 3.28 : (height * 3.28)
        return roundTo(Number(raw), 2);

    }


    const buttonHandler = (text) => {
        (text === '')
            ? setDisable(true)
            : setDisable(false);
    }


    useEffect(() => {
        buttonHandler(value);
    }, []);

    return (
        <Wrapper>
            <ContainerWithButton onClick={prevStep}>
                <TitleWrapper>
                    <Title text="Enter your height"/>
                </TitleWrapper>
                
                <UserInputGrid> 
                    <TextWithSelector placeholder='Height' isMetric={isMetric} imperialDesc='ft' metricDesc='m' value={value} textHandler={textHandler}  submitHandler={submitHandler} conversionStrategy={formatHeight}/>
                    <Button disabled={disable} text='Next' onClick={submitHandler}/>
                </UserInputGrid>
            </ContainerWithButton>
        </Wrapper>
        );
    };


export default Height;