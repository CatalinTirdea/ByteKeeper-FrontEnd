import React from 'react';
import EditInventory from './EditInventory'; // presupunând că EditInventory este exportat corect
import { useParams } from 'react-router-dom';

const InventoryEditPage = () => {
  const { id } = useParams(); // presupunând că folosești React Router pentru a gestiona parametrii URL

  return (
    <div>
      <h1>Edit Inventory</h1>
      <EditInventory inventoryId={id} />
    </div>
  );
};

export default InventoryEditPage;
