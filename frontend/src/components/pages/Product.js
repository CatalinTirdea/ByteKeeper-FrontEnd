import React from 'react';
import ProductEditPage from '../Product/ProductEditPage';
import InventoryForm from '../Inventory/InventoryForm';
const Product = () => {
    return (
      <div className='container'>
        <div className='edit'>
          <ProductEditPage />
        </div>
        <div className='create'>
          <InventoryForm />
        </div>
        </div>
    );
};

export default Product;