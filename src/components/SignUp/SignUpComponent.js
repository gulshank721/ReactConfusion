import React, {useState,setState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SignUpUser } from '../../redux/signUp';

import './style.css'
function SignUp() {

    const dispatch = useDispatch();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "username"){
            setUsername(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        console.log(firstName,lastName,username,password,confirmPassword);
        // this.toggleModal();
        // loginUser({username: this.username.value, password: this.password.value});
        // event.preventDefault();
        if(password===confirmPassword){
            const newUser = {
                firstname: firstName,
                lastname: lastName,
                username:username,
                password: password
            };
            console.log(newUser);
            dispatch(SignUpUser(newUser));
        }
        
        else
        console.log("match password with ConfirmPassword.")
    }

    return(
        <div>
           
        <div className="form">
            <div className="form-body">
                <div><h5>SignUp</h5></div>
                <div className="username">
                    <label className="form__label" htmlFor="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" htmlFor="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="username">
                    <label className="form__label" htmlFor="username">Username </label>
                    <input  type="text" id="username" className="form__input" value={username} onChange = {(e) => handleInputChange(e)} placeholder="User"/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">SignUp</button>
            </div>
        </div>
        </div>
       
    )       
}

export default SignUp;