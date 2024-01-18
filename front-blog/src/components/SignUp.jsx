import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

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

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
