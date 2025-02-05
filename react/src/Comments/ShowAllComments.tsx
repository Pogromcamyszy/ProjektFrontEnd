import React, { useEffect, useState } from "react";
import axios from "axios";
import GetComment from "./GetComment";
import CreateComment from "./CreateComment";

interface Comment {
  comment_id: number;
  user_nickname: string;
  text: string;
  isOwner: boolean;
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
          setComments(response.data);
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

  // Function to add new comment to the list
  const handleNewComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]); 
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <CreateComment postID={postID} onCommentAdded={handleNewComment} />
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <GetComment key={comment.comment_id} commentID={comment.comment_id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
