import React, { useState } from "react";
import Button from "@mui/material/Button";
import {Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";

export default function InventoryForm() {
    const [formData, setFormData] = useState({
        "name": ""
    })

    // const handleChange = (e) => {
    //     setFormData({[e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/inventories/add', {
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
            <h2>Add Inventory</h2>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Inventory name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                autoFocus
                                sx={{width: '320px'}}
                                onChange={(e) => {setFormData({ ...formData, name: e.target.value})}}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                    >Add Inventory</Button>
                </Box>
            </Box>
        </>
    )
}
