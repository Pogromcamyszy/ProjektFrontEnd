import React, { useState, useEffect } from "react";
import styles from "../styles/PostCreate.module.css"; // Import the CSS module
import useRedirectLogout from "../Auth/RedirLogout";

export default function PostCreate() {
  useRedirectLogout();

  const [image, setImage] = useState<File | null>(null); // For storing the image file
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>(""); // For storing title
  const [preview, setPreview] = useState<string | null>(null); // For previewing the image
  const [albums, setAlbums] = useState<{ album_id: number, album_name: string }[]>([]); // For storing albums
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null); // For storing the selected album id
  const [newAlbum, setNewAlbum] = useState<string>(""); // For storing a new album name
  const [albumExist,setAlbumExist] = useState<boolean>(false);

  // Fetch existing albums for the select dropdown
  const fetchAlbums = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getAlbums", {
        method: "GET",
        credentials: "include", // Include credentials for the current session
      });
      const data = await response.json();
      if(response.status == 200){
        setAlbums(data);
        setAlbumExist(true);
      }
    } catch (err) {
      console.error("Error fetching albums:", err);    
      setAlbums([]);
    }
  };

  useEffect(() => {
    fetchAlbums(); // Fetch albums when the component mounts
  }, []);

  // Handle image file selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file); // Store the file in state
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  // Handle form submission (upload image + description + title + selected album + create new album)
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload!");
      return;
    }

    if (!selectedAlbum && !newAlbum) {
      alert("Please select an album or create a new one!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // Append the image file to FormData
    formData.append("description", description || " "); // Append description or empty string
    formData.append("title", title || "Untitled"); // Append title

    // If a new album is provided, send it, otherwise send the selected album ID
    if (newAlbum) {
      formData.append("new_album", newAlbum); // Append new album name if provided
    } else {
      formData.append("album_id", selectedAlbum?.toString() || ""); // Append selected album id if no new album
    }

    try {
      const response = await fetch("http://localhost:3000/api/postcreate", {
        method: "POST",
        body: formData, 
        headers: {},
        credentials: "include", // Include credentials for the current session
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Post created successfully:", data);
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create the post.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Show preview of the selected image */}
      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" />
        </div>
      )}

      {/* File input for image selection */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImage}
        className={styles.fileInput}
      />

      {/* Title input */}
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />

      {/* Description input */}
      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />

      {/* Album selection dropdown */}
      {
        albumExist && (
          <select
            value={selectedAlbum || ""}
            onChange={(e) => setSelectedAlbum(Number(e.target.value))}
            className={styles.selectAlbum}
          >
            <option value="" disabled>Select an album</option>
            {albums.length > 0 &&
              albums.map((album) => (
                <option key={album.album_id} value={album.album_id}>
                  {album.album_name}
                </option>
              ))}
          </select>
        )
      }

      {/* Create new album input */}
      <input
        type="text"
        placeholder="Create a new album"
        value={newAlbum}
        onChange={(e) => setNewAlbum(e.target.value)}
        className={styles.inputField}
      />

      {/* Upload button */}
      <button onClick={handleUpload} className={styles.uploadButton}>
        Upload Post
      </button>
    </div>
  );
}
