import { useState } from 'react';
import Subtitle from '../texts/Subtitle';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: min-content;
    height: min-content;
    display: flex;

    // Disable text selection
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

`

const Separator = styled.div`
    //Center Container
    border-left: 1px solid white;
    position:relative;
    margin-left: 1em;
    margin-right: 1em;

`

const UnitSelector = ({imperialDesc, metricDesc, isMetric, convertToMetric}) => {

    const [metric, setMetric] = useState(isMetric || false);

    const selectHandler = (convertMetric) => {
        if(convertMetric && !metric){
            convertToMetric(true)
            setMetric(true)


        } else if (!convertMetric && metric){
            convertToMetric(false)
            setMetric(false)

        }
    }

    
    return (
        <Wrapper>
            <Subtitle text={imperialDesc} weight={metric ? 'lighter' : 'bolder'} onClick={() => selectHandler(false)}/>
            <Separator/>
            <Subtitle text={metricDesc} weight={metric ? 'bolder' : 'lighter'} onClick={() => selectHandler(true)}/>
        </Wrapper>
    );
}

export default UnitSelector;