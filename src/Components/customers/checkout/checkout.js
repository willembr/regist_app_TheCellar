import React from 'react';
import CocktailImg from '../../../assets/images/cocktail.png';

const CheckOut = (props) => (
    <div style={{marginBottom:"40px"}} >
            <p style={{marginTop:"40px"}}>Deze gegevens zullen na 4 weken verwijderd worden!</p>
            <p>Geniet van onze cocktails, wijntjes en bites!</p>
            <img style={{marginTop:"20px",width:"40%"}} src={CocktailImg} alt="coctail" />
            <h2>Coctail van de week</h2>
            <p>Dark 'n Stormy</p>
            <p>Havana 5y, ginger beer and lime cocktail</p>
            </div>
);

export default CheckOut;