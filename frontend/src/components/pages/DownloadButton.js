import React from 'react';

const DownloadButton = ({ id }) => {
    const downloadFile = async () => {
        try {
            const response = await fetch(`api/products/download/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory.json'); // Setează numele fișierului
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    return (
        <button onClick={downloadFile}>
            Download Inventory
        </button>
    );
};

export default DownloadButton;
