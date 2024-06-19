import React from 'react';
import '../../styles/login.css'; // Asigură-te că importi fișierul CSS
import googleLogo from '../../resources/google-logo.png'; // Importă imaginea

const Login = () => {
  const googleLogin = () => {
    const clientId = '140352902475-5hgpbh9obko5f7fd5h51sebbo830olg4.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8080/oauth2/callback';
    const scope = 'profile email';
    const responseType = 'code';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    window.location.href = url;
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Sign in with your Google account to access the application.</p>
      <button className="login-button" onClick={googleLogin}>
        <img src={googleLogo} alt="Google Logo" className="google-logo" /> Login with Google
      </button>
    </div>
  );
};

export default Login;
