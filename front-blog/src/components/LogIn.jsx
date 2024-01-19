import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const LogIn = () => {
    const navigate = useNavigate();
    const { value, login } = useAuth();

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

    const validateForm = () => {
        let isValid = true;

        if (email.length === 0) {
            setEmailError('Email is required');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length === 0) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitDisabled(true);

            const formData = {
                email,
                password,
            };

            const response = await axios.post(`${config.backendUrl}/login`, formData);

            console.log('Successfully logged in:', response.data);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Error logging in: ', error.message);
        } finally {
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
