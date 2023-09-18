import {roundTo} from 'round-to';


export function formatDate(date) {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return month + '-' + day + '-' + year;
}

export function formatDesire(desire){
    switch(desire){
        case -1:
            return 'Loose'
        case 0:
            return 'Maintain'
        case 1:
            return 'Gain'
        default:
            return `Format Error: ${desire}`

    }
}

export function formatUnit(isMetric){
    if(isMetric) return 'Metric'
    return 'Imperial'
}



export function formatActivityLevel(level){
    switch(level){
        case -1:
            return 'Never'
        case 0:
            return 'Sometimes'
        case 1:
            return 'Often'
        default:
            return `Format Error: ${level}`
    
        }
    
}

export function formatWeight(weight, isMetric){
    if(isMetric)return _formatFloat(roundTo(weight, 2));
    return _formatFloat(roundTo((weight * 2.2046), 2));
}

const _formatFloat = (number) => {
    const wholeNumber = roundTo(number, 0);
    const remainder = number - wholeNumber;
    const roundedRemainder = roundTo(remainder, 2);
    if(Math.abs(roundedRemainder) === 0.01){
        return wholeNumber;
    }
    
    return number;
    
    
}

