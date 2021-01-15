import React from 'react';
import './Input.css';


const Input = (props) => {
    let inputElement = null;

    switch(props.inputType){
        case('input') :
            inputElement = <input 
                    className='InputElement'
                    {...props.config} 
                    value={props.value} 
                    onChange = {props.changed} 
                    />;
            break;
        case('textarea') :
            inputElement = <textarea 
                    {...props.config} 
                    value={props.value} 
                    onChange = {props.changed}
                    />
            break;
        case('select') :
        const options = props.config.options.map( option => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
        });
        inputElement = <select 
                            onChange = {props.changed}
                            >
                            {options}
                       </select>
                       break;
        default:
            inputElement = <input 
                    className='InputElement'
                    {...props.config} 
                    value={props.value} 
                    onChange = {props.changed}
                    />
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