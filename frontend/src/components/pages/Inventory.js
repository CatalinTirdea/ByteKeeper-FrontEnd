import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import '../../styles/inventory.css';

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching inventories', error);
            }
        };

        fetchInventories();
    }, []);

    const handleSelectInventory = (inventory) => {
        setSelectedInventory(inventory);
    };

    return (
        <div className="inventory-container">
            <div className="inventory-list">
                <h2>All Inventories</h2>
                <List>
                    {inventories.map(inventory => (
                        <ListItem key={inventory.id} onClick={() => handleSelectInventory(inventory)} button>
                            <ListItemText primary={inventory.name} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="inventory-details">
                {selectedInventory ? (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {selectedInventory.name}
                            </Typography>
                            {selectedInventory.products && selectedInventory.products.length > 0 ? (
                                <List>
                                    {selectedInventory.products.map(product => (
                                        <ListItem key={product.id}>
                                            <ListItemText primary={product.name} secondary={`Price: ${product.price}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <p>No products available</p>
                            )}
                            <Button onClick={() => navigate(`/products/${selectedInventory.id}`)} variant="contained">Manage Products</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <p>Select an inventory to view details.</p>
                )}
            </div>
        </div>
    );
};

export default Inventory;
