import React, { useState } from "react";

export default function PostCreate() {
  const [image, setImage] = useState(null); // For storing the image file
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null); // For previewing the image

  // Handle image file selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
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
    <div>
      {/* Show preview of the selected image */}
      {preview && (
        <p>
          <img src={preview} alt="Preview" style={{ width: "600px", height: "600px" }} />
        </p>
      )}
      {/* File input for image selection */}
      <input type="file" name="image" accept="image/*" onChange={handleImage} />
      {/* Optional: Description input */}
      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />
      {/* Upload button */}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}