// src/pages/Add.js
import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import './Add.css';

const Add = () => {
  return (
    <div className="add-container">
      <Header />
      <div className="add-content">
        <div className="upload-section">
          <button className="upload-button">Upload Image</button>
        </div>
        <div className="form-section">
          <div className="form-container">
            <div className="form-field">
              <label htmlFor="itemName">Item Name</label>
              <input type="text" id="itemName" />
            </div>
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select id="category">
                <option value="Dessert">Dessert</option>
                <option value="Coffee">Beverage</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" />
            </div>
          </div>
          <button className="add-item-button">Add Item</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
