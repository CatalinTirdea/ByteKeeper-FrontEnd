import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../../styles/layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userEmailFromStorage = sessionStorage.getItem('mail');
    if (userEmailFromStorage) {
      setUserEmail(userEmailFromStorage);
    }
  }, []);

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
    // Ștergere email din sessionStorage și resetare state
    sessionStorage.removeItem('mail');
    sessionStorage.removeItem('id');
    setUserEmail('');
    // Redirecționare către pagina de login sau altă destinație
    navigate('/login'); // Sau orice altă destinație dorită pentru logout
  };

  return (
    <>
      <nav>
        <ul>
          <li className="logo"><Link to="/">ByteKeeper</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/inventory/new">Add Inventory</Link></li>
          <li className='search-bar'>
            <input
              type="text"
              placeholder="Search inventory"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
          </li>
        </ul>
        <ul>
          {userEmail ? (
            <>
              {userEmail === '1337@vamdatown.com' && <li><Link to='/admin'>Admin Page</Link></li>}
              <li>{userEmail}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to='/signup'>SignUp</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
