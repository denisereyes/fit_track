import styled from 'styled-components';
import { CgArrowUp, CgArrowDown, CgArrowLeft, CgArrowRight } from 'react-icons/cg';

const Arrow = (props) => {

    const size = '1.4em'
    if(props.type === 'Weight'){
        if(props.value > 0){
            return (<CgArrowUp size={size}/>)
        } else {
            return (<CgArrowDown size={size}/>)
        }
    } else {
        if(props.direction === 'left'){
            return (<CgArrowLeft size={size}/>)
        } else {
            return (<CgArrowRight size={size}/>)
        }
    }
}

const Up = styled.div`
    transform: rotate(0);
`
const Right = styled.div`
    transform: rotate(0.25);
`
const Down = styled.div`
    transform: rotate(0.50);
`
const Left = styled.div`
    transform: rotate(0.75);
`

export default Arrow;