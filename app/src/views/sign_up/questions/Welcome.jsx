import React, { useEffect } from 'react';
import Title from '../../../components/texts/Title'
import styled from 'styled-components';
import Container from '../../../components/containers/Container';
import TextInput from '../../../components/input/TextInput';
import Button from '../../../components/buttons/Button';
import LightTitle from '../../../components/texts/LightTitle';
import * as AppRegex from '../../../common/AppRegex.js'
import * as Api from '../../../common/Api'

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
    margin-bottom: 2em;
    font-size: clamp(1em, 1.5vw + 1em, 1.55em);


    
    @media (max-width: 1000px) { 
        text-align: center;
    }

`

const Description = styled.div`

    margin-bottom: 1.5em;

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

const Welcome = ({ nextStep, handleChange, value }) => {

    const [disable, setDisable] = React.useState(true);

    const submitHandler = () => {
        nextStep();
    }


    const buttonHandler = async (input) => {
        const usernameAvailable = await Api.usernameAvailable(input)
        input === ('') || !usernameAvailable
            ? setDisable(true)
            : setDisable(false)
        
    }

    const textHandler = (newText) => {

        if (newText.match(AppRegex.username)) {

            handleChange('username', newText);
            buttonHandler(newText);
        }
    }

    useEffect(() => {
        textHandler(value);
    }, []);

    return (
        <Wrapper>
            <Container>
                <TitleWrapper>
                    <Title text="Welcome to FitTrack" />
                </TitleWrapper>

                <Description>
                    <LightTitle text='Choose a username' />
                </Description>

                <UserInputGrid>
                    <TextInput placeholder='Username' onChange={e => textHandler(e.target.value)} onEnter={submitHandler} value={value} />
                    <Button disabled={disable} text='Next' onClick={submitHandler} />
                </UserInputGrid>
            </Container>
        </Wrapper>
    );
};


export default Welcome;