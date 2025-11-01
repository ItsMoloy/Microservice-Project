import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemDetail from './components/ItemDetail';
import './App.css';

// API base URL
const API_URL = 'http://localhost:8000';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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

  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleItemAdded = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };
  
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/items/${id}`);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again later.");
    }
  };
  
  const handleItemUpdated = (updatedItem) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setSelectedItem(updatedItem);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservice Project</h1>
      </header>
      <main>
        <ItemForm onItemAdded={handleItemAdded} />
        
        <h2>Items List</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="items-container">
            {items.map(item => (
              <div key={item.id} className="item-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-actions">
                  <button 
                    className="view-button" 
                    onClick={() => setSelectedItem(item)}
                  >
                    View Details
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {selectedItem && (
              <ItemDetail 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)}
                onItemUpdated={handleItemUpdated}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;