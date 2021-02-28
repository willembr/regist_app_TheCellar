import React from 'react';
import './Input.css';
import Eye_img from '../../../assets/images/eye.png';
import EyeShut_img from '../../../assets/images/eyeShut.png';


const Input = (props) => {
    let inputElement = null;

    switch(props.inputType){
        case('input') :
                                inputElement = <input 
                                          className='InputElement'
                                          {...props.config} 
                                          value={props.value} 
                                          onChange = { props.changed } />;
                                break;
        case('textarea') :
                                inputElement = <textarea 
                                        {...props.config} 
                                        value={props.value} 
                                        onChange = { props.changed } />;
                                break;
        case('select') :
                                const options = props.config.options.map( option => {
                                        return <option key={option.value} value={option.value}>{option.displayValue}</option>});
                                inputElement = <select onChange = { props.changed }>{options}</select>;
                                break;
        case('password'):       inputElement = <><input
                                                        className='Password'
                                                        { ...props.config }
                                                        value = { props.value }
                                                        onChange = { props.changed }/>
                                                <button className="Eye" onClick={props.clicked}>
                                                        <img alt="see password" 
                                                                src={ props.config.type === 'password' ? Eye_img : EyeShut_img }/>
                                                </button>
                                                </>;
                                break;
        default:
                                inputElement = <input 
                                        className='InputElement'
                                        { ...props.config } 
                                        value = { props.value } 
                                        onChange = { props.changed }/>
                                break;
    }
    return(
        <div className='Input'>
                <label className='Label'>{props.label}</label>
                {inputElement}
        </div>
    );
}

export default Input;