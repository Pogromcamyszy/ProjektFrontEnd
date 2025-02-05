import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Post.module.css";
import CreateComment from "../Comments/CreateComment.tsx";
import ShowAllComments from "../Comments/ShowAllComments.tsx";

function Post(props) {
  const postID = props.postId;

  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch post information
  const getPostInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/getPostInfo/${postID}`, {
        withCredentials: true,
      });

      // Destructure the data
      const { user_nickname, post_description, post_img, post_id, user_id, currentUserId } = result.data;

      // Set the post information
      setPostInfo({
        userNickname: user_nickname,
        description: post_description,
        image: post_img,
        postID: post_id,
        userId: user_id,
        currentUserId: currentUserId,
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

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/deletePost/${postID}`, {
        withCredentials: true,
      });

      setPostInfo(null);  // Optionally, redirect or handle UI after deleting
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!postInfo) {
    return "";
  }

console.log(postInfo.currentUserId);
console.log(postInfo.userId);
console.log(postInfo.currentUserId === postInfo.userId);

  return (
    <div className={styles.postContainer}>
      <p className={styles.userNickname}>Posted by: {postInfo.userNickname}</p>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3000/${postInfo.image}`} 
          alt="Post"
          className={styles.postImage}
        />
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