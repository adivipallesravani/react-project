import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLock } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedNote, setSelectedNote] = useState(''); // New state for the selected note
  const [notes, setNotes] = useState({});
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localStorage.clear();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedNote(''); // Clear selected note when switching groups
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note.text); // Set selected note text
  };

  const addNote = () => {
    if (inputText && selectedGroup) {
      const timestamp = new Date().toLocaleString();
      const newNote = { text: inputText, timestamp };

      const updatedNotes = {
        ...notes,
        [selectedGroup.name]: [...(notes[selectedGroup.name] || []), newNote],
      };

      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setInputText('');
    }
  };

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [groups, notes]);

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Pocket Notes</h1>
        <div className="groups-list">
          {groups.map((group, index) => (
            <div 
              key={index} 
              className={`group-item ${selectedGroup && selectedGroup.name === group.name ? 'selected' : ''}`}
              onClick={() => handleGroupSelect(group)}
            >
              <div className="group-color" style={{ backgroundColor: group.color }}>
                {group.name.slice(0, 2).toUpperCase()}
              </div>
              <span>{group.name}</span>
            </div>
          ))}
        </div>
        <button className="floating-create-group-btn" onClick={toggleModal}>
          +
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        {selectedGroup ? (
          <div className="selected-group">
            {/* Display selected group's notes */}
            <div className="top-section">
              <div className="group-header">
                <div className="group-color" style={{ backgroundColor: selectedGroup.color }}>
                  {selectedGroup.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 style={{ color: '#fff', margin: 0 }}>{selectedNote || selectedGroup.name}</h3>
              </div>
            </div>
            <div className="middle-section">
              {notes[selectedGroup.name] && notes[selectedGroup.name].map((note, index) => (
                <div 
                  key={index} 
                  className="note-item" 
                  onClick={() => handleNoteSelect(note)} // Set selected note on click
                >
                  <p>{note.text}</p>
                  <small>{note.timestamp}</small>
                </div>
              ))}
            </div>
            <div className="bottom-section">
              <div className="input-container">
                <textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={addNote} disabled={!inputText.trim()} className="arrow-button">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="illustration">
            <img src="image.png" alt="Illustration" style={{ width: '60%' }} />
            <h2>Pocket Notes</h2>
            <p>
              Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and
              1 mobile phone.
            </p>
            {!selectedNote && (
              <div className="encryption-info">
                <FontAwesomeIcon icon={faLock} />
                <span>end-to-end encrypted</span>
              </div>
            )}
          </div>
        )}
      </main>

      {showModal && <Modal onClose={toggleModal} onAddGroup={addGroup} existingGroups={groups} />}
    </div>
  );
}

export default App;
