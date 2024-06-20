import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/inventory/${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    navigate('/login');
  };

  const renderLoginLogout = () => {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    if (accessToken && idToken) {
      return (
        <Link onClick={handleLogout}>Logout</Link>
      );
    } else {
      return (
        <Link to="/login">Login</Link>
      );
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li className="logo"><Link to="/">ByteKeeper</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <input
              type="text"
              placeholder="Search inventory"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
          </li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/download">Download</Link></li>
          <li><Link to="/inventory/new">Add Inventory</Link></li>
          <li className="login-logout">
            {renderLoginLogout()}
          </li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
