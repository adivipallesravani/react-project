import React, { useState } from 'react';
import './Modal.css';

function Modal({ onClose, onAddGroup, existingGroups }) {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');
  const [error, setError] = useState('');

  const colors = ['#C39BD3', '#F1948A', '#7FB3D5', '#76D7C4', '#007bff'];

  const handleCreateGroup = () => {
    if (!groupName) {
      setError('Please enter a group name.');
      return;
    }
    if (!groupColor) {
      setError('Please select a color.');
      return;
    }

    // Check for duplicate group name
    const isDuplicate = existingGroups.some(group => group.name.toLowerCase() === groupName.toLowerCase());
    if (isDuplicate) {
      setError('This group name already exists. Please enter a new group name.');
      return;
    }
    

    // Add new group if no errors
    onAddGroup({ name: groupName, color: groupColor });
    setGroupName('');
    setGroupColor('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <h2 className="modal-title">Create New Group</h2>

        {/* Group Name Row */}
        <div className="input-row">
          <label htmlFor="groupName">Group Name</label>
          <input
            id="groupName"
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            autoComplete="off" 
          />
        </div>

        {/* Color Picker Row */}
        <div className="input-row">
          <label>Choose colour</label>
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-circle ${color === groupColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setGroupColor(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Create Button */}
        <button className="create-btn" onClick={handleCreateGroup}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Modal;
