import React, { useState } from "react";
import styles from "../styles/PostCreate.module.css"; // Import the CSS module
import useRedirectLogout from "../Auth/RedirLogout";

export default function PostCreate() {

  useRedirectLogout();

  const [image, setImage] = useState<File | null>(null); // For storing the image file
  const [description, setDescription] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null); // For previewing the image

  // Handle image file selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file); // Store the file in state
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  // Handle form submission (upload image + description)
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // Append the image file to FormData
    formData.append("description", description || " "); // Append description or empty string

    try {
      const response = await fetch("http://localhost:3000/api/postcreate", {
        method: "POST",
        body: formData, // Send FormData directly as the body
        headers: {
          // No need to set "Content-Type", fetch automatically handles it for FormData
        },
        credentials: "include", // Include cookies (session) if necessary
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

      {/* Description input */}
      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />

      {/* Upload button */}
      <button onClick={handleUpload} className={styles.uploadButton}>
        Upload Image
      </button>
    </div>
  );
}