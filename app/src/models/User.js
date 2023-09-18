import * as Utils from '../common/Utils'
import * as Api from '../common/Api.mjs'
import Weight from './Weight'
import Calories from './Calories'


export default class User {
    constructor(username, calories, weight, desire, activityLevel, isMetric) {
        this.username = username;
        this.calories = calories;
        this.weight = weight;
        this.desire = desire;
        this.activityLevel = activityLevel;
        this.isMetric = isMetric;
    }

    static fromJson(data) {
        const weight = Weight.fromJson(data.weight);
        const calories = Calories.fromJson(data.calories);
        return new User(data.username, calories, weight, data.desire, data.activity_level, data.is_metric);
    }

    static async fromDatabase(username) {
        const response = await Api.findUser(username);
        console.log('User - FromDatabase')
        console.log(response)

        if (response.error)
            return response;

        return User.fromJson(response.data);
    }

    async update(){
        const request = {
            "data":{
                "is_metric": this.isMetric,
                "desire": this.desire,
                "activity_level": this.activityLevel
            }
        }

        const response = Api.updateUser(this.username, request);

        return response;
        
    }

    async addWeight(amount){

        const kilograms = this._forceMetric(amount);
        const response = await Api.addWeight(this.username, kilograms);
        if(response.error){
            console.log(response)
            return response;
        }

        this.weight = Weight.fromJson(response.data);
        return this.weight;
    }

    async updateCalories(amount){
        const response = await Api.updateCalories(this.username, amount);

        if(response.error){
            console.log(response)
            return response;
        }

        this.calories = Calories.fromJson(response.data);
        return this.calories;
    }

    get date(){
        return this.calories.date;
    }

    get latest() {
        const kilograms = this.weight.latest;
        const formattedWeight = Utils.formatWeight(kilograms, this.isMetric);
        return Number(formattedWeight);
    }

    get weekly() {
        const kilograms = this.weight.weekly;
        const formattedWeight = Utils.formatWeight(kilograms, this.isMetric);
        return Number(formattedWeight);
    }
    get totalWeight() {
        const kilograms = this.weight.total;
        const formattedWeight = Utils.formatWeight(kilograms, this.isMetric);
        return Number(formattedWeight);
    }

    _forceMetric(weight){
        if(this.isMetric){
            return weight;
        } else {
            return weight * 0.45359237
        }

    }


}

