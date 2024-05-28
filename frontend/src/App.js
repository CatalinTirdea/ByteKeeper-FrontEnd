
import './App.css';
import './style.css';  
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import ProductEditPage from './components/Product/ProductEditPage';


// import {useEffect, useState} from "react";
// import Home from "./components/Home";
// import InventoryForm from "./components/Inventory/InventoryForm";
// import ShowAll from "./components/Inventory/ShowAll";
// import ProductForm from "./components/Product/ProductForm";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Product from './components/pages/Product';
import NoPage from './components/pages/NoPage';
import Layout from './components/pages/Layout';
import Inventory from './components/pages/Inventory';



function App (){

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/products/:id/" element={<Product />} />
                <Route path="inventory" element={<Inventory />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </Router>

  );
};
    


export default App;

