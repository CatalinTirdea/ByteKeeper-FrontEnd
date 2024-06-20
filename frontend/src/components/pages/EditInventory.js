import React, { useState, useEffect } from 'react';

const EditInventory = ({ inventoryId }) => {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('public'); // Presupunem că "public" este valoarea implicită pentru vizibilitate
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`/api/inventories/id/${inventoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setName(data.name);
        setVisibility(data.visibility);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
  
    if (inventoryId) {
      fetchInventory();
    }
  }, [inventoryId]);
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedInventory = {
      name: name,
      visibility: visibility,
    };

    try {
      const response = await fetch(`/api/inventories/edit/${inventoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInventory),
      });

      if (response.ok) {
        alert('Inventory updated successfully');
        // Poți adăuga aici un logic pentru redirecționarea utilizatorului sau alte acțiuni necesare
      } else {
        alert('Failed to update inventory');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Error updating inventory');
    }
  };

  if (loading) {
    return <p>Loading inventory details...</p>;
  }

  return (
    <div className="edit-inventory">
      <h2>Edit Inventory</h2>
      <form onSubmit={handleEditSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <label>
          Visibility:
          <select value={visibility} onChange={handleVisibilityChange} required>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditInventory;

