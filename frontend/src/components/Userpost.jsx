import React, { useState, useEffect } from 'react';
import './styles/post.css'; 
import { useAuth } from '../store/Auth';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import Navbar from './Navbar';
import Footer from './Footer';
import Post from './Post'; 
import { GiNothingToSay } from "react-icons/gi";
import Showmsg from './Showmsg';  

function Userpost() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { user, isLoggedin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostOptions, setActivePostOptions] = useState(null);
  const [showmsg, setShowmsg] = useState({ message: "", type: "" }); 

  // Fetching Posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  // Create & Edit posts
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedin) {
      setShouldRedirect(true);
      return;
    }
    if (shouldRedirect) {
      window.location.href = '/login';
      return;
    }

    const token = localStorage.getItem('token');

    if (editMode && editId !== null) {
      try {
        await axios.put(`http://localhost:5000/api/posts/${editId}`, {
          content: postContent,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedPosts = posts.map((post) => {
          if (post._id === editId) {
            return { ...post, content: postContent };
          }
          return post;
        });

        setPosts(updatedPosts);
        setEditMode(false);
        setEditId(null);
        // Show success message
        setShowmsg({ message: "Post updated successfully!", type: "success" });
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      if (postContent.trim() !== '') {
        try {
          await axios.post('http://localhost:5000/api/posts', {
            content: postContent,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchPosts();
          // Show success message
          setShowmsg({ message: "Post created successfully!", type: "success" });
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }
    }

    setPostContent('');
  };

  // Delete posts with confirmation
  const requestDeletePost = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDeletePost = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${deleteId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const updatedPosts = posts.filter((post) => post._id !== deleteId);
        setPosts(updatedPosts);
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const cancelDeletePost = () => {
    setShowConfirmModal(false);
  };

  // Posts after update
  const editPost = (id, content) => {
    setEditMode(true);
    setEditId(id);
    setPostContent(content);
  };

  // Search Posts
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery)
  );

  const toggleOptions = (postId) => {
    setActivePostOptions((prev) => (prev === postId ? null : postId));
  };

  return (
    <>
      <Navbar />
      <div className='posts'>
        
        {/* Showmsg Component */}
        <Showmsg 
          message={showmsg.message} 
          type={showmsg.type} 
          onClose={() => setShowmsg({ message: "", type: "" })} 
        />

        <p className="post-headline">
          <span className="post__row">
            <span className="post__text">What's on your mind? </span>
          </span>
          <GiNothingToSay />
        </p>

        <p className='share'>Share your feelings & problems with people to get suggestions in tough times. All the posts will be anonymous</p>

        <div className='post-area'>
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={postContent}
              onChange={handleContentChange}
              placeholder={isLoggedin ? `Share your feelings, ${user.username}...` : "Share your feelings..."} 
              required
            />
            {isLoggedin ? (
              <button className='submit' type='submit'>{editMode ? 'Save' : 'Share Post'}</button>
            ) : (
              <button className='redirect' onClick={() => { window.location.href = '/login'; }}>
                Share Post
              </button>
            )}
          </form>
        </div>

        <div className='newpost-container'>
          <p>Posts made by People</p>
          <input
            className='search-bar'
            type='text'
            placeholder='Search by content...'
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                activePostOptions={activePostOptions}
                toggleOptions={toggleOptions}
                editPost={editPost}
                requestDeletePost={requestDeletePost}
                user={user}
                isLoggedin={isLoggedin}
              />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>

        <ConfirmModal
          show={showConfirmModal}
          message="Are you sure you want to delete this post?"
          onConfirm={confirmDeletePost}
          onCancel={cancelDeletePost}
        />
      </div>

      <Footer />
    </>
  );
}

export default Userpost;
