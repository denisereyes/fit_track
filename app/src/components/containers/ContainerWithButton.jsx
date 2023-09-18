import React from 'react';
import styled from 'styled-components';
import TextButton from '../buttons/TextButton';
import Container from './Container';



const Wrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
    margin-top: 17px;

`

const ContainerWithButton = ({children, onClick, label='Go Back'}) => {
    return (
        <>
            <Container>
                {children}
            </Container>

            <Wrapper >
                <TextButton text={label} onClick={onClick}/>
            </Wrapper>
        </>

    );
};

export default ContainerWithButton;