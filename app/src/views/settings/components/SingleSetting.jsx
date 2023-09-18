import Title from '../../../components/texts/Title';
import styled from 'styled-components';

const SingleSetting = (props) => {
    return (
        <Wrapper>
            <Title text={props.title}/>
            <Padding/>
            {props.children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: block;
`

const Padding = styled.div`
    margin-bottom: 1em;
`

export default SingleSetting;