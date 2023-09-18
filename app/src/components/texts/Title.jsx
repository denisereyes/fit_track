import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleStyle = styled.h1`
    font-size: clamp(1.5em, 3.5vw + 1em, 3em);
    line-height: 1.3em;
    font-weight: bold;

`

const Title = (props) => {
    return (
        <TitleStyle>
            {props.text}
        </TitleStyle> 
    );
};

Title.propTypes = {
    text: PropTypes.string,
};

export default Title;