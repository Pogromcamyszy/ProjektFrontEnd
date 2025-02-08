import { useState, useEffect } from "react";
import axios from "axios";
import ShowPost from "../Posts/ShowPost.tsx"; 
import useRedirectLogout from "../Auth/RedirLogout.tsx";

export default function HomePage() {

  useRedirectLogout();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getfeed"); 
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setPosts(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {posts.length === 0 && !loading && <p>No posts available.</p>}
      {posts.map((post) => (
        <ShowPost key={post.id} postId={post} />
      ))}
    </div>
  );
}
