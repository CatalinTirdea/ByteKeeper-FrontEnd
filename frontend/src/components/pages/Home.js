import React, { useState, useEffect } from 'react';
import '../../style.css';

const Home = () => {
    const [inventories, setInventories] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);

    useEffect(() => {
      const fetchInventories = async () => {
          try {
              const response = await fetch('http://localhost:5000/inventories');
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

   

    const handleInventoryClick = (inventory) => {
        setSelectedInventory(inventory);
    };

    return (
      <>
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
                        </li>
                    ))}
                </ul>
            </div>
            <div className="products">
                <h2>Products</h2>
                {selectedInventory ? (
                    <ul className="products-list">
                        {selectedInventory.products.map(product => ( // Modificarea aici pentru a folosi produsele din inventarul selectat
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
 </div>
        </>
    );
};

export default Home;
