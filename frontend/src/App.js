import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useEffect, useState} from "react";
import Home from "./components/Home";
import InventoryForm from "./components/Inventory/InventoryForm";
import ShowAll from "./components/Inventory/ShowAll";
import ProductForm from "./components/Product/ProductForm";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductEditPage from './ProductEditPage';

const App = () => {

    return (
        <>
            <ProductForm/>
        </>
    )
}

export default App;
