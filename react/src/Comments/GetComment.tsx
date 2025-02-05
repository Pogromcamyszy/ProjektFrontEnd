import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/comment.module.css";

interface Comment {
  comment_id: number;
  user_nickname: string;
  text: string;
  isOwner: boolean;
}

interface LatestCommentProps {
  commentID: number;
}

const GetComment: React.FC<LatestCommentProps> = ({ commentID }) => {
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getComment/${commentID}`,
          { withCredentials: true }
        );

        if (response.data) {
          setComment(response.data);
        }
      } catch (err) {
        setError("Failed to fetch comment.");
        console.error("Error fetching comment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [commentID]);

  const handleDelete = async () => {
    if (!comment) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteComment/${comment.comment_id}`, {
        withCredentials: true,
      });

      setDeleted(true);
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete comment.");
    }
  };

  if (loading) return <p>Loading latest comment...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (deleted) return <p>Comment deleted.</p>;
  if (!comment) return <p>Comment not found.</p>;

  return (
    <div className={styles.commentContainer}>
      <strong>{comment.user_nickname}</strong>: {comment.text}
      {comment.isOwner && (
        <button className={styles.deleteCommentButton} onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default GetComment;
