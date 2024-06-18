import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('access_token');
    const idToken = query.get('id_token');
    console.log("Functionez!")
    if (accessToken && idToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id_token', idToken);
      console.log(localStorage.getItem('access_token'))
      console.log(localStorage.getItem('id_token'))
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Callback Page</h1>
      <p>Handling Google OAuth2 callback...</p>
    </div>
  );
};

export default Callback;
