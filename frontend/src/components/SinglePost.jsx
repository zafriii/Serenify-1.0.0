import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import ConfirmModal from './ConfirmModal';
import { HiDotsVertical } from 'react-icons/hi';
import './styles/singlepost.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Comment from './Comment';
import Reaction from './Reaction';
import { FaRegCommentAlt } from "react-icons/fa";

const SinglePost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [postContent, setPostContent] = useState(''); 
    const [showConfirmModal, setShowConfirmModal] = useState(false); // For delete confirmation modal
    const [activePostOptions, setActivePostOptions] = useState(false); // For dropdown toggling
    const { user } = useAuth(); 
    const navigate = useNavigate();

    // Fetch the single post by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data);
                setPostContent(response.data.content); // Set post content for editing
            } catch (error) {
                setError('Error fetching post');
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    // Handle post content change for editing
    const handleContentChange = (event) => {
        setPostContent(event.target.value);
    };

    // Submit edited post
    const handlePostEdit = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/posts/${id}`, { content: postContent }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditMode(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    // Request to delete the post
    const requestDeletePost = () => {
        setShowConfirmModal(true);
    };

    // Confirm and delete the post
    const confirmDeletePost = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowConfirmModal(false);
            navigate('/myposts'); // Redirect to the posts page after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const cancelDeletePost = () => {
        setShowConfirmModal(false);
    };

    // Toggle the visibility of options dropdown
    const toggleOptions = () => {
        setActivePostOptions((prev) => !prev);
    };



 // State for comment count


    const [commentCount, setCommentCount] = useState(0);

    const handleCommentCountUpdate = (newCount) => {
        setCommentCount(newCount);
      };


    if (loading) return <p className='post-loading'>Loading...</p>;
    if (error) return <p>{error}</p>;

    

    return (
        <>
            <Navbar />
            <div className="single-post">
                <div className="post-header">
                    <h2>Post Details</h2>
                    {post.user === user._id && !editMode && (
                        <div className="edit-dlt-btns">
                            <button
                                className="more-options-btn"
                                onClick={toggleOptions}
                            >
                                <HiDotsVertical />
                            </button>
                            {activePostOptions && (
                                <div className="single-options-dropdown">
                                    <button onClick={() => setEditMode(true)} className="edit-bttn">Edit</button>
                                    <button onClick={requestDeletePost} className="delete-btn">Delete</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <p><strong></strong> {post.user === user._id ? 'You' : 'Anonymous Author'}</p>
                <p><strong></strong> {post.createdAt.slice(0, 10)} at {post.createdAt.slice(11, 16)}</p>

               
                {editMode ? (
                    <>
                        <textarea 
                            value={postContent} 
                            onChange={handleContentChange} 
                            className="edit-post-textarea" 
                        />
                        <button onClick={handlePostEdit} className="save-btn">Save</button>
                        <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
                    </>
                ) : (
                    <p><strong></strong> {post.content}</p>
                )}



                {/* Comments Section */}
                <Comment
                    postId={id}
                    postAuthorId={post.user}
                    onCommentCountUpdate={handleCommentCountUpdate}
                />


                        <div className="cmnt-react">

                        <div className="react">
                            <Reaction postId={post._id} userId={user._id}/>
                        </div>

                        <div className="total-cmnts">
                        <FaRegCommentAlt size={20}/>
                        <h4> {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</h4>
                        </div>

                        </div>

                {/* Delete confirmation modal */}
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
};

export default SinglePost;
