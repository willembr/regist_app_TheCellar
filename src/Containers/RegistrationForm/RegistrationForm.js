import React,{ Component } from 'react';
import './RegistrationForm.css';
import axiosContact from '../../axios-contacts';
import Header from '../../Components/UX/header/header';
import Spinner from '../../Components/UX/Spinner/Spinner';
import CryptoJS from 'crypto-js';
import phoneImg from '../../assets/images/phone.png';
import mailImg from '../../assets/images/mail.png';
import CheckOut from '../../Components/customers/checkout/checkout';
import { GetDate, GetTime } from '../../Functions/Time';
import { SetForm, UpdateForm, UpdatedFormIsValid } from '../../Functions/Form';


class RegistrationForm extends Component{
    state={
        contactForm : {
            name : {
                        elementType: 'input',
                        label: 'Naam en voornaam',
                        config: { type:'text', placeholder:'' },
                        value:'',
                        validation: { required: true },
                        valid:false,
                        show:true,
                        touched:false
                    },
            email : {
                        elementType: 'input',
                        label: 'E-mailadres',
                        config: { type:'email', placeholder:'' },
                        value:'',
                        validation: { required: false, value:"mail" },
                        valid:false,
                        show:false,
                        touched:false
                    },
            phone : {
                        elementType: 'input',
                        label: 'Telefoonnummer',
                        config: { type:'tel', placeholder:'' },
                        value:'',
                        validation: { required: false, value:"phone" },
                        valid:false,
                        show:false,
                        touched:false
                    }
        },
        formIsValid:false,
        loading:false,
        loggedIn:false
    }

    showInputHandler = (identifier,other) => {

        const updatedContactForm = { ...this.state.contactForm };
        
        const updatedFormElement = { ...updatedContactForm[identifier] };
        updatedFormElement.show = true;
        updatedFormElement.validation.required = true;
        updatedFormElement.valid = false;

        const updatedOtherFormElement = { ...updatedContactForm[other] };
        updatedOtherFormElement.show = false;
        updatedOtherFormElement.validation.required = false;
        updatedOtherFormElement.valid = true;
        
        updatedContactForm[identifier] = updatedFormElement;
        updatedContactForm[other] = updatedOtherFormElement;

        this.setState({
            contactForm:updatedContactForm,
            formIsValid:false
        });
        
    }

    inputChangedHandler = (event,identifier) => {
        const updatedContactForm  = UpdateForm(this.state.contactForm, identifier, event);
        const updatedFormIsValid = UpdatedFormIsValid( updatedContactForm, identifier);

        this.setState({
                contactForm:updatedContactForm,
                formIsValid:updatedFormIsValid
        });
    }

    enCryptWithAes = (text) => {
        const passphrase = '26011982';
        return CryptoJS.AES.encrypt(text, passphrase).toString();
    }

    sendDataHandler = (event) => {

        event.preventDefault();
        this.setState({loading:true});
        
        let contactInfo = this.state.contactForm.email.show ? this.state.contactForm.email.value  
                                                            : this.state.contactForm.phone.value;

        let table = "";
        for( let param of new URLSearchParams(this.props.location.search).entries()){
            table = param[1];
        }

        const contactDetails = {
            datum : this.enCryptWithAes(GetDate()),
            inloguur : this.enCryptWithAes(GetTime()),
            table : this.enCryptWithAes(table),
            name : this.enCryptWithAes(this.state.contactForm.name.value),
            contactinfo :this.enCryptWithAes(contactInfo)
        };

        axiosContact.post('/contacts.json', contactDetails)
                        .then( response => {
                            this.setState({
                                loggedIn:true,
                                loading:false
                            });
                        })
                        .catch( error => {
                            this.setState({
                                loading:false
                            });
                        });

    }

    

    render(){
        const form = this.state.contactForm;

        let formElements = SetForm(form, this.inputChangedHandler);
        
        let content = !this.state.loggedIn && !this.state.loading ? 
        (
            <form onSubmit={this.sendDataHandler}> 
            {formElements[0]}
            <div className="ContactMethod">
                         <p>We kunnen jou best contacteren via :</p>
                         <img alt="phone" className="ContactBtns" src={phoneImg} onClick={() => this.showInputHandler("phone","email")}/>
                         <img alt="mail" className="ContactBtns" src={mailImg} onClick={() => this.showInputHandler("email","phone")}/>
                     </div>
            { form.email.show ? formElements[1] : form.phone.show ? formElements[2] : null}
            <button disabled={!this.state.formIsValid} className="SignUp">Aanmelden</button>
            </form>
        ) 
        :  
        this.state.loading ? <Spinner/> : <CheckOut/> ; 


        return(
            <div className="ContactData">
                <Header title={this.state.loggedIn ? "U bent succesvol ingelogd!" : "Aanwezigheidsformulier"}/>
                {content}
            </div>
        );
    }
};

export default RegistrationForm;
