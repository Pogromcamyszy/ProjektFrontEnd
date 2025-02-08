import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Post.module.css";
import ShowAllComments from "../Comments/ShowAllComments.tsx";

function Post(props) {
  const postID = props.postId;

  const [postInfo, setPostInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch post information
  const getPostInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/getPostInfo/${postID}`, {
        withCredentials: true,
      });

      const { 
        user_nickname, 
        post_description, 
        post_img, 
        post_id, 
        title,
        user_id, 
        currentUserId, 
        album_name 
      } = result.data;

      const picture_id = post_img.replace(/^uploads[\\/]/, '').replace(/\.[^/.]+$/, '');

      setPostInfo({
        userNickname: user_nickname,
        description: post_description,
        image: post_img,
        postID: post_id,
        userId: user_id,
        currentUserId: currentUserId,
        albumName: album_name,
        title: title,  
        picture_id: picture_id,
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

      setPostInfo(null); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!postInfo) {
    return " ";
  }

  return (
    <div className={styles.postContainer}>
      <p className={styles.userNickname}>Posted by: {postInfo.userNickname}</p>

      {/* Display album name */}
      {postInfo.albumName && (
        <p className={styles.albumName}>Album: {postInfo.albumName}</p>
      )}

      {/* Display title under album name */}
      {postInfo.title && (
        <p>Title: {postInfo.title}</p>
      )}

      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3000/${postInfo.image}`} 
          alt="Post"
          className={styles.postImage}
        />
      </div>
      <div>
         <u><p>Picture number: {postInfo.picture_id}</p></u>
      </div>
      <div className={styles.textContent}>
        <p className={styles.postDescription}>{postInfo.description}</p>
      </div>

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
