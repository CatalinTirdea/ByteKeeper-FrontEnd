import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Grid, InputLabel, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

export default function ProductForm() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        "name": "",
        "quantity": 0,
        "categoryId": 1
    })

    // const handleChange = (e) => {
    //     setFormData({[e.target.name]: e.target.value });
    // };

    const getCategories = async () => {
        await fetch('/api/products/getCategories',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setCategories(responseJson);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/products/add', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        window.location.reload();
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Product name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                autoFocus
                                sx={{width: '320px'}}
                                onChange={(e) => {setFormData({ ...formData, name: e.target.value})}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                required
                                fullWidth
                                id="quantity"
                                sx={{width: '320px'}}
                                onChange={(e) => {setFormData({ ...formData, quantity: parseInt(e.target.value)})}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="categoryId">Category id</InputLabel>
                            <Select
                                labelId="categoryId"
                                id="categoryId"
                                name="categoryId"
                                label="Category"
                                value={formData.categoryId}
                                sx={{width: '320px'}}
                                onChange={(choice) => {setFormData({ ...formData, categoryId: choice.target.value})}}
                            >
                                {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                            </Select>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                    >Add Product</Button>
                </Box>
            </Box>
        </>
    )
}
