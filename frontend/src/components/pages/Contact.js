import React, { useState } from 'react';
import '../../contact.css'
const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aici poți adăuga logica pentru a trimite datele formularului către un server
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);
      // Resetează formularul după trimitere
      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    };

    return (
        <div className="contact">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    );
};

export default Contact;