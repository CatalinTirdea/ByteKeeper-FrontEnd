import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InventoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState({ name: '', visibility: 'private' });

  useEffect(() => {
    if (id) {
      // Fetch inventory item if id is present
      fetch(`/api/inventories/${id}`)
        .then(response => response.json())
        .then(data => setInventoryItem(data))
        .catch(error => console.error('Error fetching inventory item:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? `/api/inventories/edit/${id}` : '/api/inventories/add';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inventoryItem)
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
      <h2>{id ? 'Edit Inventory' : 'Add New Inventory'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={inventoryItem.name} onChange={handleChange} required/>
        </label>
        <label>
          Visibility:
          <select name="visibility" value={inventoryItem.visibility} onChange={handleChange} required>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default InventoryForm;
