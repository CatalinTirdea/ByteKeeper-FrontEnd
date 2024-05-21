import React, { useState, useEffect } from 'react';

import '../../style.css';
const Home = () => {
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
      // Fetch inventories when component mounts
      const fetchInventories = async () => {
          try {
              const response = await fetch('/api/inventories');
              if (!response.ok) {
                  throw new Error('Failed to fetch inventories');
              }
              const data = await response.json();
              setInventories(data);
          } catch (error) {
              console.error('Error fetching inventories:', error);
          }
      };

      fetchInventories();
  }, []);

  useEffect(() => {
      if (selectedInventory) {
          // Fetch products for selected inventory
          const fetchProducts = async () => {
              try {
                  const response = await fetch(`/api/inventories/${selectedInventory.id}/products`);
                  if (!response.ok) {
                      throw new Error('Failed to fetch products');
                  }
                  const data = await response.json();
                  setProducts(data);
              } catch (error) {
                  console.error('Error fetching products:', error);
              }
          };

          fetchProducts();
      }
  }, [selectedInventory]);

  const handleInventoryClick = (inventory) => {
      setSelectedInventory(inventory);
  };

  return (
      <div style={{ display: 'flex', padding: '20px' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
              <h2>Inventories</h2>
              <ul>
                  {inventories.map(inventory => (
                      <li key={inventory.id} onClick={() => handleInventoryClick(inventory)}>
                          {inventory.name}
                      </li>
                  ))}
              </ul>
          </div>
          <div style={{ flex: 2 }}>
              <h2>Products</h2>
              {selectedInventory ? (
                  <ul>
                      {products.map(product => (
                          <li key={product.id}>
                              {product.name} - ${product.price}
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p>Please select an inventory to view its products.</p>
              )}
          </div>
      </div>
  );
    
};

export default Home;