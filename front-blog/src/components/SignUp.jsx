import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                username,
                email,
                password,
            };

            const response = await axios.post(`${config.backendUrl}/users`, formData);

            console.log('User created:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
                <label>Username:</label>
                <input type="username" value={username} onChange={handleUsernameChange} />

                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />

                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
