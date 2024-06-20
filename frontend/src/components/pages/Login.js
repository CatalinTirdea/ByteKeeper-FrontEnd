import React, { useState } from 'react';
import '../../styles/login.css'; // Fișierul CSS pentru stilizare

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificare dacă toate câmpurile sunt completate
        if (!mail || !password) {
            setError('Toate câmpurile sunt obligatorii!');
            return;
        }

        // Obiectul cu datele pentru a fi trimis la backend
        const user = {
            mail: mail,
            password: password
        };

        // URL-ul către backend
        // Înlocuiește cu adresa corectă a backend-ului tău

        try {
            const response = await fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // Verificarea statusului răspunsului de la server
            if (!response.ok) {
                throw new Error('Eroare la autentificare. Te rugăm să încerci din nou.');
            }

            // Răspunsul de la server
            const data = await response;
            console.log('Răspuns de la backend:', data);

            // Aici poți gestiona răspunsul de la backend (token de autentificare, redirecționare, etc.)
        } catch (error) {
            console.error('Eroare la comunicarea cu backend-ul:', error);
            setError('Eroare la autentificare. Te rugăm să încerci din nou mai târziu.');
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
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
                <button type="submit" className="submit-button">Log In</button>
            </form>
        </div>
    );
};

export default Login;
