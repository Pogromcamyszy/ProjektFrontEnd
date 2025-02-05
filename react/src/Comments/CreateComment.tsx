import React, { useState } from "react";
import styles from "../styles/comment.module.css";
import axios from "axios";

interface CreateCommentProps {
  postID: number;
  onCommentAdded: (newComment: Comment) => void;
}

interface Comment {
  comment_id: number;
  user_nickname: string;
  text: string;
  isOwner: boolean;
}

const CreateComment: React.FC<CreateCommentProps> = ({ postID, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (comment.trim() === "") return;
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/addComment",
        { postId: postID, content: comment },
        { withCredentials: true }
      );
      console.log(response.data.comment_id);
      if (response.data.comment_id) {
        console.log("Comment added:", response.data);
  
        const newComment: Comment = {
          comment_id: response.data.comment_id, 
          user_nickname: response.data.user_nickname || "Unknown", 
          text: comment,
          isOwner: true,
        };
  
        onCommentAdded(newComment);
        setComment("");
      } else {
        console.error("Invalid response format:", response.data);
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