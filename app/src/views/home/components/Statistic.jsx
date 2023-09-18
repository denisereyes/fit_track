import styled from 'styled-components';
import Arrow from '../../../components/Arrow';

const Statistic = (props) => {
    return (  
        <Wrapper>
            <Value>{Math.abs(props.value)}</Value>
            <ArrowWrapper>
                <Arrow value={props.value} type={props.type} direction={props.arrowDirection}/>
            </ArrowWrapper>
            <Description>{props.description}</Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`
const ArrowWrapper = styled.div`
    top: 0;
    bottom: 0;
    margin: auto;
    margin-left: 10px;
    margin-right: 10px;
`

const Value = styled.div`
    font-size: clamp(1em, 1vw + 1em, 1.1em);
    font-weight: bolder;
    color: white;

`
const Description = styled.div`
        font-size: clamp(1em, 1vw + 1em, 1.1em);
    font-weight: lighter;
    color: white;

`

export default Statistic;