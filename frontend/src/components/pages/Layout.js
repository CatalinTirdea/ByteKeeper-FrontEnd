import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../../nav.css';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a search term');
      return;
    }

    try {
      const response = await fetch(`/api/inventories/search/${searchTerm}`);
      if (response.ok) {
        const results = await response.json();
        if (results.length > 0) {
          navigate(`/product/${searchTerm}`);
        } else {
          alert('No results found');
        }
      } else {
        alert('Error fetching search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Error fetching search results');
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li className="logo"><Link to="/">ByteKeeper</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/inventory/new">Add Inventory</Link></li> {/* Added link for adding inventory */}
          <li className="search-bar">
            <input 
              type="text" 
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
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
