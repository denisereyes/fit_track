export default class Calories {
    constructor(goal, input, output, date){
        this.goal = goal;
        this.input = input;
        this.output = output;
        this.date = date;

    }

    static fromJson(data){
        return new Calories(data.goal, data.input, data.output, data.date);
    }
}