import React, { useState, useEffect } from 'react';
import './styles/note.css';
import { useAuth } from '../store/Auth';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import Navbar from './Navbar';
import Footer from './Footer';
import StreakTracker from './StreakTracker';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteHeading, setNoteHeading] = useState('');
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { user, isLoggedin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');

  //Fetching notes

  useEffect(() => {
    fetchNotes();
  }, []);


  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleHeadingChange = (event) => {
    setNoteHeading(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Create & Edit notes

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedin) {
      setShouldRedirect(true);
      return;
    }

    if (shouldRedirect) {
      window.location.href = '/login';
      return null;
    }

    const token = localStorage.getItem('token');

    if (editMode && editId !== null) {
      try {
        const response = await axios.put(`http://localhost:5000/api/notes/${editId}`, {
          heading: noteHeading,
          content: noteText,
          name,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedNotes = notes.map((note) => {
          if (note._id === editId) {
            return {
              ...note,
              heading: noteHeading,
              content: noteText,
              name,
            };
          }
          return note;
        });

        setNotes(updatedNotes);
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    } else {
      if (noteText.trim() !== '' && noteHeading.trim() !== '') {
        try {
          const response = await axios.post('http://localhost:5000/api/notes', {
            heading: noteHeading,
            content: noteText,
            name,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          fetchNotes();
        } catch (error) {
          console.error('Error creating note:', error);
        }
      }
    }

    setNoteText('');
    setNoteHeading('');
    setName('');
  };

  //Delete notes with confirmation

  const requestDeleteNote = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteNote = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${deleteId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const updatedNotes = notes.filter((note) => note._id !== deleteId);
        setNotes(updatedNotes);
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const cancelDeleteNote = () => {
    setShowConfirmModal(false);
  };

  const editNote = (id, heading, content, author) => {
    setEditMode(true);
    setEditId(id);
    setNoteHeading(heading);
    setNoteText(content);
    setName(author);
  };

  //Note after update

  const handleNoteUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${id}`, updatedData);
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  //Search note

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchQuery) || note.content.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Navbar />

      <div className="note-sec">

      {isLoggedin ? (
        <h3><span className='username'>{user.username} ,</span> Unburden your heart, write down your pains in this sacred space, where your secrets are safe from the world with your personalized digital diary 🔏</h3>
      ) : (
        <h3>Unburden your heart, write down your pains in this sacred space, where your secrets are safe from the world with your personalized digital diary 🔏</h3>
      )}


      <div className="note-cards">
          
          <div className="note-card">
           <div className="card-title">Write from anywhere</div>
           <p>Your privacy is sacred, write diary from anywhere</p>
          </div>
 
 
          <div className="note-card">
           <div className="card-title">Stick it </div>
           <p>Dig your secrets through this diary</p>
          </div>
 
          <div className="note-card">
           <div className="card-title">Find Faster </div>
           <p>Find any notes through searching faster</p>
          </div>
           
           
         </div> 

      </div>


      <div className='notes'>
       

        <div className="note-headline">
        <h4 className='write'>  <span>Write your thoughts</span> </h4>
        </div>

        <div className="streaks">
          <StreakTracker/>
        </div>

        <div className='note-area'>
          <form onSubmit={handleNoteSubmit}>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              placeholder='Enter title...'
            />
            <input
              type='date'
              value={noteHeading}
              onChange={handleHeadingChange}
              placeholder='Enter date...'
            />
            <textarea
              value={noteText}
              onChange={handleNoteChange}
              placeholder='Write your feelings...'
            />
            {!isLoggedin && (
              <button className='note-redirect' onClick={() => { window.location.href = '/login'; }}>
                Add Note
              </button>
            )}
            {isLoggedin && (
              <button className='note-submit' type='submit'>{editMode ? 'Save' : 'Add Note'}</button>
            )}
          </form>
        </div>

        {/* Seach Notes */}

        <div className='newnote-container'>
          <h3>{filteredNotes.length > 0 ? 'Your notes' : 'Write your first note'}</h3>
          <input
            className='search-bar'
            type='text'
            placeholder='Search by title or content...'
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note._id}>
                <div className="post">
                  <p className='poster'>Incident title: {note.name}</p>
                  <p>Date: {note.heading}</p>
                </div>

                <div className="content-box">
                  <p className='content'>{note.content}</p>
                </div>

                {isLoggedin && (
                  <div className='note-btns'>
                    <button className='edit' onClick={() => editNote(note._id, note.heading, note.content, note.name)}>Edit</button>
                    <button onClick={() => requestDeleteNote(note._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No notes found</p>
          )}
        </div>

        <ConfirmModal
          show={showConfirmModal}
          message="Are you sure you want to delete this note?"
          onConfirm={confirmDeleteNote}
          onCancel={cancelDeleteNote}
        />
      </div>

      <Footer />
    </>
  );
}

export default Notes;
