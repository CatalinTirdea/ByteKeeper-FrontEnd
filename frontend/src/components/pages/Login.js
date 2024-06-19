import React, { useState } from 'react';
import '../../styles/login.css';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleSignup = () => {
        setIsSignup(!isSignup);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        console.log('Login:', { email, password });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Signup:', { email, password });
    };

    return (
        <div className="auth-container">
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={isSignup ? handleSignup : handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isSignup && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="auth-button">
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p onClick={toggleSignup} className="toggle-auth">
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
};

export default Auth;

