import React from 'react';
import Input from '../Components/UX/Input/Input';

export function SetForm(form, change, click){
    const formElements = Object.keys(form).map( element => {
        return <Input
                        key = {element}
                        inputType = { form[element].elementType }
                        config = {form[element].config}
                        value = { form[element].value}
                        invalid = {!form[element].valid}
                        label = {form[element].label}
                        changed={(event) => change(event, element)}
                        clicked={(event) => click(event, form[element].show)}
                />
    });
    return formElements;
};

export function UpdateForm(form, identifier, event){
    return {
            ...form,
            [identifier] : {
                ...form[identifier],
                value: event.target.value,
                valid: CheckValidationHandler(event.target.value,form[identifier].validation),
                touched: true
            }
    }
}

export function ShowPassword(form){
    const type = form['password'].config.type === 'password' ? 'text' : 'password';
    return {
            ...form,
            'password':{
                ...form['password'],
                 'config':{
                    ...form.password.config,
                    type:type
                }
            }
        };
}


export function UpdatedFormIsValid(updatedForm, identifier){
    let updatedFormIsValid = true;
         for ( identifier in updatedForm){
             updatedFormIsValid = updatedForm[identifier].valid && updatedFormIsValid;
         };
    return updatedFormIsValid;
}


function CheckValidationHandler(value,rules){
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




        