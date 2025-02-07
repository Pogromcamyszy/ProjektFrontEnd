import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Post.module.css";
import CreateComment from "../Comments/CreateComment.tsx";
import ShowAllComments from "../Comments/ShowAllComments.tsx";

function Post(props) {
  const postID = props.postId;

  const [postInfo, setPostInfo] = useState<any>(null); // Using 'any' type for now, but could be more specific
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch post information
  const getPostInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/getPostInfo/${postID}`, {
        withCredentials: true,
      });

      // Destructure the data to get album_name and other info
      const { 
        user_nickname, 
        post_description, 
        post_img, 
        post_id, 
        user_id, 
        currentUserId, 
        album_name 
      } = result.data;

      // Set the post information including album_name
      setPostInfo({
        userNickname: user_nickname,
        description: post_description,
        image: post_img,
        postID: post_id,
        userId: user_id,
        currentUserId: currentUserId,
        albumName: album_name,  // Save album name to the state
      });
    } catch (error) {
      console.error("Error fetching post info:", error);
    }
  };

  useEffect(() => {
    if (postID) {
      getPostInfo();
      setLoading(true);
    }
  }, [postID]);

  // Delete post
  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/deletePost/${postID}`, {
        withCredentials: true,
      });

      setPostInfo(null); // Optionally, handle UI after deleting
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!postInfo) {
    return " ";
  }

  return (
    <div className={styles.postContainer}>
      {/* Display author's nickname */}
      <p className={styles.userNickname}>Posted by: {postInfo.userNickname}</p>

      {/* Display album name if it exists */}
      {postInfo.albumName && (
        <p className={styles.albumName}>Album: {postInfo.albumName}</p>
      )}

      {/* Post image */}
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3000/${postInfo.image}`} 
          alt="Post"
          className={styles.postImage}
        />
      </div>

      {/* Post description */}
      <div className={styles.textContent}>
        <p className={styles.postDescription}>{postInfo.description}</p>
      </div>

      {/* Comments section */}
      {loading ? (
        <>
          <ShowAllComments postID={postInfo.postID} />
          {postInfo.currentUserId === postInfo.userId && (
            <button onClick={deletePost} className={styles.deleteButton}>
              Delete Post
            </button>
          )}
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default Post;
