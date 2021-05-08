import React from 'react';
import './contact_result.css';

const contact_result = (props) => (
    <ul className="Contact_result">
         <li>Naam : {props.name}</li>
         <li>ContactGegevens : {props.contactDetails}</li>
         <li>uur : {props.hour}</li>
         {/* <li>Tafel: {props.table}</li> */}
         <li>Locatie Juma: {props.jumaLocation}</li>
         <li>Logo BMW: {props.BMWlogo}</li>
         <li>Maison: {props.maison}</li>
         <li>Schockaert: {props.schockaert}</li>
         <li>Wagens Juma: {props.wagensJuma}</li>
    </ul>
);

export default contact_result;