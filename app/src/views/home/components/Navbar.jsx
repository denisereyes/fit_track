import styled from 'styled-components';
import Container from "../../../components/containers/Container";
import Title from '../../../components/texts/Title';
import Subtitle from '../../../components/texts/Subtitle';
import NavOptions from './NavOptions';


const Navbar = (props) => {
    return (
        <nav>
            <Container padding="40px" direction="right">
                <Grid>
                    <Name>
                        <Subtitle text={props.username} weight='bolder'/>
                    </Name>
                    <Date>
                        {props.date}
                    </Date>
                    <Options>
                        <NavOptions/>
                    </Options>
                </Grid>
            </Container>
        </nav>
    );
}

const Grid = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    "Name Options"
    "Date Options"; 

`
const Name = styled.div`
    justify-self: start; 
    grid-area: Name; 
`
const Date = styled.div`
    margin-top: 0.8em;
    justify-self: start; 
    grid-area: Date; 

    font-size: clamp(1em, 1vw + 1em, 1.1em);
    font-weight: lighter;
    color: white;


`
const Options = styled.div`
    justify-self: end; 
    grid-area: Options; 
    width: min-content;

`



export default Navbar;