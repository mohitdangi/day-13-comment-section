import React, { useState } from "react";
import "./App.css";

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleInputChange = (event) => {
    setNewReply(event.target.value);
  };
  const addReply = () => {
    if (newReply.trim() !== "") {
      setReplies([...replies, { text: newReply, replies: [] }]);
    }
  };

  const renderReplies = (replies) => {
    return (
      <ul>
        {replies.map((reply, index) => (
          <li key={index}>
            <Comment comment={reply} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="comment">
      <div className="comment-content">
        <p> {comment.text}</p>
        {replies.length > 0 && (
          <button onClick={toggleReplies}>
            {showReplies ? "hide replies" : "show replies"}
          </button>
        )}
        {showReplies && renderReplies(replies)}
        <div>
          <input
            type="text"
            value={newReply}
            onChange={handleInputChange}
            placeholder="Add a reply"
          />
          <button onClick={addReply}>Reply</button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments }) => {
  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [comments] = useState([
    {
      text: "This is a top-level comment.",
      replies: [
        {
          text: "This is a reply to the top-level comment.",
          replies: [{ text: "Nested reply", replies: [] }],
        },
      ],
    },
    {
      text: "Another top-level comment.",
    },
  ]);

  return (
    <div>
      <h1>Post</h1>
      <p>Post content goes here...</p>
      <CommentSection comments={comments} />
    </div>
  );
};

export default App;
