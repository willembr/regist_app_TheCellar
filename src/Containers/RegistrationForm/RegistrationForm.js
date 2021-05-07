import React,{ Component } from 'react';
import './RegistrationForm.css';
import axiosContact from '../../hoc/axios-contacts';
import Header from '../../Components/UX/header/header';
import Spinner from '../../Components/UX/Spinner/Spinner';

import phoneImg from '../../assets/images/phone.png';
import mailImg from '../../assets/images/mail.png';
import CheckOut from '../../Components/customers/checkout/checkout';
import { GetDate, GetTime } from '../../Functions/Time';
import { SetForm, UpdateForm, UpdatedFormIsValid, EnCryptWithAes } from '../../Functions/Form';


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
            datum : EnCryptWithAes(GetDate()),
            inloguur : EnCryptWithAes(GetTime()),
            table : EnCryptWithAes(table),
            name : EnCryptWithAes(this.state.contactForm.name.value),
            contactinfo :EnCryptWithAes(contactInfo)
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
            <div className="Questions">
                <h4>1. Waar is Juma Mechelen gelegen?</h4>
                <select>
                    <option>Selecteer een antwoord...</option>
                    <option>Onder de kleine watertoren</option>
                    <option>Onder de grote watertoren</option>
                    <option>Op de jubellaan</option>
                </select>
                <h4>2. Waar komt het BMW logo vandaan?</h4>
                <select>
                    <option>Selecteer een antwoord...</option>
                    <option>Van de kleuren van de Zuid-Duitse deelstaat Beieren</option>
                    <option>Van de propeller van een vliegtuig</option>
                    <option>Van een draaiend autowiel</option>
                </select>
                <h4>3. welke alcoholische dranken bevatten onze Maison?</h4>
                <textarea placeholder="Welke smaken herken je..."></textarea>
                <h4>4. Hoelang bestaat de winkel Schockaert in Mechelen ?</h4>
                <input type="text" placeholder="Hoeveel jaar denken jullie?"></input>
                <h2>Shiftingsvraag</h2>
                <h4>5. Hoeveel nieuwe wagens zijn er verkocht binnen Juma group in 2020 ?</h4>
                <input type="number" placeholder="Het mag gerust ietsje meer zijn..."></input>
                <h2>Jouw gegevens</h2>
            </div>
            {formElements[0]}
            <div className="ContactMethod">
                         <p>We kunnen jou best contacteren via :</p>
                         <img alt="phone" className="ContactBtns" src={phoneImg} onClick={() => this.showInputHandler("phone","email")}/>
                         <img alt="mail" className="ContactBtns" src={mailImg} onClick={() => this.showInputHandler("email","phone")}/>
                     </div>
            { form.email.show ? formElements[1] : form.phone.show ? formElements[2] : null}
            <button disabled={!this.state.formIsValid} className="SignUp">Versturen</button>
            </form>
        ) 
        :  
        this.state.loading ? <Spinner/> : <CheckOut/> ; 


        return(
            <div className="ContactData">
                <Header title={this.state.loggedIn ? "U hebt succesvol deelgenomen!" : "BMW JUMA contest"}/>
                {content}
            </div>
        );
    }
};

export default RegistrationForm;
