import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [mail, setEmail] = useState('');
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificăm dacă toate câmpurile sunt completate
        if (!mail || !name || !password) {
            setError('Toate câmpurile sunt obligatorii!');
            return;
        }

        // Obiectul cu datele pentru a fi trimis la backend
        const user = {
            mail: mail,
            name: name,
            password: password
        };

        // URL-ul către backend pentru înregistrare
        const url = '/api/users/register'; // Înlocuiește cu adresa corectă a backend-ului tău

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // Verificarea statusului răspunsului de la server
            if (!response.ok) {
                throw new Error('Eroare la înregistrare. Status: ' + response.status);
            }

            // Răspunsul de la server
            const data = await response;
            console.log('Răspuns de la backend:', data);

            

            // Redirecționează către pagina '/success' (sau oricare altă rută dorită)
            navigate('/');

        } catch (error) {
            console.error('Eroare la comunicarea cu backend-ul:', error);
            setError('Eroare la înregistrare. Te rugăm să încerci din nou mai târziu.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Login;
