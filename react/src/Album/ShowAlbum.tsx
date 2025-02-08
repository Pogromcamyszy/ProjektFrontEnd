import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowPost from "../Posts/ShowPost";
import styles from "../styles/AlbumPosts.module.css"; 

const AlbumPosts = ({ albumId }) => {
  const [posts, setPosts] = useState([]);
  const [albumName, setAlbumName] = useState(""); 
  const [userNickname, setUserNickname] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(false); 

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`/api/posts/album/${albumId}`);
        setPosts(response.data.posts); 
        setAlbumName(response.data.album_name); 
        setUserNickname(response.data.posts[0]?.user_nickname || "Unknown"); 
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
    <div className={styles.albumPostsContainer}>
      <h1 onClick={togglePostsVisibility}>
        Posts in Album: {albumName || `Album ${albumId}`} by {userNickname}{" "}
        {showPosts ? "↓" : "↑"}
      </h1>

      {showPosts && (
        <div className={styles.postsWrapper}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className={styles.postItem} key={post.post_id}>
                <ShowPost postId={post.post_id} />
              </div>
            ))
          ) : (
            <p className={styles.noPostsMessage}>No posts found for this album.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumPosts;
