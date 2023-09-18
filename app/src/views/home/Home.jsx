import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from "./components/Navbar";
import UpdateBox from './components/UpdateBox';
import * as AppRegex from '../../common/AppRegex'
import * as Api from '../../common/Api.mjs'
import User from '../../models/User';
import Calories from '../../models/Calories';
import UserService from '../../common/UserService.mjs';
import { useNavigate } from "react-router-dom";
import { roundTo } from 'round-to';


const Home = () => {
    const userService = new UserService()
    const navigator = useNavigate();
    const [username, setUsername] = useState('No Username');
    const [date, setDate] = useState('No Date');

    // Not using weight constructor because we need the conversion from user
    const [latestWeight, setLatestWeight] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [weeklyWeight, setWeeklyWeight] = useState(0);

    const [calories, setCalories] = useState(new Calories(0,0,0));


    const weightUnit = () => {
        
        if(userService.user.isMetric){
            return 'Kgs'
        }
        
        return 'Ibs';
    }
    const weightHandler = async (kilograms) => {
        const response = await userService.user.addWeight(kilograms);
        if (response.error){
            return response;
        } 

        setLatestWeight(userService.user.latest)
        setTotalWeight(userService.user.totalWeight)
        setWeeklyWeight(userService.user.weekly)

    }

    const calorieHandler = async (amount) => {
        const response = await userService.user.updateCalories(amount);
        if (response.error){
            return response;
        } 
        setCalories(userService.user.calories)
    }

    useEffect(() => {
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
    
        const loadData = async () => {
                const user = userService.user;
                setUsername(user.username);
                setDate(user.date);
                setLatestWeight(user.latest);
                setTotalWeight(user.totalWeight);
                setWeeklyWeight(user.weekly);
                setCalories(user.calories);
        }


        checkLogin();

    }, []);

    return (userService.user === undefined)
    ? null
    :(
        <Wrapper>
            <Grid>
                <Navigation>
                    <Navbar username={'@'+username} date={date} />
                </Navigation>
                <Weight>
                    <UpdateBox
                        description='Weight'
                        topValue={`${latestWeight} ${weightUnit()}`}
                        leftValue={weeklyWeight}
                        rightValue={totalWeight}
                        onUpdate={weightHandler}
                        inputFilter={AppRegex.float}
                    />
                </Weight>
                <StyledCalories>
                    <UpdateBox
                        description='Calories'
                        topValue={`${calories.goal} Cals`}
                        leftValue={-calories.output}
                        rightValue={calories.input}
                        onUpdate={calorieHandler}
                        inputFilter={AppRegex.calorie}
                    />
                </StyledCalories>
            </Grid>
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
    width: 90%;
    height: min-content;
`

const Grid = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 0.5fr 2fr; 
    gap: 2em 2em; 
    height: 100%;
    grid-template-areas: 
    "Navigation Navigation"
    "Weight Calories"; 
`
const Navigation = styled.div`
    grid-area: Navigation; 
`
const Weight = styled.div`
    grid-area: Weight; 
`
const StyledCalories = styled.div`
    grid-area: Calories; 
`

export default Home;