import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    navigate('/login'); // Navighează utilizatorul către pagina de login după logout
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
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/download">Download</Link></li>
          <li><Link to="/inventory/new">Add Inventory</Link></li>
          <li className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </li>
          <li className="login-logout">
            {renderLoginLogout()}
          </li>
        </ul>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
