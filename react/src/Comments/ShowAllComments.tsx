import React, { useEffect, useState } from "react";
import axios from "axios";
import GetComment from "./GetComment"; // Import the GetComment component

interface Comment {
  comment_id: number;
}

interface CommentsListProps {
  postID: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ postID }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postID) {
      setError("Post ID is undefined or invalid.");
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getCommentsForPost/${postID}`);
        if (response.data && Array.isArray(response.data)) {
          setComments(response.data); // Assuming response.data is an array of comments
        }
      } catch (err) {
        setError("Failed to fetch comments.");
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postID]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {loading ? (
        "Loading comments..."
      ) : (
        <div>
          {comments.map((comment) => (
            <GetComment key={comment.comment_id} commentID={comment.comment_id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentsList;