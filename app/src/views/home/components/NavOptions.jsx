import styled from 'styled-components';
import NavButton from "../../../components/buttons/NavButton";
import { RiUserSettingsLine } from 'react-icons/ri';
import { HiOutlineLogout } from 'react-icons/hi';
import * as Api from '../../../common/Api.mjs'
import { useNavigate } from "react-router-dom";
import UserService from '../../../common/UserService.mjs';


const NavOptions = () => {
    const navigator = useNavigate();
    const width = '2.1em';
    const userService = new UserService();

    const logoutHandler = async () => {
        const response = await Api.logout();
        console.log(response)
        if(response.data){
            userService.user = null;
            navigator('/')
        }
    }
    return ( 
        <Wrapper>
            <NavButton description='Settings' onClick={()=>navigator('/settings')}>
                <RiUserSettingsLine size={width}/>
            </NavButton>
            <Padding/>
            <NavButton description='Logout' onClick={logoutHandler}>
                <HiOutlineLogout size={width}/>
            </NavButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
const Padding = styled.div`
    width: 2em;
`

export default NavOptions;