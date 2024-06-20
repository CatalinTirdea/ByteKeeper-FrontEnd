import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Product from './components/pages/Product';
import NoPage from './components/pages/NoPage';
import Inventory from './components/pages/Inventory';
import InventoryForm from './components/pages/InventoryForm';
import Login from './components/pages/Login';
import Callback from './components/pages/Callback';
import DownloadButton from './components/pages/DownloadButton';
import InventoryDetails from './components/pages/InventoryDetails'; 
import NewInventory from './components/pages/NewInventory';
import EditInventory from './components/pages/EditInventory';
import InventoryEditPage from './components/pages/InventoryEditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<Callback />} />
          <Route path="contact" element={<Contact />} />
          <Route path="download" element={<DownloadButton />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="contact" element={<Contact />} />
          <Route path="inventory/new" element={<NewInventory />} />
          <Route path="inventory/edit/:id" element={<InventoryEditPage />} />
          <Route path="inventory/:nume" element={<InventoryDetails />} /> {/* Noua rută pentru detalii inventar */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
