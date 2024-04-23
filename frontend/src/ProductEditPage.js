// ProductEditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function ProductEditPage() {
    const { id } = useParams();
    const history = useHistory();

    const [product, setProduct] = useState({
        name: '',
        quantity: 0,
    });

    useEffect(() => {
        // Funcție pentru a prelua detaliile produsului din backend
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Eroare la preluarea produsului:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/products/${id}`, product);
            history.push('/');
        } catch (error) {
            console.error('Eroare la salvarea produsului:', error);
        }
    };

    return (
        <div>
            <h1>Editare produs</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nume:
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cantitate:
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Salvează</button>
            </form>
        </div>
    );
}

export default ProductEditPage;
