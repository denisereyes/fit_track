import ContainerWithButton from "../../components/containers/ContainerWithButton";
import TextInput from "../../components/input/TextInput";
import Button from "../../components/buttons/Button";
import styled from 'styled-components';
import { useState, useEffect } from "react";
import * as AppRegex from '../../common/AppRegex'
import * as Api from '../../common/Api.mjs'
import { useNavigate } from "react-router-dom";
import UserService from "../../common/UserService.mjs";
import User from "../../models/User";

const Login = () => {
    const navigator = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(true)

    const buttonHandler = (username, password) => {
        (username !== '' && password !== '')
            ? setDisabled(false)
            : setDisabled(true);
    }
    const passwordHandler = (text) => {
        setPassword(text);
        buttonHandler(username, text);

    }

    const usernameHandler = (text) => {
        if (text.match(AppRegex.username)) {
            setUsername(text);
            buttonHandler(text, password);
        }
    }

    const submitHandler = async () => {
        if (!disabled) {
            const response = await Api.login(username, password)
            if (response.data) {
                const userData = await Api.findUser(username)
                const user = User.fromJson(userData.data)
                const userService = new UserService()
                userService.user = user;
                navigator('/home')
            } else {
                setPassword('')
            }
        }

    }

    const newAccountHandler = () => {
        navigator('/new')
    }


    useEffect(() => {
        const checkLogin = async () => {
            const response = await Api.checkLogin();
            if (response.data) {
                const user = User.fromJson(response.data)
                const userService = new UserService()
                userService.user = user;

                navigator('/home')
            } else {
                navigator('/')
            }

        }

        checkLogin();

    }, []);

    return (
        <Wrapper>
            <ContainerWithButton label='New Account' onClick={newAccountHandler}>
                <TextInput
                    placeholder='Username'
                    value={username}
                    onChange={e => usernameHandler(e.target.value)}
                    onEnter={submitHandler} />
                <Padding />
                <TextInput
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => passwordHandler(e.target.value)}
                    onEnter={submitHandler} />

                <Padding />
                <Button text="Login" onClick={submitHandler} disabled={disabled} />

            </ContainerWithButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    width: 40%;
    height: min-content;
`
const Padding = styled.div`
    height: 2em;
`


export default Login;