import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowPost from "../Posts/ShowPost";

const AlbumPosts = ({ albumId }) => {
  const [posts, setPosts] = useState([]);
  const [albumName, setAlbumName] = useState(""); // Store album name
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(false); // Toggle visibility

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`/api/posts/album/${albumId}`);
        setPosts(response.data.posts); // Store posts
        setAlbumName(response.data.album_name); // Store album name
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album data:", error);
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const togglePostsVisibility = () => {
    setShowPosts((prev) => !prev);
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      <h1 onClick={togglePostsVisibility} style={{ cursor: "pointer", color: "blue" }}>
        Posts in Album: {albumName || `Album ${albumId}`} {showPosts ? "↓" : "↑"}
      </h1>

      {showPosts && (
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.post_id}>
                <ShowPost postId={post.post_id} />
              </div>
            ))
          ) : (
            <p>No posts found for this album.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumPosts;