import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose,combineReducers} from 'redux';
import { Provider } from 'react-redux';
import Auth_reducer from './Store/reducers/auth';
import Results_reducer from './Store/reducers/results';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  auth: Auth_reducer,
  results: Results_reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const route = <Provider store={store}><App/></Provider>


ReactDOM.render(
    route,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
