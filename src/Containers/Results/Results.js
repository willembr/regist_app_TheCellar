import React, { Component } from 'react';
import './Results.css';
import Header from '../../Components/header/header';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axiosContacts from '../../axios-contacts';
import ContactResult from '../../Components/contact_result/contact_result';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Results extends Component{
    state={
        selectedDay:null,
        results:[]
    }
    dayClickHandler = (day) => {
        this.setState({
            selectedDay:day
        });
        this.getData(day);   
    }

    decryptWithAES = (text) => {
        const passphrase = '26011982';
        const bytes = CryptoJS.AES.decrypt(text,passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

    getData = (day) => {
        axiosContacts.get('/contacts.json')
                        .then(response => {
                            const results = response.data;
                            const decryptedResults = [];
                            let updatedResults = [];
                            for(let key in results){
                                decryptedResults.push({
                                    id:key,
                                    name: this.decryptWithAES(results[key].name),
                                    contactDetails: this.decryptWithAES(results[key].contactinfo),
                                    date: this.decryptWithAES(results[key].datum),
                                    hour : this.decryptWithAES(results[key].inloguur),
                                    table: this.decryptWithAES(results[key].table)
                                })    
                            }
                             for(let key in decryptedResults){
                                 if(decryptedResults[key].date === day.toLocaleDateString())
                                         {
                                                updatedResults.push({
                                                                         id: key,
                                                                         name: decryptedResults[key].name,
                                                                         contactDetails: decryptedResults[key].contactDetails,
                                                                         hour : decryptedResults[key].hour,
                                                                         table: decryptedResults[key].table
                                                                     });
                                         }
                            }
                            this.setState({results:updatedResults});
                        })
                        .catch(error => {
                            console.log(error);
                        });
    }
    render(){
        let comment = null;
        let authRedirect = null;
        if(!this.props.isLoggedIn)
         {
            authRedirect = <Redirect to="/chapel/cellar/19820126/"/>;
         }
        if(this.state.selectedDay){
            comment = <p>Van deze dag zijn geen resultaten beschikbaar!</p>;
        }
        return(
            <div className="Results">
                {authRedirect}
                <Header title="De resultaten"/>
                <DayPicker onDayClick={this.dayClickHandler}/>
                {this.state.selectedDay ? <p>Je hebt gekozen voor {this.state.selectedDay.toLocaleDateString()}</p> : <p>Kies een dag</p>}
                { this.state.results.length > 0 ? this.state.results.map( res => {
                    return <ContactResult 
                                key = {res.id}
                                name={res.name}
                                contactDetails = {res.contactDetails}
                                hour = {res.hour}
                                table = {res.table}
                    />
                }) : comment }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token
    };
};

export default connect(mapStateToProps)(Results);