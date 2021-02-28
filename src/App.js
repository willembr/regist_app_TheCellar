import React,{Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Route, Switch} from 'react-router';
import RegistrationForm from './Containers/RegistrationForm/RegistrationForm';
import Results from './Containers/Results/Results';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  render(){
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/results' exact component={Results}/>
            <Route path='/' exact component={ RegistrationForm }/>
            <Route path="/" component={ Auth } /> 
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
