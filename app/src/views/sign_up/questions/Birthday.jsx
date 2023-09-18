import React, { useEffect, useState } from 'react';
import Title from '../../../components/texts/Title'
import styled from 'styled-components';
import Button from '../../../components/buttons/Button';
import ContainerWithButton from '../../../components/containers/ContainerWithButton';
import DatePicker from 'react-datepicker';

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

const Birthday = ({nextStep, prevStep, handleChange, value}) => {

    const [date, setDate] = useState(new Date());

    const submitHandler = () =>{
        handleChange('birthday', date);
        nextStep();
    }

    useEffect(() => {
        if (value !== null) setDate(value);
    }, [value]);
    
    return (
        <Wrapper>
            <ContainerWithButton onClick={prevStep}>
                <TitleWrapper>
                    <Title text="Enter your birthday"/>
                </TitleWrapper>
                                
                <UserInputGrid> 
                    <DatePicker selected={date} onChange={(date) => setDate(date)} fixedHeight/>
                    <Button text='Next' onClick={submitHandler}/>
                </UserInputGrid>
            </ContainerWithButton>
        </Wrapper>
        );
    };


export default Birthday;