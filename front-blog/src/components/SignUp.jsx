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
            //validation
            if (username.length === 0) {
                setUsernameError('Username is required');
                return;
            } else {
                setUsernameError('');
            }

            if (email.length === 0) {
                setEmailError('Email is required');
                return;
            } else {
                setEmailError('');
            }

            if (password.length === 0) {
                setPasswordError('Password is required');
                return;
            } else if (password.length < 6) {
                setPasswordError('Password must be at least 6 characters');
                return;
            } else if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            } else {
                setPasswordError('');
            }

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
                <div className="form1">

                    <div className="formfield">
                        <div className="forminput">
                            <label>Username:</label>
                            <input type="username" value={username} onChange={handleUsernameChange} />
                            {usernameError && <div className="error">{usernameError}</div>}
                        </div>
                    </div>

                    <div className="formfield">
                        <div className="forminput">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={handleEmailChange} />
                            {emailError && <div className="error">{emailError}</div>}
                        </div>
                    </div>

                    <div className="formfield">
                        <div className="forminput">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                    </div>

                    <div className="formfield">
                        <div className="forminput">
                            <label>Confirm Password:</label>
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            {passwordError && <div className="error">{passwordError}</div>}
                        </div>
                    </div>

                    <div style={{marginTop:'15px', alignSelf:'flex-end'}}>
                        <button type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
