import React, { useState } from 'react';

const NewInventory = () => {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('public'); // Valoarea implicită pentru vizibilitate

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInventory = {
      name: name,
      visibility: visibility,
      userId: 1, // Aici ar trebui să fie id-ul utilizatorului autentificat, sau poți ajusta cum consideri necesar
    };

    try {
      const response = await fetch('/api/inventories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInventory),
      });

      if (response.ok) {
        alert('Inventory added successfully');
        setName('');
        setVisibility('public'); // Resetăm vizibilitatea la valoarea implicită "public"
      } else {
        alert('Failed to add inventory');
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('Error adding inventory');
    }
  };

  return (
    <div className="new-inventory">
      <h2>Add New Inventory</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Inventory</button>
      </form>
    </div>
  );
};

export default NewInventory;
