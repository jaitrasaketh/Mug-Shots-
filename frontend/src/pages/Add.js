import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Header from '../layout/header';
import Footer from '../layout/footer';
import './Add.css';

function Add() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));

      // Compress the image before setting it
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
        alert("Error compressing the image. Please try again.");
      }
    }
  };

  const handleUrlInputChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      // Determine the image URL based on user input or uploaded image
      if (imageUrlInput.trim() !== "") {
        imageUrl = imageUrlInput;
      } else if (image) {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Create a new item object with data
      const newItem = {
        itemName,
        category,
        price: parseFloat(price),
        imageUrl
      };

      // Add the new item to Firestore collection 'items'
      const docRef = await addDoc(collection(db, "items"), newItem);

      console.log("Item added with ID:", docRef.id); // Log the auto-generated ID

      alert("Item has been added successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding item:", error);
      alert(`Error adding item: ${error.message}`);
    }
  };

  return (
    <div className="add-container">
      <Header />
      <div className="add-content">
        {/* Image upload section */}
        <div className="upload-section">
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-button">
            Upload Image
          </label>
          {/* Display image preview if available */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
          {/* Input field for entering image URL */}
          <div className="url-input">
            <label htmlFor="image-url">Or Enter Image URL:</label>
            <input
              type="text"
              id="image-url"
              value={imageUrlInput}
              onChange={handleUrlInputChange}
              placeholder="Paste image URL here"
            />
          </div>
        </div>
        {/* Form section for item details */}
        <div className="form-section">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Input fields for item name, category, and price */}
              <div className="form-field">
                <label htmlFor="itemName">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              {/* Button to submit the form */}
              <button type="submit" className="add-item-button">Add Item</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Add;
