import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import '../../styles/inventory.css';

const InventoryDetails = () => {
    const { nume } = useParams();
    const [inventory, setInventory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventoryByName = async () => {
            try {
                const response = await fetch(`/api/inventories/search/${nume}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                if (data.length === 0) {
                    throw new Error('Inventory not found');
                }
                setInventory(data[0]); // Luăm primul rezultat din căutare
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setInventory(null);
            }
        };

        if (nume) {
            fetchInventoryByName();
        }
    }, [nume]);

    const handleManageProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="inventory-container">
            {inventory ? (
                <div className="inventory-details">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {inventory.name}
                            </Typography>
                            {inventory.products && inventory.products.length > 0 ? (
                                <List>
                                    {inventory.products.map(product => (
                                        <ListItem key={product.id}>
                                            <ListItemText primary={product.name} secondary={`Price: ${product.price}`} />
                                            <Button onClick={() => handleManageProduct(product.id)} variant="contained" color="primary">
                                                Manage Product
                                            </Button>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <p>No products available</p>
                            )}
                            {/* Poți adăuga alte detalii ale inventarului aici */}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <p>Inventory not found</p>
            )}
        </div>
    );
};

export default InventoryDetails;
