import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// API base URL
const API_URL = 'http://localhost:8000';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items`);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items from the server. Please try again later.");
        setLoading(false);
        
        // Fallback to mock data if API is not available
        setItems([
          { id: 1, name: "Item 1", description: "Description for Item 1" },
          { id: 2, name: "Item 2", description: "Description for Item 2" },
          { id: 3, name: "Item 3", description: "Description for Item 3" },
        ]);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservice Project</h1>
      </header>
      <main>
        <h2>Items List</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="items-container">
            {items.map(item => (
              <div className="item-card" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;