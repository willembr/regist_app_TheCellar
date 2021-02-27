import React,{ Component }from 'react';
import './RegistrationForm.css';
import axiosContact from '../../axios-contacts';
import Header from '../../Components/UX/header/header';
import Spinner from '../../Components/UX/Spinner/Spinner';
import CocktailImg from '../../assets/images/cocktail.png';
import CryptoJS from 'crypto-js';

class RegistrationForm extends Component{
    state={
        table:null,
        contactForm : {
            name : {
                        orderElement: 'input',
                        label: 'Naam en voornaam',
                        orderElementConfig: {
                                        type:'text',
                                        placeholder:''
                                            },
                        value:'',
                        validation: {
                                        required: true
                                    },
                        valid:false,
                        show:true,
                        touched:false
                    },
            email : {
                        orderElement: 'input',
                        label: 'E-mailadres',
                        orderElementConfig: {
                                        type:'email',
                                        placeholder:''
                                            },
                        value:'',
                        validation: {
                                        required: false,
                                        value:"mail"
                                     },
                        valid:false,
                        show:false,
                        touched:false
                    },
            phone : {
                        orderElement: 'input',
                        label: 'Telefoonnummer',
                        orderElementConfig: {
                                        type:'tel',
                                        placeholder:''
                                            },
                        value:'',
                        validation: {
                                        required: false,
                                        value:"phone"
                                     },
                        valid:false,
                        show:false,
                        touched:false
                    }
        },
        formIsValid:false,
        loading:false,
        loggedIn:false
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        let table = "";
        for( let param of query.entries()){
            table = param[1];
        }
        console.log(this.props.location);
        this.setState({table:table});
    }

    showInputHandler = (inputIdentifier,other) => {

        const updatedContactForm = {
            ...this.state.contactForm
        };

        const updatedFormElement = {
            ...updatedContactForm[inputIdentifier]
        };

        const updatedOtherFormElement = {
            ...updatedContactForm[other]
        }

        updatedFormElement.show = true;
        updatedFormElement.validation.required = true;
        updatedFormElement.valid = false;
        updatedOtherFormElement.show = false;
        updatedOtherFormElement.validation.required = false;
        updatedOtherFormElement.valid = true;

        this.setState({formIsValid:false});
        

        updatedContactForm[inputIdentifier] = updatedFormElement;
        updatedContactForm[other] = updatedOtherFormElement;

        this.setState({
            contactForm:updatedContactForm
        });
        
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedContactForm = {
            ...this.state.contactForm
        };

        const updatedElementContactForm = {
            ...updatedContactForm[inputIdentifier]
        };

        updatedElementContactForm.value = event.target.value;
         updatedElementContactForm.valid = this.checkValidationHandler(updatedElementContactForm.value,updatedElementContactForm.validation);
         updatedElementContactForm.touched = true;
         updatedContactForm[inputIdentifier] = updatedElementContactForm;

         let updatedFormIsValid = true;
        
         for ( inputIdentifier in updatedContactForm){
             updatedFormIsValid = updatedContactForm[inputIdentifier].valid && updatedFormIsValid;
         };

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
        this.setState({loading:true});
        event.preventDefault();
        const date = new Date();
        const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        const inloghour = date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0') + ':' + date.getSeconds().toString().padStart(2,'0');

        let contactInfo = '';

        if( this.state.contactForm.email.show)
        {
            contactInfo = this.state.contactForm.email.value;
        }
        else {
            contactInfo = this.state.contactForm.phone.value;
        }
        
        const contactDetails = {
            datum : this.enCryptWithAes(today),
            inloguur : this.enCryptWithAes(inloghour),
            table : this.enCryptWithAes(this.state.table),
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

    checkValidationHandler(value,rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required)
        {
            isValid = value !== '' && isValid;

            if(rules.value === "mail")
            {
                const atPos = value.indexOf("@");
                const dotPos = value.lastIndexOf(".");
    
                if(atPos < 1 || (dotPos - atPos < 2)){
                    isValid = false;
  
                }
                else{
                    isValid = true && isValid;
                }
            }
        }
        return isValid;
    }

    render(){

        let formElementsArray = [];

        for(let key in this.state.contactForm){
            formElementsArray.push({
                id:key,
                config:this.state.contactForm[key]
            });
        }

    let content = <p>test</p>;
  

        if(this.state.loggedIn && !this.state.loading){
            content = (
            <div style={{marginBottom:"40px"}} >
            <p style={{marginTop:"40px"}}>Deze gegevens zullen na 4 weken verwijderd worden!</p>
            <p>Geniet van onze cocktails, wijntjes en bites!</p>
            <img style={{marginTop:"20px",width:"40%"}} src={CocktailImg} alt="coctail" />
            <h2>Coctail van de week</h2>
            <p>Dark 'n Stormy</p>
            <p>Havana 5y, ginger beer and lime cocktail</p>
            </div>
            );
        };

        if(this.state.loading)
        {
            content = <Spinner/>;
        }

        return(
            <div className="ContactData">
                <Header title={this.state.loggedIn ? "U bent succesvol ingelogd!" : "Aanwezigheidsformulier"}/>
                {content}
            </div>
        );
    }
};

export default RegistrationForm;
