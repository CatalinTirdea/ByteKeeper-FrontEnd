import './styles/App.css';
import './styles/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
import InventoryForm from './components/pages/InventoryForm';
import Login from './components/pages/Login';
import Callback from './components/pages/Callback';
import DownloadButton from './components/pages/DownloadButton';

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
          <Route path="products/:id/" element={<Product />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/new" element={<InventoryForm />} />
          <Route path="inventory/edit/:id" element={<InventoryForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
