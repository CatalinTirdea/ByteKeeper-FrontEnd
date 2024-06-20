import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InventoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState({ name: '', quantity: 0, price: 0, inventoryId: null, categoryId: 1 });
  const [formTitle, setFormTitle] = useState('Add New Inventory');

  useEffect(() => {
    if (id) {
      // Fetch inventory item if id is present
      fetch(`/api/products/id/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.inventoryId);
          setInventoryItem({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            inventoryId: data.inventoryId,
            categoryId: data.category.id
          });
          setFormTitle('Edit Inventory');
        })
        .catch(error => console.error('Error fetching inventory item:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryItem(prevState => ({
      ...prevState,
      [name]: name === 'quantity' || name === 'price' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? `/api/products/edit/${id}` : '/api/products/add';
    const method = id ? 'PUT' : 'POST';

    const { name, quantity, price, categoryId, inventoryId } = inventoryItem; // Destructuring pentru a prelua valorile

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        quantity,
        price,
        categoryId,
        inventoryId
      })
    })
      .then(response => {
        if (response.ok) {
          navigate('/inventory');
        } else {
          alert('Failed to save inventory item');
        }
      })
      .catch(error => console.error('Error saving inventory item:', error));
  };

  return (
    <div>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={inventoryItem.name} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={inventoryItem.quantity} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={inventoryItem.price} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <select name="categoryId" value={inventoryItem.categoryId} onChange={handleChange} required>
            <option value="1">Category 1</option> {/* Example categories */}
            <option value="2">Category 2</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default InventoryForm;
