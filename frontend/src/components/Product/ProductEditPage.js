import React, { useState, useEffect } from 'react';

const EditProduct = ({ productId }) => {

        const [product, setProduct] = useState({
            name: '',
            price: 0,
            description: ''
        });
    
        useEffect(() => {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/id/${productId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product');
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
    
            fetchProduct();
        }, [productId]);
    
        const handleChange = e => {
            const { name, value } = e.target;
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        };
    
        const handleSubmit = async e => {
            e.preventDefault();
            try {
                const response = await fetch(`/api/products/edit/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });
                if (!response.ok) {
                    throw new Error('Failed to update product');
                }
                // Dacă cererea a fost făcută cu succes, poți redirecționa utilizatorul către o altă pagină sau afișa un mesaj de succes.
            } catch (error) {
                console.error('Error updating product:', error);
            }
        };

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type = "number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
              
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
