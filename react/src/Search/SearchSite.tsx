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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const userRequest = axios.get(`/api/search/users/${searchTerm}`)
        .then(response => {
          console.log("User Data:", response.data);
          return response;
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          return { data: [] }; 
        });

      const postsRequest = axios.get(`/api/search/posts/${searchTerm}`)
        .then(response => {
          console.log("Posts Data:", response.data);
          return response;
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          return { data: [] }; 
        });

      const albumsRequest = axios.get(`/api/search/albums/${searchTerm}`)
        .then(response => {
          console.log("Albums Data:", response.data);
          return response;
        })
        .catch((err) => {
          console.error("Error fetching albums:", err);
          return { data: [] }; 
        });

      const [userResponse, postsResponse, albumsResponse] = await Promise.all([
        userRequest,
        postsRequest,
        albumsRequest,
      ]);

      setUserData(userResponse.data);
      setPostsByTitle(postsResponse.data);
      setAlbumsByName(albumsResponse.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleProfileClick = (nickname) => {
    // Navigate to the profile page 
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
        <div 
        key={nickname} 
        onClick={() => handleProfileClick(nickname)} 
        style={{ cursor: 'pointer' }}
        >

          <ProfileHead nickname={nickname} />
        </div>
      );
    })
  ) : (
    <p>No users found.</p>
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
    </div>
  );
};

export default SearchSite;
