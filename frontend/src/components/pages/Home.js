import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style.css';

const Home = () => {
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    category_id: '',
    inventory_id: '',
    price: ''
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await fetch('/api/inventories/');
        if (!response.ok) {
          throw new Error('Failed to fetch inventories');
        }
        const data = await response.json();
        setInventories(data);
      } catch (error) {
        console.error('Error fetching inventories', error);
      }
    };

    fetchInventories();
  }, []);

  const handleInventoryClick = (inventory) => {
    setSelectedInventory(inventory);
    setNewProduct(prevState => ({
      ...prevState,
      inventory_id: inventory.id
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        alert('Product added successfully');
        setNewProduct({
          name: '',
          quantity: '',
          category_id: '',
          inventory_id: selectedInventory.id,
          price: ''
        });
        setShowProductForm(false);
        // Optionally, refresh inventory or product list
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="content">
      <header className="header">
        <h1 className="header-title">Bytekeeper</h1>
      </header>
      <div className="container">
        <div className="inventories">
          <h2>Inventories</h2>
          <ul className="inventory-list">
            {inventories.map(inventory => (
              <li key={inventory.id} className="inventory-item">
                <span onClick={() => handleInventoryClick(inventory)}>{inventory.name}</span>
                <button onClick={() => navigate(`/inventory/edit/${inventory.id}`)}>Edit</button>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/inventory/new')}>Add New Inventory</button>
        </div>
        <div className="products">
          <h2>Products</h2>
          {selectedInventory ? (
            <>
              <ul className="products-list">
                {selectedInventory.products.map(product => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
              {!showProductForm ? (
                <button onClick={() => setShowProductForm(true)}>Add New Product</button>
              ) : (
                <>
                  <h3>Add Product</h3>
                  <form onSubmit={handleProductSubmit}>
                    <label>
                      Name:
                      <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
                    </label>
                    <label>
                      Quantity:
                      <input type="number" name="quantity" value={newProduct.quantity} onChange={handleProductChange} required />
                    </label>
                    <label>
                      Category ID:
                      <input type="text" name="category_id" value={newProduct.category_id} onChange={handleProductChange} required />
                    </label>
                    <label>
                      Price:
                      <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleProductChange} required />
                    </label>
                    <button type="submit">Add Product</button>
                    <button type="button" onClick={() => setShowProductForm(false)}>Cancel</button>
                  </form>
                </>
              )}
            </>
          ) : (
            <p>Please select an inventory to view its products and add a new product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
