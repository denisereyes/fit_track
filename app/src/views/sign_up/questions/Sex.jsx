import React from 'react';
import Title from '../../../components/texts/Title';
import TwoButtons from '../../../components/buttons/TwoButtons';
import ContainerWithButton from '../../../components/containers/ContainerWithButton';
import styled from 'styled-components';

const TitleWrapper = styled.div`
    margin-bottom: 3em;
    
    @media (max-width: 1000px) { 
        text-align: center;
    }

` 

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




const YourGoal = ({nextStep, prevStep, handleChange}) => {
    
      // Tree options
      const oneHandler = {
        text: 'Male',
        onClick: () => {
          nextStep();
          handleChange('sex', 'm');
        },
      }

      const twoHandler = {
        text: 'Female',
        onClick: () => {
          nextStep();
          handleChange('sex', 'f');

        },
      }

      return (
        <Wrapper>

          <ContainerWithButton onClick = {prevStep} >

              <TitleWrapper>
                <Title text="Select your sex"/>
              </TitleWrapper>
              
              <TwoButtons option1={oneHandler} option2={twoHandler}/>

          </ContainerWithButton>

        </Wrapper>
      );
    };


export default YourGoal;