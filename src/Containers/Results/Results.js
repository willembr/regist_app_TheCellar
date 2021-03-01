import React, { Component } from 'react';
import './Results.css';
import Header from '../../Components/UX/header/header';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { deleteBeforeThisDay } from '../../Functions/Time';
import ContactResult from '../../Components/contact_result/contact_result';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import { Redirect } from 'react-router';
import Spinner from '../../Components/UX/Spinner/Spinner';

class Results extends Component{
    state={
        selectedDay:null
    }


    componentDidMount(){
        this.props.AutoDeleteOldData( deleteBeforeThisDay() );
    }

    dayClickHandler = (day) => {
        this.setState({
            selectedDay:moment(day).format("DD/MM/YYYY")
        });   
        this.props.onGetResults(moment(day).format("DD/MM/YYYY"));
    }

    render(){

        const authRedirect = !this.props.isLoggedIn ? <Redirect to="/login"/> : null;
        const chosenDate = this.state.selectedDay ? <p className="ChosenDay">Je hebt gekozen voor {this.state.selectedDay}</p> : <p>Kies een dag</p>
        
        const content = !this.props.loading && this.props.results.length > 0 ? 
                            this.props.results.map( res => <ContactResult 
                                                                key = {res.id}
                                                                name={res.name}
                                                                contactDetails = {res.contactDetails}
                                                                hour = {res.hour}
                                                                table = {res.table} />)
                            : this.props.loading ? <Spinner/>
                            : this.props.results.length <= 0 && this.state.selectedDay ? <p>Van deze dag zijn geen resultaten beschikbaar!</p>
                                                                                       : null;
        return(
            <div className="Results">
                {authRedirect}
                <Header title="De resultaten"/>
                <DayPicker onDayClick={this.dayClickHandler}/>
                {chosenDate}
                { content }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token,
        loading: state.results.loading,
        results : state.results.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetResults: (day) => dispatch(actions.results(day)),
        AutoDeleteOldData: (deleteBeforeThisDay) => dispatch(actions.autoDeleteResults(deleteBeforeThisDay))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);