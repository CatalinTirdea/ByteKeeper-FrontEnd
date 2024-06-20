import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import '../../styles/style.css';

const Home = () => {
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    categoryId: '',
    inventoryId: '',
    price: ''
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [showChart, setShowChart] = useState({});
  const [editMode, setEditMode] = useState(false); // Starea pentru modul de editare
  const [editName, setEditName] = useState('');
  const [editVisibility, setEditVisibility] = useState('public'); // Presupunem că "public" este valoarea implicită pentru vizibilitate
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

const handleDeleteInventory = async (id) => {
    try {
        const response = await fetch(`/api/inventories/delete/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Inventory deleted successfully');
            // Poți reîncărca lista de inventare după ștergere sau să gestionezi altfel necesarul
            const updatedInventories = inventories.filter(inv => inv.id !== id);
            setInventories(updatedInventories);
        } else {
            alert('Failed to delete inventory');
        }
    } catch (error) {
        console.error('Error deleting inventory:', error);
        alert('Error deleting inventory');
    }
};

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/getCategories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInventoryClick = (inventory) => {
    setSelectedInventory(inventory);
    setNewProduct(prevState => ({
      ...prevState,
      inventoryId: inventory.id
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: name === 'quantity' || name === 'categoryId' ? parseInt(value, 10) : name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log('newProduct:', newProduct);
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
          categoryId: '',
          inventoryId: selectedInventory.id,
          price: ''
        });
        setShowProductForm(false);
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const downloadFile = async (id) => {
    try {
      const response = await fetch(`api/inventories/download/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  const generateChartData = (products) => {
    const data = [['Product', 'Total Price']];
    products.forEach(product => {
      const totalPrice = product.price * product.quantity;
      data.push([product.name, totalPrice]);
    });
    return data;
  };


  const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice.toFixed(2); // Returnează suma totală cu două zecimale
  };

  const toggleChart = (inventoryId) => {
    setShowChart(prevState => ({
      ...prevState,
      [inventoryId]: !prevState[inventoryId]
    }));
  };

  // Funcție pentru a activa modul de editare
  const activateEditMode = (inventory) => {
    setEditMode(true);
    setEditName(inventory.name);
    setEditVisibility(inventory.visibility);
    setSelectedInventory(inventory); // Setăm și inventarul selectat
  };

  // Funcție pentru a salva modificările
  const saveChanges = async () => {
    console.log("Saving changes");
    
    const updatedInventory = {
      id: selectedInventory.id,
      name: editName,
      visibility: editVisibility
    };
    
    console.log("Updated Inventory:", updatedInventory);
  
    try {
      const response = await fetch(`/api/inventories/edit/${selectedInventory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInventory)
      });
      
      console.log("Response status:", response.status);
      
      if (response.ok) {
        alert('Inventory updated successfully');
        setEditMode(false); // Ieșim din modul de editare
        // Poți adăuga aici o logică pentru reîncărcarea inventarului sau alte acțiuni necesare
      } else {
        const errorData = await response.json();
        console.error('Failed to update inventory:', errorData);
        alert('Failed to update inventory');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Error updating inventory');
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
                <span onClick={() => handleInventoryClick(inventory)} className='inventory-name'>{inventory.name}</span>
                <button onClick={() => activateEditMode(inventory)}>Edit</button>
                <button onClick={() => downloadFile(inventory.id)}>Download</button>
                <button onClick={() => toggleChart(inventory.id)}>View Chart</button>
                <button onClick={() => handleDeleteInventory(inventory.id)}>Delete</button>
                {showChart[inventory.id] && (
                  <Chart
                    chartType="PieChart"
                    data={generateChartData(inventory.products)}
                    options={{ title: 'Product Prices' }}
                    width="400px"
                    height="300px"
                  />
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/inventory/new')}>Add New Inventory</button>
        </div>
        <div className="products">
          <h2>Products</h2>
          {selectedInventory ? (
            <>
              {editMode ? (
                <>
                  <h1>Edit Inventory</h1>
                  <form onSubmit={saveChanges}>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Visibility:
                      <select
                        value={editVisibility}
                        onChange={(e) => setEditVisibility(e.target.value)}
                        required
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                  </form>
                </>
              ) : (
                <>
                  <h1>{selectedInventory.name} Inventory</h1>
                  <p>Total Value: ${calculateTotalPrice(selectedInventory.products)}</p>
                  <ul className="products-list">
                    {selectedInventory.products.map(product => (
                      <li key={product.id}>
                        {product.name} - ${product.price} x {product.quantity} = ${(product.price * product.quantity).toFixed(2)}
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
                          Category:
                          <select name="categoryId" value={newProduct.categoryId} onChange={handleProductChange} required>
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
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
