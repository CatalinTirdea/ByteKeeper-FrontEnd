import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inventory, setInventory] = useState(null);
    const [product, setProduct] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/inventories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                // Găsim inventarul care conține produsul cu ID-ul specificat
                const foundInventory = data.find(inventory => inventory.products.some(product => product.id === parseInt(id)));
                if (!foundInventory) {
                    throw new Error('Inventory not found for product');
                }
                setInventory(foundInventory);
                // Găsim produsul în inventarul găsit
                const foundProduct = foundInventory.products.find(product => product.id === parseInt(id));
                if (!foundProduct) {
                    throw new Error('Product not found');
                }
                setProduct(foundProduct);
                setProductName(foundProduct.name);
                setProductPrice(foundProduct.price);
                setLoading(false); // Marcam încărcarea ca fiind completă
            } catch (error) {
                console.error('Error fetching inventory or product:', error);
            }
        };

        fetchInventory();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inventories/${inventory.id}/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inventories/${inventory.id}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: productName, price: productPrice }),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-edit-container">
            {product ? (
                <div>
                    <h2>Edit Product</h2>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <br />
                        <label>Price:</label>
                        <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                        />
                        <br />
                        <button onClick={handleEdit}>Save</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default Product;
