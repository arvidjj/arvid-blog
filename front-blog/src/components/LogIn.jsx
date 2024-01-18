import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isSubmitDisabled, setSubmitDisabled] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //Validation
            if (email.length === 0) {
                setEmailError('Email is required');
                return;
            } else {
                setEmailError('');
            }

            if (password.length === 0) {
                setPasswordError('Password is required');
                return;
            } else {
                setPasswordError('');
            }

            const formData = {
                email,
                password,
            };

            //disable button
            setSubmitDisabled(true);
            const response = await axios.post(`${config.backendUrl}/login`, formData);

            console.log('Succesfully logged in:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate("/");
        } catch (error) {
            // Handle errors
            console.error('Error logging in: ', error.message);
            setSubmitDisabled(false);
        }
    };

    return (
        <div>
            <div>
                <h2>Log In</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="form1">

                    <div className="formfield">
                        <div className="forminput">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={handleEmailChange} />
                        </div>
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </div>

                    <div className="formfield">
                        <div className="forminput">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitDisabled}>Log In</button>
                </div>

            </form>
        </div>
    );
};

export default LogIn;
