import moment from 'moment';
const date = new Date();

export function GetDate(){
    return moment(date).format('DD/MM/YYYY');

    // FOR TESTING PURPOSES ONLY [ code beneath ]

    // const longTimeAgo =  moment().subtract(10,'days').calendar();
    // return moment(longTimeAgo).format('DD/MM/YYYY');
}

export function GetTime(){
    return moment(date).format ('HH:mm:ss');
}

export function deleteBeforeThisDay(){
    const longTimeAgo =  moment().subtract(28,'days').calendar();
    return moment(longTimeAgo).format('DD/MM/YYYY');
}