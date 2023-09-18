export default class Weight {
    constructor(latest, weekly, total){
        this.latest = latest;
        this.weekly = weekly;
        this.total = total;
    }

    static fromJson(data){
        return new Weight(data.latest, data.weekly,  data.total);
    }

}