import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../../styles/layout.css';
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


  return (
    <>
      <nav>
        <ul>
          <li className="logo"><Link to="/">ByteKeeper</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/download">Download</Link></li>
          <li><Link to="/inventory/new">Add Inventory</Link></li>
         
          <li><Link to='/contact'>Contact</Link></li>
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
        <li><Link to= '/signup'>SignUp</Link></li>
         <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
