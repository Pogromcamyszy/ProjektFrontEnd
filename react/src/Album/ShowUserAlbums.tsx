import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowAlbum from "./ShowAlbum"; // Import the ShowAlbum component

const UserAlbums = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch albums for the given userId
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/api/albums/user/${userId}`);
        setAlbums(response.data); // Store albums
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [userId]); // Re-fetch when userId changes

  if (loading) {
    return <p>Loading albums...</p>;
  }

  return (
    <div>
      <div>
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.album_id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <ShowAlbum albumId={album.album_id} /> {/* Display album using ShowAlbum component */}
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
