import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results:[],
    error:false,
    loading:false
}

const resultsStart = (state, action) => {
    return updateObject(state, { loading : true, error : false });
}

const resultsSuccess = (state,action) => {
        return updateObject(state, {
            results: action.results,
            loading:false,
            error:null
        });
}

const resultsFail = (state, action) => {
    return updateObject(state, {
        error: true,
        loading:false
    })
}

const reducer = (state= initialState,action) => {
    switch(action.type){
        case actionTypes.RESULTS_START: return resultsStart(state,action);
        case actionTypes.RESULTS_SUCCESS: return resultsSuccess(state,action);
        case actionTypes.RESULTS_FAIL: return resultsFail(state,action);
        default: 
        return state;
    }
}

export default reducer;