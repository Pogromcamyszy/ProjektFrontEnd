import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./ShowPost"; // Import your Post component

interface UserPostsProps {
  userId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [postIds, setPostIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return; 
  
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getUserPosts/${userId}`, {
          withCredentials: true,
        });
  
        if (response.data && Array.isArray(response.data)) {
          setPostIds(response.data.map((post: { post_id: number }) => post.post_id));
        }
      } catch (err) {
        setError("Failed to fetch posts. :p");
        console.error("Error fetching user posts:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserPosts();
  }, [userId]);

  return (
    <>
    {loading ? ("Loading"):(<div>
        {postIds.map((postId) => (
          <Post key={postId} postId={postId} />
        ))}
      </div>)}
    </>
  );
};

export default UserPosts;