import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
        <nav>
          <ul>
            <li className="logo"><Link to="/">ByteKeeper</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/product">Product</Link></li>
          </ul>
        </nav>
        <div className="container">
          <Outlet />
        </div>
      </>
    );
};

export default Layout;