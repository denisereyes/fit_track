import { useState } from "react";
import Welcome from "./questions/Welcome";
import YourGoal from "./questions/YourGoal";
import Weight from "./questions/Weight";
import Height from "./questions/Height";
import Birthday from "./questions/Birthday";
import ActivityLevel from "./questions/ActivityLevel";
import Home from '../home/Home';
import Password from "./questions/Password";
import Sex from "./questions/Sex";
import * as Api from '../../common/Api';
import * as Utils from '../../common/Utils'
import { useNavigate } from "react-router-dom";
import User from '../../models/User'
import UserService from "../../common/UserService.mjs";




const Questionnaire = () => {
    const userService = new UserService();
    const navigator = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [desire, setGoal] = useState(0);
    const [active, setActive] = useState(0);
    const [isMetric, setIsMetric] = useState(false);
    const [sex, setSex] = useState('');


    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const handleChange = (type, input) => {
        switch (type) {
            case 'username':
                setUsername(input);
                break;
            case 'password':
                setPassword(input);
                break;
            case 'sex':
                setSex(input);
                break;
            case 'birthday':
                setBirthday(input);
                break;
            case 'height':
                setHeight(input);
                break;
            case 'weight':
                setWeight(input);
                break;
            case 'goal':
                setGoal(input);
                break;
            case 'active':
                setActive(input);
                break;
            case 'isMetric':
                setIsMetric(input);
                break;

            default:
                console.log('Not recognized: ' + type);
        }
    }

    async function createNewUser(data) {
        const response = await Api.createUser(data);
        console.log(response.data)
        if(response.error) return response
        const user = User.fromJson(response.data)
        userService.user = user;

        navigator('/home')

        return response.data;
    }

    switch (step) {
        case 1:
            return (
                <Welcome
                    nextStep={nextStep}
                    handleChange={handleChange}
                    value={username}
                />
            )
        case 2:
            return (
                <Password
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )
        case 3:
            return (
                <Birthday
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )

        case 4:
            return (
                <Sex
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )


        case 5:
            return (
                <Weight
                    nextStep={nextStep}
                    prevStep={prevStep}
                    value={weight}
                    isMetric={isMetric}
                    handleChange={handleChange}
                />
            )
        case 6:
            return (
                <Height
                    nextStep={nextStep}
                    prevStep={prevStep}
                    value={height}
                    isMetric={isMetric}
                    handleChange={handleChange}
                />
            )
        case 7:
            return (
                <YourGoal
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )
        case 8:
            return (
                <ActivityLevel
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )

        case 9:
            let data = {
                "data": {
                    "username": username,
                    "password": password,
                    "birthday": Utils.formatDate(birthday),
                    "initial_weight": Number(weight),
                    "height": Number(height),
                    "desire": Number(desire),
                    "activity_level": Number(active),
                    "is_metric": isMetric,
                    "sex": sex
                }
            }

            createNewUser(data)

            return null
            
        default:
        // do nothing
    }
}

export default Questionnaire;