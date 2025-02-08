import React, { useState, useEffect } from "react";
import styles from "../styles/PostCreate.module.css"; 
import useRedirectLogout from "../Auth/RedirLogout";

export default function PostCreate() {
  useRedirectLogout();

  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>(""); 
  const [preview, setPreview] = useState<string | null>(null); 
  const [albums, setAlbums] = useState<{ album_id: number, album_name: string }[]>([]); 
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null); 
  const [newAlbum, setNewAlbum] = useState<string>(""); 
  const [albumExist,setAlbumExist] = useState<boolean>(false);

  // Fetch existing albums for the select dropdown
  const fetchAlbums = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getAlbums", {
        method: "GET",
        credentials: "include",
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
    fetchAlbums(); 
  }, []);

  // Handle image file selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file); 
      setPreview(URL.createObjectURL(file)); 
    }
  };


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
    formData.append("image", image); 
    formData.append("description", description || " "); 
    formData.append("title", title || "Untitled"); 
   
    if (newAlbum) {
      formData.append("new_album", newAlbum); 
    } else {
      formData.append("album_id", selectedAlbum?.toString() || ""); 
    }

    try {
      const response = await fetch("http://localhost:3000/api/postcreate", {
        method: "POST",
        body: formData, 
        headers: {},
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Post created successfully:", data);
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create the post.");
    }
  };

  return (
    <div className={styles.container}>
      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" />
        </div>
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImage}
        className={styles.fileInput}
      />

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />

      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />

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

      <input
        type="text"
        placeholder="Create a new album"
        value={newAlbum}
        onChange={(e) => setNewAlbum(e.target.value)}
        className={styles.inputField}
      />

      <button onClick={handleUpload} className={styles.uploadButton}>
        Upload Post
      </button>
    </div>
  );
}
