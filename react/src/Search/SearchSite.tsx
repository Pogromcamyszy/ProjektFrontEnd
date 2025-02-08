import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import ShowPost from "../Posts/ShowPost";
import ShowAlbum from "../Album/ShowAlbum";
import ProfileHead from "../Profile/ProfileHead";
import styles from "../styles/SearchSite.module.css"; 
import useRedirectLogout from "../Auth/RedirLogout";

const SearchSite = () => {

  useRedirectLogout();

  const { searchTerm } = useParams();
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState([]);
  const [postsByTitle, setPostsByTitle] = useState([]);
  const [albumsByName, setAlbumsByName] = useState([]);
  const [postByImg, setPostByImg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const userRequest = axios.get(`/api/search/users/${searchTerm}`)
        .then(response => response)
        .catch((err) => ({ data: [] }));

      const postsRequest = axios.get(`/api/search/posts/${searchTerm}`)
        .then(response => response)
        .catch((err) => ({ data: [] }));

      const pictureRequest = axios.get(`/api/search/pictureId/${searchTerm}`)
        .then(response => response)
        .catch((err) => ({ data: [] }));

      const albumsRequest = axios.get(`/api/search/albums/${searchTerm}`)
        .then(response => response)
        .catch((err) => ({ data: [] }));

      const [userResponse, postsResponse, albumsResponse, pictureResponse] = await Promise.all([
        userRequest,
        postsRequest,
        albumsRequest,
        pictureRequest,
      ]);

      setUserData(userResponse.data);
      setPostsByTitle(postsResponse.data);
      setAlbumsByName(albumsResponse.data);
      setPostByImg(pictureResponse.data);
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const handleProfileClick = (nickname) => {
    navigate(`/profile/${nickname}`);
  };

  if (loading) {
    return <p>Loading search results...</p>;
  }

  return (
    <div className={styles.searchResults}>
      <h1>Search Results</h1>

      <div>
        {userData.length > 0 ? (
          userData.map((user) => {
            const nickname = user;
            return (
              <div key={nickname} onClick={() => handleProfileClick(nickname)} style={{ cursor: 'pointer' }}>
                <ProfileHead nickname={nickname} />
              </div>
            );
          })
        ) : (
          <center><p>No users found.</p></center>
        )}
      </div>

      <div>
        {postsByTitle.length > 0 ? (
          postsByTitle.map((post) => (
            <ShowPost key={post} postId={post} />
          ))
        ) : (
          <center><p>No posts found.</p></center>
        )}
      </div>

      <div>
        {albumsByName.length > 0 ? (
          albumsByName.map((album) => (
            <ShowAlbum key={album} albumId={album} />
          ))
        ) : (
          <center><p>No albums found.</p></center>
        )}
      </div>

      <div>
        {postByImg.length > 0 ? (
          postByImg.map((post) => (
            <ShowPost key={post.post_id} postId={post.post_id} />
          ))
        ) : (
          <center><p>No posts with matching picture ID found.</p></center>
        )}
      </div>
    </div>
  );
};

export default SearchSite;
