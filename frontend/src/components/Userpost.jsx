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
import { FaThList, FaThLarge } from 'react-icons/fa'; // Icons for view toggle

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
  const [viewMode, setViewMode] = useState('list'); // New state for view mode
  const [sortOption, setSortOption] = useState('newest'); // State for sorting
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isLoading, setIsLoading] = useState(false);

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

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortPosts = (posts) => {
    const now = new Date();
    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 7);

    if (sortOption === 'newest') {
      return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortOption === 'oldest') {
      return [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (sortOption === 'last7days') {
      return posts.filter((post) => new Date(post.createdAt) >= last7Days);
    }
    return posts;
  };

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
    setIsLoading(true);

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
          setShowmsg({ message: "Post created successfully!", type: "success" });
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }
    }
    setIsLoading(false);
    setPostContent('');
    setShowModal(false); // Close the modal after submitting
  };

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

  const openModal = (content = '', id = null) => {
    setEditMode(!!id);
    setEditId(id);
    setPostContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPostContent('');
    setEditMode(false);
    setEditId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPosts = sortPosts(posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery)
  ));

  const toggleOptions = (postId) => {
    setActivePostOptions((prev) => (prev === postId ? null : postId));
  };

  return (
    <>
      <Navbar />
      <div className='posts'>
        <Showmsg 
          message={showmsg.message} 
          type={showmsg.type} 
          onClose={() => setShowmsg({ message: "", type: "" })} 
        />

        <p className="post-headline">
          <span className="post__row">
            <span className="post__text">What's on your mind? </span>
          </span>
          
        </p>

        <p className='share'>Share your feelings & problems with people to get suggestions in tough times. All the posts will be anonymous</p>

  
        <textarea 
          className="open-modal-btn" 
          onClick={() => openModal()}
          placeholder={isLoggedin ? `Share your feelings, ${user.username}...` : "Share your feelings..."}
          readOnly
        />

        {showModal && (
          <div className="post-modal">
            <div className="post-modal-content">
              <button className="close-modal-btn" onClick={closeModal}>x</button>
              <form onSubmit={handlePostSubmit}>
              {isLoggedin ? ` ${user.username}'s post` : ""}
                <textarea
                  value={postContent}
                  onChange={handleContentChange}
                  placeholder="Share your feelings..."
                  required
                />
                {/* <button type="submit">{editMode ? 'Save Changes' : 'Share Post'}</button> */}
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Posting...' : editMode ? 'Save Changes' : 'Share Post'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className='newpost-container'>
          <p>Posts made by People</p>
          <input
            className='search-bar'
            type='text'
            placeholder='Search by content...'
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="view-toggle">
            <button onClick={() => handleViewModeChange('list')} className={viewMode === 'list' ? 'active' : ''}>
              <FaThList /> List View
            </button>
            <button onClick={() => handleViewModeChange('grid')} className={viewMode === 'grid' ? 'active' : ''}>
              <FaThLarge /> Grid View
            </button>

            <div className="sort-select">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="last7days">Posts from Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className={`posts-display ${viewMode}`}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  activePostOptions={activePostOptions}
                  toggleOptions={toggleOptions}
                  editPost={(id, content) => openModal(content, id)}
                  requestDeletePost={requestDeletePost}
                  user={user}
                  isLoggedin={isLoggedin}
                />
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
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
