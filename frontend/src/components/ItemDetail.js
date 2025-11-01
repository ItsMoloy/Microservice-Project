import React, { useState } from 'react';
import axios from 'axios';
import './ItemDetail.css';

const API_URL = 'http://localhost:8000';

function ItemDetail({ item, onClose, onItemUpdated }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description || '');
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/items/${item.id}`, {
        name,
        description
      });
      
      setEditMode(false);
      onItemUpdated(response.data);
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item. Please try again.");
    }
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>{editMode ? 'Edit Item' : 'Item Details'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {editMode ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="button-group">
              <button onClick={() => setEditMode(false)}>Cancel</button>
              <button onClick={handleUpdate} className="primary-button">Save</button>
            </div>
          </div>
        ) : (
          <div className="item-details">
            <div className="detail-row">
              <strong>ID:</strong> {item.id}
            </div>
            <div className="detail-row">
              <strong>Name:</strong> {item.name}
            </div>
            <div className="detail-row">
              <strong>Description:</strong> {item.description || 'No description provided'}
            </div>
            
            <button 
              onClick={() => setEditMode(true)} 
              className="edit-button"
            >
              Edit Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;