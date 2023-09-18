import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const LightTitle = ({text}) => {
    return (
        <StyledText>
            {text}
        </StyledText> 
    );
};

LightTitle.propTypes = {
    text: PropTypes.string,
};

const StyledText = styled.h3`
    font-size: clamp(1.65em, 1.8vw + 1em, 2.3em);
    font-weight: 100;
    margin: 0;
    color: #ffffff;
    color: ${props => props.color || 'white'};

`

export default LightTitle;