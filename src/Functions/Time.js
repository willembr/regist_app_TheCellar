import moment from 'moment';
const date = new Date();

export function GetDate(){
    return moment(date).format('DD/MM/YYYY');
}

export function GetTime(){
    return date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0') + ':' + date.getSeconds().toString().padStart(2,'0');
}