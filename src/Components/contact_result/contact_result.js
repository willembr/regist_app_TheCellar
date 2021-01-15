import React from 'react';
import './contact_result.css';

const contact_result = (props) => (
    <div className="Contact_result">
        <table>
            <thead>
    <tr>
                <td>Naam : {props.name}</td>
                <td>ContactGegevens : {props.contactDetails}</td>
                <td>uur : {props.hour}</td>
                <td>Tafel: {props.table}</td>
            </tr>
            </thead>
         </table>
    </div>
);

export default contact_result;