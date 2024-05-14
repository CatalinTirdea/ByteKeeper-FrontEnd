import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId }) => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: ''
    });

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProduct(response.data);
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
            await axios.put(`/api/products/`, product);

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
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
