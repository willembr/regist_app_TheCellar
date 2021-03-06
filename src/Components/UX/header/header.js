import React from 'react';
import chapelLogo from '../../../assets/images/jardin2.jpg';
import './header.css';

const header = (props) => (
    <div className="Header">
        <img src={chapelLogo} className="Logo" alt="chapel logo" />
         <h2>{props.title}</h2>
    </div>
);

export default header;