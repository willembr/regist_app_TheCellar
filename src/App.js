import React,{Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router';
import RegistrationForm from './Containers/RegistrationForm/RegistrationForm';
import Results from './Containers/Results/Results';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  render(){
    return(
      <div>
        <BrowserRouter>
          <Route path='/chapel/cellar/19820126/results' exact component={Results}/>
          <Route path="/chapel/cellar/19820126/" exact component={Auth} />
          <Route path='/' exact component={RegistrationForm}/>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
