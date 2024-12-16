import React, { useState, useEffect } from 'react';
import './styles/mypost.css';
import { useAuth } from '../store/Auth';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import Comment from './Comment';
import { HiDotsVertical } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import Reaction from './Reaction';
import { FaRegCommentAlt } from "react-icons/fa";

function Mypost() {
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
    const [visibleContent, setVisibleContent] = useState({});

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:5000/api/posts/myposts', { content: user }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error); 
        }
    };

    const handleContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = async (event) => {
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

                    fetchUserPosts();
                } catch (error) {
                    console.error('Error creating post:', error);
                }
            }
        }

        setPostContent('');
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

    const editPost = (id, content) => {
        setEditMode(true);
        setEditId(id);
        setPostContent(content); 
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const toggleOptions = (postId) => {
        setActivePostOptions((prev) => (prev === postId ? null : postId));
    };

    const toggleContentVisibility = (id) => {
        setVisibleContent((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredPosts = posts.filter((post) =>
        post.content.toLowerCase().includes(searchQuery)
    );


    const [commentCount, setCommentCount] = useState(0);


    const handleCommentCountUpdate = (postId, newCount) => {
        // Update local comment count
        setCommentCount(newCount);
       
    };


    return (
        <>
            <div className='my-posts'>
                <p className='write'>What's on your mind?</p>
                <p className='share'>Share your feelings with people & problems with people to get suggestions in tough times. All the posts will be anonymous</p>
                <div className='post-area'>
                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            value={postContent}
                            onChange={handleContentChange}
                            placeholder='Share your feelings...'
                            required
                        />
                        {isLoggedin ? (
                            <button className='submit' type='submit'>{editMode ? 'Save' : 'Share Post'}</button>
                        ) : (
                            <button className='redirect' onClick={() => { window.location.href = '/login'; }}>
                                Post
                            </button>
                        )}
                    </form>
                </div>

                <div className='newpost-container'>
                    <p>Your Posts</p>
                    <input
                        className='search-bar'
                        type='text'
                        placeholder='Search by content...'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div key={post._id}>
                                <div className="post-content-box">
                                    <div className="post-headings">
                                        <p className='author'>You</p> 
                                        <div className="edit-dlt-btns">
                                            {post.user === user._id && (
                                                <div className="post-btns">
                                                    <button className="more-options-btn" onClick={() => toggleOptions(post._id)}>
                                                        <HiDotsVertical />
                                                    </button>
                                                    {activePostOptions === post._id && (
                                                        <div className="options-dropdown">
                                                            <button className="edit" onClick={() => editPost(post._id, post.content)}>Edit</button>
                                                            <button onClick={() => requestDeletePost(post._id)}>Delete</button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="date">
                                        <p className='date'>{post.createdAt.slice(0, 10)} at {post.createdAt.slice(11, 16)}</p>
                                    </div>

                                    <div className="post-content-text">
                                        <p className="post-content">
                                            {visibleContent[post._id] ? post.content : post.content.slice(0, 150) + (post.content.length > 150 ? '...' : '')}
                                        </p>
                                        {post.content.length > 150 && (
                                            <span>
                                                <button onClick={() => toggleContentVisibility(post._id)} className="see-more-btn">
                                                    {visibleContent[post._id] ? 'See Less...' : 'See More...'}
                                                </button>
                                            </span>
                                        )}
                                    </div>

                                 
                                    <Comment
                                        postId={post._id}
                                        postAuthorId={post.user}
                                        
                                        onCommentCountUpdate={handleCommentCountUpdate}
                                    />


                                    <div className="link-react-cmnt">


                                    <div className="links-reacts">
                                        
                                        <NavLink to={`/post/${post._id}`} className="view-post-button">
                                           View Post
                                          </NavLink>
  
                                         <div className="react">
                                         <Reaction  postId={post._id} userId={user._id}/> 
                                         </div>
                                        </div>   
                                                                         
                                </div>

                                </div>           
                            </div>

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
        </>
    );
}

export default Mypost;





















