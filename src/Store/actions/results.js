import * as actionTypes from './actionTypes';
import axios_contacts from '../../hoc/axios-contacts';
import { decryptWithAES } from '../../Functions/Form';

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
                const results = response.data;
                const decryptedResults = [], updatedResults = [];
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
            dispatch(resultsSuccess(updatedResults));
        })
        .catch( error => {
            dispatch(resultsFail(error));
        }
        );
        
    }
}

