import styled from 'styled-components';
import { useEffect, useState } from 'react';
import TextInput from './TextInput';
import UnitSelector from '../buttons/UnitSelector';
import * as AppRegex from '../../common/AppRegex'

const Wrapper = styled.div`
    display: flex;
`

const CenterSelector = styled.div`
    margin: auto;
    margin-left: 2em;
    margin-right: 6em;
    top: 0;     
    bottom: 0;                  
`


const TextWithSelector = ({placeholder, isMetric, imperialDesc, metricDesc, textHandler, submitHandler, value, conversionStrategy}) => {
    const [text, setText] = useState(value || '');


    const strategy = (toMetric) => {
        setText(conversionStrategy(toMetric, text));
    }

    const changeHandler = (newText) => {
        if(newText.match(AppRegex.float)){
            setText(newText)
            textHandler(newText)
        }
    }

    useEffect(() => {
        value = isMetric ? value : conversionStrategy(false, value)
        setText(value)
    }, []);


    return (
        <Wrapper>
            <TextInput placeholder={placeholder} onChange={e => changeHandler(e.target.value)} onEnter={ submitHandler } value = { text }/> 
            <CenterSelector>
                <UnitSelector isMetric={isMetric} imperialDesc={imperialDesc} metricDesc={metricDesc} convertToMetric={strategy}/>
            </CenterSelector>
        </Wrapper>
    );
}

export default TextWithSelector;