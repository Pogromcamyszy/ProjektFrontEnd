import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Post.module.css";

function Post(props) {
  const postID = props.postId;

  const [postInfo, setPostInfo] = useState(null);

  const getPostInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/getPostInfo/${postID}`, {
        withCredentials: true,
      });

      // Destructure the data
      const { user_nickname, post_description, post_img } = result.data;

      // Set the post information
      setPostInfo({
        userNickname: user_nickname,
        description: post_description,
        image: post_img,
      });
    } catch (error) {
      console.error("Error fetching post info:", error);
    }
  };

  useEffect(() => {
    if (postID) {
      getPostInfo();
    }
  }, [postID]);

  // If postInfo is null, show a loading message
  if (!postInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.postContainer}>
      <p className={styles.userNickname}>Posted by: {postInfo.userNickname}</p>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3000/${postInfo.image}`} // Ensure this path works for your server
          alt="Post"
          className={styles.postImage}
        />
      </div>
      <div className={styles.textContent}>
        <p className={styles.postDescription}>{postInfo.description}</p>
      </div>
    </div>
  );
}

export default Post;
