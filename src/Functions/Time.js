import moment from 'moment';
const date = new Date();

export function GetDate(){
    return moment(date).format('DD/MM/YYYY');
}

export function GetTime(){
    return moment(date).format ('HH:mm:ss');
}