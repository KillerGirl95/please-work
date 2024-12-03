import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/signin', { email, password });
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
