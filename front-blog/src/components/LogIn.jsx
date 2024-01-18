import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                username,
                password,
            };

            const response = await axios.post(`${config.backendUrl}/login`, formData);

            console.log('Succesfully logged in:', response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            // Handle errors
            console.error('Error logging in: ', error.message);
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LogIn;
