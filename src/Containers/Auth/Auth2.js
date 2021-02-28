import React, {Component} from 'react';
import './Auth.css';
import Header from '../../Components/UX/header/header';

import Input from '../../Components/UX/Input/Input';
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../Components/UX/Spinner/Spinner';
import Eye from '../../assets/images/eye.png';
 
class Auth extends Component{
    state={
        authForm:{
             email:{
                        elementType:'input',
                        elementConfiguration: { type:'email' },
                        value:'',
                        validation:{ required:true, isEmail:true },
                        touched:false,
                        valid:false,
                        label:"Emailadres : "
                    },
            password:{
                        elementType:'input',
                        elementConfiguration:{ type:'password' },
                        value:'',
                        validation:{ required:true },
                        touched:false,
                        valid:false,
                        label:"Paswoord : ",
                        eye:true
                    }
        },
        isSignUp:false,
        showPasswordText:false
    }

    checkValidation(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value !== '' && isValid;
        }

        return isValid;

    }

    inputChangeHandler = (event,inputIdentifier) => {
        
        const updatedAuthForm = {
            ...this.state.authForm,
            [inputIdentifier]:{
                ...this.state.authForm[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidation(event.target.value,this.state.authForm[inputIdentifier].validation),
                touched:true
            }
        };

        this.setState({
            authForm:updatedAuthForm
        });

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value);
    }

    showPasswordHandler = (event,show) => {
        event.preventDefault();
        // let updatedForm = {
        //     ...this.state.authForm,
        //         ['password']:{
        //             ...this.state.authForm['password'],
        //             ['elementConfiguration']:{
        //                 ...this.state.authForm['password'].elementConfiguration,
        //                 type:'password'
        //             }
        //         }
        // };

        // if(show)
        // {
        //     updatedForm = {
        //         ...this.state.authForm,
        //         ['password']:{
        //             ...this.state.authForm['password'],
        //             ['elementConfiguration']:{
        //                 ...this.state.authForm['password'].elementConfiguration,
        //                 type:'text'
        //             }
        //         }

        //     }
        // }
        // this.setState({
        //     authForm:updatedForm,
        //     showPasswordText:show
        // });
    }

    render(){

        let elementsArray = [];

        for(let key in this.state.authForm)
        {
            elementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        const form = elementsArray.map(res => {
            return <Input
                key = {res.id}
                inputType = {res.config.elementType}
                config = {res.config.elementConfiguration}
                touched = {res.config.touched}
                valid = { res.config.valid}
                label = {res.config.label}
                value = {res.config.value}
                eye={res.config.eye}
                changed={(event) => this.inputChangeHandler(event,res.id)}
                showPass={(event) => this.showPasswordHandler(event,!this.state.showPasswordText)}
            />
        });

        let content = <form onSubmit={this.submitHandler}>
                            {form}
                            {/* {form2} */}
                        </form>;
        if(this.props.loading){
            content = <Spinner />;
        }
        


        let errorMessage = null;

        if(this.props.error)
        {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;

        if(this.props.loggedIn){
            authRedirect = <Redirect to="/results"/>;
        }


        return(
            <div className="Auth">
                {authRedirect}
                <Header/>
                 {content}
                 { errorMessage }
            </div>
        );
    }
};

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