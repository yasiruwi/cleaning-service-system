// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Ensure you have your styles here

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the backend to authenticate the user
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password,
            });

            // If successful, store the token (or handle any authentication logic)
            localStorage.setItem('authToken', response.data.token);
            setAuthenticated(true); // Update the authentication state in App.js
            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            // Handle login failure
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
