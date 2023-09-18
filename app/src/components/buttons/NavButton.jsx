import styled from 'styled-components';

const NavButton = (props) => {
    return (
        <Wrapper onClick={props.onClick}>
            <Icon>
                {props.children}
            </Icon>
            <Description>
                {props.description}
            </Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: min-content;
    width: min-content;
    cursor: pointer;
`
const Icon = styled.div`
    width: 2em;
    left: 0;
    right: 0;
    margin: auto;
    margin-bottom: 0.8em;

`
const Description = styled.div`
    font-size: clamp(1em, 1vw + 1em, 1.1em);
    font-weight: lighter;
    color: white;
    left: 0;
    right: 0;
    margin: auto;
`

export default NavButton;