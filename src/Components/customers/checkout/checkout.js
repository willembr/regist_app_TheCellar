import React from 'react';
import './checkout.css';
import CocktailImg from '../../../assets/images/cocktail.png';

const CheckOut = (props) => (
    <div className="CheckOut" >
            {/* <p>Deze gegevens zullen na 4 weken verwijderd worden!</p> */}
            <p>Geniet van onze cocktails, wijntjes en bites!</p>
            <img src={CocktailImg} alt="coctail" />
            {/* <h2>Coctail van de week</h2>
            <p>Dark 'n Stormy</p>
            <p>Havana 5y, ginger beer and lime cocktail</p> */}
            </div>
);

export default CheckOut;