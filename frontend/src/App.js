import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would use axios to fetch from the backend
    // For now, we'll use mock data similar to our backend
    const fetchItems = async () => {
      try {
        // This would be replaced with actual API call:
        // const response = await axios.get('http://localhost:8000/api/items');
        // setItems(response.data);
        
        // Mock data for now
        setItems([
          { id: 1, name: "Item 1", description: "Description for Item 1" },
          { id: 2, name: "Item 2", description: "Description for Item 2" },
          { id: 3, name: "Item 3", description: "Description for Item 3" },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
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