import React from 'react';
import './registration.css';

const Registration = () => {
    return(<div className="Registration"></div>);
//     return( <form onSubmit={this.sendDataHandler}>
//         <Input
//                   key = {"name"}
//                     inputType = {this.state.contactForm.name.orderElement}
//                     config = {this.state.contactForm.name.orderElementConfig}
//                     value = { this.state.contactForm.name.value}
//                     invalid = {!this.state.contactForm.name.invalid}
//                     label = {this.state.contactForm.name.label}
//                     changed={(event) => this.inputChangedHandler(event,"name")}
//         />
//         <div className="ContactMethod">
//             <p>We kunnen jou best contacteren via :</p>
//             <img alt="phone" className="ContactBtns" src={phoneImg} onClick={() => this.showInputHandler("phone","email")}/>
//             <img alt="mail" className="ContactBtns" src={mailImg} onClick={() => this.showInputHandler("email","phone")}/>
//         </div>

//     {this.state.contactForm.email.show ?
//             <Input
//                     key = {"email"}
//                     inputType = {this.state.contactForm.email.orderElement}
//                     config = {this.state.contactForm.email.orderElementConfig}
//                     value = { this.state.contactForm.email.value}
//                     invalid = {!this.state.contactForm.email.invalid}
//                     label = {this.state.contactForm.email.label}
//                     changed={(event) => this.inputChangedHandler(event,"email")}
//                 />    
//                 : null}
//     {this.state.contactForm.phone.show ?
//             <Input
//                     key = {"phone"}
//                     inputType = {this.state.contactForm.phone.orderElement}
//                     config = {this.state.contactForm.phone.orderElementConfig}
//                     value = { this.state.contactForm.phone.value}
//                     invalid = {!this.state.contactForm.phone.invalid}
//                     label = {this.state.contactForm.phone.label}
//                     changed={(event) => this.inputChangedHandler(event,"phone")}
//                 />    
//                 : null}       
//     <button disabled={!this.state.formIsValid} className="SignUp">Aanmelden</button>
// </form>)
}

export default Registration;