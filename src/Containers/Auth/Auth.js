import React, { Component } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SetForm, UpdateForm, ShowPassword } from '../../Functions/Form';
import * as actions from '../../Store/actions/index';
import Header from '../../Components/UX/header/header';
import Spinner from '../../Components/UX/Spinner/Spinner';


class Auth extends Component{
    state={
        authForm:{
             email:{
                        elementType:'input',
                        config: { type:'email' },
                        value:'',
                        validation:{ required:true, isEmail:true },
                        touched:false,
                        valid:false,
                        label:"Emailadres : "
                    },
            password:{
                        elementType:'password',
                        config:{ type:'password' },
                        value:'',
                        validation:{ required:true },
                        touched:false,
                        valid:false,
                        label:"Paswoord : ",
                        show:false
                    }
        },
        isSignUp:false,
        showPasswordText:false
    }

    onChangeEventHandler = (event, identifier) => {
        const updatedForm = UpdateForm(this.state.authForm, identifier, event);
        this.setState({ authForm : updatedForm });
    }

    showPasswordHandler = (event) => {
        event.preventDefault();
        const updateForm = ShowPassword(this.state.authForm);
        this.setState({ authForm : updateForm });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value);
    }

    render(){
        const form = SetForm(this.state.authForm, this.onChangeEventHandler, this.showPasswordHandler);

        const content =  <form onSubmit={(event) => this.submitHandler(event)}>
                            {form}
                            <button>Inloggen</button>
                       </form>
        const spinner = this.props.loading ? <Spinner/> : null;
        const error = this.props.error ? <p>Het emailadres en het paswoord komen niet overeen!</p> : null;
        const authRedirect = this.props.loggedIn ? <Redirect to="/results"/> : null;
        
        return(
            <div className="Auth">
                <Header/>
                { authRedirect }
                { content }
                { spinner }
                { error }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loggedIn : state.auth.token,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
