import React from 'react';
import Title from "../../../components/texts/Title";
import ThreeButtons from "../../../components/buttons/ThreeButtons";
import ContainerWithButton from "../../../components/containers/ContainerWithButton"
import styled from 'styled-components';



const ActivityLevel = ({ nextStep, prevStep, handleChange }) => {


  const handler = (description, id) => {
    return {
      text: description,
      onClick: () => {
        nextStep();
        handleChange('active', id);
      },
    }
  }

  return (
    <Wrapper>

      <ContainerWithButton onClick={prevStep} >

        <TitleWrapper>
          <Title text="How active are you" />
        </TitleWrapper>

        <ThreeButtons
          option1={handler('Often', 1)}
          option2={handler('Sometimes', 0)}
          option3={handler('Never', -1)}
          />

      </ContainerWithButton>

    </Wrapper>
  );
};

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

export default ActivityLevel;