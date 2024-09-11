import React, { useState } from "react";

import "../css/postview.css";
const PostView = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is an awesome post!",
      user: "Alice",
      likes: 5,
      replies: 2,
    },
    {
      id: 2,
      text: "Great insights, thanks for sharing!",
      user: "Bob",
      likes: 3,
      replies: 0,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    // Handle like functionality (add logic to increment likes)
  };

  const handleCommentLike = (id) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        user: "Current User",
        likes: 0,
        replies: 0,
      };
      setComments([...comments, newCommentObj]);
      setNewComment(""); // Reset the input field
    }
  };

  return (
    <div className="post-view-container">
      <div className="post-view full-screen">
        {/* Post Header */}
        <div className="post-header">
          <img
            src="https://via.placeholder.com/50"
            alt="Poster Avatar"
            className="poster-avatar"
          />
          <div className="poster-info">
            <h1>Lorem Ipsum Title</h1>
            <p>Posted by John Doe</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="post-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Likes Section */}
        <div className="post-likes">
          <button onClick={handleLike}>Like</button>
          <span>120 Likes</span>
        </div>

        {/* Comments Section */}
        <div className="post-comments">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p>{comment.text}</p>
                <small>- {comment.user}</small>
                <div className="comment-actions">
                  <button onClick={() => handleCommentLike(comment.id)}>
                    Like
                  </button>
                  <span>{comment.likes} Likes</span>
                  <span>{comment.replies} Replies</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostView;
