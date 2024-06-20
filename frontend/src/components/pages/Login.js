import React, { useEffect } from 'react';
import '../../styles/login.css'; // Asigură-te că importi fișierul CSS
import googleLogo from '../../resources/google-logo.png'; // Importă imaginea
import { gapi } from 'gapi-script';

const Login = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: '140352902475-5hgpbh9obko5f7fd5h51sebbo830olg4.apps.googleusercontent.com',
        scope: 'profile email'
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const googleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const idToken = googleUser.getAuthResponse().id_token;
      const profile = googleUser.getBasicProfile();
      console.log('ID Token: ', idToken);
      console.log('Name: ', profile.getName());
      console.log('Email: ', profile.getEmail());

      // Save the token and user info to localStorage or send them to your backend
      localStorage.setItem('id_token', idToken);
      localStorage.setItem('name', profile.getName());
      localStorage.setItem('email', profile.getEmail());

      // Redirect or do other actions
    }).catch(error => {
      console.error('Error during login: ', error);
    });
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
