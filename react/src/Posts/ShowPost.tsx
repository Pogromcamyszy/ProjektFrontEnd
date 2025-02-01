import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Post.module.css";
import CreateComment from "../Comments/CreateComment.tsx";
import ShowAllComments from "../Comments/ShowAllComments.tsx";

function Post(props) {
  const postID = props.postId;

  const [postInfo, setPostInfo] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const getPostInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/getPostInfo/${postID}`, {
        withCredentials: true,
      });

      // Destructure the data
      const { user_nickname, post_description, post_img, post_id } = result.data;

      // Set the post information
      setPostInfo({
        userNickname: user_nickname,
        description: post_description,
        image: post_img,
        postID: post_id,
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

  // If postInfo is null, show a loading message
  if (!postInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
        {loading ? (
          <>
            <CreateComment postID={postInfo.postID} />
            <ShowAllComments postID={postInfo.postID} />
          </>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
}

export default Post;