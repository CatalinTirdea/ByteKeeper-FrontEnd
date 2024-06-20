import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTokens = async (code) => {
      try {
        const response = await fetch(`http://localhost:8080/oauth2/callback?code=${code}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tokens');
        }
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);
        navigate('/'); // Redirecționează utilizatorul către pagina principală sau către pagina dorită
      } catch (error) {
        console.error('Error fetching tokens', error);
      }
    };

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchTokens(code);
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default LoginCallback;
