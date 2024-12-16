import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";
import { FaRegCommentAlt } from "react-icons/fa";
import Comment from './Comment';
import './styles/post.css'
import Reaction from './Reaction';
import { IoMdShareAlt } from "react-icons/io";

function Post({ post, activePostOptions, toggleOptions, editPost, requestDeletePost, user, isLoggedin }) {

  const [isFullVisible, setIsFullVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(0); 

  // Callback to update comment count
  const handleCommentCountUpdate = (newCount) => {
    setCommentCount(newCount);
  };


  //Date of post creation

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear();
  
    return `${day} ${month}, ${year}`;
  };



 //How much time ago post was created

  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now - postDate;
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };
  


  return (

    // Post content edit delete button

    <div key={post._id}>
      <div className="post-content-box">
        <div className="post-headings">
          <p className='author'>Anonymous Author</p>
          {/* <p className='author'>{post.user.username}</p>  */}
          <div className="edit-dlt-btns">
            {post.user._id === user._id && isLoggedin && (
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
         <p className='date'> {formatDate(post.createdAt)} at {post.createdAt.slice(11, 16)}</p>
          <p className='date'>{timeAgo(post.createdAt)}</p>
        </div>

        <div className="post-content-text">
          <p className="post-content">
            {isFullVisible ? post.content : post.content.slice(0, 150) + (post.content.length > 150 ? '...' : '')}
          </p>
          {post.content.length > 150 && (
            <span>
              <button onClick={() => setIsFullVisible(!isFullVisible)} className="see-more-btn">
                {isFullVisible ? 'See Less...' : 'See More...'}
              </button>
            </span>
          )}
        </div>


        {/* Post comment, react, view link */}

         
        <Comment postId={post._id} postAuthorId={post.user._id} onCommentCountUpdate={handleCommentCountUpdate} />

        <div className="post-details">
          
          <div className="link-react">

          <NavLink to={`/post/${post._id}`} className="view-post-button">
            View Post
          </NavLink>

          <div className="reactions">
          <Reaction postId={post._id} userId={user._id} />
          </div>

       
          </div>
          <div className="total-cmnts">
           <FaRegCommentAlt size={20}/>
           <h4> {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</h4>
        
           </div>
        
        </div>
      </div>
    </div>
  );
}

export default Post;







