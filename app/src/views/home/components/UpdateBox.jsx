import styled from 'styled-components';
import Container from "../../../components/containers/Container";
import TextInput from '../../../components/input/TextInput';
import Subtitle from '../../../components/texts/Subtitle';
import Button from "../../../components/buttons/Button";
import Statistic from './Statistic';
import { useState } from 'react';

const UpdateBox = (props) => {

    const [disable, setDisable] = useState(true);
    const [text, setText] = useState('');

    const buttonHandler = async (input) => {

        input === ('' && '-')
            ? setDisable(true)
            : setDisable(false)
    }

    const textHandler = (newText) => {

        if (newText.match(props.inputFilter)) {
            setText(newText);
            buttonHandler(newText);
        }
    }

    const submitHandler = () => {
        setText('');
        setDisable(true);
        props.onUpdate(Number(text))
        
    }

    const description = () => {
        if(props.description === 'Weight'){
            return {left:'Week', right:'Total'}
        }else {
            return {left:'Out', right:'In'}
        }
    }

    
    return (
            <Container>
                        <Grid>
                            <Description>
                                <Subtitle
                                    text = {props.description}
                                    weight = 'bolder'
                                    />
                            </Description>

                            <Amount>
                                <Subtitle text = {props.topValue}/>
                            </Amount>

                            <Input>
                                <TextInput
                                    value = {text}
                                    placeholder = {'Enter ' + props.description}
                                    onChange = {e => textHandler(e.target.value)}
                                    onEnter={submitHandler}
                                    />
                            </Input>

                            <ButtonWrapper>
                                <Button 
                                    text = 'Update' 
                                    disabled = {disable} 
                                    onClick = {submitHandler}
                                    />
                            </ButtonWrapper>

                            <BottomLeft>
                                <Statistic
                                    type = {props.description}
                                    value = {props.leftValue}
                                    description = {description().left}
                                    arrowDirection = 'right'
                                    />
                            </BottomLeft>

                            <BottomRight>
                                <Statistic
                                    type={props.description}
                                    value={props.rightValue}
                                    description={description().right}
                                    arrowDirection = 'left'
                                    />
                            </BottomRight>
                        </Grid>
            </Container>
    );
}

const Grid = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 0.5fr 0.7fr 0.7fr 0.5fr; 
    gap: 2em 0em; 
    grid-template-areas: 
    "Description Amount"
    "Input Input"
    "Button Button"
    "BottomLeft BottomRight"; 
`

const Amount = styled.div`
    justify-self: end; 
    grid-area: Amount; 

`
const Description = styled.div`
    justify-self: start; 
    grid-area: Description; 

`
const Input = styled.div`
    align-self: center; 
    grid-area: Input; 

`
const ButtonWrapper = styled.div`
    align-self: center; 
    grid-area: Button; 

`
const BottomLeft = styled.div`
    justify-self: start; 
    align-self: center; 
    grid-area: BottomLeft;
    width: min-content;

`
const BottomRight = styled.div`
    justify-self: end; 
    align-self: center; 
    grid-area: BottomRight; 
    width: min-content;

`

export default UpdateBox;