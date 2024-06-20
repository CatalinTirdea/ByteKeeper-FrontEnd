import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [inventoryId, setInventoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/id/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                console.log(data);

                if (!data) {
                    throw new Error('Product not found');
                }

                setProduct(data);
                setProductName(data.name);
                setProductQuantity(data.quantity);
                setProductPrice(data.price);
                setCategoryId(data.category ? data.category.id : null);

                // Verificați dacă există inventory și setați inventoryId corespunzător
                if (data.inventory) {
                    setInventoryId(data.inventory.id);
                } else {
                    // Dacă nu există inventory, setați inventoryId pe null sau altă valoare corespunzătoare
                    setInventoryId(data.inventoryId); // sau altceva, în funcție de necesități
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }

    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`/api/products/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: productName,
                    quantity: productQuantity,
                    price: productPrice,
                    categoryId: categoryId,
                    inventoryId: inventoryId,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            navigate('/');
        } catch (error) {
            console.error('Error updating product', error);
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
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <br />
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(parseInt(e.target.value))}
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
