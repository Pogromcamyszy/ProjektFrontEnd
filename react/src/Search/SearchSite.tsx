import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/SearchSite.module.css"; // Ensure this file exists for styling

const SearchSite = () => {
  const { searchTerm } = useParams();

  const [userData, setUserData] = useState([]);
  const [postsByTitle, setPostsByTitle] = useState([]);
  const [albumsByName, setAlbumsByName] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(`/api/search/users/${searchTerm}`);
        console.log("User Data:", userResponse.data); // Log response data
        setUserData(userResponse.data); // Store user data

        const postsResponse = await axios.get(`/api/search/posts/${searchTerm}`);
        console.log("Posts Data:", postsResponse.data); // Log response data
        setPostsByTitle(postsResponse.data); // Store posts by title

        const albumsResponse = await axios.get(`/api/search/albums/${searchTerm}`);
        console.log("Albums Data:", albumsResponse.data); // Log response data
        setAlbumsByName(albumsResponse.data); // Store albums by name
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return <p>Loading search results...</p>;
  }

  return (<h1>dsadsa</h1>);
};

export default SearchSite;