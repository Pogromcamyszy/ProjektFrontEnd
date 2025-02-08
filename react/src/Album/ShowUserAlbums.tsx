import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowAlbum from "./ShowAlbum"; 

const UserAlbums = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/api/albums/user/${userId}`);
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [userId]); 

  if (loading) {
    return <p>Loading albums...</p>;
  }

  return (
    <div>
      <div>
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.album_id}>
              <ShowAlbum albumId={album.album_id} /> 
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default UserAlbums;
