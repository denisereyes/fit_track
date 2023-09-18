import styled from 'styled-components';
import SingleSetting from './components/SingleSetting';
import SubTitle from './../../components/texts/Subtitle'
import ContainerWithButton from './../../components/containers/ContainerWithButton'
import Button from './../../components/buttons/Button'
import UserService from '../../common/UserService.mjs';
import User from '../../models/User';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as Api from '../../common/Api.mjs'
import * as Utils from '../../common/Utils'


const Settings = () => {
    const userService = new UserService();
    const navigator = useNavigate();
    const [active, setActive] = useState('Error');
    const [goal, setGoal] = useState('Error');
    const [isMetric, setIsMetric] = useState(false);

    const activeHandler = () => {
        switch(active){
            case 1:
                setActive(-1);
                break;
            case -1:
                setActive(0);
                break;
            case 0:
                setActive(1);
                break;
            default:
                break;
        }
    }

    const goalHandler = () => {
        switch(goal){
            case 1:
                setGoal(-1);
                break;
            case -1:
                setGoal(0);
                break;
            case 0:
                setGoal(1);
                break;
            default:
                break;
        }
    }

    const unitHandler = () => {
        if(isMetric){
            setIsMetric(false)
        } else {
            setIsMetric(true)
        }
    }


    const saveHandler = async () => {
        userService.user.isMetric = isMetric;
        userService.user.desire = goal;
        userService.user.activityLevel = active;
        const response = userService.user.update();
        if(response.error) return response

        navigator('/home')
    }

    useEffect(() => {

        const loadData = async () => {
            const user = userService.user;
            setActive(user.activityLevel);
            setGoal(user.desire);
            setIsMetric(user.isMetric);
        }

        const checkLogin = async () => {
            const response = await Api.checkLogin();
            if (response.data) {
                const user = User.fromJson(response.data)
                userService.user = user;
                loadData();
            } else {
                navigator('/')
            }

        }

        checkLogin();

    }, []);



    return (userService.user === undefined)
    ? null
    :(
        <Wrapper>
            <ContainerWithButton onClick={() => navigator('/home')}>
                <Options>
                    <SingleSetting title='Goal'>
                        <SubTitle text={Utils.formatDesire(goal)} onClick={goalHandler} />
                    </SingleSetting>
                    <Divider />
                    <SingleSetting title='Active'>
                        <SubTitle text={Utils.formatActivityLevel(active)} onClick={activeHandler} />
                    </SingleSetting>
                    <Divider />
                    <SingleSetting title='Unit'>
                        <SubTitle text={Utils.formatUnit(isMetric)} onClick={unitHandler} />
                    </SingleSetting>
                </Options>
                <Button
                    text='Save'
                    onClick={saveHandler}
                />
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
    width: min-content;
    height: min-content;

`
const Options = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 3em;
`
const Divider = styled.div`
        //Center Container
    border-left: 1px solid white;
    position:relative;
    margin-left: 4em;
    margin-right: 4em;

`



export default Settings;