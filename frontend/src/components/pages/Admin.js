import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('/api/contact/message');
        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }
        const data = await response.json();
        setContact(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContact();
  }, []);

  return (
    <div className="admin">
      <h2>Admin Page</h2>
      {error && <p>Error: {error}</p>}
      {contact && (
        <div>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Message: {contact.message}</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
