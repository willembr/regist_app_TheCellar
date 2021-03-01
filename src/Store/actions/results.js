import * as actionTypes from './actionTypes';
import axios_contacts from '../../hoc/axios-contacts';
import { decryptWithAES } from '../../Functions/Form';
import moment from 'moment';

export const resultsStart = () => {
    return {
        type:actionTypes.RESULTS_START
    };
};

export const resultsSuccess = (results) => {
    return {
        type: actionTypes.RESULTS_SUCCESS,
        results: results
    };
};

export const resultsFail = (error) => {
    return {
        type:actionTypes.RESULTS_FAIL,
        error:error
    };
};

export const results = (day) => {
    return dispatch => {
        dispatch(resultsStart());
        axios_contacts.get('/contacts.json')
                      .then( response => {
                             dispatch(resultsSuccess( getUpdatedResults(response.data, day) ));
                      })
                      .catch( error => {
                             dispatch(resultsFail(error));
                      });
    }
}

export const autoDeleteResults = (deleteBeforeThisDay) => {;
    return dispatch => {
        axios_contacts.get('/contacts.json')
                      .then( response => {
                            const decryptedResults = getDecryptedResults(response.data);
                            console.log(decryptedResults);
                            let resultsToDelete = [];
                            for(let key in decryptedResults){
                                if(moment(decryptedResults[key].date, "DD/MM/YYYY") < moment(deleteBeforeThisDay, "DD/MM/YYYY")){
                                        resultsToDelete.push({
                                                id: decryptedResults[key].id,
                                                name: decryptedResults[key].name,
                                                contactDetails: decryptedResults[key].contactDetails,
                                                hour : decryptedResults[key].hour,
                                                date : decryptedResults[key].date,
                                                table: decryptedResults[key].table
                                        });
                                }
                            }
                            dispatch(deleteResults(resultsToDelete));
                        })
    }
}

export const deleteResults = (resultsToDelete) => {
     return dispatch => {
            for(let itemToDelete in resultsToDelete){
                axios_contacts.delete(`/contacts/${resultsToDelete[itemToDelete].id}.json`);
            }
     }

}

function getUpdatedResults(response, day){
                let updatedResults = [];
                const decryptedResults = getDecryptedResults(response)
                for(let key in decryptedResults){
                        if(decryptedResults[key].date === day){
                                updatedResults.push({
                                        id: key,
                                        name: decryptedResults[key].name,
                                        contactDetails: decryptedResults[key].contactDetails,
                                        hour : decryptedResults[key].hour,
                                        table: decryptedResults[key].table
                                });
                        }
                }
                return  updatedResults;
}

function getDecryptedResults(response){
    const results = response;
    const decryptedResults = [];
                for(let key in results){
                        decryptedResults.push({
                                id:key,
                                name: decryptWithAES(results[key].name),
                                contactDetails: decryptWithAES(results[key].contactinfo),
                                date: decryptWithAES(results[key].datum),
                                hour : decryptWithAES(results[key].inloguur),
                                table: decryptWithAES(results[key].table)
                        })    
                }
    return decryptedResults; 
}






