import React, { useState } from "react";
import styles from "../styles/comment.module.css"; 
import axios from "axios";

interface CommentInputProps {
  onAddComment: (comment: string) => void;
}

const CreateComment = (props) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (comment.trim() === "") return;
    console.log(props.postID);
    console.log(comment);
    try {
      const response = await axios.post("http://localhost:3000/api/addComment", {
        postId: props.postID, 
        content: comment, 
      }, {
        withCredentials: true, 
      });

      if (response.status === 201) {
        console.log("Comment added:", response.data);
        
      
        setComment("");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className={styles.commentContainer}>
      <input
        type="text"
        className={styles.commentInput}
        placeholder="Write a comment..."
        value={comment}
        maxLength={45}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={styles.commentButton} onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default CreateComment;